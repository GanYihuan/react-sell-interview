import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import NavHeader from 'NavHeader/NavHeader'
import Split from 'Split/Split'
import RatingSelect from 'RatingSelect/RatingSelect'
import StarScore from 'StarScore/StarScore'
import Scroll from 'Scroll/scroll'
import { actionCreators } from './store'
import './Rating.styl'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshScroll: false
    }
  }
  componentDidMount() { // async, get ajax async data
    const { dispathgetListData, dispathgetRatingData } = this.props
    dispathgetListData()
    dispathgetRatingData()
  }
  render() {
    const {
      commentData,
      ratingData
    } = this.props
    const commentDatas = commentData.toJS()
    const ratingDatas = ratingData.toJS()
    const recommendDta = ratingDatas.recommend
    return (
      <div>
        <NavHeader/>
        <Scroll refresh={this.state.refreshScroll}>
          <div className='ratings'>
            <div className='ratings-content'>
              <div className='overview'>
                <div className='overview-left'>
                  <h1 className='score'>
                    {commentDatas.food_score}
                  </h1>
                  <div className='title'>
                  综合评分
                  </div>
                  <div className='rank'>
                  高于周边商家 {commentDatas.comment_praise_ratio}%
                  </div>
                </div>
                <div className='overview-right'>
                  <div className='score-wrapper'>
                    <span className='title'>服务态度</span>
                    <span className='score'>
                      <StarScore score={commentDatas.pack_score}/>
                    </span>
                  </div>
                  <div className='score-wrapper'>
                    <span className='title'>商品评分</span>
                    <span className='score'>
                      <StarScore score={commentDatas.food_score}/>
                    </span>
                  </div>
                  <div className='delivery-wrapper'>
                    <span className='title'>送达时间</span>
                    <span className='delivery'>
                      {commentDatas.avg_ship_time}分钟
                    </span>
                  </div>
                </div>
              </div>
              <Split/>
              <RatingSelect
                selectType='a'
                onClick={this.selectRating}
                ratingDatas={ratingDatas}
              />
              <div className='rating-wrapper border-1px'>
                <ul>
                  {
                    ratingDatas.map((item, index) => {
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
                              <StarScore score={item.score}/>
                              <span
                                className='delivery'
                              >
                                {item.deliveryTime}分钟送达
                              </span>
                            </div>
                            <div className='text'>
                              {item.text}
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
        </Scroll>
      </div>
    )
  }
  formatDate(time) {
    return moment(time).format('YYYY-MM-DD hh:mm:ss')
  }
}

const mapState = state => ({
  commentData: state.getIn(['ratings', 'commentData']),
  ratingData: state.getIn(['ratings', 'ratingData'])
})

const mapDispatch = dispatch => ({
  dispathgetListData() {
    dispatch(actionCreators.getCommentData())
  },
  dispathgetRatingData() {
    dispatch(actionCreators.getRatingsData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Rating)
