import { fromJS } from 'immutable'

const initState = fromJS({
  menuData: [],
  currentLeftIndex: 0
})

export default (state = initState, action) => {
  switch (action.type) {
    case 'MENU_DATA':
      return getMenu(state, action)
    case 'LEFT_ITEM_INDEX':
      return state.set('currentLeftIndex', action.obj)
    default:
      return state
  }
}

const getMenu = (state, action) => {
  return state.merge({
    menuData: state.get('menuData').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}
