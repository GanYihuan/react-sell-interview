import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './BottomBar.scss'

class BottomBar extends React.Component {
  render() {
    const {
      articlePage,
      tabs
    } = this.props
    const tabsArray = tabs.toJS()
    return (
      <div className='bottom-bar'>
        {
          tabsArray.map((item, index) => {
            let cls = item.key + ' btn-item'
            const name = item.name
            if (item.key === articlePage) {
              cls += ' active'
            }
            return (
              <NavLink
                className={cls}
                activeClassName='active'
                key={index}
                to={'/' + item.key}
              >
                <div className='tab-icon'></div>
                <div className='btn-name'>{name}</div>
              </NavLink>
            )
          })
        }
      </div>
    )
  }
}

const mapState = state => ({
  articlePage: state.getIn(['bottombar', 'articlePage']),
  tabs: state.getIn(['bottombar', 'tabs'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(BottomBar)
