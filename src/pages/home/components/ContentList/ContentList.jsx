import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StarScore from 'StarScore/StarScore'
import { actionCreators } from 'home/store'
import './ContentList.styl'

@withRouter
class ContentList extends PureComponent {
  render() {
    const { list } = this.props
    const listArray = list.toJS()
    return (
      <div className='list-content'>
        <h4 className='list-title'>
          <span className='title-line'></span>
          <span>附近商家</span>
          <span className='title-line'></span>
        </h4>
        {
          listArray.map((item, index) => {
            return (
              <div className='item border-bottom' key={index} onClick={() => this.goMenu(item.name, encodeURIComponent(item.pic_url))}>
                <img className='item-img' src={item.pic_url} />
                {this.renderBrand(item.delivery_type)}
                <div className='item-info'>
                  <p className='item-title'>{item.name}</p>
                  <div className='item-desc clearfix'>
                    <div className='item-score'><StarScore score={item.wm_poi_score} size={24}/></div>
                    <div className='item-count'>月售{this.renderMonthNum(item.month_sale_num)}</div>
                    <div className='item-distance'>&nbsp;{item.distance}</div>
                    <div className='item-time'>{item.mt_delivery_time}&nbsp;|</div>
                  </div>
                  <div className='item-price'>
                    <div className='item-pre-price'>{item.min_price_tip}</div>
                    {this.renderMeituanFlag(item.delivery_type)}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
  componentDidMount() { // async, get ajax async data
    const { addArticleList, currentCity } = this.props
    if (currentCity === '广州') {
      addArticleList('cmerchants')
    }
    if (currentCity === '深圳') {
      addArticleList('merchants')
    }
  }
  renderBrand(data) {
    if (data > 0) {
      return <div className='brand brand-pin'>品牌</div>
    } else {
      return <div className='brand brand-xin'>新到</div>
    }
  }
  renderMonthNum(data) {
    const num = data
    if (num > 999) {
      return '999+'
    }
    return num
  }
  renderMeituanFlag(data) {
    if (data === 1) {
      return <div className='highlight'>美团专送</div>
    } else {
      return <div className='item-delivery-type'>美团专送</div>
    }
  }
  goMenu(name, img) {
    const { dispatchsellerInfo } = this.props
    dispatchsellerInfo(name, img)
    this.props.history.push(`/good/${name}&${img}`) // withRouter
  }
}

const mapState = state => ({
  list: state.getIn(['home', 'list']),
  currentCity: state.getIn(['city', 'currentCity'])
})

const mapDispatch = dispatch => ({
  addArticleList(merchants) {
    dispatch(actionCreators.getListData(merchants))
  },
  dispatchsellerInfo(name, img) {
    dispatch(actionCreators.sellerInfo(name, img))
  }
})

export default connect(
  mapState,
  mapDispatch
)(ContentList)
