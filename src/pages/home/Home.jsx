import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom' // withRouter: 能在组件调用 push 方法
import Loadable from 'react-loadable' // 封装懒加载操作
import BottomBar from './components/BottomBar/BottomBar'
import Header from './components/Header/Header'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <BottomBar/>
      </div>
    )
  }
}

export default Home
