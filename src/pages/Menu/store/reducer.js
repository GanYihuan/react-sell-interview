﻿import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  menuData: [],
  listData: {},
  foodData: [],
  poiInfo: {},
  navHeader: {},
  showChooseContent: false,
  chooseCount: 0,
  currentLeftIndex: 0,
  shopCarTotal: 0
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.MENU_DATA:
      return getMenu(state, action)
    case constants.LEFT_ITEM_INDEX:
      return state.set('currentLeftIndex', action.obj)
    case constants.ADD_SELECTI_ITEM:
      return addSelectItem(state, action)
    case constants.MINUS_SELECTI_ITEM:
      return minusSelectItem(state, action)
    case constants.ADDSHOPCARTOTAL:
      return state.update('shopCarTotal', function(x) { return x + 1 })
    case constants.DECSHOPCARTOTAL:
      return state.update('shopCarTotal', function(x) { return x - 1 })
    case 'GET_LIST_DATA':
      return getListData(state, action)
    case 'NEVHEADER_DATA':
      return getNevHeader(state, action)
    default:
      return state
  }
}

const getMenu = (state, action) => {
  return state.merge({
    // menuData: state.get('menuData').concat(fromJS(action.obj.data))
    menuData: fromJS(action.obj)
  })
}

const addSelectItem = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').updateIn([fromJS(action.index), 'foods', fromJS(action.findex), 'chooseCount'], function(x) { return x + 1 })
  })
}

const minusSelectItem = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').updateIn([fromJS(action.index), 'foods', fromJS(action.findex), 'chooseCount'], function(x) { return x - 1 })
  })
}

const getNevHeader = (state, action) => {
  return state.merge({
    navHeader: state.get('navHeader').concat(fromJS(action.obj.data))
  })
}

const getListData = (state, action) => {
  return state.merge({
    foodData: state.get('foodData').concat(fromJS(action.obj.data))
  })
}
