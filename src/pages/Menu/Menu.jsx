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
          </div>
          <Scroll refresh={this.state.refreshScroll}>
            <div className='foods-wrapper'>
              {this.renderRight()}
            </div>
          </Scroll>
        </div>
        <ShopBar/>
        {/* {this.renderShopCar()} */}
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
  }
  renderRight() {
    const { menuData, foodData, currentLeftIndex } = this.props
    const foodDatas = foodData.toJS()
    const menuDatas = menuData.toJS()
    // const index = this.props.currentLeftIndex
    // const array = this.props.listData.food_spu_tags || []
    // const currentItem = foodDatas[currentLeftIndex] || []
    // console.log(foodDatas, 'foodData..')
    const cl = 'food-list food-list-hook'
    return foodDatas.map((item, index) => {
      return (
        <div className={cl} key={index}>
          <h1 className='title'>{menuDatas.name}</h1>
          <ul>
            <li
              className='food-item border-1px'
            >
              <div className='icon'>
                <img />
              </div>
              <div className='content'>
                <h2 className='name'>name</h2>
                <p className='desc'>description</p>
                <div className='extra'>
                  <span className='count'>月售 sellCount 份</span><span>好评率 rating%</span>
                </div>
                <div className='price'>
                  <span className='now'>￥price</span>
                  <span className='old' v-show='food.oldPrice'>￥oldPrice</span>
                </div>
                <div className='cartControl-wrapper'>
                  <cartControl></cartControl>
                </div>
              </div>
            </li>
          </ul>
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
  currentLeftIndex: state.getIn(['menu', 'currentLeftIndex']),
  foodData: state.getIn(['menu', 'foodData'])
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
