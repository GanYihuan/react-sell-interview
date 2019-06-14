import React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from '../../store/index'
import './cartControl.styl'

class cartControl extends React.Component {
  render() {
    const { chooseCount, fuck } = this.props
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
        <span className='cart-count'>{fuck - 1}</span>
        <span className='cart-add icon-add_circle' onClick={() => this.addSelectItem()}></span>
      </div>
    )
  }
  addSelectItem() {
    const { dispathaddSelectItem, fuck, foodData, currentLeftIndex, num, cartControlCount } = this.props
    const foodDatas = foodData.toJS()
    // console.log(foodDatas[num].cartControlCount, 'foodData cartControl!')
    console.log(cartControlCount, 'cartControlCount')
    dispathaddSelectItem()
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
  cartControlCount: state.getIn(['menu', 'cartControlCount'])
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
