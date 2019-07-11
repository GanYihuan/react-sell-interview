import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Button, Layout } from 'element-react'
import { connect } from 'react-redux'
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
  submit() {
    const { evaluate } = this.props
    const evaluates = evaluate.toJS()

    const score = this.state.starIndex + 1
    let rateType = 0 // 0 -> good comment, 1 -> bad comment
    if (score >= 4) {
      rateType = 0
    } else {
      rateType = 1
    }
    const text = this.second.value
    console.log(evaluates, 'evaluates..')
  }
}

const mapState = state => ({
  order: state.getIn(['order', 'order']),
  evaluate: state.getIn(['order', 'evaluate']),
  tabs: state.getIn(['main', 'tabs'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Evaluate)
