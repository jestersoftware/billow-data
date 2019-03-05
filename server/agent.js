const winston = require('winston')

const fetch = require('node-fetch')

const Util = require('./util')

const sql = require('./sql')

function fulfillRequest(request, result) {
  winston.log('info', 'fulfillRequest', '**** AGENT SENDING RESPONSE ****', request.id, request.name)

  fetch(
    `http://localhost:3001/api/request/fulfill`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ request: request, sql: result })
    }
  )
    .then(Util.checkHttpStatus)
    .then(Util.parseJSON)
    .then(() => { setTimeout(getRequests, 2000) })
    .catch(err => {
      winston.log('error', 'fulfillRequest', err)

      setTimeout(getRequests, 5000)
    })
}

function processRequest(request, callback) {
  if (request.name) {
    winston.log('info', 'processRequest', '**** AGENT PROCESSING REQUEST ****', request.id, request.name)

    if (request.name === 'databases') {
      sql.getSqlDatabaseList(request.parent, result => callback(request, result))
    }
    else if (request.name === 'tables' && request.parent) {
      sql.getSqlTableList(request.parent, result => callback(request, result))
    }
    else {
      winston.log('warn', 'processRequest', '**** AGENT RECEIVED UNKNOWN REQUEST ****', request)

      return -1
    }

    return 1
  }

  return 0
}

function getRequests() {
  // winston.log('warn', '**** AGENT CHECKING FOR REQUESTS ****')

  try {
    fetch(
      `http://localhost:3001/api/requests`,
      {
        accept: "application/json"
      })
      .then(Util.checkHttpStatus)
      .then(Util.parseJSON)
      .then(
        request => {
          // if (request.name) {
          // if (request.name === 'databases') {
          //   winston.log('info', 'getRequests', '**** AGENT RECEIVED REQUEST ****', request.id, request.name)

          //   sql.getSqlDatabaseList('', result => fulfillRequest(request, result))
          // }
          // else if (request.name === 'tables') {
          //   winston.log('info', 'getRequests', '**** AGENT RECEIVED REQUEST ****', request.id, request.name)

          //   sql.getSqlTableList(request.parent, result => fulfillRequest(request, result))
          // }
          // else {
          //   winston.log('warn', 'getRequests', '**** AGENT RECEIVED UNKNOWN REQUEST ****', request.id, request.name)

          //   setTimeout(getRequests, 2000)
          // }

          const status = processRequest(request, fulfillRequest)
          // }
          // else {
          // winston.log('info', '**** AGENT RECEIVED NO REQUESTS ****')

          if (status < 1) {
            setTimeout(getRequests, 2000)
          }
          // }
        }
      )
      .catch(
        err => {
          winston.log('error', err)

          setTimeout(getRequests, 5000)
        }
      )
  }
  catch (e) {
    // TODO
  }
}

exports.getRequests = getRequests
exports.processRequest = processRequest
