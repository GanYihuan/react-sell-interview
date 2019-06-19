import React from 'react'
import { connect } from 'react-redux' // 将 store 中的数据作为 props 绑定到组件上
import Carousel from 'nuka-carousel' // 实现轮播图组件功能, 首页里的图标轮播组件
import { actionCreators } from '../../store'
import './Category.scss'

class Category extends React.Component {
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList()
  }
  render() {
    const {
      items
    } = this.props
    const newList = items.toJS() // toJS() 处理获取过来的数组 (redux 数据使其成为 immutable 数据)
    return (
      <div className='category-content'>
        <Carousel className='slider' dots={false}>
          <div>
            {
              newList.splice(7, 8).map((item, index) => {
                return (
                  <div className='category-item' key={index}>
                    <img className='item-icon' src={item.url} />
                    <p className='item-name'>{item.name}</p>
                  </div>
                )
              })
            }
          </div>
          <div>
            {
              newList.splice(0, 8).map((item, index) => {
                return (
                  <div className='category-item' key={index}>
                    <img className='item-icon' src={item.url} />
                    <p className='item-name'>{item.name}</p>
                  </div>
                )
              })
            }
          </div>
        </Carousel>
      </div>
    )
  }
}

const mapState = state => ({ // mapStateToProps 将 store 中的数据作为 props 绑定到组件上
  items: state.getIn(['home', 'items']) // 获取 redux 的数据(其成为 immutable 数据)
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
