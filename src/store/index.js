/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-09 23:18:27
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 12:03:40
 */
import {
  createStore,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk' // 使 action 返回 function，异步
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // chrome 开发工具 redux
const enhancer = composeEnhancers(applyMiddleware(thunk)) // redux-thunk 合并 chrom 开发工具 redux
const store = createStore(reducer, enhancer)

export default store
