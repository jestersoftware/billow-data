
// const sql = require('./sql')

const _ = require('lodash')

let result = {
  "recordsets": [
    [
      {
        "name": "master",
        "user_access_desc": "MULTI_USER",
        "is_read_only": false,
        "state_desc": "ONLINE",
        "recovery_model_desc": "SIMPLE",
        "owner_sid": { type: "Buffer", data: [ 1 ]}
      },
      {
        "name": "tempdb",
        "user_access_desc": "MULTI_USER",
        "is_read_only": false,
        "state_desc": "ONLINE",
        "recovery_model_desc": "SIMPLE",
        "owner_sid": { type: "Buffer", data: [ 1 ]}
      },
      {
        "name": "model",
        "user_access_desc": "MULTI_USER",
        "is_read_only": false,
        "state_desc": "ONLINE",
        "recovery_model_desc": "SIMPLE",
        "owner_sid": { type: "Buffer", data: [ 1 ]}
      },
      {
        "name": "msdb",
        "user_access_desc": "MULTI_USER",
        "is_read_only": false,
        "state_desc": "ONLINE",
        "recovery_model_desc": "SIMPLE",
        "owner_sid": { type: "Buffer", data: [ 1 ]}
      },
      {
        "name": "sehtechdb",
        "user_access_desc": "MULTI_USER",
        "is_read_only": false,
        "state_desc": "ONLINE",
        "recovery_model_desc": "BULK_LOGGED",
        "owner_sid": { type: "Buffer", data: [ 1 ]}
      }
    ]
  ],
  "recordset": [
    {
      "name": "master",
      "user_access_desc": "MULTI_USER",
      "is_read_only": false,
      "state_desc": "ONLINE",
      "recovery_model_desc": "SIMPLE",
      "owner_sid": { type: "Buffer", data: [ 1 ]}
    },
    {
      "name": "tempdb",
      "user_access_desc": "MULTI_USER",
      "is_read_only": false,
      "state_desc": "ONLINE",
      "recovery_model_desc": "SIMPLE",
      "owner_sid": { type: "Buffer", data: [ 1 ]}
    },
    {
      "name": "model",
      "user_access_desc": "MULTI_USER",
      "is_read_only": false,
      "state_desc": "ONLINE",
      "recovery_model_desc": "SIMPLE",
      "owner_sid": { type: "Buffer", data: [ 1 ]}
    },
    {
      "name": "msdb",
      "user_access_desc": "MULTI_USER",
      "is_read_only": false,
      "state_desc": "ONLINE",
      "recovery_model_desc": "SIMPLE",
      "owner_sid": { type: "Buffer", data: [ 1 ]}
    },
    {
      "name": "sehtechdb",
      "user_access_desc": "MULTI_USER",
      "is_read_only": false,
      "state_desc": "ONLINE",
      "recovery_model_desc": "BULK_LOGGED",
      "owner_sid": { type: "Buffer", data: [ 1 ]}
    }
  ],
  "output": {},
  "rowsAffected": [
    5
  ]
}


let queries = [{query: 'a'}]

let pp = _.map(result.rowsAffected, rowsAffected => { return { count: rowsAffected }})

pp

let zz = _.map(result.datasets, dataset => { return { fields: _.keys(dataset[0]), values: dataset }})

zz

let hh = _.merge(
  _.map(result.rowsAffected, rowsAffected =>  { return { count: rowsAffected }}),
  _.map(result.recordsets, dataset => { return { fields: _.keys(dataset[0]), values: _.map(dataset, row => _.mapValues(row, field => typeof field === 'object' ? (field.data || []).toString() : field )) }}),
  queries
)

cc = hh[0]

cc

dd = cc.values[0]

dd

ee = dd.owner_sid

ee

dfasd = typeof ee

dfasd








