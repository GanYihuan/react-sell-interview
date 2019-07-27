import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  order: [],
  evaluate: [],
  showEvaluate: false
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.ORDER_DATA:
      return state.set('order', fromJS(action.order))
    case constants.EVALUATE:
      return state.set('evaluate', fromJS(action.menu))
    case constants.SHOWEVALUATE:
      return state.set('showEvaluate', fromJS(action.bool))
    default:
      return state
  }
}
