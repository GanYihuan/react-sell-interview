import React, { PureComponent } from 'react' // PureComponent has invoked shouldComponentUpdate()
import { NavLink } from 'react-router-dom' // <NavLink> 组件是一个特殊的 <Link> 组件。当它的 path 与当前 location 匹配时，可以自定义其样式来表示当前页面位置
import { connect } from 'react-redux'
import './header.styl'

class Header extends PureComponent {
  render() {
    const { currentCity } = this.props
    return (
      <div className='homeSearch'>
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

const mapState = state => ({ // mapStateToProps 将 store 中的数据作为 props 绑定到组件上
  currentCity: state.getIn(['city', 'currentCity'])
})

const mapDispatch = dispatch => ({ // mapDispatchToProps 将 action 作为 props 绑定到组件上
})

export default connect(
  mapState,
  mapDispatch
)(Header)
