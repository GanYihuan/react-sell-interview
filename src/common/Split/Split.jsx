import React, { Component } from 'react'
import { connect } from 'react-redux'
import './split.styl'

class Split extends Component {
  render() {
    return (
      <div className='split' />
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
)(Split)
