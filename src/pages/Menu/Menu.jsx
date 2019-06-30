import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import NavHeader from 'NavHeader/NavHeader'
import Scroll from 'Scroll/scroll'
import BScroll from 'better-scroll'
import ShopBar from './components/shopBar/shopBar'
import MenuItem from './components/MenuItem/MenuItem'
import CartControl from './components/cartControl/cartControl'
import './Menu.styl'

class Menu extends Component {
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
          </div>
          <Scroll refresh={this.state.refreshScroll}>
            <div className='foods-wrapper'>
              {this.renderRight()}
            </div>
          </Scroll>
        </div>
        <ShopBar/>
      </div>
    )
  }
  componentDidMount() {
    const { dispathMenuData, dispatchgetFoodData } = this.props
    dispathMenuData()
    dispatchgetFoodData()
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
    // if (!event._constructed) {
    //   return
    // }
    // const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
    // const el = foodList[index]
    // /* better-scroll: target: element, duration: 300ms */
    // this.foodsScroll.scrollToElement(el, 300)
  }
  renderRight() {
    const { menuData } = this.props
    const menuDatas = menuData.toJS()
    return menuDatas.map((item, index) => {
      return (
        <div className='food-list food-list-hook' key={index}>
          <h1 className='title'>{item.name}</h1>
          <div>
            {
              item.foods.map((fitem, iindex) => {
                return (
                  <div
                    className='food-item border-1px'
                    key={iindex}
                  >
                    <div className='icon'>
                      <img src={fitem.icon}/>
                    </div>
                    <div className='content'>
                      <h2 className='name'>{fitem.name}</h2>
                      <p className='desc'>{fitem.description}</p>
                      <div className='extra'>
                        <span className='count'>月售 {fitem.sellCount} 份</span><span>好评率 {fitem.rating}%</span>
                      </div>
                      <div className='price'>
                        <span className='now'>￥{fitem.price}</span>
                        <span className='old'>￥{fitem.oldPrice}</span>
                      </div>
                      <CartControl num={iindex}/>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    })
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
  },
  dispatchgetFoodData() {
    dispatch(actionCreators.getFoodData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Menu)
