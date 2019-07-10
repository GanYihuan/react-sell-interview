import { fromJS } from 'immutable'

const defaultState = fromJS({ // 原生js转immutable对象
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
  articlePage: 'home'
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
