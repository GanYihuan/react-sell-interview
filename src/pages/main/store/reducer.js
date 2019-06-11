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
      key: 'comment'
    },
    {
      name: '商家',
      key: 'restanurant'
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default: return state
  }
}
