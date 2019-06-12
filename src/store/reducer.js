import { combineReducers } from 'redux-immutable'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as bottombarReducer } from '../common/BottomBar/store'
import { reducer as mainReducer } from '../common/NavHeader/store'
import { reducer as menuReducer } from '../pages/menu/store'
import { reducer as restanurantReducer } from '../pages/menu/store'

const reducer = combineReducers({
  home: homeReducer,
  bottombar: bottombarReducer,
  main: mainReducer,
  menu: menuReducer,
  restanurant: restanurantReducer
})

export default reducer
