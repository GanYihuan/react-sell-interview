import React from 'react'
import { connect } from 'react-redux'
// import { getRestanurantData } from '../actions/restanurantAction'
import NavHeader from '../../common/NavHeader/NavHeader'
import './Restanurant.scss'

class Restanurant extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.props.dispatch(getRestanurantData())
  // }
  // renderPayType(types) {
  //   const array = types || []
  //   return array.map((item, index) => {
  //     return <p key={index} className='restanurant-pay-type res-section'><img className='icon' src={item.icon_url}/>{item.info}</p>
  //   })
  // }
  render() {
    // const { resData } = this.props
    return (
      <div>
        <NavHeader/>
        <div className='restanurant-content'>
          <div className='restanurant-basic'>
            <div className='restanurant-tel res-section'>
              {/* {resData.call_center} */}
            a
            </div>
            <div className='restanurant-addr res-section'>
              <div className='addr-wrap'>
                <div className='addr-name'>商家地址：</div>
                <div className='addr-text'>
                  {/* {resData.address} */}
                b
                </div>
              </div>
            </div>
          </div>
          <div className='restanurant-basic'>
            <p className='restanurant-send-time res-section'>
              {/* 配送时间：{resData.shipping_time} */}
            c
            </p>
            <p className='restanurant-send-type res-section'>
              {/* 配送服务：{resData.delivery_type === 1 ? <span><span className='meituan-send'>美团专送</span>提供高质量配送服务</span> : '商家配送'} */}
            d
            </p>
          </div>
          <div className='restanurant-basic'>
            {/* {this.renderPayType(resData.discounts2)} */}
          e
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  // resData: state.getIn('restanurant', 'resData')
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(Restanurant)
