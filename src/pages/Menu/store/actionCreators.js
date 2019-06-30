﻿import axios from 'axios'
import * as constants from './constants'

export const getNevHeader = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/navheader.json'
  })
  dispatch({
    type: 'NEVHEADER_DATA',
    obj: resp.data
  })
}

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

export const getFoodData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/food.json'
  })
  dispatch({
    type: 'GET_LIST_DATA',
    obj: resp.data
  })
}

export const getLeftItemIndex = (index) => (dispatch) => {
  dispatch({
    type: 'LEFT_ITEM_INDEX',
    obj: index
  })
}

export const fuck = () => (dispatch) => {
  dispatch({
    type: 'fuck',
    obj: 1
  })
}

export const addSelectItem = (num) => (dispatch) => {
  dispatch({
    type: 'ADD_SELECTI_ITEM',
    num: num
  })
}

export const minusSelectItem = (index) => (dispatch) => {
  dispatch({
    type: 'MINUS_SELECTI_ITEM',
    obj: index
  })
}

export const itemClick = (obj) => {
  return {
    type: 'LEFT_CLICK',
    obj: obj
  }
}

export const showChoose = (obj) => (dispatch) => {
  dispatch({
    type: 'SHOW_CHOOSE_CONTENT',
    obj: obj
  })
}

export const clearCar = (obj) => (dispatch) => {
  dispatch({
    type: 'CLEAR_CAR',
    obj: obj
  })
}
