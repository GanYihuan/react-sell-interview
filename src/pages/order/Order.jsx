import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import BottomBar from 'BottomBar/BottomBar'
import './Order.styl'

@withRouter
class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <div>
        <div className='order'>
          <div className='header'>
          订单
          </div>
          <div
            ref='order'
            className='orderWrapper'
          >
            <div className='order-list'>
              <div
                className='order-item'
              >
                {/* <Split /> */}
                <div className='order-item-inner'>
                  <img
                    className='item-img'
                  />
                  <div className='item-right'>
                    <div className='item-top'>
                      <p className='order-name one-line'>
                  item.sellerName
                      </p>
                      <div
                        className='close'
                      >
                        <i className='icon-close' />
                      </div>
                    </div>
                    <div className='item-bottom'>
                      <div
                      >
                        <div className='product-item'>
                    mitem.name
                          <div className='p-count'>
                      x mitem.count
                          </div>
                        </div>
                      </div>
                      <div className='p-total-count'>
                  总计item.number 个菜，实付<span className='total-price'>¥item.price </span>元
                      </div>
                    </div>
                  </div>
                </div>
                <div className='evaluation clearfix'>
                  <div
                    className='evaluation-btn'
                  >
                    待评价
                  </div>
                </div>
              </div>
            </div>
            <div
              className='back-to-ceiling'
            >
              <i className='icon-circle-up' />
            </div>
          </div>
        </div>
        <BottomBar/>
      </div>
    )
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Order)
