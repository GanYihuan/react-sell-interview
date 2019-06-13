import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import NavHeader from '../../common/NavHeader/NavHeader'
import Scroll from '../../common/Scroll/scroll'
import ShopBar from './components/shopBar/shopBar'
import MenuItem from './components/MenuItem/MenuItem'
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
              {/* {this.renderRight()} */}
            </div>
          </div>
        </div>
        <ShopBar/>
        {/* {this.renderShopCar()} */}
      </div>
    )
  }
  componentDidMount() {
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
    const index = this.props.currentLeftIndex
    const array = this.props.listData.food_spu_tags || []
    const currentItem = array[index]
    if (currentItem) {
      const title = <p className='right-title' key={1}>{currentItem.name}</p>
      return [
        title,
        <div className='right-list' key={2}><div className='right-list-inner'>{this.renderRightList(currentItem.spus)}</div></div>
      ]
    } else {
      return null
    }
  }
  renderRightList(array) {
    const _array = array || []
    return _array.map((item, index) => {
      if (!item.chooseCount) {
        item.chooseCount = 0
      }
      return <MenuItem key={index} data={item} _index={index}></MenuItem>
    })
  }
  renderShopCar() {
    const { menuData } = this.props
    const menuDatas = menuData.toJS()
    return (
      <div className='shopCart'>
        <div className='content' onClick={() => this.toggleList()}>
          <div className='content-left'>
            <div className='logo-wrapper'>
              <div className='logo'>
                <i className='icon-shopping_cart'></i>
              </div>
              <div className='num'></div>
            </div>
            <div className='price'></div>
            <div className='desc'>另需配送费元</div>
          </div>
          <div className='content-right'>
            <div className='pay'></div>
          </div>
        </div>
        <div className='ball-container'>
          <div v-for='(ball, index) in balls' >
            <transition
              name='drop'
            >
              <div className='ball' v-show='ball.show'>
                <div className='inner inner-hook'></div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    )
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
