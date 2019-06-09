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
    return (
      <div className='bottom-bar'>
        {
          tabs.map((item, index) => {
            let cls = item.get('key') + ' btn-item'
            const name = item.get('name')
            if (item.get('key') === articlePage) {
              cls += ' active'
            }
            return (
              <NavLink
                className={cls}
                activeClassName='active'
                key={index}
                to={'/' + item.get('key')}
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
  articlePage: state.getIn(['home', 'articlePage']),
  tabs: state.getIn(['home', 'tabs'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(BottomBar)
