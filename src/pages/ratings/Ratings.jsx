import React from 'react'
import { connect } from 'react-redux'
import NavHeader from '../../common/NavHeader/NavHeader'
import Split from '../../common/Split/Split'
import StarScore from '../../common/StarScore/StarScore'
import { actionCreators } from './store'
import './Ratings.styl'

class Ratings extends React.Component {
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList()
  }
  render() {
    const {
      commentData
    } = this.props
    const commentDatas = commentData.toJS()
    return (
      <div>
        <NavHeader/>
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
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  commentData: state.getIn(['ratings', 'commentData'])
})

const mapDispatch = dispatch => ({
  addArticleList() {
    dispatch(actionCreators.getListData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Ratings)
