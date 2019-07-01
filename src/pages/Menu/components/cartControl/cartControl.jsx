import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends Component {
  render() {
    const { chooseCount, index, findex, shopCarTotal } = this.props
    console.log(chooseCount, 'chooseCount cartControl render')
    return (
      <div className='cartControl-wrapper'>
        {/* { chooseCount > 0 ? <span className='cart-count'>{chooseCount}</span> : null } */}
        {
          chooseCount > 0
            ? <CSSTransition
              timeout ={1000}
              classNames ='fade'
            >
              <Fragment>
                <div className='cart-decrease'>
                  <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem(index, findex)}></span>
                </div>
                <span className='cart-count'>{chooseCount} {shopCarTotal}</span>
              </Fragment>
            </CSSTransition>
            : null
        }
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem(index, findex)}></span>
      </div>
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.chooseCount !== this.props.chooseCount) {
      console.log(nextProps.chooseCount, '>>>', this.props.chooseCount, 'should true chooseCount')
      return true
    } else {
      console.log(nextProps.chooseCount, '>>>', this.props.chooseCount, 'should false chooseCount')
      return false
    }
  }
  addSelectItem(index, findex) {
    const { dispathaddSelectItem, dispathshopCarTotal } = this.props
    dispathaddSelectItem(index, findex)
    dispathshopCarTotal()
  }
  minusSelectItem(index, findex) {
    const { dispathminusSelectItem } = this.props
    dispathminusSelectItem(index, findex)
  }
}

const mapState = state => ({
//   foodData: state.getIn(['menu', 'foodData']),
//   currentLeftIndex: state.getIn(['menu', 'currentLeftIndex']),
//   price: state.getIn(['menu', 'price'])
  shopCarTotal: state.getIn(['menu', 'shopCarTotal'])
})

const mapDispatch = dispatch => ({
  dispathaddSelectItem(index, findex) {
    dispatch(actionCreators.addSelectItem(index, findex))
  },
  dispathminusSelectItem(index, findex) {
    dispatch(actionCreators.minusSelectItem(index, findex))
  },
  dispathshopCarTotal() {
    dispatch(actionCreators.shopCarTotal())
  }
})

export default connect(
  mapState,
  mapDispatch
)(cartControl)
