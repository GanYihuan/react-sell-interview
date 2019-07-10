import React, { Component } from 'react'
import BScroll from 'better-scroll'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'
import './Home.styl'

class Home extends Component {
  render() {
    return (
      <div className='home' ref='home'>
        <div>
          <Header/>
          <Category/>
          <Split/>
          <ContentList/>
          <BottomBar/>
        </div>
      </div>
    )
  }
  componentDidMount() {
    if (!this.Scroll) {
      this.Scroll = new BScroll(this.refs.home, {
        click: true
      })
    }
  }
}

export default Home
