import { fromJS } from 'immutable'

const defaultState = fromJS({
  tabs: [
    {
      name: '首页',
      key: 'home'
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
