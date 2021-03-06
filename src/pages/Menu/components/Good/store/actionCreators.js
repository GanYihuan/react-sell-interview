﻿import axios from 'axios'
import * as constants from './constants'
import { Notyf } from 'notyf' // 纯js消息通知插件

// Good.jsx
export const getMenuData = () => async(dispatch) => {
  const { status, data: { goods }} = await axios.get('/goods/getGood')
  if (status === 200) {
    dispatch({
      type: constants.MENU_DATA,
      obj: goods
    })
  }
  // const resp = await axios({
  //   method: 'get',
  //   url: '/api/menu.json'
  // })
  // dispatch({
  //   type: 'MENU_DATA',
  //   obj: resp.data
  // })
}

export const setLeftItemIndex = (index) => (dispatch) => {
  dispatch({
    type: constants.LEFT_ITEM_INDEX,
    index: index
  })
}
// Good.jsx

// Control.jsx
export const addSelectItem = (index, findex) => (dispatch) => {
  dispatch({
    type: constants.ADD_SELECTI_ITEM,
    index: index,
    findex: findex
  })
}

export const minusSelectItem = (index, findex) => (dispatch) => {
  dispatch({
    type: constants.MINUS_SELECTI_ITEM,
    index: index,
    findex: findex
  })
}

export const addshopCarTotal = () => (dispatch) => {
  dispatch({
    type: constants.ADDSHOPCARTOTAL
  })
}

export const decshopCarTotal = () => (dispatch) => {
  dispatch({
    type: constants.DECSHOPCARTOTAL
  })
}

export const addshopCarData = (index, findex, name) => (dispatch) => {
  dispatch({
    type: constants.ADDSHOPCARDATA,
    index: index,
    findex: findex,
    name: name
  })
}

export const decshopCarData = (name) => (dispatch) => {
  dispatch({
    type: constants.DECSHOPCARDATA,
    name: name
  })
}

export const deleteSelectItem = (name) => (dispatch) => {
  dispatch({
    type: constants.DELETESELECTITEM,
    name: name
  })
}
// Control.jsx

// ShopBar.jsx
export const clearShopCartData = () => (dispatch) => {
  dispatch({
    type: constants.CLEARSHOPCARTDATA
  })
}

export const clearShopCartTotal = () => (dispatch) => {
  dispatch({
    type: constants.CLEARSHOPCARTOTAL
  })
}

export const resetMenuData = () => async(dispatch) => {
  const { status, data: { goods }} = await axios.get('/goods/getGood')
  if (status === 200) {
    dispatch({
      type: constants.RESETMENUDATA,
      menuData: goods
    })
  }
}

export const resetshopCarData = (shopCarDatas) => (dispatch) => {
  dispatch({
    type: constants.RESETSHOPCARDATA,
    shopCarDatas: shopCarDatas
  })
}

export const Pay = (sellerName, sellerImage, menu, number, price) => (dispatch) => {
  axios
    .post('/orders/pay', {
      sellerName: sellerName,
      sellerImage: sellerImage,
      menu: menu,
      number: number,
      price: price
    })
    .then(({ status, data }) => {
      const notyf = new Notyf()
      if (status === 200) {
        if (data && data.code === 0) {
          notyf.success(`${data.msg} 需要支付${price}元 到评价界面给个评价!`)
        } else {
          notyf.error(`${data.msg}`)
        }
      } else {
        notyf.error(`服务器出错，错误码:${status}`)
      }
    })
}
// ShopBar.jsx

export const showFood = (bool) => (dispatch) => {
  dispatch({
    type: constants.SHOWFOOD,
    bool: bool
  })
}

export const foodData = (food) => (dispatch) => {
  dispatch({
    type: constants.FOODDATA,
    food: food
  })
}
