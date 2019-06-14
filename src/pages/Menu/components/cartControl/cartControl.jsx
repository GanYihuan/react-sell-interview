import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends React.Component {
  render() {
    const { chooseCount, fuck } = this.props
    console.log(fuck, 'fuck')
    console.log(chooseCount, 'chooseCount render')
    const hideDesc = chooseCount === 0 ? 'cart-decrease hideDesc' : 'cart-decrease'
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
        <span className='cart-count'>{chooseCount}</span>
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem()}></span>
      </div>
    )
  }
  addSelectItem() {
    const { dispathaddSelectItem, chooseCount } = this.props
    const passCount = chooseCount === 0 ? 0 : chooseCount + 1
    dispathaddSelectItem(passCount)
  }
  minusSelectItem() {
    const { dispathminusSelectItem, chooseCount } = this.props
    const passCount = chooseCount === 0 ? 0 : chooseCount - 1
    dispathminusSelectItem(passCount)
  }
}

const mapState = state => ({
  chooseCount: state.getIn(['menu', 'chooseCount']),
  fuck: state.getIn(['menu', 'fuck'])
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
