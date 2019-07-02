import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import BScroll from 'better-scroll'
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
    const temp = shopCarData.toJS()
    const shopCarDatas = temp.filter(a => a.chooseCount === Math.max(...temp.filter(b => b.name === a.name).map(({ chooseCount }) => chooseCount)))
    console.log(shopCarDatas, 'shopCarDatas...')
    return (
      <Fragment>
        <div className='shopCart'>
          {
            this.state.showChoose
              ? <CSSTransition
                timeout={ 1000 }
                classNames='fade'
              >
                <div className='shopCart-list'>
                  <div className='list-header'>
                    <h1 className='title'>购物车里面</h1>
                    <div className='empty' onClick={() => this.clearCar()}>清空购物车</div>
                  </div>
                  <div className='scroll-view' ref='listContent'>
                    <div className='list-content'>
                      {
                        shopCarDatas.map((item, index) => {
                          return (
                            <div className='shopCart-food' key={index}>
                              <span className='name'>{ item.name }</span>
                              <div className='price'>
                                <span>￥{item.price * item.chooseCount}</span>
                              </div>
                              <CartControl chooseCount={item.chooseCount} index={item.index} findex={item.findex}/>
                            </div>
                          )
                        })
                      }
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
              <div className='pay'>{this.payDesc()}</div>
            </div>
          </div>
          <div className='ball-container'></div>
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
  payDesc() {
    const { shopCarData, navHeader } = this.props
    const temp = shopCarData.toJS()
    let totalPrice = 0
    for (const i of temp) {
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
    const temp = shopCarData.toJS()
    let totalPrice = 0
    for (const i of temp) {
      totalPrice = totalPrice + i.price
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
    // const { dispathClearShopCarData } = this.props
    // dispathClearShopCarData()
    console.log('bug!')
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
  },
  dispathClearShopCarData() {
    dispatch(actionCreators.clearShopCartData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(ShopBar)
