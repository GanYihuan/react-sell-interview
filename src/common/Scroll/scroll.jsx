import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './scroll.styl'

class Scroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ref: Object
    }
  }
  componentDidUpdate() {
    // 组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
    if (this.bScroll && this.props.refresh === true) {
      this.bScroll.refresh()
      // this.bScroll.scrollToElement()
    }
    if (this.props.element) {
      const el = this.state.ref[this.props.element]
      this.bScroll.scrollToElement(el, 300)
    }
  }
  componentDidMount() {
    if (!this.bScroll) {
      this.setState(() => {
        return {
          ref: this.refs.scrollView
        }
      })
      this.bScroll = new BScroll(this.refs.scrollView, {
        // 实时派发scroll事件
        probeType: this.props.probeType,
        click: this.props.click
      })
      if (this.props.onScroll) {
        this.bScroll.on('scroll', (scroll) => {
          this.props.onScroll(scroll)
        })
      }
      // if (this.props.element) {
      //   const el = this.$refs.scrollView[this.props.element]
      //   this.bScroll.scrollToElement(el, 300)
      // }
    }
  }
  componentWillUnmount() {
    this.bScroll.off('scroll')
    this.bScroll = null
  }
  disable() {
    this.scroll && this.scroll.disable()
  }
  enable() {
    this.scroll && this.scroll.enable()
  }
  refresh() {
    this.scroll && this.scroll.refresh()
  }
  scrollTo() {
    // apply: Call a function with this value given And provide parameters as an array
    // apply: Pass parameters to scroll.scrollTo
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  }
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    if (this.props.element) {
      console.log('a')
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
  probeType: PropTypes.number,
  element: PropTypes.number
}

export default Scroll
