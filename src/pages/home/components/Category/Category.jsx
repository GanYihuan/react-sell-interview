import React from 'react'
import { connect } from 'react-redux'
import Carousel from 'nuka-carousel'
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
    const newList = items.toJS()
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
