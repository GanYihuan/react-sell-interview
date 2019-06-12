import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './NavHeader.scss'

class NavHeader extends React.Component {
  renderTabs() {
    const { tabs } = this.props
    const newList = tabs.toJS()
    return newList.map((item) => {
      return (
        <NavLink
          key={item.key}
          className='tab-item'
          activeClassName='active'
          replace={true}
          to={'/' + item.key}
        >
          {item.name}
        </NavLink>
      )
    })
  }
  goBack() {}
  render() {
    return (
      <div className='detail'>
        <div className='nav'>
          <div onClick={() => this.goBack()} className='back-icon'></div>
        </div>
        <div className='tab-bar'>
          {this.renderTabs()}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  tabs: state.getIn(['main', 'tabs'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(NavHeader)
