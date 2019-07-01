import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { actionCreators } from './store'
import NavHeader from 'NavHeader/NavHeader'
import ShopBar from './components/shopBar/shopBar'
import CartControl from './components/cartControl/cartControl'
import './Menu.styl'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
  render() {
    const { menuData, currentLeftIndex } = this.props
    const menuDatas = menuData.toJS()
    return (
      <div>
        <NavHeader/>
        <div className='goods'>
          <div className='menu-wrapper'>
            <div className='left-bar'>
              <div className='scroll-view' ref='menu'>
                <div className='menu-wrapper'>
                  {
                    menuDatas.map((item, index) => {
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
                </div>
              </div>
            </div>
          </div>
          <div className='scroll-view' ref='food'>
            <div className='foods-wrapper'>
              {
                menuDatas.map((item, index) => {
                  return (
                    <div className='food-list food-list-hook' key={index} ref='foodList'>
                      <h1 className='title'>{item.name}</h1>
                      <div>
                        {
                          item.foods.map((fitem, findex) => {
                            return (
                              <div
                                className='food-item border-1px'
                                key={findex}
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
                                  <CartControl chooseCount={fitem.chooseCount} index={index} findex={findex}/>
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
            </div>
          </div>
        </div>
        <ShopBar/>
      </div>
    )
  }
  componentDidMount() {
    const { dispathMenuData, dispatchgetFoodData } = this.props
    dispathMenuData()
    // dispatchgetFoodData()
    if (!this.mScroll) {
      this.mScroll = new BScroll(this.refs.menu, {
        click: true
      })
    }
    if (!this.fScroll) {
      this.fScroll = new BScroll(this.refs.food, {
        click: true
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.menuData !== this.props.menuData) {
      // console.log(nextProps.menuData.toJS(), this.props.menuData.toJS(), 'should true menuData')
      return true
    } else {
      // console.log(nextProps.menuData.toJS(), this.props.menuData.toJS(), 'should false menuData')
      return false
    }
  }
  itemClick(index) {
    const { dispathLeftItemClick, currentLeftIndex } = this.props
    dispathLeftItemClick(index)
    const foodList = this.refs.food.getElementsByClassName('food-list-hook')
    const el = foodList[currentLeftIndex]
    this.fScroll.scrollToElement(el, 300)
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
  // dispatchgetFoodData() {
  //   dispatch(actionCreators.getFoodData())
  // }
})

export default connect(
  mapState,
  mapDispatch
)(Menu)
