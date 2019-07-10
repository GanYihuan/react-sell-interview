import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './City.styl'

@withRouter
class City extends Component {
  render() {
    return (
      <div className='City'>
        <div className='header' onClick={() => this.goBack()}>
          城市选择
          <div className='iconfont header-back'>
            <i className='icon-arrow_lift' />
          </div>
        </div>
      </div>
    )
  }
  goBack() {
    this.props.history.push('/home')
  }
}

export default City
