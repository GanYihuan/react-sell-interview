﻿import React from 'react'
// import React, { PureComponent } from 'react'
import BottomBar from '../../common/BottomBar/BottomBar'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'

// class Home extends PureComponent {
class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Category/>
        <ContentList/>
        <BottomBar/>
      </div>
    )
  }
}

export default Home
