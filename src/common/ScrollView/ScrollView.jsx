import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './ScrollView.styl'

class ScrollView extends React.Component {
  constructor(props) {
    super(props)
    this._onLoadPage = this.onLoadPage.bind(this)
  }
  onLoadPage() {
    const scrollHeight = document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const proLoadDis = 30
    if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) {
      if (!this.props.isend) {
        if (!this.props.readyToLoad) {
          return
        }
        this.props.loadCallback && this.props.loadCallback()
      }
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this._onLoadPage)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this._onLoadPage)
  }
  render() {
    return (
      <div className='scrollview'>
        {this.props.children}
        {/* <Loading isend={this.props.isend}/> */}
      </div>
    )
  }
}

const mapState = state => ({
  articlePage: state.getIn(['bottombar', 'articlePage']),
  tabs: state.getIn(['bottombar', 'tabs'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(ScrollView)
