import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom' // withRouter: 能在组件调用 push 方法
import Loadable from 'react-loadable' // 封装懒加载操作
import BottomBar from '../../common/BottomBar/BottomBar'

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
const Order = Loadable({
  loader: () => import('order/Order'),
  loading: Loading
})
const My = Loadable({
  loader: () => import('my/My'),
  loading: Loading
})

class Main extends Component {
  render() {
    return (
      <div>
        <Route path='/home' exact component={Home} />
        <Route path='/order' exact component={Order} />
        <Route path='/my' exact component={My} />
        <BottomBar />
      </div>
    )
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Main)
