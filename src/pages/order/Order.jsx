import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import BottomBar from 'BottomBar/BottomBar'
import Evaluate from './components/Evaluate/Evaluate'
import Split from 'Split/Split'
import './Order.styl'

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      showEvaluate: false
    }
  }
  render() {
    const { order } = this.props
    const orders = order.toJS()
    return (
      <div>
        {
          this.state.showEvaluate
            ? <Evaluate/>
            : <div className='s'>
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
                                onClick={() => { this.comment(item.menu) }}
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
        }
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
  comment(menu) {
    const { dispathEvaluate } = this.props
    dispathEvaluate(menu)
    this.setState(() => {
      return {
        showEvaluate: true
      }
    })
  }
}

const mapState = state => ({
  order: state.getIn(['order', 'order'])
})

const mapDispatch = dispatch => ({
  dispathOrder() {
    dispatch(actionCreators.getOrderData())
  },
  dispathEvaluate(menu) {
    dispatch(actionCreators.getEvaluate(menu))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Order)
