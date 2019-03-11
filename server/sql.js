const { logger } = require('./logger')

const mssql = require('mssql')

const _ = require('lodash')

const baseConfig = {
  user: 'sa',
  password: 'Password123',
  server: '10.0.0.41', // You can use 'localhost\\instance' to connect to named instance
  database: 'master',

  // options: {
  //   encrypt: true // Use this if you're on Windows Azure
  // }
}

function translateSqlToBillow(result, queries) {
  return {
    status: "ready",
    queries: _.merge(
      _.map(
        result.rowsAffected,
        rowsAffected => {
          return {
            count: rowsAffected
          }
        }
      ),
      _.map(
        result.recordsets,
        recordset => {
          return {
            fields: _.keys(recordset[0]),
            values: _.map(
              recordset,
              row => _.mapValues(
                row,
                field => field && typeof field === 'object' ? (field.data || []).toString() : field
              )
            )
          }
        }
      ),
      queries
    )
  }
}

function translateErrorToBillow(error, queries) {
  return {
    status: "error",
    queries: _.merge(
      _.map(
        queries,
        query => {
          return {
            count: 0
          }
        }
      ),
      _.map(
        queries,
        query => {
          return {
            fields: ['Error'],
            values: [{ Error: error.originalError.message }]
          }
        }
      ),
      queries
    )
  }
}

function runQuery(config, queries, callback) {
  const query = _.join(_.map(queries, q => q.query), ';')

  mssql
    .connect(config)
    .then(pool => {
      return pool.request().query(query)
    })
    .then(result => {
      logger.log('info', 'runQuery %s %s %s', '**** SQL SUCCESS ****', 'Query: ', query)

      mssql.close()

      const translatedResult = translateSqlToBillow(result, queries)

      callback && callback(translatedResult)
    }).catch(error => {
      logger.log('error', 'runQuery' + '**** SQL ERROR ****', error)

      mssql.close()

      const translatedResult = translateErrorToBillow(error, queries)

      callback && callback(translatedResult)
    })

  mssql.on('error', error => {
    logger.log('error', 'runQuery' + '**** SQL ERROR ****', error)
  })
}

function getSqlDatabaseList(name, parent, callback) {

  // async () => {
  //   try {
  //     const pool = await mssql.connect('mssql://sa:Password123@10.0.0.249/sehtechdb')

  //     const result = await mssql.query`select top 10 * from CLIENT` // where id = ${value}`

  //     res.json(result)
  //   } catch (err) {
  //     logger.log('info', err)
  //   }
  // }

  // const config = baseConfig

  const queries = [
    {
      name: name,
      parent: parent,
      query: 'SELECT * FROM [sys].[databases]',
      mappedFields:
      {
        id: ['database_id'],
        name: ['name']
      }
    }
  ]

  // mssql.connect(config).then(pool => {
  //   return pool.request().query(query)
  //   // .input('input_parameter', mssql.Int, value)
  //   // .query('select * from mytable where id = @input_parameter')

  //   // .query('select top 10 * from CLIENT')
  //   // .query(query)
  // })
  //   // .then(result => {

  //   //   logger.log('info', recordset)

  //   //   // Stored procedure

  //   //   return pool.request()
  //   //     .input('input_parameter', mssql.Int, value)
  //   //     .output('output_parameter', mssql.VarChar(50))
  //   //     .execute('procedure_name')
  //   // })
  //   .then(result => {
  //     logger.log('info', 'getSqlDatabaseList', '**** SQL SUCCESS ****', 'Query: ', query)

  //     mssql.close()

  //     const translatedResult = translateSqlToBillow(result, [{ query: query }])

  //     callback && callback(translatedResult)
  //   }).catch(error => {
  //     logger.log('error', 'getSqlDatabaseList', '**** SQL ERROR ****', 'Error: ', error)

  //     mssql.close()

  //     const translatedResult = translateErrorToBillow(error, [{ query: query }])

  //     callback && callback(translatedResult)
  //   })

  // mssql.on('error', error => {
  //   logger.log('error', 'getSqlDatabaseList', '**** SQL ERROR ****', 'Error: ', error)
  // })

  runQuery(baseConfig, queries, callback)
}

function getSqlTableList(name, parent, callback) {
  const config = Object.assign({}, baseConfig, { database: parent })

  const queries = [
    {
      name: name,
      parent: parent,
      query: 'SELECT * FROM [INFORMATION_SCHEMA].[TABLES]',
      mappedFields:
      {
        parentid:  ['TABLE_CATALOG'],
        id: ['TABLE_NAME'],
        name: ['TABLE_NAME']
      }
    },
    {
      name: 'columns',
      parent: parent,
      query: 'SELECT * FROM [INFORMATION_SCHEMA].[COLUMNS]',
      mappedFields:
      {
        parentid:  ['TABLE_NAME'],
        id: ['TABLE_NAME', 'COLUMN_NAME'],
        name: ['COLUMN_NAME']
      }
    }
  ]

  runQuery(config, queries, callback)
}

module.exports = { getSqlDatabaseList, getSqlTableList, translateSqlToBillow }
