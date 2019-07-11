import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  order: [],
  evaluate: []
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.ORDER_DATA:
      return getOrderData(state, action)
    case constants.EVALUATE:
      return state.set('evaluate', fromJS(action.menu))
      // return getEvaluate(state, action)
    default:
      return state
  }
}

const getOrderData = (state, action) => {
  return state.merge({
    order: state.get('order').concat(fromJS(action.order))
  })
}

// const getEvaluate = (state, action) => {
//   return state.merge({
//     evaluate: state.get('evaluate').concat(fromJS(action.menu))
//   })
// }
