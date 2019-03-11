// import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT,
  // INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/index'

const _ = require('lodash')

function posts(
  state = {
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
    // case INVALIDATE_SUBREDDIT:
    //   return Object.assign({}, state, {
    //     didInvalidate: true
    //   })
    case REQUEST_POSTS:
      // return Object.assign({}, state, {
      //   isFetching: true,
      //   didInvalidate: false
      // })
      return state
    case RECEIVE_POSTS:
      // return Object.assign({}, state, {
      //   isFetching: false,
      //   didInvalidate: false,
      //   items: action.posts,
      //   lastUpdated: action.receivedAt
      // })

      // For each query 
      // 1) find existing query with same name and update
      // or
      // 2) create a new query
      _.each(
        action.posts.queries, 
        query => {
          let queryToUpdate = state.queries.find(stateQuery => stateQuery.query === query.query)

          if (queryToUpdate) {
            Object.assign(queryToUpdate, /* { name: action.name, parent: action.parent }, */ query)
          }
          else {
            // Find 'blank' query
            queryToUpdate = state.queries.find(stateQuery => stateQuery.query === '')

            if (queryToUpdate) {
              Object.assign(queryToUpdate, /* { name: action.name, parent: action.parent }, */ query)
            }
            else {
              // Create a new query
              queryToUpdate = {}

              Object.assign(queryToUpdate, /* { name: action.name, parent: action.parent }, */ query)

              state.queries.push(queryToUpdate)
            }
          }
        }
      )

      return Object.assign({}, state)
    default:
      return state
  }
}


export default posts