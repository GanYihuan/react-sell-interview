import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  tabs: [
    {
      name: '首页',
      key: 'home'
    },
    {
      name: '订单',
      key: 'order'
    },
    {
      name: '我的',
      key: 'my'
    }
  ],
  articlePage: 'home',
  items: [],
  list: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.HEAD_DATA:
      return getCategory(state, action)
    case constants.LIST_DATA:
      return getContentListData(state, action)
    default:
      return state
  }
}

const getCategory = (state, action) => {
  return state.merge({
    // items: state.get('items').concat(fromJS(action.obj.data.primary_filter))
    items: state.get('items').concat(fromJS(action.obj))
  })
}

const getContentListData = (state, action) => {
  return state.merge({
    // list: state.get('list').concat(fromJS(action.obj.data.poilist))
    list: state.get('list').concat(fromJS(action.obj))
  })
}
