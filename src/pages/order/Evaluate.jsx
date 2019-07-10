import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import './Evaluate.styl'

@withRouter
class Evaluate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <div className='Evaluate'>
        Evaluate
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
)(Evaluate)
