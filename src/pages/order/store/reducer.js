/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-27 21:21:52
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 14:19:38
 */
import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  order: [],
  evaluate: [],
  showEvaluate: false,
  evaluateSellerName: ''
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.ORDER_DATA:
      return state.set('order', fromJS(action.order))
    case constants.EVALUATE:
      return state.set('evaluate', fromJS(action.menu))
    case constants.SHOWEVALUATE:
      return state.set('showEvaluate', fromJS(action.bool))
    case constants.EVALUEATESELLERNAME:
      return state.set('evaluateSellerName', fromJS(action.sellerName))
    default:
      return state
  }
}
