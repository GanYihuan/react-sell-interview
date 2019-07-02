import axios from 'axios'
import * as constants from './constants'

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

export const getLeftItemIndex = (index) => (dispatch) => {
  dispatch({
    type: constants.LEFT_ITEM_INDEX,
    obj: index
  })
}

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

export const addshopCarData = (index, findex) => (dispatch) => {
  dispatch({
    type: constants.ADDSHOPCARDATA,
    index: index,
    findex: findex
  })
}

export const decshopCarData = (index, findex) => (dispatch) => {
  dispatch({
    type: constants.DECSHOPCARDATA,
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

export const clearShopCartData = () => (dispatch) => {
  dispatch({
    type: constants.DECSHOPCARTOTAL
  })
}
