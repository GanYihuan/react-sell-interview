import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../../store'
import './shopBar.styl'

class ShopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPrice: 0
    }
  }
  render() {
    const { shopCarTotal, navHeader } = this.props
    return (
      <div className='shopCart'>
        {
          this.props.showChooseContent
            ? <div className='choose-content'>
              <div className='content-top'>
                <div className='clear-car' onClick={() => this.clearCar()}>清空购物车</div>
              </div>
              {/* {this.renderChooseItem(data)} */}
            </div>
            : null
        }
        <div className='content'>
          <div className='content-left'>
            <div className='logo-wrapper' onClick={() => this.openChooseContent()}>
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
      </div>
    )
  }
  payDesc() {
    const { menuData, navHeader } = this.props
    const foodss = menuData.toJS()
    let totalPrice = 0
    for (const i of foodss) {
      for (const j of i.foods) {
        if (j.chooseCount > 0) {
          totalPrice = totalPrice + j.chooseCount * j.price
        }
      }
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
    const { menuData } = this.props
    const foodss = menuData.toJS()
    let totalPrice = 0
    for (const i of foodss) {
      for (const j of i.foods) {
        if (j.chooseCount > 0) {
          totalPrice = totalPrice + j.chooseCount * j.price
        }
      }
    }
    return totalPrice
  }
  openChooseContent() {
    const { showChooseContent, dispathshowChoose } = this.props
    const flag = showChooseContent
    dispathshowChoose(flag)
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
  }
}

const mapState = state => ({
  showChooseContent: state.getIn(['menu', 'showChooseContent']),
  shopCarTotal: state.getIn(['menu', 'shopCarTotal']),
  navHeader: state.getIn(['main', 'navHeader']),
  menuData: state.getIn(['menu', 'menuData'])
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
