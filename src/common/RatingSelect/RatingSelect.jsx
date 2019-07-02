import React, { Component } from 'react'
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
      EVENT_SELECT: 'select'
    }
  }
  render() {
    const { desc } = this.props
    return (
      <div className='ratingselect'>
        <div className='rating-type border-1px'>
          <span
            className='block positive'
            onClick={() => { this.select(2) }}
          >
            全部
            <span className='count'>count</span>
          </span>
          <span
            className='block positive'
            onClick={() => { this.select(0) }}
          >
            好评
            <span className='count'>count</span>
          </span>
          <span
            className='block negative'
            onClick={() => { this.select(1) }}
          >
            差评
            <span className='count'>count</span>
          </span>
        </div>
        <div
          className='switch'
          onClick={() => { this.toggleContent() }}
        >
          <i className='el-icon-edit'></i>
          <span className='text'>只看有内容的评价</span>
        </div>
      </div>
    )
  }
  select(type) {}
  toggleContent() {}
}

RatingSelect.defaultProps = {
  selectType: 'ALL'
  // ratings: [],
}

RatingSelect.propTypes = {
  selectType: PropTypes.number
  // ratings: PropTypes.array,
}

export default RatingSelect
