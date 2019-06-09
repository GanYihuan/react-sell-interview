import React from 'react'
import { connect } from 'react-redux'
import StarScore from '../../common/StarScore/StarScore'
import './ListItem.scss'

class ListItem extends React.Component {
  /**
   * 渲染是否是新到和品牌标签
   * @param {*} data
   */
  renderBrand(data) {
    if (data) {
      return <div className='brand brand-pin'>品牌</div>
    } else {
      return <div className='brand brand-xin'>新到</div>
    }
  }
  /**
   * 渲染月售数量
   * @param {*} data
   */
  renderMonthNum(data) {
    const num = data
    if (num > 999) { // 大于999采用999+
      return '999+'
    }
    return num
  }
  /**
   * 是否需要渲染美团专送tag
   * @param {*} data
   */
  renderMeituanFlag(data) {
    if (data) {
      return <div className='item-meituan-flag'>美团专送</div>
    }
    return null
  }
  /**
   * 渲染商家活动
   * @param {*} data
   */
  renderOthers(data) {
    const array = data
    return array.map((item, index) => {
      return (
        <div className='other-info' key={index}>
          <img className='other-tag' src={item.icon_url}/>
          <div className='other-content'>{item.info}</div>
        </div>
      )
    })
  }
  goDetail(data) {
    window.location.href = './detail.html?id=' + data.id
  }
  render() {
    const data = this.props.itemData // itemData: father pass
    return (
      <div className='r-item-content scale-1px'>
        <img className='item-img' src={data.get('pic_url')} />
        {this.renderBrand(data.get('brand_type'))}
        <div className='item-info-content'>
          <p className='item-title'>{data.get('name')}</p>
          <div className='item-desc clearfix'>
            <div className='item-score'><StarScore score={data.get('wm_poi_score')}/></div>
            <div className='item-count'>月售{this.renderMonthNum(data.get('month_sale_num'))}</div>
            <div className='item-distance'>&nbsp;{data.get('distance')}</div>
            <div className='item-time'>{data.get('mt_delivery_time')}&nbsp;|</div>
          </div>
          <div className='item-price'>
            <div className='item-pre-price'>{data.get('min_price_tip')}</div>
            {this.renderMeituanFlag(data.get('delivery_type'))}
          </div>
          <div className='item-others'>
            {this.renderOthers(data.get('discounts2'))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem
