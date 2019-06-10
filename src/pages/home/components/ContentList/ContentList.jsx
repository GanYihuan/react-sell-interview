﻿import React from 'react'
import { connect } from 'react-redux'
import { Carousel } from 'antd-mobile'
import ListItem from '../../../../common/ListItem/ListItem'
import { actionCreators } from '../../store'
import './ContentList.scss'

class ContentList extends React.Component {
  constructor(props) {
    super(props)
    this.page = 0 // 记录当前页码
    this.state = { // 标识页面是否可以滚动
      isend: false
    }
  }
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList(this.page) // page = 0 -> 请求第一屏数据
  }
  render() {
    const { list } = this.props
    return (
      <div className='list-content'>
        <h4 className='list-title'>
          <span className='title-line'></span>
          <span>附近商家</span>
          <span className='title-line'></span>
        </h4>
        {
          list.map((item, index) => {
            return <ListItem key={index} itemData={item}></ListItem>
          })
        }
      </div>
    )
  }
}

const mapState = state => ({
  list: state.getIn(['home', 'list'])
})

const mapDispatch = dispatch => ({
  addArticleList(page) {
    dispatch(actionCreators.getListData(page))
  }
})

export default connect(
  mapState,
  mapDispatch
)(ContentList)
