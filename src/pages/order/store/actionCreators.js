import axios from 'axios'
import * as constants from './constants'

export const getOrderData = () => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  const { status, data: { orders }} = await axios.get('/orders/getOrder')
  if (status === 200) {
    dispatch({
      type: constants.ORDER_DATA,
      order: orders
    })
  }
}

export const getEvaluate = (menu) => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  dispatch({
    type: constants.EVALUATE,
    menu: menu
  })
}
