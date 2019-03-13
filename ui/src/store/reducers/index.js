// import { combineReducers } from 'redux'

import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  TOGGLE_DIRECT
} from '../actions/index'

const _ = require('lodash')

function posts(
  state = {
    isEnabled: false,
    status: "loading",
    queries: [
      {
        name: '',
        parent: '',
        query: '',
        count: 0,
        mappedFields:
        {
          parentid: ['parentid'],
          id: ['_id'],
          name: ['name']
        },
        fields: ['name'],
        values: [{ name: "Loading...", _id: 0, parentid: '' }]
      }
    ]
  },
  action
) {
  switch (action.type) {
    case TOGGLE_DIRECT:
      return Object.assign({}, state, {
        isEnabled: !state.isEnabled
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        status: 'request made'
      })
    case RECEIVE_POSTS:
      // For each query 
      // 1) find existing query with same name and update
      // or
      // 2) find blank query (default) and update
      // or
      // 3) create a new query
      _.each(
        action.posts.queries,
        query => {
          let queryToUpdate = state.queries.find(stateQuery => stateQuery.query === query.query)

          if (queryToUpdate) {
            Object.assign(queryToUpdate, query)
          }
          else {
            // Find 'blank' query
            queryToUpdate = state.queries.find(stateQuery => stateQuery.query === '')

            if (queryToUpdate) {
              Object.assign(queryToUpdate, query)
            }
            else {
              // Create a new query
              queryToUpdate = {}

              Object.assign(queryToUpdate, query)

              state.queries.push(queryToUpdate)
            }
          }
        }
      )

      return Object.assign({}, state, { status: 'loaded' })
    default:
      return state
  }
}


export default posts