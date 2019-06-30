import { fromJS } from 'immutable'
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
  fuck: 0
})

export default (state = initState, action) => {
  switch (action.type) {
    case constants.MENU_DATA:
      return getMenu(state, action)
    case 'NEVHEADER_DATA':
      return getNevHeader(state, action)
    case constants.LEFT_ITEM_INDEX:
      return state.set('currentLeftIndex', action.obj)
    case 'ADD_SELECTI_ITEM':
      return fuck(state, action)
    case 'MINUS_SELECTI_ITEM':
      return fucker(state, action)
    case 'fuck':
      return fuck(state, action)
    case 'GET_LIST_DATA':
      return getListData(state, action)
    default:
      return state
  }
}

const getMenu = (state, action) => {
  return state.merge({
    // menuData: state.get('menuData').concat(fromJS(action.obj.data)) // imutable obj, use get()
    menuData: state.get('menuData').concat(fromJS(action.obj)) // imutable obj, use get()
  })
}

const fuck = (state, action) => {
  return state.merge({
    fuck: state.get('fuck') + 1,
    foodData: state.get('foodData').updateIn(['foodData', fromJS(action.num), 'cartControlCount'], val => val + 1)
  })
}

const fucker = (state, action) => {
  return state.merge({
    fuck: state.get('fuck') - 1
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
