import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './RatingSelect.styl'

class RatingSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      POSITIVE: 0,
      NEGATIVE: 1,
      ALL: 2,
      EVENT_TOGGLE: 'toggle',
      EVENT_SELECT: 'select',
      switch: false
    }
  }
  render() {
    const { commentData } = this.props
    const commentDatas = commentData.toJS()
    const goodComment = commentDatas.filter(a => a.rateType === Math.max(0))
    const badComment = commentDatas.filter(a => a.rateType === Math.max(1))
    return (
      <div className='ratingselect'>
        <div className='rating-type border-1px'>
          <span
            className='block positive'
            onClick={() => { this.select(2) }}
          >
            全部
            <span className='count'>{commentDatas.length}</span>
          </span>
          <span
            className='block positive'
            onClick={() => { this.select(0) }}
          >
            好评
            <span className='count'>{goodComment.length}</span>
          </span>
          <span
            className='block negative'
            onClick={() => { this.select(1) }}
          >
            差评
            <span className='count'>{badComment.length}</span>
          </span>
        </div>
        {
          this.state.switch
            ? <Fragment>
              <div
                className='switch active'
                onClick={() => { this.toggleContent() }}
              >
                <i className='icon-check_circle'></i>
                <span className='text'>只看差评</span>
              </div>
            </Fragment>
            : <Fragment>
              <div
                className='switch'
                onClick={() => { this.toggleContent() }}
              >
                <i className='icon-check_circle'></i>
                <span className='text'>只看差评</span>
              </div>
            </Fragment>
        }
      </div>
    )
  }
  select(type) {}
  toggleContent() {
    this.setState(() => {
      return {
        switch: !this.state.switch
      }
    })
  }
}

RatingSelect.defaultProps = {
  selectType: 'ALL'
}

RatingSelect.propTypes = {
  selectType: PropTypes.number
}

const mapState = state => ({
  commentData: state.getIn(['ratings', 'commentData'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(RatingSelect)
