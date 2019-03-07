// import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT,
  // INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions/index'

function posts(
  state = {
    status: "loading",
    queries: [
      {
        name: "",
        parent: "",
        count: 0,
        query: "none",
        fields: ["name"],
        values: [{ name: "Loading...", _id: 0 }]
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

      // Find existing query with same name
      let queryToUpdate = state.queries.find(q => q.name === action.name)

      if (queryToUpdate) {
        Object.assign(queryToUpdate, { name: action.name, parent: action.parent }, action.posts.queries[0])
      }
      else {
        // Find 'blank' query
        queryToUpdate = state.queries.find(q => q.name === '')

        if (queryToUpdate) {
          Object.assign(queryToUpdate, { name: action.name, parent: action.parent }, action.posts.queries[0])
        }
        else {
          // Create a new query
          queryToUpdate = {}
          Object.assign(queryToUpdate, { name: action.name, parent: action.parent }, action.posts.queries[0])
          state.queries.push(queryToUpdate)
        }
      }

      return Object.assign({}, state)
    default:
      return state
  }
}


export default posts