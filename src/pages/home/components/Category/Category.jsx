import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Carousel } from 'antd-mobile'
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
    return (
      <div className='category-content'>
        <Carousel autoplay dots={false}>
          <div>
            {
              items.splice(8, 7).map((item, index) => {
                return (
                  <div className='category-item' key={index}>
                    <img className='item-icon' src={item.get('url')} />
                    <p className='item-name'>{item.get('name')}</p>
                  </div>
                )
              })
            }
          </div>
          <div>
            {
              items.splice(0, 8).map((item, index) => {
                return (
                  <div className='category-item' key={index}>
                    <img className='item-icon' src={item.get('url')} />
                    <p className='item-name'>{item.get('name')}</p>
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
