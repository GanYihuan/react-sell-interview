import axios from 'axios'

export const getMenuData = () => async(dispatch) => {
  const resp = await axios({
    method: 'get',
    url: '/api/menu.json'
  })
  dispatch({
    type: 'MENU_DATA',
    obj: resp.data
  })
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

export const itemClick = (obj) => {
  return {
    type: 'LEFT_CLICK',
    obj: obj
  }
}

export const addSelectItem = (obj) => {
  return {
    type: 'ADD_SELECTI_ITEM',
    obj: obj
  }
}

export const minusSelectItem = (obj) => {
  return {
    type: 'MINUS_SELECTI_ITEM',
    obj: obj
  }
}

export const showChoose = (obj) => {
  return {
    type: 'SHOW_CHOOSE_CONTENT',
    obj: obj
  }
}

export const clearCar = (obj) => {
  return {
    type: 'CLEAR_CAR',
    obj: obj
  }
}
