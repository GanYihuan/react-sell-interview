import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { actionCreators } from './store'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
import Header from './components/Header/Header'
import Category from './components/Category/Category'
import ContentList from './components/ContentList/ContentList'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ScrollY: 0
    }
  }
  render() {
    const { showScroll } = this.props
    return (
      <div>
        <div className='home' ref='home'>
          <div>
            <Header/>
            <Category/>
            <Split/>
            <ContentList/>
          </div>
          {
            showScroll
              ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop>
              : null
          }
        </div>
        <BottomBar/>
      </div>
    )
  }
  componentDidMount() { // async request
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

