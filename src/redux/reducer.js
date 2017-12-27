import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducers } from './modules'
import web3Reducer from '../util/web3/web3Reducer'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
  web3: web3Reducer,
})

export default reducer
