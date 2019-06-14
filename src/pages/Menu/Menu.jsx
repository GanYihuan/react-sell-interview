import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import NavHeader from '../../common/NavHeader/NavHeader'
import Scroll from '../../common/Scroll/scroll'
import ShopBar from './components/shopBar/shopBar'
import MenuItem from './components/MenuItem/MenuItem'
import CartControl from './components/cartControl/cartControl'
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
    return menuDatas.map((item, index) => {
      return (
        <div className='food-list food-list-hook' key={index}>
          <h1 className='title'>{item.name}</h1>
          <div>
            {
              foodDatas.map((iitem, iindex) => {
                return (
                  <div
                    className='food-item border-1px'
                    key={iindex}
                  >
                    <div className='icon'>
                      <img src={iitem.icon}/>
                    </div>
                    <div className='content'>
                      <h2 className='name'>{iitem.name}</h2>
                      <p className='desc'>{iitem.description}</p>
                      <div className='extra'>
                        <span className='count'>月售 {iitem.sellCount} 份</span><span>好评率 {iitem.rating}%</span>
                      </div>
                      <div className='price'>
                        <span className='now'>￥{iitem.price}</span>
                        <span className='old'>￥{iitem.oldPrice}</span>
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
