import React from 'react'
import { connect } from 'react-redux'
// import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store'
import './cartControl.styl'

class cartControl extends React.Component {
  render() {
    const { chooseCount } = this.props
    console.log(chooseCount, 'chooseCount...')
    const hideDesc = chooseCount === 0 ? 'cart-decrease hideDesc' : 'cart-decrease'
    return (
      <div className='cartControl-wrapper'>
        <div className={hideDesc}>
          <span className='inner icon-remove_circle_outline' onClick={() => this.minusSelectItem()}></span>
        </div>
        <span className='cart-count'>1</span>
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem()}></span>
      </div>
    )
  }
  addSelectItem() {
    const { dispathaddSelectItem, chooseCount } = this.props
    const chooseCounts = chooseCount
    const passCount = chooseCounts === 0 ? 0 : chooseCounts + 1
    console.log(passCount, 'add passCount')
    dispathaddSelectItem(passCount)
  }
  minusSelectItem() {
    const { dispathminusSelectItem, chooseCount } = this.props
    const chooseCounts = chooseCount
    const passCount = chooseCounts === 0 ? 0 : chooseCounts - 1
    console.log(passCount, 'minus passCount')
    dispathminusSelectItem(passCount)
  }
}

const mapState = state => ({
  chooseCount: state.getIn(['menu', 'chooseCount'])
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
