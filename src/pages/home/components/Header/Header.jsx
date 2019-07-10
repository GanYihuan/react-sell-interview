import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Header.styl'

@withRouter
class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='search-bar'>
          <div className='bar-location'>
            <div className='location-icon' />
            <div className='location-text'>
              深圳
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
        <img className='banner-img' src='//xs01.meituan.net/waimai_i/img/bannertemp.e8a6fa63.jpg'/>
      </div>
    )
  }
  goCity() {
    this.props.history.push('/register')
  }
}

export default Header
