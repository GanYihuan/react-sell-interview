import { fromJS } from 'immutable'

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
  articlePage: 'my'
})

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
