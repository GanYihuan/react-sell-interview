import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './Header.styl'

@withRouter
class Header extends Component {
  render() {
    const { currentCity } = this.props
    return (
      <div className='search'>
        <div className='search-bar'>
          <div className='bar-location'>
            <div className='location-icon' />
            <div className='location-text'>
              {currentCity}
            </div>
          </div>
          <div
            className='search-btn'
            onClick={() => this.goCity()}
          >
            <input
              className='place-holder'
              type='text'
              placeholder='搜索'
            />
          </div>
        </div>
        <div className='banner-img'></div>
      </div>
    )
  }
  goCity() {
    this.props.history.push('/city')
  }
}

const mapState = state => ({
  currentCity: state.getIn(['city', 'currentCity'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Header)
