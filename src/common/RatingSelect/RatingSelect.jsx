import React from 'react'
import 'element-theme-default'
import './RatingSelect.styl'

class RatingSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className='ratingselect'>
        <div className='rating-type border-1px'>
          <span
            className='block positive'
          >
            positive
            <span className='count'>count</span>
          </span>
          <span
            className='block positive'
          >
            positive
            <span className='count'>count</span>
          </span>
          <span
            className='block negative'
          >
            negative
            <span className='count'>count</span>
          </span>
        </div>
        <div
          className='switch'
        >
          <i className='el-icon-edit'></i>
          <span className='text'>只看有内容的评价</span>
        </div>
      </div>
    )
  }
}

export default RatingSelect
