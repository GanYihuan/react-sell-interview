﻿import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom' // 路由
import moment from 'moment' // 时间格式处理
import { Button, Layout } from 'element-react'
import { connect } from 'react-redux' // react 绑定 redux
import { actionCreators } from '../../store'
import './evaluate.styl'

@withRouter
class Evaluate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '默认用户名',
      maxCount: 50,
      starIndex: 0,
      stars: [
        {
          num: 0
        },
        {
          num: 1
        },
        {
          num: 2
        },
        {
          num: 3
        },
        {
          num: 4
        }
      ]
    }
  }
  render() {
    return (
      <div className='evalutate'>
        <div className='evalutateHeader'>
          <NavLink
            to={'/order'}
            className='evalutateArrow'
            onClick={() => { this.closeEvaluate() }}
          >
            <i className='icon-close' />
          </NavLink>
          评价
        </div>
        <div className='eva-content'>
          <div className='star-area'>
            {
              this.state.stars.map((item, index) => {
                return (
                  item.num <= this.state.starIndex
                    ? <div className='star-item highlight' key={item.num} onClick={() => { this.addStar(index) }}></div>
                    : <div className='star-item' key={item.num} onClick={() => { this.addStar(index) }}></div>
                )
              })
            }
          </div>
          <div className='comment'>
            <textarea
              className='comment-input'
              placeholder='请写下你的评价。4星或4星以上好评, 3星或3星以下差评'
              maxLength='50'
              ref={input => (this.second = input)}
            />
            <span className='count'>{ this.state.maxCount }</span>
          </div>
        </div>
        <Layout.Row>
          <Layout.Col>
            <Button
              className='submitComment'
              type='warning'
              plain={true}
              size='large'
              onClick={() => { this.submit() }}
            >
            提交评价
            </Button>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
  addStar(index) {
    this.setState(() => {
      return {
        starIndex: index
      }
    })
  }
  submit() {
    const { evaluate, dispathSubmit, evaluateSellerName } = this.props
    const evaluates = evaluate.toJS()
    const score = this.state.starIndex + 1
    let rateType = 0 // 0 -> good comment, 1 -> bad comment
    if (score >= 4) {
      rateType = 0
    } else {
      rateType = 1
    }
    const text = this.second.value
    const username = this.state.user
    const commentTime = new Date()
    const time = moment(commentTime).format(this.dateType)
    const oldTime = (new Date(time)).getTime()
    const avatar = 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
    const recommend = []
    for (const i of evaluates) {
      recommend.push(i.name)
    }
    dispathSubmit(evaluateSellerName, username, oldTime, score, rateType, text, avatar, recommend)
  }
  closeEvaluate() {
    const { dispathShowEvaluate } = this.props
    dispathShowEvaluate(false)
  }
}

const mapState = state => ({
  order: state.getIn(['order', 'order']),
  evaluate: state.getIn(['order', 'evaluate']),
  tabs: state.getIn(['main', 'tabs']),
  showEvaluate: state.getIn(['order', 'showEvaluate']),
  evaluateSellerName: state.getIn(['order', 'evaluateSellerName'])
})

const mapDispatch = dispatch => ({
  dispathSubmit(evaluateSellerNames, username, oldTime, score, rateType, text, avatar, recommend) {
    dispatch(actionCreators.submit(evaluateSellerNames, username, oldTime, score, rateType, text, avatar, recommend))
  },
  dispathShowEvaluate(bool) {
    dispatch(actionCreators.showEvaluate(bool))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Evaluate)
