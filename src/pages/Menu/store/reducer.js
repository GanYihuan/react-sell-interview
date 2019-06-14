﻿import { fromJS } from 'immutable'
import cartControl from '../components/cartControl/cartControl'

const initState = fromJS({
  menuData: [],
  listData: {},
  foodData: [],
  poiInfo: {},
  navHeader: {},
  showChooseContent: false,
  chooseCount: 0,
  currentLeftIndex: 0,
  fuck: 0,
  price: {}
})

export default (state = initState, action) => {
  switch (action.type) {
    case 'MENU_DATA':
      return getMenu(state, action)
    case 'NEVHEADER_DATA':
      return getNevHeader(state, action)
    case 'LEFT_ITEM_INDEX':
      return state.set('currentLeftIndex', action.obj)
    case 'ADD_SELECTI_ITEM':
      return fuck(state, action)
    case 'MINUS_SELECTI_ITEM':
      return fucker(state, action)
    case 'fuck':
      return fuck(state, action)
    case 'GET_LIST_DATA':
      return getListData(state, action)
    // case 'LEFT_CLICK':
    //   return itemClick(state, action)
    // case 'SHOW_CHOOSE_CONTENT':
    //   return chooseContent(state, action)
    // case 'CLEAR_CAR':
    //   return clearCar(state, action)
    default:
      return state
  }
}

const fuck = (state, action) => {
  return state.merge({
    fuck: state.get('fuck') + 1,
    price: state.get('foodData').get(fromJS(action.num)),
    // foodData: state.get('foodData').setIn([fromJS(action.num), 'cartControlCount'], state.get('foodData', fromJS(action.num)).get('cartControlCount'))
    // foodData: state.get('foodData').setIn([fromJS(action.num), 'cartControlCount'], state.get('foodData').get(fromJS(action.num)).get('price'))
    foodData: state.get('foodData').setIn([fromJS(action.num), 'cartControlCount'], 1)
  })
}

const fucker = (state, action) => {
  return state.merge({
    fuck: state.get('fuck') - 1
  })
}

const getMenu = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}

const getNevHeader = (state, action) => {
  return state.merge({
    navHeader: state.get('navHeader').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}

const getListData = (state, action) => {
  return state.merge({
    foodData: state.get('foodData').concat(fromJS(action.obj.data))
  })
}

// const chooseContent = (state, action) => {
//   return state.merge({
//     showChooseContent: state.get('showChooseContent').concat(fromJS(action.obj))
//   })
// }

// const clearCar = (state) => {
//   const listData = state.listData
//   const list = listData.food_spu_tags || [] // 找到外层，左边 list 列表
//   for (let i = 0; i < list.length; i++) {
//     const spus = list[i].spus || []
//     for (let j = 0; j < spus.length; j++) {
//       spus[j].chooseCount = 0
//     }
//   }
//   return { ...state, listData: JSON.parse(JSON.stringify(listData)) }
// }
