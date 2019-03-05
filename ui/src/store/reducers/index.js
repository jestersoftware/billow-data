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
      return Object.assign({}, state, action.posts)
    default:
      return state
  }
}


export default posts