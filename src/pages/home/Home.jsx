import React, { Component } from 'react'
import Scroll from 'Scroll/Scroll'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'
import './home.styl'

class Home extends Component {
  render() {
    const { showScroll } = this.props
    return (
      <div className='mainHome'>
        <Scroll>
          <div>
            <Header/>
            <Category/>
            <Split/>
            <ContentList/>
          </div>
          <BottomBar/>
        </Scroll>
      </div>
    )
  }
}

export default Home
