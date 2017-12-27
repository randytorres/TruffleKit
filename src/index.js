import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import { Route } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import createHistory from 'history/createHashHistory'

import reducer from './redux/reducer'
import getWeb3 from './util/web3/getWeb3'

import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory()
const routingMiddleware = routerMiddleware(history)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware
    )
  )
)

// Initialize web3 and set in Redux.
getWeb3.then(results => {
  console.log('Web3 initialized!', results)
})
.catch(() => {
  console.log('Error in web3 initialization.')
})

ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={App} />
        </div>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root')
)

export default store