import React from 'react'
import { connect } from 'react-redux'
// import { getRestanurantData } from '../actions/restanurantAction'
import NavHeader from '../../common/NavHeader/NavHeader'
import Split from '../../common/Split/Split'
import './Ratings.styl'

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
        <div className='ratings'>
          <div class='ratings-content'>
            <div class='overview'>
              <div class='overview-left'>
                <h1 class='score'>
                </h1>
                <div class='title'>
                  综合评分
                </div>
                <div class='rank'>
                  高于周边商家
                </div>
              </div>
              <div class='overview-right'>
                <div class='score-wrapper'>
                  <span class='title'>服务态度</span>
                  <span class='score'>
                    score
                  </span>
                </div>
                <div class='score-wrapper'>
                  <span class='title'>商品评分</span>
                  <span class='score'>
                    score
                  </span>
                </div>
                <div class='delivery-wrapper'>
                  <span class='title'>送达时间</span>
                  <span class='delivery'>
                    分钟
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
  // resData: state.getIn('restanurant', 'resData')
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Comment)
