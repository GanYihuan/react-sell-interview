import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import './City.styl'

@withRouter
class City extends Component {
  render() {
    const {
      city,
      hotCity
    } = this.props
    const hotCitys = hotCity.toJS()
    const citys = city.toJS()
    return (
      <div className='City'>
        <div className='header' onClick={() => this.goBack()}>
          城市选择
          <div className='iconfont header-back'>
            <i className='icon-arrow_lift' />
          </div>
        </div>
        <div className='search-wrapper'>
          <div className='search'>
            <input
              className='search-input'
              type='text'
              placeholder='输入城市名或拼音'
            />
          </div>
        </div>
        <div className='list' ref='list'>
          <div>
            <div className='area'>
              <div className='title border-topbottom'>
              当前城市
              </div>
              <div className='button-list current'>
                <div className='button-wrapper'>
                  <div className='button'>
                  city
                  </div>
                </div>
              </div>
            </div>
            <div className='area'>
              <div className='title border-topbottom'>
              热门城市
              </div>
              <div className='button-list'>
                {
                  hotCitys.map((item, index) => {
                    return (
                      <div
                        className='button-wrapper'
                        key={index}
                      >
                        <div className='button'>
                          {item.name}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            {
              citys.map((item, index) => {
                return (
                  <div
                    className='area cities'
                    key={index}
                  >
                    <div className='title border-topbottom'>
                      {item[0]}
                    </div>
                    <div className='item-list'>
                      {
                        item[1].map((jitem, jindex) => {
                          return (
                            <div
                              className='item border-bottom'
                              key={jindex}
                            >
                              {jitem.name}
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
    )
  }
  componentDidMount() {
    const { dispathCity } = this.props
    dispathCity()
    if (!this.sScroll) {
      this.sScroll = new BScroll(this.refs.list, {
        click: true
      })
    }
  }
  goBack() {
    this.props.history.push('/home')
  }
}

const mapState = state => ({
  city: state.getIn(['city', 'city']),
  hotCity: state.getIn(['city', 'hotCity'])
})

const mapDispatch = dispatch => ({
  dispathCity() {
    dispatch(actionCreators.getCityData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(City)
