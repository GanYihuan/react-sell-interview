import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends Component {
  render() {
    const { chooseCount, index, findex } = this.props
    // const hideDesc = fuck === 1 ? 'cart-decrease hideDesc' : 'cart-decrease'
    return (
      <div className='cartControl-wrapper'>
        <CSSTransition
          timeout ={1000}
          classNames ='fade'
        >
          <div className='cart-decrease'>
            <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem()}></span>
          </div>
        </CSSTransition>
        {/* { chooseCount === 0 ? <span className='cart-count'>{index} {findex} {chooseCount}</span> : null } */}
        { chooseCount >= 0 ? <span className='cart-count'>{chooseCount}</span> : null }
        {/* {
          chooseCount === 0
            ? <CSSTransition
              timeout ={1000}
              classNames ='fade'
            >
              <div className='cart-decrease'>
                <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem()}></span>
              </div>
              <span className='cart-count'>{chooseCount}</span>
            </CSSTransition>
            : null
        } */}
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem(index, findex)}></span>
      </div>
    )
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.chooseCount !== this.props.chooseCount) {
  //     console.log(nextProps.chooseCount, this.props.chooseCount, 'should true chooseCount')
  //     return true
  //   } else {
  //     console.log(nextProps.chooseCount, this.props.chooseCount, 'should false chooseCount')
  //     return false
  //   }
  // }
  addSelectItem(index, findex) {
    const { dispathaddSelectItem } = this.props
    dispathaddSelectItem(index, findex)
  }
  minusSelectItem() {
    const { dispathminusSelectItem } = this.props
    dispathminusSelectItem()
  }
}

const mapState = state => ({
  chooseCount: state.getIn(['menu', 'chooseCount']),
  foodData: state.getIn(['menu', 'foodData']),
  currentLeftIndex: state.getIn(['menu', 'currentLeftIndex']),
  price: state.getIn(['menu', 'price'])
})

const mapDispatch = dispatch => ({
  dispathaddSelectItem(index, findex) {
    dispatch(actionCreators.addSelectItem(index, findex))
  },
  dispathminusSelectItem(count) {
    dispatch(actionCreators.minusSelectItem(count))
  }
})

export default connect(
  mapState,
  mapDispatch
)(cartControl)
