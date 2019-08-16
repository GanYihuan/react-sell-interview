/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-27 21:21:52
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 23:19:53
 */
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import * as constants from './constants'

export const getHeaderData = () => async(dispatch) => {
  const { status, data: { homes }} = await axios.get('/homes/getHome')
  if (status === 200) {
    dispatch({
      type: constants.HEAD_DATA,
      obj: homes
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/head.json'
  // })
  // dispatch({
  //   type: constants.HEAD_DATA,
  //   obj: resp.data
  // })
}

export const getListData = () => async(dispatch) => {
  const { status, data: { merchants }} = await axios.get('/cmerchants/getMerchant')
  if (status === 200) {
    dispatch({
      type: constants.LIST_DATA,
      obj: merchants
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/homelist.json'
  // })
  // dispatch({
  //   type: constants.LIST_DATA,
  //   obj: resp.data
  // })
}

export const sellerInfo = (name, img) => (dispatch) => {
  dispatch({
    type: constants.SELLERINFO,
    name: name,
    img: img
  })
}

export const toggleTopShow = (flag) => (dispatch) => {
  dispatch({
    type: constants.TOGGLE_SCROLL_TOP,
    flag: flag
  })
}
