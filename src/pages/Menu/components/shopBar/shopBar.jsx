import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import CartControl from '../cartControl/cartControl'
import { actionCreators } from '../../store'
import './shopBar.styl'

class ShopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0,
      showChoose: false
    }
  }
  render() {
    const { shopCarTotal, navHeader, menuData, shopCarData } = this.props
    const shopCarDatas = shopCarData.toJS()
    console.log(shopCarDatas, 'shopCarDatas...')
    return (
      <div className='shopCart'>
        {
          this.state.showChoose
            ? <CSSTransition
              timeout ={1000}
              classNames ='fade'
            >
              <div className='shopCart-list'>
                <div className='list-header'>
                  <h1 className='title'>购物车里面</h1>
                  <div className='empty' onClick={() => this.clearCar()}>清空购物车</div>
                </div>
                <div className='list-content'>
                  <ul>
                    {
                      shopCarDatas.map((item, index) => {
                        return (
                          <li className='shopCart-food' key={index}>
                            <span className='name'>{ item.name }</span>
                            <div className='price'>
                              <span>￥{item.price * item.chooseCount}</span>
                            </div>
                            <CartControl chooseCount={item.chooseCount} index={item.index} findex={item.findex}/>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </CSSTransition>
            : null
        }
        <div className='content'>
          <div className='content-left' onClick={() => this.openChoose()}>
            <div className='logo-wrapper'>
              <div className='logo'>
                <i className='icon-shopping_cart'></i>
              </div>
              {shopCarTotal > 0 ? <div className='num'>{shopCarTotal}</div> : null}
            </div>
            <div className='price'>￥{this.getTotalPrice()}</div>
            <div className='desc'>另需配送费￥{navHeader.get('deliveryPrice')}</div>
          </div>
          <div className='content-right'>
            <div className='pay'>{this.payDesc()}</div>
          </div>
        </div>
        <div className='ball-container'></div>
      </div>
    )
  }
  payDesc() {
    const { shopCarData, navHeader } = this.props
    const shopCarDatas = shopCarData.toJS()
    let totalPrice = 0
    for (const i of shopCarDatas) {
      totalPrice = totalPrice + i.price
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
      totalPrice = totalPrice + i.price
    }
    return totalPrice
  }
  openChoose() {
    this.setState(() => {
      return {
        showChoose: !this.state.showChoose
      }
    })
  }
  renderChooseItem(data) {
    const array = data.chooseList || []
    return array.map((item, index) => {
      return (
        <div className='choose-item' key={index}>
        </div>
      )
    })
  }
  clearCar() {
    this.setState(() => {
      return {
        showChoose: !this.state.showChoose
      }
    })
  }
}

const mapState = state => ({
  showChooseContent: state.getIn(['menu', 'showChooseContent']),
  shopCarTotal: state.getIn(['menu', 'shopCarTotal']),
  navHeader: state.getIn(['main', 'navHeader']),
  menuData: state.getIn(['menu', 'menuData']),
  shopCarData: state.getIn(['menu', 'shopCarData'])
})

const mapDispatch = dispatch => ({
  dispathshowChoose() {
    dispatch(actionCreators.showChoose())
  }
})

export default connect(
  mapState,
  mapDispatch
)(ShopBar)
