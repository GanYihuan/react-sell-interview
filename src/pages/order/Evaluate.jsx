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
              v-model='textarea'
              className='comment-input'
              placeholder='请写下你的评价。4星或4星以上好评, 3星或3星以下差评'
              maxLength='50'
            />
            <span className='count'>{ this.state.maxCount }</span>
          </div>
        </div>
        <Layout.Row>
          <Layout.Col>
            <Button
              className='btn'
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
  submit() {}
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Evaluate)
