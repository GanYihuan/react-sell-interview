import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import Scroll from 'Scroll/Scroll'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'
import { actionCreators } from './store'
import './Home.styl'

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
      <div>
        <div className='mainHome' ref='home'>
          <div>
            <Header/>
            <Category/>
            <Split/>
            <ContentList/>
            {
              showScroll
                ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop>
                : null
            }
          </div>
          <BottomBar/>
        </div>
      </div>
    )
  }
  componentDidMount() { // async request
    if (!this.mScroll) {
      this.hScroll = new BScroll(this.refs.home, {
        click: true
      })
    }
    let posY
    this.hScroll.on('scroll', pos => {
      posY = pos.y
    })
    this.setState(() => {
      return {
        scrollY: Math.abs(Math.round(posY))
      }
    })
    this.bindEvents()
  }
  componentWillUnmount() {
    const { changeScrollTopShow } = this.props
    window.removeEventListener('scroll', changeScrollTopShow())
  }
  handleScrollTop() {
    window.scrollTo(0, 0)
  }
  bindEvents() {
    const { changeScrollTopShow } = this.props
    window.addEventListener('scroll', changeScrollTopShow())
    console.log(this.state.scrollY, 'scrollY...')
  }
}

const mapState = state => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = dispatch => ({
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})

export default connect(
  mapState,
  mapDispatch
)(Home)

