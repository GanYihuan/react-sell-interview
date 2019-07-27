import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import './Scroll.styl'

class Scroll extends React.Component {
  componentDidUpdate() {
    if (this.bScroll && this.props.refresh === true) { // 组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
      this.bScroll.refresh()
    }
  }
  componentDidMount() {
    this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView) // 获取dom对象
    if (!this.bScroll) {
      this.bScroll = new BScroll(this.scrollView, {
        probeType: 3, // 实时派发scroll事件
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
  click: true,
  refresh: false,
  onScroll: null
}

Scroll.propTypes = {
  click: PropTypes.bool, // 是否启用点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func
}

export default Scroll
