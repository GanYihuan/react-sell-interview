import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  tabs: [
    {
      name: '点菜',
      key: 'menu'
    },
    {
      name: '评价',
      key: 'rating'
    },
    {
      name: '商家',
      key: 'restanurant'
    }
  ],
  navHeader: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'HEAD_DATA':
      return getNavHeader(state, action)
    default: return state
  }
}

const getNavHeader = (state, action) => {
  return state.merge({
    navHeader: state.get('navHeader').concat(fromJS(action.obj.data)) // imutable obj, use get()
  })
}
