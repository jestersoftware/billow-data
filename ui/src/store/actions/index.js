// import fetch from 'cross-fetch'
import Api/* , {defaultResponse, DataContext} */ from '../../api/Api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
// ​
// export function selectSubreddit(subreddit) {
//   return {
//     type: SELECT_SUBREDDIT,
//     subreddit
//   }
// }
// ​
// export function invalidateSubreddit(subreddit) {
//   return {
//     type: INVALIDATE_SUBREDDIT,
//     subreddit
//   }
// }
// ​
function requestPosts(name) {
  return {
    type: REQUEST_POSTS,
    name
  }
}

function receivePosts(name, parent, response) {
  return {
    type: RECEIVE_POSTS,
    name,
    parent,
    posts: response,
    receivedAt: Date.now()
  }
}

export function fetchPosts(name, parent) {
  return dispatch => {
    dispatch(requestPosts(name))
    // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(receivePosts(subreddit, json)))
    return Api.submitRequest(
      name,
      parent,
      response => {
        // this.databasesResponse = response        
        dispatch(receivePosts(name, parent, response))
      }
    )

  }
}

// export default fetchPosts