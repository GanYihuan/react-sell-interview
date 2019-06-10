import { combineReducers } from 'redux-immutable'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as bottombarReducer } from '../common/BottomBar/store'

const reducer = combineReducers({
  home: homeReducer,
  bottombar: bottombarReducer
})

export default reducer
