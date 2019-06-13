import React from 'react'
import { connect } from 'react-redux'
import NavHeader from '../../common/NavHeader/NavHeader'
import { actionCreators } from './store'
import Scroll from '../../common/Scroll/scroll'
import './Menu.styl'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshScroll: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
  render() {
    return (
      <div>
        <NavHeader/>
        <div className='goods'>
          <div className='menu-wrapper'>
            <div className='left-bar'>
              <Scroll refresh={this.state.refreshScroll}>
                <div className='menu-wrapper'>
                  {this.renderLeft()}
                </div>
              </Scroll>
            </div>
            <div className='right-content'>
              {this.renderRight()}
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() { // async, get ajax async data
    const { dispathMenuData } = this.props
    dispathMenuData()
  }
  renderLeft() {
    const { menuData, currentLeftIndex } = this.props
    const menuDatas = menuData.toJS()
    return menuDatas.map((item, index) => {
      const cls = currentLeftIndex === index ? 'menu-item current' : 'menu-item'
      const iconF = (type) => {
        const mapN = this.state.classMap[type]
        return (
          `icon ${mapN}`
        )
      }
      return (
        <div className={cls} key={index} onClick={() => this.itemClick(index)}>
          <div className='text border-1px'>{item.type > 0 ? <img className={iconF(item.type)} /> : null}{item.name}</div>
        </div>
      )
    })
  }
  itemClick(index) {
    const { dispathLeftItemClick } = this.props
    dispathLeftItemClick(index)
  }
  renderRight() {
  }
}

const mapState = state => ({
  menuData: state.getIn(['menu', 'menuData']),
  currentLeftIndex: state.getIn(['menu', 'currentLeftIndex'])
})

const mapDispatch = dispatch => ({
  dispathMenuData() {
    dispatch(actionCreators.getMenuData())
  },
  dispathLeftItemClick(index) {
    dispatch(actionCreators.getLeftItemIndex(index))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Menu)
