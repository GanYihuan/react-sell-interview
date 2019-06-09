import React, { Component, lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import store from './store'

const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/home/Home'))
const My = lazy(() => import(/* webpackChunkName: "My" */ './pages/my/My'))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Redirect to= '/home' />
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/my' exact component={My} />
              <Route path='/order' exact component={My} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
