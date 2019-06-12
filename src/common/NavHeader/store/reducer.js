import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  tabs: [
    {
      name: '点菜',
      key: 'menu',
      className: 'menu btn-Item'
    },
    {
      name: '评价',
      key: 'ratings',
      className: 'ratings btn-Item'
    },
    {
      name: '商家',
      key: 'restanurant',
      className: 'restanurant btn-Item'
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default: return state
  }
}
