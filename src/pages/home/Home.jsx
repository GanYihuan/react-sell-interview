import React, { Component } from 'react'
import { connect } from 'react-redux'
import Scroll from 'Scroll/Scroll'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'
import { actionCreators } from './store'
import './home.styl'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: 0
    }
  }
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
