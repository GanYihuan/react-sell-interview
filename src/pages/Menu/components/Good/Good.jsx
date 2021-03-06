﻿import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { CSSTransition } from 'react-transition-group'
import Control from '../Control/Control'
import ShopBar from '../ShopBar/ShopBar'
import Food from '../Food/Food'
import { actionCreators } from './store'
import './good.styl'

class Good extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [], /* An array of the heights of each element on the right side */
      scrollY: 0, // foodsScroll Real-time scroll position scrollY
      chooseCount: 0,
      index: 0,
      findex: 0,
      name: ''
    }
  }
  render() {
    const { menuData, currentLeftIndex, showFood } = this.props
    const menuDatas = menuData.toJS()
    const showFoods = showFood
    return (
      <Fragment>
        {
          showFoods
            ? <Food chooseCount={this.state.chooseCount} index={this.state.index} findex={this.state.findex} name={this.state.name} />
            : <Fragment>
              <div className='goods'>
                <div className='menu-left-wrapper'>
                  <div className='scroll-view' ref='menuWrapper'>
                    <div className='menu-wrapper'>
                      {
                        menuDatas.map((item, index) => {
                          const cls = index === currentLeftIndex ? 'menu-item current' : 'menu-item'
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
                <div className='scroll-view' ref='foodsWrapper'>
                  <div className='foods-wrapper'>
                    {
                      menuDatas.map((item, index) => {
                        return (
                          <div className='food-list food-list-hook' key={index}>
                            <h1 className='title'>{item.name}</h1>
                            <div>
                              {
                                item.foods.map((fitem, findex) => {
                                  return (
                                    <div
                                      className='food-item border-1px'
                                      key={findex}
                                    >
                                      <div className='icon' onClick={() => { this.selectFood(fitem, fitem.chooseCount, index, findex, fitem.name) }}>
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
                                        <Control chooseCount={fitem.chooseCount} index={index} findex={findex} name={fitem.name}/>
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
            </Fragment>
        }
      </Fragment>
    )
  }
  componentDidMount() {
    const { dispathMenuData, dispathShowFood } = this.props
    if (!this.mScroll) {
      this.mScroll = new BScroll(this.refs.menuWrapper, {
        click: true
      })
    }
    if (!this.fScroll) {
      this.fScroll = new BScroll(this.refs.foodsWrapper, {
        click: true
      })
    }
    dispathMenuData()
    this.calculateHeight()
    let posY
    this.fScroll.on('scroll', pos => {
      posY = pos.y
      // this.currentIndex() // 调用时机不对!
    })
    this.setState(() => {
      return {
        scrollY: Math.abs(Math.round(posY))
      }
    })
    // dispathShowFood(this.state.showFood)
  }
  itemClick(index) {
    const { dispathSetLeftItemIndex } = this.props
    const foodList = this.refs.foodsWrapper.getElementsByClassName('food-list-hook')
    const el = foodList[index]
    this.fScroll.scrollToElement(el, 300)
    dispathSetLeftItemIndex(index)
  }
  calculateHeight() {
    const foodList = this.refs.foodsWrapper.getElementsByClassName('food-list-hook')
    let height = 0
    const setlistHeight = []
    setlistHeight.push(height)
    for (let i = 0; i < foodList.length; i++) {
      const item = foodList[i]
      height += item.clientHeight
      setlistHeight.push(height)
    }
    this.setState(() => {
      return {
        listHeight: setlistHeight
      }
    })
  }
  currentIndex() {
    const { dispathSetLeftItemIndex } = this.props
    for (let i = 0; i < this.state.listHeight.length; i++) {
      const height1 = this.state.listHeight[i] /* The height of the current index value */
      const height2 = this.state.listHeight[i + 1] /* Next height */
      if (!height2 || (this.state.scrollY >= height1 && this.state.scrollY < height2)) {
        dispathSetLeftItemIndex(i)
      }
    }
  }
  selectFood(fitem, chooseCount, index, findex, name) {
    const { dispathFoodData, dispathShowFood } = this.props
    dispathShowFood(true)
    dispathFoodData(fitem)
    this.setState(() => {
      return {
        chooseCount: chooseCount,
        index: index,
        findex: findex,
        name: name
      }
    })
  }
}

const mapState = state => ({
  menuData: state.getIn(['good', 'menuData']),
  currentLeftIndex: state.getIn(['good', 'currentLeftIndex']),
  showFood: state.getIn(['good', 'showFood'])
})

const mapDispatch = dispatch => ({
  dispathMenuData() {
    dispatch(actionCreators.getMenuData())
  },
  dispathSetLeftItemIndex(index) {
    dispatch(actionCreators.setLeftItemIndex(index))
  },
  dispathShowFood(bool) {
    dispatch(actionCreators.showFood(bool))
  },
  dispathFoodData(food) {
    dispatch(actionCreators.foodData(food))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Good)
