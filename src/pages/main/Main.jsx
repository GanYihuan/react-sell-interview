import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import NavHeader from '../../common/NavHeader/NavHeader'
// import BottomBar from '../../common/BottomBar/BottomBar'
// import Header from './components/Header/Header'
// import Category from './components/Category/Category'
// import ContentList from './components/ContentList/ContentList'
import './Main.scss'

class Main extends React.Component {
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
  render() {
    return (
      <div className='detail'>
        <NavHeader/>
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
)(Main)
