import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItem from 'ListItem/ListItem'
import { actionCreators } from 'home/store'
import './ContentList.scss'

class ContentList extends Component {
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList()
  }
  render() {
    const { list } = this.props
    // console.log(list.toJS(), 'list--')
    const listArray = list.toJS()
    return (
      <div className='list-content'>
        <h4 className='list-title'>
          <span className='title-line'></span>
          <span>附近商家</span>
          <span className='title-line'></span>
        </h4>
        {
          listArray.map((item, index) => {
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
  addArticleList() {
    dispatch(actionCreators.getListData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(ContentList)
