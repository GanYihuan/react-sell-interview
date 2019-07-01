import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import NavHeader from 'NavHeader/NavHeader'
import StarScore from 'StarScore/StarScore'
import Split from 'Split/Split'
import Scroll from 'Scroll/scroll'
import { actionCreators } from './store'
import './Restanurant.styl'

class Restanurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
  render() {
    const { restanurantData } = this.props
    const supports = restanurantData.toJS().supports
    const pics = restanurantData.toJS().pics
    const infos = restanurantData.toJS().infos
    return (
      <div>
        <NavHeader/>
        <div className='seller'>
          <Scroll>
            <div className='seller-wrapper'>
              <div className='seller-content'>
                <div className='overview'>
                  <h1 className='title'>{restanurantData.get('name')}</h1>
                  <div className='desc border-1px'>
                    <StarScore score={restanurantData.get('score')} size={36}/>
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
                  {
                    supports !== undefined
                      ? supports.map((item, index) => {
                        const icon = this.state.classMap[item.type] + ' icon'
                        return (
                          <div key={index} className='support-item border-1px'>
                            <span className={icon}></span>
                            <span className='text'>{item.description}</span>
                          </div>
                        )
                      })
                      : null
                  }
                </div>
              </div>
              <Split/>
              <div className='pics'>
                <div className='title'>商家实景</div>
                <div className='scroll-view' ref='merchant'>
                  <div className='pic-wrapper'>
                    {
                      pics !== undefined
                        ? pics.map((item, index) => {
                          return (
                            <div className='pic-item' key={index}>
                              <img src={item}/>
                            </div>
                          )
                        }) : null
                    }
                  </div>
                </div>
              </div>
              <Split/>
              <div className='info'>
                <h1 className='title border-1px'>商家信息</h1>
                {
                  infos !== undefined
                    ? infos.map((item, index) => {
                      return (
                        <div key={index} className='info-item'>
                          <span className='text'>{item}</span>
                        </div>
                      )
                    })
                    : null
                }
              </div>
            </div>
          </Scroll>
        </div>
      </div>
    )
  }
  componentDidMount() { // async, get ajax async data
    const { dispathRestaurantData } = this.props
    dispathRestaurantData()
    if (!this.mScroll) {
      this.mScroll = new BScroll(this.refs.merchant, {
        click: true,
        scrollX: true, /* horizontal scroll */
        eventPassthrough: 'vertical' /* ignore vertical scroll */
      })
    }
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
