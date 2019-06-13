﻿import React from 'react'
import { connect } from 'react-redux'
import NavHeader from '../../common/NavHeader/NavHeader'
import StarScore from '../../common/StarScore/StarScore'
import Split from '../../common/Split/Split'
import { actionCreators } from './store'
import './Restanurant.styl'

class Restanurant extends React.Component {
  componentDidMount() { // async, get ajax async data
    const { dispathRestaurantData } = this.props
    dispathRestaurantData()
  }
  render() {
    const { restanurantData } = this.props
    return (
      <div>
        <NavHeader/>
        <div className='seller'>
          <div className='seller-content'>
            <div className='overview'>
              <h1 className='title'>{restanurantData.get('name')}</h1>
              <div className='desc border-1px'>
                <StarScore score={restanurantData.get('score')}/>
                <span className='text'>{restanurantData.get('score')}</span>
                <span className='text'>月售{restanurantData.get('sellCount')}单</span>
              </div>
              <div className='favorite'>
                <span className='icon-favorite'></span>
                <span className='text'>收藏</span>
              </div>
              <ul className='remark'>
                <li className='block'>
                  <h2>起送价</h2>
                  <div className='content'>
                    <span className='stress'>{restanurantData.get('minPrice')}</span>元
                  </div>
                </li>
                <li className='block'>
                  <h2>商家配送</h2>
                  <div className='content'>
                    <span className='stress'>{restanurantData.get('deliveryPrice')}</span>元
                  </div>
                </li>
                <li className='block'>
                  <h2>平均配送时间</h2>
                  <div className='content'>
                    <span className='stress'>{restanurantData.get('deliveryTime')}</span>分钟
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Split/>
          <div className='bulletin'>
            <div className='title'>公告与活动</div>
            <div className='content-wrapper border-1px'>
              <div className='content'>{restanurantData.get('bulletin')}</div>
            </div>
            <div className='supports'>
              <div className='support-item border-1px'>
                <div className='icon'></div>
                <div className='text'>{restanurantData.get('bulletin')}</div>
              </div>
            </div>
          </div>
          <Split/>
          <div className='pics'>
            <div className='title'>商家实景</div>
            <div className='pic-wrapper'>
              <div className='pic-list'>
                <div className='pic-item'>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  restanurantData: state.getIn(['restanurant', 'restanurantData'])
})

const mapDispatch = dispatch => ({
  dispathRestaurantData() {
    dispatch(actionCreators.getRestanurantData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Restanurant)
