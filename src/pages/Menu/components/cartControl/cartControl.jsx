import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends Component {
  render() {
    const { chooseCount, index, findex } = this.props
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
                  <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem(index, findex)}></span>
                </div>
                <span className='cart-count'>{chooseCount}</span>
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
      return true
    } else {
      return false
    }
  }
  addSelectItem(index, findex) {
    const { dispathaddSelectItem, dispathaddshopCarTotal, dispathdecaddshopCarData } = this.props
    dispathaddSelectItem(index, findex)
    dispathaddshopCarTotal()
    dispathdecaddshopCarData(index, findex)
  }
  minusSelectItem(index, findex) {
    const { dispathminusSelectItem, dispathdecshopCarTotal, dispathdecdecshopCarData } = this.props
    dispathminusSelectItem(index, findex)
    dispathdecshopCarTotal()
    dispathdecdecshopCarData(index, findex)
  }
}

const mapState = state => ({
//   foodData: state.getIn(['menu', 'foodData']),
//   currentLeftIndex: state.getIn(['menu', 'currentLeftIndex']),
//   price: state.getIn(['menu', 'price'])
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
  dispathdecaddshopCarData(index, findex) {
    dispatch(actionCreators.addshopCarData(index, findex))
  },
  dispathdecdecshopCarData(index, findex) {
    dispatch(actionCreators.decshopCarData(index, findex))
  }
})

export default connect(
  mapState,
  mapDispatch
)(cartControl)
