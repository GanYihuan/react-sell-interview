﻿import React, { PureComponent } from 'react'
import { connect } from 'react-redux' // 将 store 中的数据作为 props 绑定到组件上
import { Carousel } from 'antd' // 轮播图
import { actionCreators } from 'home/store/index'
import './category.styl'

class Category extends PureComponent {
  render() {
    const { items } = this.props
    const newList = items.toJS() // toJS() immutable对象转原生js
    return (
      <div>
        <Carousel>
          <div className='category'>
            {
              newList.splice(7, 8).map((item, index) => {
                return (
                  <div className='category-item' key={index}>
                    <div className='icon-img'>
                      <img className='icon-img-content' src={item.url} />
                    </div>
                    <p className='icon-desc'>{item.name}</p>
                  </div>
                )
              })
            }
          </div>
          <div className='category'>
            {
              newList.splice(0, 8).map((item, index) => {
                return (
                  <div className='category-item' key={index}>
                    <div className='icon-img'>
                      <img className='icon-img-content' src={item.url} />
                    </div>
                    <p className='icon-desc'>{item.name}</p>
                  </div>
                )
              })
            }
          </div>
        </Carousel>
      </div>
    )
  }
  componentDidMount() { // 异步, 获取ajax异步数据
    const { addArticleList } = this.props
    addArticleList()
  }
}

const mapState = state => ({ // mapStateToProps 将 store 中的数据作为 props 绑定到组件上
  items: state.getIn(['home', 'items']) // getIn() 获取 redux 的数据 (其成为 immutable 数据)
})

const mapDispatch = dispatch => ({ // mapDispatchToProps 将 action 作为 props 绑定到组件上
  addArticleList() {
    dispatch(actionCreators.getHeaderData()) // dispatch() 调用 action
  }
})

export default connect(
  mapState,
  mapDispatch
)(Category)
