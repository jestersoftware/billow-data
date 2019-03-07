import Util from '../library/util'

// import React from 'react'

function translateJSON(response) {
  return response

  // return {
  //   datasets: response.recordsets || [],
  //   counts: response.recordsAffected || []
  // }
}

function submitRequestDirect(query, parent, callback) {
  return fetch(
    `api/sql?name=${query}&parent=${parent}`,
    {
      accept: "application/json"
    }
  )
    .then(Util.checkHttpStatus)
    .then(Util.parseJSON)
    .then(translateJSON)
    .then(callback)
}

function submitRequest(query, parent, callback) {
  return fetch(
    `api/request/add?name=${query}&parent=${parent}`,
    {
      accept: "application/json"
    }
  )
    .then(Util.checkHttpStatus)
    .then(Util.parseJSON)
    .then(translateJSON)
    .then(callback)
}

// export const defaultResponse = {
//   status: "loading",
//   queries: [
//     {
//       count: 0,
//       query: "none",
//       fields: ["name"],
//       values: [{ name: "Loading..." }]
//     }
//   ]
// }

// export const DataContext = React.createContext(defaultResponse)

const Api = { submitRequestDirect, submitRequest } //, defaultResponse, DataContext

export default Api
