/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-27 21:21:52
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 11:52:30
 */
import React, { Component } from 'react'
// import React, { Component, lazy, Suspense } from 'react'
import { Provider } from 'react-redux' // react 绑定 redux
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom' // 路由
import Loadable from 'react-loadable' // 懒加载
import store from './store'

function Loading({ error }) {
  if (error) {
    return 'error!'
  } else {
    return <h3>加载中...</h3>
  }
}

const Home = Loadable({
  loader: () => import('home/Home'),
  loading: Loading
})
const City = Loadable({
  loader: () => import('city/City'),
  loading: Loading
})
const My = Loadable({
  loader: () => import('my/My'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('login/Login'),
  loading: Loading
})
const Register = Loadable({
  loader: () => import('register/Register'),
  loading: Loading
})
const Menu = Loadable({
  loader: () => import('menu/Menu'),
  loading: Loading
})
const Order = Loadable({
  loader: () => import('order/Order'),
  loading: Loading
})

// const Home = lazy(() => import(/* webpackChunkName: "Home" */ 'home/Home')) // lazy & Suspense 实现代码拆分
// const City = lazy(() => import(/* webpackChunkName: "Home" */ 'city/City')) // lazy & Suspense 实现代码拆分
// const My = lazy(() => import(/* webpackChunkName: "My" */ 'my/My'))
// const Login = lazy(() => import(/* webpackChunkName: "My" */ 'login/Login'))
// const Register = lazy(() => import(/* webpackChunkName: "My" */ 'register/Register'))
// const Menu = lazy(() => import(/* webpackChunkName: "My" */ 'menu/Menu'))
// const Order = lazy(() => import(/* webpackChunkName: "My" */ 'order/Order'))
// const supportsHistory = false // forceRefresh: 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* Provider -> 与 Redux 绑定, 为整个 App 传递 store */}
        {/* <BrowserRouter> -> 对 Router 封装, 服务器响应 web 请求 */}
        {/* <BrowserRouter forceRefresh={!supportsHistory}> */}
        <BrowserRouter basename='/sell'>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          {/* <Switch> 将多个 <Route> 包裹在一起 */}
          <Switch>
            {/* <Route> 组件路由匹配 */}
            <Route path='/home' exact component={Home} />
            <Route path='/order' exact component={Order} />
            <Route path='/my' exact component={My} />
            <Route path='/city' exact component={City} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/good/:name&:img' component={Menu}/>
            <Route path='/rating/:name&:img' component={Menu}/>
            <Route path='/restanurant/:name&:img' component={Menu}/>
            {/* <Redirect> 用于页面重定向 */}
            <Redirect to='/home' />
          </Switch>
          {/* </Suspense> */}
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
