import React from 'react'
import { connect } from 'react-redux'
// import { getRestanurantData } from '../actions/restanurantAction'
import NavHeader from '../../common/NavHeader/NavHeader'
import './Comment.scss'

class Comment extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.props.dispatch(getRestanurantData())
  // }
  // renderPayType(types) {
  //   const array = types || []
  //   return array.map((item, index) => {
  //     return <p key={index} className='restanurant-pay-type res-section'><img className='icon' src={item.icon_url}/>{item.info}</p>
  //   })
  // }
  render() {
    // const { resData } = this.props
    return (
      <div>
        <NavHeader/>
        <div className='comment-inner'>
          <div className='comment-score'>
            <div className='mail-score-content'>
              <div className='mail-score'>
                {/* {data.comment_score ? data.comment_score.toFixed(1) : ''} */}1
              </div>
              <div className='mail-text'>商家评价</div>
            </div>
            <div className='other-score-content'>
              <div className='taste-score'>
                <div className='taste-text'>口味</div>
                <div className='taste-star-wrap'>
                  {/* <StarScore score={data.food_score}/> */}2
                </div>
                <div className='taste-score-text'>
                  {/* {data.food_score ? data.food_score.toFixed(1) : ''} */}3
                </div>
              </div>
              <div className='package-score'>
                <div className='package-text'>包装</div>
                <div className='package-star-wrap'>
                  {/* <StarScore score={data.pack_score}/> */}4
                </div>
                <div className='package-score-text'>
                  {/* {data.pack_score} */}5
                </div>
              </div>
            </div>
            <div className='send-score-content'>
              <div className='send-score'>
                {/* {data.delivery_score} */}6
              </div>
              <div className='send-text'>商家评价</div>
            </div>
          </div>
          {/* <CommentList /> */}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  // resData: state.getIn('restanurant', 'resData')
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Comment)
