import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './Header.styl'
// import {
//   SearchWrapper
// } from '../../style'

class Header extends PureComponent {
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
          <NavLink
            className='search-btn'
            to={'/city'}
          >
            <input
              className='place-holder'
              type='text'
              placeholder='搜索'
            />
          </NavLink>
        </div>
        <div className='banner-img'></div>
      </div>
    )
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
