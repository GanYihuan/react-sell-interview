import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' // withRouter 是高阶组件，即一个函数返回一个组件。返回的组件外层是 Route ， Route 的 children 属性里渲染接收到的组件
import { actionCreators } from 'home/store'
import StarScore from 'StarScore/StarScore'
import './contentList.styl'

@withRouter
class ContentList extends PureComponent {
  render() {
    const { list, currentCity } = this.props
    const cityArray = list.toJS()
    const listArray = cityArray.filter((item, index) => {
      return item.city === currentCity
    })
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
  componentDidMount() {
    const { addArticleList } = this.props
    addArticleList()
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
  addArticleList() {
    dispatch(actionCreators.getListData())
  },
  dispatchsellerInfo(name, img) {
    dispatch(actionCreators.sellerInfo(name, img))
  }
})

export default connect(
  mapState,
  mapDispatch
)(ContentList)
