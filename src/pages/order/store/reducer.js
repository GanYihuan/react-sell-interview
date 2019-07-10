import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  order: []
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.ORDER_DATA:
      return getOrderData(state, action)
    default:
      return state
  }
}

const getOrderData = (state, action) => {
  return state.merge({
    order: state.get('order').concat(fromJS(action.order))
  })
}
