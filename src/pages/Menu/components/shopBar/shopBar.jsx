﻿import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import BScroll from 'better-scroll'
import Control from '../Control/Control'
import { actionCreators } from '../Good/store'
import './shopBar.styl'

class ShopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showChoose: false
    }
  }
  render() {
    function compare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    }
    const { shopCarTotal, navHeader, shopCarData } = this.props
    const shopCarDatas = shopCarData.toJS().sort(compare('sellCount'))
    // const shopCarDatas = temp.filter(a => a.chooseCount === Math.max(...temp.filter(b => b.name === a.name).map(({ chooseCount }) => chooseCount))).reverse() // .sort(compare('sellCount')) // 选出 同 name 下 chooseCount 最大的
    return (
      <Fragment>
        <div className='shopCar'>
          {
            this.state.showChoose
              ? <CSSTransition
                timeout={ 1000 }
                classNames='fade'
              >
                <div className='shopCart-list'>
                  <div className='shopCart-scroll' ref='shopCar'>
                    <div>
                      <div className='list-header'>
                        <div className='shopCart-title'>购物车里面</div>
                        <div className='empty' onClick={() => this.clearCar()}>清空购物车</div>
                      </div>
                      <div className='scroll-view'>
                        <div className='list-content'>
                          {
                            shopCarDatas.map((item, index) => {
                              const dom = item.chooseCount > 0
                                ? <div className='shopCart-food' key={index}>
                                  <span className='name'>{ item.name }</span>
                                  <div className='price'>
                                    <span>￥{item.price * item.chooseCount}</span>
                                  </div>
                                  <Control chooseCount={item.chooseCount} index={item.index} findex={item.findex} name={item.name}/>
                                </div>
                                : null
                              return dom
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CSSTransition>
              : null
          }
          <div className='content'>
            <div className='content-left' onClick={() => this.toggleShopCar()}>
              <div className='logo-wrapper'>
                <div className='logo'>
                  <i className='icon-shopping_cart'></i>
                </div>
                {
                  shopCarTotal > 0 ? <div className='num'>{shopCarTotal}</div> : null
                }
              </div>
              <div className='price'>￥{this.getTotalPrice()}</div>
              <div className='desc'>另需配送费￥{navHeader.get('deliveryPrice')}</div>
            </div>
            <div className='content-right'>
              <div className='pay' onClick={() => { this.pay() }}>{this.payDesc()}</div>
            </div>
          </div>
        </div>
        {
          this.state.showChoose
            ? <CSSTransition
              timeout ={1500}
              classNames ='fold'
            >
              <div className='list-mask'/>
            </CSSTransition>
            : null
        }
      </Fragment>
    )
  }
  componentDidUpdate() {
    if (this.state.showChoose) {
      this.shopCarScroll = new BScroll(this.refs.shopCar, {
        click: true
      })
    }
  }
  payDesc() {
    const { shopCarData, navHeader } = this.props
    const temp = shopCarData.toJS()
    let totalPrice = 0
    for (const i of temp) {
      totalPrice = totalPrice + i.price * i.chooseCount
    }
    if (totalPrice === 0) {
      return `￥${navHeader.get('minPrice')}元起送`
    } else if (totalPrice < navHeader.get('minPrice')) {
      const diff = navHeader.get('minPrice') - totalPrice
      return `还差￥${diff}元起送`
    } else {
      return '去结算'
    }
  }
  getTotalPrice() {
    const { shopCarData } = this.props
    const shopCarDatas = shopCarData.toJS()
    let totalPrice = 0
    for (const i of shopCarDatas) {
      totalPrice = totalPrice + i.price * i.chooseCount
    }
    return totalPrice
  }
  toggleShopCar() {
    this.setState(() => {
      return {
        showChoose: !this.state.showChoose
      }
    })
  }
  clearCar() {
    const { dispathClearShopCarData, dispathClearShopCarTotal, dispathResetMenuData } = this.props
    dispathClearShopCarData()
    dispathClearShopCarTotal()
    dispathResetMenuData()
    this.setState(() => {
      return {
        showChoose: false
      }
    })
  }
  pay() {
    const { dispathPay, name, img, shopCarTotal, shopCarData } = this.props
    const shopCarDatas = shopCarData.toJS()
    if (this.totalPrice < this.minPrice) {
      return
    }
    const totalPrice = this.getTotalPrice()
    dispathPay(name, img, shopCarDatas, shopCarTotal, totalPrice)
  }
}

const mapState = state => ({
  navHeader: state.getIn(['main', 'navHeader']),
  shopCarTotal: state.getIn(['good', 'shopCarTotal']),
  shopCarData: state.getIn(['good', 'shopCarData']),
  name: state.getIn(['menu', 'name']),
  img: state.getIn(['menu', 'img'])
})

const mapDispatch = dispatch => ({
  dispathClearShopCarData() {
    dispatch(actionCreators.clearShopCartData())
  },
  dispathClearShopCarTotal() {
    dispatch(actionCreators.clearShopCartTotal())
  },
  dispathResetMenuData() {
    dispatch(actionCreators.resetMenuData())
  },
  dispathresetshopCarData(shopCarDatas) {
    dispatch(actionCreators.resetshopCarData(shopCarDatas))
  },
  dispathPay(sellerName, sellerImage, menu, number, price) {
    // sellerName: this.sellerName,
    // sellerImage: this.sellerImage,
    // menu: this.selectFoods,
    // number: this.totalCount,
    // price: this.totalPrice
    dispatch(actionCreators.Pay(sellerName, sellerImage, menu, number, price))
  }
})

export default connect(
  mapState,
  mapDispatch
)(ShopBar)
