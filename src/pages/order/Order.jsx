import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import BottomBar from 'BottomBar/BottomBar'
import Split from 'Split/Split'
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
    const { order } = this.props
    const orders = order.toJS()
    console.log(orders, 'orders...')
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
                              onClick={() => { this.deleteComment() }}
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
                                      x {mitem.count}
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
                          onClick={() => { this.comment() }}
                        >
                         待评价
                        </div>
                      </div>
                    </div>
                  )
                })
              }
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
  componentDidMount() {
    const { dispathOrder } = this.props
    dispathOrder()
    if (!this.Scroll) {
      this.Scroll = new BScroll(this.refs.order, {
        click: true
      })
    }
  }
  deleteComment() {}
  comment() {
    this.props.history.push('/evaluate')
  }
}

const mapState = state => ({
  order: state.getIn(['order', 'order'])
})

const mapDispatch = dispatch => ({
  dispathOrder() {
    dispatch(actionCreators.getOrderData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Order)
