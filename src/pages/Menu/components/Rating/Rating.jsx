﻿import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import moment from 'moment'
import Split from 'Split/Split'
import StarScore from 'StarScore/StarScore'
import RatingSelect from '../RatingSelect/RatingSelect'
import { actionCreators } from '../Rating/store'
import './rating.styl'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: false,
      selectType: 2
    }
  }
  render() {
    const { commentData, ratingData, ratingSelectType, sellerName } = this.props
    const commentDatas = commentData.toJS().filter(item => item.sellername === sellerName).reverse()
    const goodComment = commentDatas.reverse().filter(a => a.rateType === Math.max(0))
    const badComment = commentDatas.reverse().filter(a => a.rateType === Math.max(1))
    let showComment = []
    ratingSelectType === 1 ? showComment = badComment : ratingSelectType === 0 ? showComment = goodComment : showComment = commentDatas
    return (
      <div>
        <div className='ratings' ref='ratings'>
          <div className='ratings-content'>
            <div className='overview'>
              <div className='overview-left'>
                <h1 className='score'>
                  {ratingData.get('foodScore')}
                </h1>
                <div className='title'>
                  综合评分
                </div>
                <div className='rank'>
                  高于周边商家 {ratingData.get('rankRate')}%
                </div>
              </div>
              <div className='overview-right'>
                <div className='score-wrapper'>
                  <span className='title'>服务态度</span>
                  <StarScore score={ratingData.get('foodScore')} size={36}/>
                  <span className='score'>
                    {ratingData.get('serviceScore')} 分
                  </span>
                </div>
                <div className='score-wrapper'>
                  <span className='title'>商品评分</span>
                  <StarScore score={ratingData.get('foodScore')} size={36}/>
                  <span className='score'>
                    {ratingData.get('score')} 分
                  </span>
                </div>
                <div className='delivery-wrapper'>
                  <span className='title'>送达时间</span>
                  <span className='delivery'>
                    {ratingData.get('deliveryTime')}分钟
                  </span>
                </div>
              </div>
            </div>
            <Split/>
            <RatingSelect/>
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
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const { dispathgetListData } = this.props
    dispathgetListData()
    if (!this.rScroll) {
      this.rScroll = new BScroll(this.refs.ratings, {
        click: true
      })
    }
  }
  componentWillUnmount() {
    const { dispathclearListData } = this.props
    dispathclearListData()
  }
  formatDate(time) {
    return moment(time).format('YYYY-MM-DD hh:mm:ss')
  }
}

const mapState = state => ({
  commentData: state.getIn(['ratings', 'commentData']),
  ratingData: state.getIn(['main', 'navHeader']),
  ratingSelectType: state.getIn(['ratings', 'ratingSelectType']),
  sellerName: state.getIn(['home', 'sellerName'])
})

const mapDispatch = dispatch => ({
  dispathgetListData() {
    dispatch(actionCreators.getCommentData())
  },
  dispathclearListData() {
    dispatch(actionCreators.clearCommentData())
  },
  dispatchratingSelectTypeBad(number) {
    dispatch(actionCreators.ratingSelectTypeBad(number))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Rating)
