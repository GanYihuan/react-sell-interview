import React, { Component, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import store from './store'

// import Home from 'home/Home'
// import My from 'my/My'
// import Login from 'login/Login'
// import Register from 'register/Register'
// import Menu from 'menu/Menu'
// import Restanurant from 'restanurant/Restanurant'
// import Rating from 'rating/Rating'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ 'home/Home')) // lazy & Suspense 实现代码拆分
const City = lazy(() => import(/* webpackChunkName: "Home" */ 'city/City')) // lazy & Suspense 实现代码拆分
const My = lazy(() => import(/* webpackChunkName: "My" */ 'my/My'))
const Login = lazy(() => import(/* webpackChunkName: "My" */ 'login/Login'))
const Register = lazy(() => import(/* webpackChunkName: "My" */ 'register/Register'))
const Menu = lazy(() => import(/* webpackChunkName: "My" */ 'menu/Menu'))
const Restanurant = lazy(() => import(/* webpackChunkName: "My" */ 'restanurant/Restanurant'))
const Rating = lazy(() => import(/* webpackChunkName: "My" */ 'rating/Rating'))
// forceRefresh: bool
// 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true
const supportsHistory = false

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* 与 Redux 绑定, 通过 Provider 为整个 App 传递 store */}
        {/* 对 Router 的封装, 服务器响应 web 请求 */}
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {/* <Switch> 组件可将多个 <Route> “包裹”在一起 */}
              {/* <Route> 组件路由匹配 */}
              <Route path='/home' exact component={Home} />
              <Route path='/city' exact component={City} />
              <Route path='/my' exact component={My} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route path='/menu' exact component={Menu}/>
              <Route path='/rating' exact component={Rating}/>
              <Route path='/restanurant' exact component={Restanurant}/>
              {/* <Redirect> 用于页面重定向 */}
              <Redirect to='/home' />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
