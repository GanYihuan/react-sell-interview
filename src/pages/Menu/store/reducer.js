import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  menuData: [],
  listData: {},
  foodData: [],
  poiInfo: {},
  showChooseContent: false,
  chooseCount: 0,
  currentLeftIndex: 0,
  shopCarTotal: 0,
  shopCarData: []
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
    case constants.ADDSHOPCARDATA:
      return addshopCarData(state, action)
    case constants.DECSHOPCARDATA:
      return decshopCarData(state, action)
    case constants.CLEARSHOPCARTDATA:
      return clearShopCarData(state, action)
    case 'GET_LIST_DATA':
      return getListData(state, action)
    default:
      return state
  }
}

const getMenu = (state, action) => {
  return state.merge({
    // menuData: fromJS(action.obj)
    menuData: state.get('menuData').concat(fromJS(action.obj))
  })
}

const addSelectItem = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').updateIn([fromJS(action.index), 'foods', fromJS(action.findex), 'chooseCount'], function(x) { return x + 1 })
    // shopCarData: state.get('shopCarData').push(state.get('menuData').getIn([fromJS(action.index), 'foods', fromJS(action.findex)]))
  })
}

const addshopCarData = (state, action) => {
  return state.merge({
    shopCarData: state.get('shopCarData').insert(0, state.get('menuData').getIn([fromJS(action.index), 'foods', fromJS(action.findex)]))
  })
}

const minusSelectItem = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').updateIn([fromJS(action.index), 'foods', fromJS(action.findex), 'chooseCount'], function(x) { return x - 1 })
    // shopCarData: state.get('shopCarData').shift(state.get('menuData').getIn([fromJS(action.index), 'foods', fromJS(action.findex)]))
  })
}

const decshopCarData = (state, action) => {
  return state.merge({
    shopCarData: state.get('shopCarData').delete(fromJS(action.shopCarIndex))
  })
}

const getListData = (state, action) => {
  return state.merge({
    foodData: state.get('foodData').concat(fromJS(action.obj.data))
  })
}

const clearShopCarData = (state, action) => {
  return state.merge({
    shopCarData: state.get('shopCarData').clear(),
    shopCarTotal: state.set('shopCarTotal', 0)
  })
}
