﻿/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-27 21:21:52
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 14:25:37
 */
import axios from 'axios'
import { Notyf } from 'notyf' // Pure js message notification plugin
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

export const submit = (evaluateSellerNames, username, oldTime, score, rateType, text, avatar, recommend) => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  axios
    .post('/ratings/addRating', {
      sellername: evaluateSellerNames,
      username: username,
      rateTime: oldTime,
      score: score,
      rateType: rateType,
      text: text,
      avatar: avatar,
      recommend: recommend
    })
    .then(({ status, data }) => {
      const notyf = new Notyf()
      if (status === 200) {
        if (data && data.code === 0) {
          notyf.success(`${data.msg} 评价成功!`)
        } else {
          notyf.error(`${data.msg} 评价失败`)
        }
      } else {
        notyf.error(`服务器出错，错误码:${status}`)
      }
    })
}

export const deleteComment = (sellerName, number, price) => async(dispatch) => { // redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
  axios
    .post('/orders/deleteOrder', {
      sellerName: sellerName,
      number: number,
      price: price
    })
    .then(({ status, data }) => {
      const notyf = new Notyf()
      if (status === 200) {
        if (data && data.code === 0) {
          notyf.success(`${data.msg} 删除订单成功!`)
        } else {
          notyf.error(`${data.msg} 删除订单失败!`)
        }
      } else {
        notyf.error(`服务器出错，错误码:${status}`)
      }
    })
}

export const showEvaluate = (bool) => (dispatch) => {
  dispatch({
    type: constants.SHOWEVALUATE,
    bool: bool
  })
}

export const evaluateSellerName = (sellerName) => (dispatch) => {
  dispatch({
    type: constants.EVALUEATESELLERNAME,
    sellerName: sellerName
  })
}
