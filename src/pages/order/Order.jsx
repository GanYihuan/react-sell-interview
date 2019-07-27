import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import BottomBar from 'BottomBar/BottomBar'
import Evaluate from './components/Evaluate/Evaluate'
import Split from 'Split/Split'
import './order.styl'

class Order extends Component {
  render() {
    const { order, showEvaluate } = this.props
    const orders = order.toJS()
    return (
      <div>
        {
          showEvaluate
            ? <Evaluate/>
            : <div className='wrapper'>
              <div className='order'>
                <div className='orderTitle'>
                  订单
                </div>
                <div
                  ref='orderWrapper'
                  className='orderWrapper'
                >
                  <div className='order-list'>
                    {
                      orders.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='order-item'
                          >
                            <Split />
                            <div className='order-item-inner'>
                              <img
                                className='item-img'
                                src={item.sellerImage}
                              />
                              <div className='item-right'>
                                <div className='item-top'>
                                  <p className='order-name one-line'>
                                    {item.sellerName}
                                  </p>
                                  <div
                                    className='close'
                                    onClick={() => { this.deleteComment(item.sellerName, item.number, item.price) }}
                                  >
                                    <i className='icon-close' />
                                  </div>
                                </div>
                                <div className='item-bottom'>
                                  {
                                    item.menu.map((mitem, mindex) => {
                                      return (
                                        <div className='product-item' key={mindex}>
                                          {mitem.name}
                                          <div className='p-count'>
                                            x {mitem.chooseCount}
                                          </div>
                                        </div>
                                      )
                                    })
                                  }
                                  <div className='p-total-count'>
                                    总计{item.number} 个菜，实付<span className='total-price'>¥{item.price} </span>元
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='evaluation clearfix'>
                              <div
                                className='evaluation-btn'
                                onClick={() => { this.comment(item.menu) }}
                              >
                                评价
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='back-to-ceiling'>
                    <i className='icon-circle-up' />
                  </div>
                </div>
              </div>
              <BottomBar/>
            </div>
        }
      </div>
    )
  }
  componentDidMount() {
    const { dispathOrder } = this.props
    if (!this.Scroll) {
      this.Scroll = new BScroll(this.refs.orderWrapper, {
        click: true
      })
    }
    dispathOrder()
  }
  deleteComment(sellerName, number, price) {
    const { dispathDeleteComment } = this.props
    dispathDeleteComment(sellerName, number, price)
    location.reload([false]) // false，从客户端缓存里取当前页。true, 则以 GET 方式，从服务端取最新的页面, 相当于客户端点击 F5
  }
  comment(menu) {
    const { dispathEvaluate, dispathShowEvaluate, showEvaluate } = this.props
    dispathEvaluate(menu)
    dispathShowEvaluate(true)
  }
}

const mapState = state => ({
  order: state.getIn(['order', 'order']),
  showEvaluate: state.getIn(['order', 'showEvaluate'])
})

const mapDispatch = dispatch => ({
  dispathOrder() {
    dispatch(actionCreators.getOrderData())
  },
  dispathEvaluate(menu) {
    dispatch(actionCreators.getEvaluate(menu))
  },
  dispathDeleteComment(sellerName, number, price) {
    dispatch(actionCreators.deleteComment(sellerName, number, price))
  },
  dispathShowEvaluate(bool) {
    dispatch(actionCreators.showEvaluate(bool))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Order)
