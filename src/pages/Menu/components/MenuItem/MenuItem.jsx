import React from 'react'
import { connect } from 'react-redux'
import { addSelectItem, minusSelectItem } from '../../store/actionCreators'
import './MenuItem.styl'

class MenuItem extends React.Component {
  addSelectItem() {
    this.props.dispatch(addSelectItem({
      index: this.props._index
    }))
  }
  minusSelectItem() {
    this.props.dispatch(minusSelectItem({
      index: this.props._index
    }))
  }
  render() {
    const item = this.props.data
    return (
      <div className='menu-item'>
        <img className='img' src={item.picture}/>
        <div className='menu-item-right'>
          <p className='item-title'>{item.name}</p>
          <p className='item-desc two-line'>{item.description}</p>
          <p className='item-zan'>{item.praise_content}</p>
          <p className='item-price'>¥{item.min_price}<span className='unit'>/{item.unit}</span></p>
        </div>
        <div className='select-content'>
          {item.chooseCount > 0 ? <div className='minus' onClick={() => this.minusSelectItem()}></div> : null}
          {item.chooseCount > 0 ? <div className='count'>{item.chooseCount}</div> : null}
          <div className='plus' onClick={() => this.addSelectItem()}></div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  menuData: state.getIn(['menu', 'menuData']),
  currentLeftIndex: state.getIn(['menu', 'currentLeftIndex'])
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(MenuItem)
