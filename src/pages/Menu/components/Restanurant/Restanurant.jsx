import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import StarScore from 'StarScore/StarScore'
import Split from 'Split/Split'
import { saveToLocal, loadFromLocal } from 'storage'
import './restanurant.styl'

class Restanurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorite: false,
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
        <div className='seller' ref='seller'>
          <div className='seller-wrapper'>
            <div className='seller-content'>
              <div className='overview'>
                <h1 className='title'>{restanurantData.get('name')}</h1>
                <div className='desc border-1px'>
                  <StarScore score={restanurantData.get('score')} size={36}/>
                  <span className='text'>{restanurantData.get('score')}</span>
                  <span className='text'>月售{restanurantData.get('sellCount')}单</span>
                </div>
                <div className='favorite' onClick={() => this.favoriteClick()}>
                  {
                    this.state.favorite === false
                      ? <Fragment><span className='icon-favorite'></span><span className='text'>收藏</span></Fragment>
                      : <Fragment><span className='icon-favorite active'></span><span className='text'>已收藏</span></Fragment>
                  }
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
              <div className='pic-wrapper' ref='picWrapper'>
                <div className='pic-list'>
                  {
                    pics !== undefined
                      ? pics.map((item, index) => {
                        return (
                          <div className='pic-item' key={index}>
                            <img src={item} alt='pic' />
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
        </div>
      </div>
    )
  }
  componentDidMount() { // async, get ajax async data
    const { restanurantData } = this.props
    if (!this.mScroll) {
      this.mScroll = new BScroll(this.refs.picWrapper, {
        scrollX: true, /* horizontal scroll */
        eventPassthrough: 'vertical' /* ignore vertical scroll */
      })
    }
    if (!this.sScroll) {
      this.sScroll = new BScroll(this.refs.seller, {
        click: true
      })
    }
    const loadfavorite = loadFromLocal(restanurantData.get('id'), 'favorite', false)
    this.setState(() => {
      return {
        favorite: loadfavorite
      }
    })
  }
  favoriteClick() {
    const { restanurantData } = this.props
    this.setState(() => {
      return {
        favorite: !this.state.favorite
      }
    })
    saveToLocal(restanurantData.get('id'), 'favorite', this.state.favorite)
  }
}

const mapState = state => ({
  restanurantData: state.getIn(['main', 'navHeader'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Restanurant)
