import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from 'rating/store'
import './RatingSelect.styl'

class RatingSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switch: false,
      selectType: 2
    }
  }
  render() {
    const { commentData } = this.props
    const commentDatas = commentData.toJS()
    const goodComment = commentDatas.filter(a => a.rateType === Math.max(0))
    const badComment = commentDatas.filter(a => a.rateType === Math.max(1))
    const allClassName = this.state.selectType === 2 ? 'block active' : 'block'
    const goodClassName = this.state.selectType === 0 ? 'block active' : 'block'
    const badClassName = this.state.selectType === 1 ? 'block active' : 'block'
    return (
      <div className='ratingselect'>
        <div className='rating-type border-1px'>
          <span
            className={allClassName}
            onClick={() => { this.select(2) }}
          >
            全部
            <span className='count'>{commentDatas.length}</span>
          </span>
          <span
            className={goodClassName}
            onClick={() => { this.select(0) }}
          >
            好评
            <span className='count'>{goodComment.length}</span>
          </span>
          <span
            className={badClassName}
            onClick={() => { this.select(1) }}
          >
            差评
            <span className='count'>{badComment.length}</span>
          </span>
        </div>
        { this.onlyBadComment() }
      </div>
    )
  }
  onlyBadComment() {
    const cls = this.state.switch ? 'switch active' : 'switch'
    return (
      <div
        className={cls}
        onClick={() => { this.toggleContent() }}
      >
        <i className='icon-check_circle'></i>
        <span className='text'>只看差评</span>
      </div>
    )
  }
  toggleContent() {
    if (this.state.switch === false) {
      this.select(1)
    }
    this.setState(() => {
      return {
        switch: !this.state.switch
      }
    })
    if (this.state.switch === true) {
      this.select(2)
    }
  }
  select(type) {
    const { dispatchratingSelectTypeBad } = this.props
    this.setState(() => {
      return {
        selectType: type
      }
    })
    if (type === 1) {
      this.setState(() => {
        return {
          switch: true
        }
      })
      dispatchratingSelectTypeBad(1)
    } else {
      this.setState(() => {
        return {
          switch: false
        }
      })
    }
    if (type === 2) {
      dispatchratingSelectTypeBad(2)
    }
    if (type === 0) {
      dispatchratingSelectTypeBad(0)
    }
  }
}

const mapState = state => ({
  commentData: state.getIn(['ratings', 'commentData'])
})

const mapDispatch = dispatch => ({
  dispatchratingSelectTypeBad(number) {
    dispatch(actionCreators.ratingSelectTypeBad(number))
  }
})

export default connect(
  mapState,
  mapDispatch
)(RatingSelect)
