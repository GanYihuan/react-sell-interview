import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import Home from './pages/home/Home'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path='/home' exact component={Home} />
            <Route path='/my' exact component={Home} />
            <Route path='/order' exact component={Home} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
