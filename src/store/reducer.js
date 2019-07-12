import { combineReducers } from 'redux-immutable' // normal obj transform to immutable obj
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as bottombarReducer } from '../common/BottomBar/store'
import { reducer as mainReducer } from '../common/NavHeader/store'
import { reducer as menuReducer } from '../pages/menu/store'
// import { reducer as restanurantReducer } from '../pages/restanurant/store'
import { reducer as restanurantReducer } from '../pages/menu/components/Restanurant/store'
// import { reducer as ratingsReducer } from '../pages/rating/store'
import { reducer as ratingsReducer } from '../pages/menu/components/Rating/store'
import { reducer as cityReducer } from '../pages/city/store'
import { reducer as orderReducer } from '../pages/order/store'

const reducer = combineReducers({
  home: homeReducer,
  bottombar: bottombarReducer,
  main: mainReducer,
  menu: menuReducer,
  restanurant: restanurantReducer,
  ratings: ratingsReducer,
  city: cityReducer,
  order: orderReducer
})

export default reducer
