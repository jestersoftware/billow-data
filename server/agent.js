const { logger } = require('./logger')

const fetch = require('node-fetch')

const Util = require('./util')

const sql = require('./sql')

function fulfillRequest(request, result) {
  logger.log('info', 'fulfillRequest %s %s %s', '**** AGENT SENDING RESPONSE ****', request.id, request.name)

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
      logger.log('error', 'fulfillRequest', err)

      setTimeout(getRequests, 5000)
    })
}

function processRequest(request, callback) {
  if (request && request.name) {
    logger.log('info', 'processRequest %s %s %s', '**** AGENT PROCESSING REQUEST ****', request.id, request.name)

    if (request.name === 'databases') {
      sql.getSqlDatabaseList(request.name, request.parent, result => callback(request, result))
    }
    else if (request.name === 'tables' && request.parent) {
      sql.getSqlTableList(request.name, request.parent, result => callback(request, result))
    }
    else {
      logger.log('warn', 'processRequest %s %s', '**** AGENT RECEIVED UNKNOWN REQUEST ****', request)

      return -1
    }

    return 1
  }

  return 0
}

function getRequests() {
  // logger.log('warn', '**** AGENT CHECKING FOR REQUESTS ****')

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
          //   logger.log('info', 'getRequests %s %s %s', '**** AGENT RECEIVED REQUEST ****', request.id, request.name)

          //   sql.getSqlDatabaseList('', result => fulfillRequest(request, result))
          // }
          // else if (request.name === 'tables') {
          //   logger.log('info', 'getRequests %s %s %s', '**** AGENT RECEIVED REQUEST ****', request.id, request.name)

          //   sql.getSqlTableList(request.parent, result => fulfillRequest(request, result))
          // }
          // else {
          //   logger.log('warn', 'getRequests %s %s %s', '**** AGENT RECEIVED UNKNOWN REQUEST ****', request.id, request.name)

          //   setTimeout(getRequests, 2000)
          // }

          const status = processRequest(request, fulfillRequest)
          // }
          // else {
          // logger.log('info', '**** AGENT RECEIVED NO REQUESTS ****')

          if (status < 1) {
            setTimeout(getRequests, 2000)
          }
          // }
        }
      )
      .catch(
        err => {
          logger.log('error', err)

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
