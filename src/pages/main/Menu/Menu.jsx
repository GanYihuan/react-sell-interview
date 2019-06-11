import React from 'react'
import { connect } from 'react-redux'
// import { getListData, itemClick } from '../actions/menuAction'
// import MenuItem from './MenuItem/MenuItem.jsx'
// import ShopBar from './ShopBar/ShopBar.jsx'
import './Menu.scss'

/**
 * 点菜 tab 页面
 * @description <Menu />
 */
class Menu extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.props.dispatch(getListData()) // 异步操作 所以可在 constructor 里面操作
  // }
  renderRightList(array) {
    const _array = array || []
    return _array.map((item, index) => {
      if (!item.chooseCount) {
        item.chooseCount = 0
      }
      return <MenuItem key={index} data={item} _index={index}></MenuItem>
    })
  }
  /**
   * 点击切换右边数据
   */
  itemClick(index) {
    // this.props.dispatch(itemClick({
    //   currentLeftIndex: index
    // }))
  }
  /**
   * 渲染右边的列表
   */
  renderRight() {
    const index = this.props.currentLeftIndex
    const array = this.props.listData.food_spu_tags || []
    const currentItem = array[index]
    if (currentItem) {
      const title = <p className='right-title' key={1}>{currentItem.name}</p>
      return [
        title,
        <div className='right-list' key={2}><div className='right-list-inner'>{this.renderRightList(currentItem.spus)}</div></div>
      ]
    } else {
      return null
    }
  }
  /**
   * 渲染左边的列表
   */
  renderLeft() {
    const list = this.props.listData.food_spu_tags || []
    return list.map((item, index) => {
      const cls = this.props.currentLeftIndex === index ? 'left-item active' : 'left-item'
      return (
        <div className={cls} key={index} onClick={() => this.itemClick(index)}>
          <div className='item-text'>{item.icon ? <img className='item-icon' src={item.icon} /> : null}{item.name}</div>
        </div>
      )
    })
  }
  render() {
    return (
      <div className='menu-inner'>
        <div className='left-bar'>
          <div className='left-bar-inner'>
            {this.renderLeft()}
          </div>
        </div>
        <div className='right-content'>
          {this.renderRight()}
        </div>
        <ShopBar />
      </div>
    )
  }
}

export default connect(
)(Menu)
