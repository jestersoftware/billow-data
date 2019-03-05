import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import rootReducer from './reducers'
import configureStore from './store/configureStore'

import './index.css'

import App from './App'

import registerServiceWorker from './offline/registerServiceWorker'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
