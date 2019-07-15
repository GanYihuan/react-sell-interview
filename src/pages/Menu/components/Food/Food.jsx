import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Split from 'Split/Split'
import RatingSelect from '../RatingSelect/RatingSelect'
import Control from '../Control/Control'
import { actionCreators } from '../Good/store'
import './Food.styl'

class Food extends Component {
  render() {
    const { commentData, ratingSelectType, foodData, showFood } = this.props
    const showFoods = showFood
    const commentDatas = commentData.toJS()
    const goodComment = commentDatas.filter(a => a.rateType === Math.max(0))
    const badComment = commentDatas.filter(a => a.rateType === Math.max(1))
    let showComment = []
    ratingSelectType === 1 ? showComment = badComment : ratingSelectType === 0 ? showComment = goodComment : showComment = commentDatas
    return (
      <Fragment>
        {
          showFoods
            ? <Fragment>
              <div
                className='food'
              >
                <div className='food-content'>
                  <div className='image-header'>
                    <img
                      src={foodData.get('image')}
                      alt='food.image'
                    />
                    <div
                      className='back'
                      onClick={() => { this.hide() }}
                    >
                      <i className='icon-arrow_lift' />
                    </div>
                  </div>
                  <div className='content'>
                    <h1 className='title'>
                      {foodData.get('name')}
                    </h1>
                    <div className='detail'>
                      <span className='sell-count'>月售 {foodData.get('sellCount')} 份</span>
                      <span className='rating'>好评率 {foodData.get('rating')} %</span>
                    </div>
                    <div className='price'>
                      <span className='now'>￥ {foodData.get('price')} </span>
                      <span
                        className='old'
                      >￥ {foodData.get('oldPrice')} </span>
                    </div>
                    {/* <div className='cartControl-wrapper'>
                <Control/>
              </div> */}
                    {/* <transition name="fade"> */}
                    {/* <div
                className='buy'
              >
                加入购物车
              </div> */}
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
                      {foodData.get('info')}
                    </p>
                  </div>
                  <Split />
                  <div className='rating'>
                    <h1 className='title'>
                商品评价
                    </h1>
                    <RatingSelect/>
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
              <div className='rating-wrapper border-1px'>
                <ul>
                  {
                    showComment.map((item, index) => {
                      return (
                        <li
                          className='rating-item'
                          key={index}
                        >
                          <div className='avatar'>
                            <img
                              src={item.avatar}
                              alt='avatar'
                              width='28'
                              height='28'
                            />
                          </div>
                          <div className='content'>
                            <h1 className='name'>
                              {item.username}
                            </h1>
                            <div className='star-wrapper'>
                              <StarScore score={item.score} size={24}/>
                              <span
                                className='delivery'
                              >
                                {item.deliveryTime}分钟送达
                              </span>
                            </div>
                            <div className='text'>
                              {item.text}
                            </div>
                            <div className='recommend'>
                              {
                                item.recommend.length > 0
                                  ? <span className='icon-thumb_up' /> : null
                              }
                              {
                                item.recommend.map((item, index) => {
                                  return (
                                    <span className='item' key={index}>{item}</span>
                                  )
                                })
                              }
                            </div>
                            <div className='time'>
                              {this.formatDate(item.rateTime)}
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
  hide() {
    const { dispathShowFood, showFood } = this.props
    dispathShowFood(false)
  }
  formatDate(time) {
    return moment(time).format('YYYY-MM-DD hh:mm:ss')
  }
}

const mapState = state => ({
  commentData: state.getIn(['ratings', 'commentData']),
  ratingSelectType: state.getIn(['ratings', 'ratingSelectType']),
  showFood: state.getIn(['good', 'showFood']),
  foodData: state.getIn(['good', 'foodData'])
})

const mapDispatch = dispatch => ({
  dispathShowFood(bool) {
    dispatch(actionCreators.showFood(bool))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Food)
