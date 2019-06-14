import React, { Component, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import store from './store'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/home/Home'))
const My = lazy(() => import(/* webpackChunkName: "My" */ './pages/my/My'))
const Login = lazy(() => import(/* webpackChunkName: "My" */ './pages/login/Login'))
const Register = lazy(() => import(/* webpackChunkName: "My" */ './pages/register/Register'))
const Menu = lazy(() => import(/* webpackChunkName: "My" */ './pages/menu/Menu'))
const Restanurant = lazy(() => import(/* webpackChunkName: "My" */ './pages/restanurant/Restanurant'))
const Ratings = lazy(() => import(/* webpackChunkName: "My" */ './pages/ratings/Ratings'))
// forceRefresh: bool
// 当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true
// const supportsHistory = 'pushState' in window.history
const supportsHistory = false

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/my' exact component={My} />
              <Route path='/login' exact component={Login} />
              <Route path='/register' exact component={Register} />
              <Route exact path='/menu' component={Menu}/>
              <Route exact path='/ratings' component={Ratings}/>
              <Route exact path='/restanurant' component={Restanurant}/>
              <Redirect to='/home' />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
