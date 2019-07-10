import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import StarScore from 'StarScore/StarScore'
import './ListItem.styl'

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
    if (data === 1) {
      return <div className='highlight'>美团专送</div>
    } else {
      return <div className='item-delivery-type'>美团专送</div>
    }
  }
  goMenu() {
    this.props.history.push(`/restanurant`) // withRouter
  }
  render() {
    const { itemData } = this.props
    return (
      <div className='item border-bottom' onClick={() => this.goMenu()}>
        <img className='item-img' src={itemData.pic_url} />
        {this.renderBrand(itemData.brand_type)}
        <div className='item-info'>
          <p className='item-title'>{itemData.name}</p>
          <div className='item-desc clearfix'>
            <div className='item-score'><StarScore score={itemData.wm_poi_score} size={24}/></div>
            <div className='item-count'>月售{this.renderMonthNum(itemData.month_sale_num)}</div>
            <div className='item-distance'>&nbsp;{itemData.distance}</div>
            <div className='item-time'>{itemData.mt_delivery_time}&nbsp;|</div>
          </div>
          <div className='item-price'>
            <div className='item-pre-price'>{itemData.min_price_tip}</div>
            {this.renderMeituanFlag(itemData.delivery_type)}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem
