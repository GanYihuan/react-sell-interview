import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import BScroll from 'better-scroll'
import Split from 'Split/Split'
import RatingSelect from '../RatingSelect/RatingSelect'
import Control from '../Control/Control'
import ShopBar from '../ShopBar/ShopBar'
import { actionCreators } from '../Good/store'
import './food.styl'

class Food extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFood: false
    }
  }
  render() {
    const { commentData, ratingSelectType, foodData, showFood, chooseCount, index, findex, name } = this.props
    const showFoods = showFood
    const commentDatas = commentData.toJS()
    const goodComment = commentDatas.filter(a => a.rateType === Math.max(0))
    const badComment = commentDatas.filter(a => a.rateType === Math.max(1))
    const ratings = foodData.get('ratings').toJS()
    let showComment = []
    ratingSelectType === 1 ? showComment = badComment : ratingSelectType === 0 ? showComment = goodComment : showComment = commentDatas
    return (
      <Fragment>
        {
          showFoods
            ? <Fragment>
              <div
                className='food'
                ref='food'
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
                      <Control chooseCount={chooseCount} index={index} findex={findex} name={name}/>
                    </div> */}
                  </div>
                  <Split />
                  <div className='rating'>
                    <h1 className='title'>
                      商品评价
                    </h1>
                    <RatingSelect/>
                    <div className='rating-wrapper'>
                      <ul>
                        {
                          ratings && ratings.length > 0
                            ? ratings.map((item, index) => {
                              return (
                                <li
                                  className='rating-item border-1px'
                                  key={index}
                                >
                                  <div className='user'>
                                    <span className='name'>{item.username}</span>
                                    <img
                                      className='avatar'
                                      src={item.avatar}
                                      alt='avatar'
                                    />
                                  </div>
                                  <div className='time'>
                                    {this.formatDate(item.rateTime)}
                                  </div>
                                  <div className='text'>
                                    {
                                      item.rateType === 0
                                        ? <i className='icon-thumb_up' />
                                        : <i className='icon-thumb_down' />
                                    }
                                    {item.text}
                                  </div>
                                </li>
                              )
                            })
                            : <div
                              className='no-rating'
                            >
                              暂无评价
                            </div>
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <ShopBar/>
            </Fragment>
            : null
        }
      </Fragment>
    )
  }
  componentDidMount() {
    if (!this.mScroll) {
      this.mScroll = new BScroll(this.refs.food, {
        click: true
      })
    }
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
