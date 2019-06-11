import { combineReducers } from 'redux'
import tabReducer from './tabReducer.js'
import menuReducer from './menuReducer.js'
import commentReducer from './commentReducer.js'
import restanurantReducer from './restanurantReducer.js'
import scrollViewReducer from 'component/ScrollView/scrollViewReducer.js'

const reducers = combineReducers({
  scrollViewReducer,
  tabReducer,
  menuReducer,
  commentReducer,
  restanurantReducer
})

export default reducers
