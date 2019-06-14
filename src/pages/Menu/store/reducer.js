import { fromJS } from 'immutable'

const initState = fromJS({
  menuData: [],
  currentLeftIndex: 0,
  listData: {
    food_spu_tags: []
  },
  foodData: [],
  showChooseContent: false,
  poiInfo: {},
  navHeader: {}
})

export default (state = initState, action) => {
  switch (action.type) {
    case 'MENU_DATA':
      return getMenu(state, action)
    case 'NEVHEADER_DATA':
      return getNevHeader(state, action)
    case 'LEFT_ITEM_INDEX':
      return state.set('currentLeftIndex', action.obj)
    case 'GET_LIST_DATA':
      return getListData(state, action)
    case 'LEFT_CLICK':
      return itemClick(state, action)
    case 'ADD_SELECTI_ITEM':
      return addSelectItem(state, action)
    case 'MINUS_SELECTI_ITEM':
      return minusSelectItem(state, action)
    case 'SHOW_CHOOSE_CONTENT':
      return chooseContent(state, action)
    case 'CLEAR_CAR':
      return clearCar(state, action)
    default:
      return state
  }
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

const itemClick = (state, action) => {
  return state.merge({
    currentLeftIndex: state.get('currentLeftIndex').concat(fromJS(action.obj.currentLeftIndex)) // imutable obj, use get()
  })
}

const getListData = (state, action) => {
  // if (state.listData.food_spu_tags.length > 0) {
  //   return { ...state }
  // }
  // return { ...state, poiInfo: action.obj.data, listData: action.obj.data || { food_spu_tags: [] }}
  return state.merge({
    foodData: state.get('foodData').concat(fromJS(action.obj.data))
  })
}

const addSelectItem = (state, action) => {
  return state.merge({
    listData: state.get('listData', 'food_spu_tags').concat(fromJS(action.obj))
  })
}

const minusSelectItem = (state, action) => {
  return { ...state, listData: dealWithSelectItem(state, action, 'MINUS_SELECTI_ITEM') }
}

const chooseContent = (state, action) => {
  return state.merge({
    showChooseContent: state.get('showChooseContent').concat(fromJS(action.obj))
  })
}

const dealWithSelectItem = (state, action, type) => {
  const listData = state.listData
  const list = listData.food_spu_tags || [] // 找到外层，左边 item 的数据
  const currentItem = list[action.outIndex || state.currentLeftIndex] // 当前点击的 item 数据
  if (type === 'ADD_SELECTI_ITEM') { // 对当前点击这个 item 的 chooseCount 加一或减一
    currentItem.spus[action.obj.index].chooseCount++
  } else {
    currentItem.spus[action.obj.index].chooseCount--
  }
  const _listData = JSON.parse(JSON.stringify(listData)) // 复制操作, 如果修改了 state 里面的值要使用该方式
  return _listData
}

const clearCar = (state) => {
  const listData = state.listData
  const list = listData.food_spu_tags || [] // 找到外层，左边 list 列表
  for (let i = 0; i < list.length; i++) {
    const spus = list[i].spus || []
    for (let j = 0; j < spus.length; j++) {
      spus[j].chooseCount = 0
    }
  }
  return { ...state, listData: JSON.parse(JSON.stringify(listData)) }
}
