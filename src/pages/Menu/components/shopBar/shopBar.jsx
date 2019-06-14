import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../../store'
import './shopBar.styl'

class ShopBar extends React.Component {
  componentDidMount() {
    const { dispathaddSelectItem, dispatchgetFoodData, dispathNavHeader } = this.props
    dispathaddSelectItem()
    dispatchgetFoodData()
    dispathNavHeader()
  }
  render() {
    const { foodData, navHeader } = this.props
    const foodDatas = foodData.toJS()
    // const shipping_fee = listData.getIn(['poi_info', 'poi_info']) ? this.props.listData.poi_info.shipping_fee : 0
    const data = this.getTotalPrice()
    return (
      <div className='shopCart'>
        {
          this.props.showChooseContent
            ? <div className='choose-content'>
              <div className='content-top'>
                <div className='clear-car' onClick={() => this.clearCar()}>清空购物车</div>
              </div>
              {this.renderChooseItem(data)}
            </div>
            : null
        }
        <div className='content'>
          <div className='content-left'>
            <div className='logo-wrapper' onClick={() => this.openChooseContent()}>
              {/* {data.dotNum > 0 ? <div className='dot-num'>{data.dotNum}</div> : null} */}
              <div className='logo'>
                <i className='icon-shopping_cart'></i>
              </div>
              <div className='num' v-show='totalCount>0'>1</div>
            </div>
            <div className='price'>￥{this.getTotalPrice()}</div>
            <div className='desc'>另需配送费￥{navHeader.get('deliveryPrice')}</div>
          </div>
          <div className='content-right'>
            <div className='pay'>{this.payDesc()}</div>
          </div>
        </div>
      </div>
    )
  }
  payDesc() {
    if (this.totalPrice === 0) {
      return `￥${this.minPrice}元起送`
    } else if (this.totalPrice < this.minPrice) {
      const diff = this.minPrice - this.totalPrice
      return `还差￥${diff}元起送`
    } else {
      return '去结算'
    }
  }
  totalPrice() {
    let total = 0
    this.selectFoods.forEach(food => {
      total += food.price * food.count
    })
    return total
  }
  getTotalPrice() {
    const { foodData } = this.props
    const foodDatas = foodData.toJS()
    const chooseList = []
    const totalPrice = 0
    const dotNum = 0
    for (let i = 0; i < foodDatas.length; i++) {
      console.log(foodDatas[i])
    }
    // const listData = this.props.listData.food_spu_tags || []
    // let totalPrice = 0
    // let dotNum = 0
    // const chooseList = []
    // for (let i = 0; i < listData.length; i++) {
    //   const spus = listData[i].spus || []
    //   for (let j = 0; j < spus.length; j++) {
    //     const chooseCount = spus[j].chooseCount
    //     if (chooseCount > 0) {
    //       dotNum += chooseCount
    //       spus[j]._index = j
    //       spus[j]._outIndex = i
    //       chooseList.push(spus[j])
    //       totalPrice += spus[j].min_price * chooseCount
    //     }
    //   }
    // }
    // return {
    //   dotNum,
    //   totalPrice,
    //   chooseList
    // }
    return '100'
  }
  addSelectItem(item) {
    const { dispathaddSelectItem } = this.props
    dispathaddSelectItem(item)
  }
  minusSelectItem(item) {
    const { dispathminusSelectItem } = this.props
    dispathminusSelectItem(item)
  }
  openChooseContent() {
    const { showChooseContent, dispathshowChoose } = this.props
    const flag = showChooseContent
    dispathshowChoose(flag)
  }
  renderChooseItem(data) {
    const array = data.chooseList || []
    return array.map((item, index) => {
      return (
        <div className='choose-item' key={index}>
          <div className='item-name'>{item.name}</div>
          <div className='price'>¥{item.min_price * item.chooseCount}</div>
          <div className='select-content'>
            <div className='minus' onClick={() => this.minusSelectItem(item)}></div>
            <div className='count'>{item.chooseCount}</div>
            <div className='plus' onClick={() => this.addSelectItem(item)}></div>
          </div>
        </div>
      )
    })
  }
  clearCar() {
  }
}

const mapState = state => ({
  foodData: state.getIn(['menu', 'foodData']),
  showChooseContent: state.getIn(['menu', 'showChooseContent']),
  navHeader: state.getIn(['menu', 'navHeader'])
})

const mapDispatch = dispatch => ({
  dispathaddSelectItem() {
    dispatch(actionCreators.addSelectItem())
  },
  dispathminusSelectItem() {
    dispatch(actionCreators.minusSelectItem())
  },
  dispatchgetFoodData() {
    dispatch(actionCreators.getFoodData())
  },
  dispathshowChoose() {
    dispatch(actionCreators.showChoose())
  },
  dispathNavHeader() {
    dispatch(actionCreators.getNevHeader())
  }
})

export default connect(
  mapState,
  mapDispatch
)(ShopBar)
