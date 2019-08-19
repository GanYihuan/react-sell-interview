/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-10 13:44:22
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 15:37:30
 */
import { fromJS } from 'immutable' // immutable 限制对 state 的修改

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
