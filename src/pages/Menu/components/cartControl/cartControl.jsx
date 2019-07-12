import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends Component {
  render() {
    const { chooseCount, index, findex, name } = this.props // chooseCount -> 选择了多少件, index -> 食物是哪组(单人精彩套餐为一组), findex -> 该组中的第几位
    return (
      <div className='cartControl-wrapper'>
        {
          chooseCount > 0
            ? <CSSTransition
              timeout ={1000}
              classNames ='fade'
            >
              <Fragment>
                <div className='cart-decrease'>
                  <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem(index, findex, name)}></span>
                </div>
                <span className='cart-count'>{chooseCount}</span>
              </Fragment>
            </CSSTransition>
            : null
        }
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem(index, findex, name)}></span>
      </div>
    )
  }
  addSelectItem(index, findex, name) {
    const { dispathaddSelectItem, dispathaddshopCarTotal, dispatchaddshopCarData } = this.props
    dispathaddSelectItem(index, findex)
    dispathaddshopCarTotal()
    dispatchaddshopCarData(index, findex, name)
  }
  minusSelectItem(index, findex, name) {
    const { dispathminusSelectItem, dispathdecshopCarTotal, dispatchdecshopCarData, chooseCount, dispatchdeleteSelectItem } = this.props
    dispathminusSelectItem(index, findex)
    dispathdecshopCarTotal()
    dispatchdecshopCarData(name)
    if (chooseCount === 1) {
      dispatchdeleteSelectItem(name)
    }
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
  dispathaddSelectItem(index, findex) {
    dispatch(actionCreators.addSelectItem(index, findex))
  },
  dispathminusSelectItem(index, findex) {
    dispatch(actionCreators.minusSelectItem(index, findex))
  },
  dispathaddshopCarTotal() {
    dispatch(actionCreators.addshopCarTotal())
  },
  dispathdecshopCarTotal() {
    dispatch(actionCreators.decshopCarTotal())
  },
  dispatchaddshopCarData(index, findex, name) {
    dispatch(actionCreators.addshopCarData(index, findex, name))
  },
  dispatchdecshopCarData(name) {
    dispatch(actionCreators.decshopCarData(name))
  },
  dispatchdeleteSelectItem(name) {
    dispatch(actionCreators.deleteSelectItem(name))
  }
})

export default connect(
  mapState,
  mapDispatch
)(cartControl)
