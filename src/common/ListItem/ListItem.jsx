import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StarScore from 'StarScore/StarScore'
import './ListItem.scss'

@withRouter
class ListItem extends Component {
  renderBrand(data) {
    if (data) {
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
    if (data > 0) {
      return <div className='item-delivery-type'>美团专送</div>
    }
    return null
  }
  renderOthers(data) {
    const array = data
    return array.map((item, index) => {
      return (
        <div className='other-info' key={index}>
          <img className='other-tag' src={item.get('icon_url')}/>
          <div className='other-content'>{item.get('info')}</div>
        </div>
      )
    })
  }
  goMenu() {
    this.props.history.push(`/restanurant`) // withRouter
  }
  render() {
    const { itemData } = this.props
    return (
      <div className='item border-bottom' onClick={() => this.goMenu()}>
        <img className='item-img' src={itemData.get('pic_url')} />
        {this.renderBrand(itemData.get('brand_type'))}
        <div className='item-info'>
          <p className='item-title'>{itemData.get('name')}</p>
          <div className='item-desc clearfix'>
            <div className='item-score'><StarScore score={itemData.get('wm_poi_score')}/></div>
            <div className='item-count'>月售{this.renderMonthNum(itemData.get('month_sale_num'))}</div>
            <div className='item-distance'>&nbsp;{itemData.get('distance')}</div>
            <div className='item-time'>{itemData.get('mt_delivery_time')}&nbsp;|</div>
          </div>
          <div className='item-price'>
            <div className='item-pre-price'>{itemData.get('min_price_tip')}</div>
            {this.renderMeituanFlag(itemData.get('delivery_type'))}
          </div>
          <div className='item-others'>
            {this.renderOthers(itemData.get('discounts2'))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem
