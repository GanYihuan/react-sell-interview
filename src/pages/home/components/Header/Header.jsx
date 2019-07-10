import React, { Component } from 'react'
import './Header.styl'

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <div className='search-bar'>
          <div className='bar-location'>
            <div className='location-icon' />
            <div className='location-text'>
              city
            </div>
          </div>
          <div
            className='search-btn'
            // @click="gotCity"
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
}

export default Header
