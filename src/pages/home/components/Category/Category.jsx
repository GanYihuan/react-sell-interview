import React from 'react'
import { connect } from 'react-redux'
// import { Carousel } from 'antd-mobile'
import Carousel from 'nuka-carousel'
import { withRouter } from 'react-router-dom'
import { actionCreators } from '../../store'
import './Category.scss'

@ withRouter
class Category extends React.Component {
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList()
  }
  render() {
    const {
      items
    } = this.props
    const newList = items.toJS() // 搞了一晚上
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
                    {/* <img className='item-icon' src={item.get('url')} />
                    <p className='item-name'>{item.get('name')}</p> */}
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
  // shouldComponentUpdate() {
  // POP 浏览器前进后退， PUSH 点击Link
  // return this.props.location.action === 'POP'
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  // return nextProps.location !== this.props.location
  // }
  // shouldComponentUpdate(nextProps) {
  //   // POP 浏览器前进后退， PUSH 点击Link
  //   if (this.props.location.action === 'POP') {
  //     return false
  //   }
  //   if (nextProps.content !== this.props.content) {
  //     return true
  //   }
  //   return false
  // }
}

const mapState = state => ({
  items: state.getIn(['home', 'items'])
})

const mapDispatch = dispatch => ({
  addArticleList() {
    dispatch(actionCreators.getHeaderData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(Category)
