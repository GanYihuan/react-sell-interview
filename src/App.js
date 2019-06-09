import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import Home from './pages/home/Home'
import My from './pages/my/My'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path='/home' exact component={Home} />
            <Route path='/my' exact component={My} />
            <Route path='/order' exact component={My} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
