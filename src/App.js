import React, { Component, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import store from './store'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/home/Home'))
const My = lazy(() => import(/* webpackChunkName: "My" */ './pages/my/My'))
// forceRefresh: bool
// 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true
const supportsHistory = 'pushState' in window.history

// 当导航需要确认时执行的函数。默认使用  window.confirm  。
// 使用默认的确认函数
// const getConfirmation = (message, callback) => {
//   const allowTransition = window.confirm(message)
//   callback(allowTransition)
// }
// <BrowserRouter getUserConfirmation={getConfirmation}/>

// {/* <BrowserRouter basename="/calendar"/>
// <Link to="/today"/> // 渲染为 <a href="/calendar/today"> */}

// location.key 的长度，默认是 6。点击同一个链接时，每次该路由下的 location.key 都会改变，可以通过 key 的变化来刷新页面。
// { /* <BrowserRouter keyLength={12}/> */ }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/my' exact component={My} />
              <Redirect to='/my' />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
