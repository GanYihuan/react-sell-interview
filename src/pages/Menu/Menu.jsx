﻿import React, { Component } from 'react'
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
      element: 0,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
  render() {
    const { menuData, currentLeftIndex } = this.props
    const menuDatas = menuData.toJS()
    // const currentFood = menuData.toJS()[currentLeftIndex]
    const currentFood = menuData.toJS()[0]
    console.log(currentFood, 'currentFood...')
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
                                  <CartControl num={findex}/>
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
  itemClick(index) {
    const { dispathLeftItemClick } = this.props
    dispathLeftItemClick(index)
    console.log(this.props.currentLeftIndex, 'left index...')
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
