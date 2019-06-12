import React from 'react'
import { connect } from 'react-redux'
import './Split.styl'

class Split extends React.Component {
  render() {
    return (
      <div class='split' />
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
