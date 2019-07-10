import React, { Component } from 'react'
import BScroll from 'better-scroll'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'
import './Home.styl'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ScrollY: 0
    }
  }
  render() {
    return (
      <div>
        <div className='home' ref='home'>
          <div>
            <Header/>
            <Category/>
            <Split/>
            <ContentList/>
            <div
              className='back-to-ceiling'
            >
              <i className='icon-circle-up' />
            </div>
          </div>
        </div>
        <BottomBar/>
      </div>

    )
  }
  componentDidMount() {
    if (!this.Scroll) {
      this.Scroll = new BScroll(this.refs.home, {
        click: true,
        probeType: 3
      }).on('scroll', pos => {
        this.setState(() => {
          return {
            ScrollY: pos.y
          }
        })
      })
    }
  }
}

export default Home
