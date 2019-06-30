﻿import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './scroll.styl'

class Scroll extends Component {
  componentDidUpdate() {
    // 组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
    if (this.bScroll && this.props.refresh === true) {
      this.bScroll.refresh()
    }
  }
  componentDidMount() {
    this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView)
    if (!this.bScroll) {
      this.bScroll = new BScroll(this.scrollView, {
        scrollX: this.props.direction === 'horizontal',
        scrollY: this.props.direction === 'vertical',
        // 实时派发scroll事件
        probeType: this.props.probeType,
        click: this.props.click
      })
      if (this.props.onScroll) {
        this.bScroll.on('scroll', (scroll) => {
          this.props.onScroll(scroll)
        })
      }
    }
  }
  componentWillUnmount() {
    this.bScroll.off('scroll')
    this.bScroll = null
  }
  refresh() {
    if (this.bScroll) {
      this.bScroll.refresh()
    }
  }
  render() {
    return (
      <div className='scroll-view' ref='scrollView'>
        {/* 获取子组件*/}
        {this.props.children}
      </div>
    )
  }
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: false,
  onScroll: null,
  probeType: 3
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  click: PropTypes.bool, // 是否启用点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func,
  probeType: PropTypes.number
}

export default Scroll
