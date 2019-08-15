/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-13 10:17:27
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 05:36:19
 */
import { combineReducers } from 'redux-immutable' // normal obj transform to immutable obj
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as bottombarReducer } from '../common/BottomBar/store'
import { reducer as mainReducer } from '../common/NavHeader/store'
import { reducer as menuReducer } from '../pages/menu/store'
import { reducer as cityReducer } from '../pages/city/store'
import { reducer as orderReducer } from '../pages/order/store'
import { reducer as ratingsReducer } from '../pages/menu/components/Rating/store'
import { reducer as goodReducer } from '../pages/menu/components/Good/store'

const reducer = combineReducers({
  home: homeReducer,
  bottombar: bottombarReducer,
  main: mainReducer,
  menu: menuReducer,
  ratings: ratingsReducer,
  city: cityReducer,
  order: orderReducer,
  good: goodReducer
})

export default reducer
