﻿import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk' // redux-thunk handleasync , dispatch
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // chrome devTool redux
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
