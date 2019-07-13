import { fromJS } from 'immutable'
import * as constants from './constants'

const initState = fromJS({
  menuData: [],
  currentLeftIndex: 0,
  shopCarTotal: 0,
  shopCarData: []
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.MENU_DATA:
      return getMenu(state, action)
    case constants.LEFT_ITEM_INDEX:
      return state.set('currentLeftIndex', fromJS(action.index))
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
    case constants.DELETESELECTITEM:
      return deleteSelectItem(state, action)
    case constants.CLEARSHOPCARTDATA:
      return clearShopCarData(state, action)
    case constants.CLEARSHOPCARTOTAL:
      return state.set('shopCarTotal', 0)
    case constants.RESETMENUDATA:
      return resetMenuData(state, action)
    case constants.RESETSHOPCARDATA:
      return state.set('shopCarData', fromJS(action.shopCarDatas))
    default:
      return state
  }
}

const getMenu = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').concat(fromJS(action.obj))
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

const addshopCarData = (state, action) => {
  return state.merge({
    shopCarData: state.get('shopCarData').filter(value => value.get('name') !== fromJS(action.name)).insert(0, state.get('menuData').getIn([fromJS(action.index), 'foods', fromJS(action.findex)]))
  })
}

const decshopCarData = (state, action) => {
  return state.merge({
    // shopCarData: state.get('shopCarData').filter(value => value.get('name') === fromJS(action.name)).updateIn([0, 'chooseCount'], function(x) { return x - 1 }) // 购物车里 减少 对应食品 数量 操作
    shopCarData: state.get('shopCarData').filter(value => value.get('name') !== fromJS(action.name)).concat(state.get('shopCarData').filter(value => value.get('name') === fromJS(action.name)).updateIn([0, 'chooseCount'], function(x) { return x - 1 }))
  })
}

const deleteSelectItem = (state, action) => {
  return state.merge({
    shopCarData: state.get('shopCarData').filter(value => value.get('name') !== fromJS(action.name))
  })
}

const clearShopCarData = (state, action) => {
  return state.merge({
    shopCarData: state.get('shopCarData').clear()
  })
}

const resetMenuData = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').clear().concat(fromJS(action.menuData))
  })
}
