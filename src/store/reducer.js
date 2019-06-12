import { combineReducers } from 'redux-immutable'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as bottombarReducer } from '../common/BottomBar/store'
import { reducer as mainReducer } from '../common/NavHeader/store'

const reducer = combineReducers({
  home: homeReducer,
  bottombar: bottombarReducer,
  main: mainReducer
})

export default reducer
