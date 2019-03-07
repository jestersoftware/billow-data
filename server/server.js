const { logger } = require('./logger')

// const electron = require('electron')
// const { app, BrowserWindow } = require('electron')

const express = require('express')
const bodyParser = require('body-parser')

const { ApolloServer, gql } = require('apollo-server-express');

const sql = require('./sql')
const agent = require('./agent')

let requests = []

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
]

// The GraphQL schema in string form
const typeDefs = gql`
  type Query { books: [Book] }
  type Book { title: String, author: String }
`

// The resolvers
const resolvers = {
  Query: { books: () => books },
}

// Initialize the app
const app = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.set('port', process.env.PORT || 3001)

logger.log('info', 'ENV PORT= %s %s', process.env.PORT, app.get('port'))

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('ui/build'))
}

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

function translateRequest(req, res) {
  return {
    id: Date.now().toString(),
    inProcess: false,
    complete: false,
    name: req.query.name,
    parent: req.query.parent,
    res: res
  }
}

// CLIENT: Submit a request for an agent to pick up
app.get(
  '/api/request/add',
  (req, res) => {
    logger.log('info', '/api/request/add %s %s %s %s %s', '**** 1. CLIENT SUBMITTED REQUEST AS URL QUERY ****', '[name]', req.query.name, '[parent]', req.query.parent)

    requests.push(translateRequest(req, res))
  }
).on(
  'error',
  (e) => {
    logger.log('error', '/api/request/add', e)
  }
)

// AGENT: Look for requests from clients
app.get(
  '/api/requests',
  (req, res) => {
    // logger.log('info', '**** SERVER RECEIVED CHECK FOR REQUESTS ****')

    const newRequests = requests.filter(r => !r.inProcess && !r.complete)

    const request = newRequests.length && newRequests[0]

    if (request) {
      if (!request.name) {
        logger.log('error', '/api/requests %s %s', '**** 2. SERVER NOT SENDING REQUEST TO AGENT (INVALID REQUEST - [name] is empty) ****', request)

        res.json({})
      }
      else {
        logger.log('info', '/api/requests %s %s %s %s %s %s %s', '**** 2. SERVER SENDING REQUEST TO AGENT ****', '[id]', request.id, '[name]', request.name, '[parent]', req.query.parent)

        request.inProcess = true

        res.json(
          {
            id: request.id,
            name: request.name,
            parent: request.parent
          }
        )
      }
    }
    else {
      res.json({})
    }
  }
).on(
  'error',
  (e) => {
    logger.log('error', '/api/requests', e)
  }
)

// AGENT: Fulfill a request
app.post(
  '/api/request/fulfill',
  bodyParser.json(),
  (req, res) => {
    const { request, sql } = req.body

    logger.log('info', '/api/request/fulfill %s %s %s', '**** 3. SERVER RECEIVES RESPONSE FROM AGENT ****', request.id, request.name)

    // logger.log('info', '/api/request/fulfill', '**** ALL INTERNAL REQUESTS ****', requests.map((r) => { return { id: r.id, name: r.name, complete: r.complete } }))

    const internalRequest = requests.find(r => r.id === request.id)

    if (internalRequest) {
      logger.log('info', '/api/request/fulfill %s %s %s', '**** 4. SERVER SENDING RESPONSE TO CLIENT ****', internalRequest.id, internalRequest.name)

      internalRequest.res.json(sql)

      internalRequest.inProcess = false
      internalRequest.complete = true

      res.json(
        {
          id: internalRequest.id,
          complete: true
        }
      )
    }
    else {
      res.end()
    }
  }
).on(
  'error',
  (e) => {
    logger.log('error', '/api/request/fulfill', e)
  }
)

// TEST
app.get(
  '/api/sql',
  (req, res) => {
    logger.log('info', '/api/sql %s %s', '**** AGENT RECEIVED SQL REQUEST DIRECTLY ****', req.query.name)

    const status = agent.processRequest(translateRequest(req, res), (request, result) => res.json(result))

    if (status < 1) {
      res.json({ status: 'error' })
    }
  }
).on(
  'error',
  (e) => {
    logger.log('error', '/api/sql', e)
  }
)

// Start the server
app.listen(
  app.get('port'),
  () => {
    logger.log('info', `Find the server at: http://localhost:${app.get('port')}/`)

    logger.log('info', `Go to http://localhost:${app.get('port')}/graphql to run queries!`)
  }
)

// AGENT ONLY
if (app.get('port') == 3333) {
  if (process.env.ELECTRON_START_URL) {
    const { app, BrowserWindow } = require('electron')
    const path = require('path')
    const url = require('url')

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    let win

    function createWindow() {
      // Create the browser window.
      win = new BrowserWindow({ width: 800, height: 600 })

      const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../ui/build/index.html'),
        protocol: 'file:',
        slashes: true
      })

      // // and load the index.html of the app.
      // win.loadURL(url.format({
      //   pathname: path.join(__dirname, 'index.html'),
      //   protocol: 'file:',
      //   slashes: true
      // }))

      win.loadURL(startUrl)

      // Open the DevTools.
      // win.webContents.openDevTools()

      // Emitted when the window is closed.
      win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
      })
    }

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow)

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        createWindow()
      }
    })

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.

    // TODO
  }

  logger.log('info', 'setting interval')

  setTimeout(agent.getRequests, 2000)
}
