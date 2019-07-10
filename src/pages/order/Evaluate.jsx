import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Button, Layout, Input, Checkbox } from 'element-react'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import './Evaluate.styl'

@withRouter
class Evaluate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <div className='evalutate'>
        <div className='header'>
          <NavLink
            to={'/order'}
            className='arrow'
          >
            <i className='icon-arrow_lift' />
          </NavLink>
        评价
        </div>
        <div className='eva-content'>
          <div className='star-area'>
            <div
              className='star-item'
            />
          </div>
          <div className='comment'>
            <textarea
              v-model='textarea'
              className='comment-input'
              placeholder='请写下你的评价。4星或4星以上好评, 3星或3星以下差评'
              maxLength='50'
            />
            <span className='count'>maxCount</span>
          </div>
        </div>
        <Layout.Row>
          <Layout.Col>
            <Button
              className='btn'
              type='warning'
              plain
              size='large'
            >
            提交评价
            </Button>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Evaluate)
