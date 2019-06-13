import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { actionCreators } from './store'
import './NavHeader.styl'

@withRouter
class NavHeader extends React.Component {
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList()
    this.state = {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
  renderTabs() {
    const { tabs } = this.props
    const newList = tabs.toJS()
    return newList.map((item) => {
      return (
        <div className='tab-item' key={item.key}>
          <NavLink
            className='btn-Item'
            activeClassName='activeDes'
            replace={true}
            to={'/' + item.key}
          >
            <div className='icon' />
            <div className='des'>{item.name}</div>
          </NavLink>
        </div>
      )
    })
  }
  goBack() {
    this.props.history.push(`/my`)
  }
  render() {
    const { tabs, navHeader } = this.props
    const tabsArray = tabs.toJS()
    return (
      <div className='header'>
        <div className='content-wrapper'>
          <div
            className='back'
          >
            <i className='icon-arrow_lift' />
          </div>
          <div className='avatar'>
            <img src={navHeader.get('avatar')} />
          </div>
          <div className='content'>
            <div className='title'>
              <span className='brand' />
              <span className='name'>{navHeader.get('name')}</span>
            </div>
            <div className='description'>
              {navHeader.get('description')} / {navHeader.get('deliveryTime')}分钟送达
            </div>
            <div
              className='support'
            >
              <span className='icon decrease'/>
              <span className='text'>
                {navHeader.getIn(['infos', 0])}
              </span>
            </div>
            <div
              className='support-count'
            >
              <span className='count'>{navHeader.get('deliveryPrice')}个</span>
              <i className='icon-keyboard_arrow_right' />
            </div>
          </div>
        </div>
        <div
          className='bulletin-wrapper'
        >
          <span className='bulletin-title' /><span className='bulletin-text'>{navHeader.get('bulletin')}</span>
          <i className='icon-keyboard_arrow_right' />
        </div>
        <div className='background'>
          <img src={navHeader.get('avatar')}/>
        </div>
        <div className='tab border-1px'>
          {this.renderTabs()}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  tabs: state.getIn(['main', 'tabs']),
  navHeader: state.getIn(['main', 'navHeader'])
})

const mapDispatch = dispatch => ({
  addArticleList() {
    dispatch(actionCreators.getNavHeaderData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(NavHeader)
