import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Split from 'Split/Split'
import './Food.styl'

class Food extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFood: false
    }
  }
  render() {
    return (
      <Fragment>
        <div
          className='food'
        >
          <div className='food-content'>
            <div className='image-header'>
              <img
                alt='food.image'
              />
              <div
                className='back'
              >
                <i className='icon-arrow_lift' />
              </div>
            </div>
            <div className='content'>
              <h1 className='title'>
            name
              </h1>
              <div className='detail'>
                <span className='sell-count'>月售 sellCount 份</span>
                <span className='rating'>好评率 rating %</span>
              </div>
              <div className='price'>
                <span className='now'>￥ food.price </span>
                <span
                  className='old'
                >￥ food.oldPrice </span>
              </div>
              <div className='cartControl-wrapper'>
                {/* <cartControl
            /> */}
              </div>
              {/* <transition name="fade"> */}
              <div
                className='buy'
              >
              加入购物车
              </div>
              {/* </transition> */}
            </div>
            <Split />
            <div
              className='info'
            >
              <h1 className='title'>
            商品信息
              </h1>
              <p className='text'>
            food.info
              </p>
            </div>
            <Split />
            <div className='rating'>
              <h1 className='title'>
            商品评价
              </h1>
              {/* <ratingSelect
              /> */}
              <div className='rating-wrapper'>
                <ul >
                  <li
                    className='rating-item border-1px'
                  >
                    <div className='user'>
                      <span className='name'>rating.username </span>
                      <img
                        className='avatar'
                        alt='avatar'
                      />
                    </div>
                    <div className='time'>
                      {/* formatDate(rating.rateTime) */}
                    </div>
                    <p className='text'>
                      {/* <i :className="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" /> */}
                  rating.text
                    </p>
                  </li>
                </ul>
                <div
                  className='no-rating'
                >
              暂无评价
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
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
)(Food)
