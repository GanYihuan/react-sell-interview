import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends Component {
  render() {
    const { chooseCount, fuck, foodData, num } = this.props
    const foodDatas = foodData.toJS()
    const hideDesc = fuck === 1 ? 'cart-decrease hideDesc' : 'cart-decrease'
    return (
      <div className='cartControl-wrapper'>
        <CSSTransition
          timeout ={1000}
          classNames ='fade'
        >
          <div className={hideDesc}>
            <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem()}></span>
          </div>
        </CSSTransition>
        <span className='cart-count'>{foodDatas[num].cartControlCount}</span>
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem()}></span>
      </div>
    )
  }
  addSelectItem() {
    const { dispathaddSelectItem, fuck, foodData, currentLeftIndex, num } = this.props
    const foodDatas = foodData.toJS()
    // console.log(foodDatas[num].cartControlCount, 'foodData cartControlCount!')
    dispathaddSelectItem(num)
  }
  minusSelectItem() {
    const { dispathminusSelectItem, fuck } = this.props
    dispathminusSelectItem()
  }
}

const mapState = state => ({
  chooseCount: state.getIn(['menu', 'chooseCount']),
  fuck: state.getIn(['menu', 'fuck']),
  foodData: state.getIn(['menu', 'foodData']),
  currentLeftIndex: state.getIn(['menu', 'currentLeftIndex']),
  price: state.getIn(['menu', 'price'])
})

const mapDispatch = dispatch => ({
  dispathaddSelectItem(count) {
    dispatch(actionCreators.addSelectItem(count))
  },
  dispathminusSelectItem(count) {
    dispatch(actionCreators.minusSelectItem(count))
  }
})

export default connect(
  mapState,
  mapDispatch
)(cartControl)
