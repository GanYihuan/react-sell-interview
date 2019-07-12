import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { actionCreators } from './store'
import NavHeader from 'NavHeader/NavHeader'
import ShopBar from './components/shopBar/shopBar'
import CartControl from './components/cartControl/cartControl'
import './Menu.styl'

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [], /* An array of the heights of each element on the right side */
      scrollY: 0, // foodsScroll Real-time scroll position scrollY
      name: '',
      img: ''
    }
  }
  render() {
    const { menuData, currentLeftIndex } = this.props
    const menuDatas = menuData.toJS()
    return (
      <div>
        <NavHeader/>
        <div className='goods'>
          <div className='menu-wrapper'>
            <div className='left-bar'>
              <div className='scroll-view' ref='menuWrapper'>
                <div className='menu-wrapper'>
                  {
                    menuDatas.map((item, index) => {
                      const cls = index === currentLeftIndex ? 'menu-item current' : 'menu-item'
                      const iconF = (type) => {
                        const mapN = this.state.classMap[type]
                        return (
                          `icon ${mapN}`
                        )
                      }
                      return (
                        <div className={cls} key={index} onClick={() => this.itemClick(index)}>
                          <div className='text border-1px'>{item.type > 0 ? <img className={iconF(item.type)} /> : null}{item.name}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='scroll-view' ref='foodsWrapper'>
            <div className='foods-wrapper'>
              {
                menuDatas.map((item, index) => {
                  return (
                    <div className='food-list food-list-hook' key={index}>
                      <h1 className='title'>{item.name}</h1>
                      <div>
                        {
                          item.foods.map((fitem, findex) => {
                            return (
                              <div
                                className='food-item border-1px'
                                key={findex}
                              >
                                <div className='icon'>
                                  <img src={fitem.icon}/>
                                </div>
                                <div className='content'>
                                  <h2 className='name'>{fitem.name}</h2>
                                  <p className='desc'>{fitem.description}</p>
                                  <div className='extra'>
                                    <span className='count'>月售 {fitem.sellCount} 份</span><span>好评率 {fitem.rating}%</span>
                                  </div>
                                  <div className='price'>
                                    <span className='now'>￥{fitem.price}</span>
                                    <span className='old'>￥{fitem.oldPrice}</span>
                                  </div>
                                  <CartControl chooseCount={fitem.chooseCount} index={index} findex={findex} name={fitem.name}/>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <ShopBar name={this.state.name} img={this.state.img} />
      </div>
    )
  }
  componentDidMount() {
    const { dispathMenuData, dispatchgetFoodData, match } = this.props
    const name = match.params.name
    const img = decodeURIComponent(match.params.img)
    this.setState(() => {
      return {
        name: name,
        img: img
      }
    })
    dispathMenuData()
    if (!this.mScroll) {
      this.mScroll = new BScroll(this.refs.menuWrapper, {
        click: true
      })
    }
    if (!this.fScroll) {
      this.fScroll = new BScroll(this.refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
    }
    this.foodsWrapperHeight()
    this.fScroll.on('scroll', pos => {
      this.setState(() => {
        return {
          scrollY: Math.abs(Math.round(pos.y))
        }
      })
      // this.changeLeftIndex()
    })
  }
  itemClick(index) {
    const { dispathSetLeftItemIndex } = this.props
    const foodList = this.refs.foodsWrapper.getElementsByClassName('food-list-hook')
    const el = foodList[index]
    this.fScroll.scrollToElement(el, 300)
    dispathSetLeftItemIndex(index)
  }
  foodsWrapperHeight() {
    const foodList = this.refs.foodsWrapper.getElementsByClassName('food-list-hook')
    let height = 0
    const setlistHeight = []
    setlistHeight.push(height)
    for (let i = 0; i < foodList.length; i++) {
      const item = foodList[i]
      height += item.clientHeight
      setlistHeight.push(height)
    }
    this.setState(() => {
      return {
        listHeight: setlistHeight
      }
    })
  }
  changeLeftIndex() {
    const { dispatchChangeLeftIndex } = this.props
    for (let i = 0; i < this.state.listHeight.length; i++) {
      const height1 = this.state.listHeight[i] /* The height of the current index value */
      const height2 = this.state.listHeight[i + 1] /* Next height */
      if (!height2 || (this.state.scrollY >= height1 && this.state.scrollY < height2)) {
        dispatchChangeLeftIndex(i)
      }
    }
  }
}

const mapState = state => ({
  menuData: state.getIn(['menu', 'menuData']),
  currentLeftIndex: state.getIn(['menu', 'currentLeftIndex'])
})

const mapDispatch = dispatch => ({
  dispathMenuData() {
    dispatch(actionCreators.getMenuData())
  },
  dispathSetLeftItemIndex(index) {
    dispatch(actionCreators.setLeftItemIndex(index))
  },
  dispatchChangeLeftIndex(index) {
    dispatch(actionCreators.getChangeLeftIndex(index))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Menu)
