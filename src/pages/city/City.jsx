import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import Scroll from 'Scroll/Scroll'
import { actionCreators } from './store'
import './city.styl'

@withRouter
class City extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      scrollIndex: 1,
      list: []
    }
  }
  render() {
    const {
      city,
      hotCity,
      currentCity
    } = this.props
    const hotCitys = hotCity.toJS()
    const citys = city.toJS()
    const cityAlphabet = []
    for (const item of citys) {
      cityAlphabet.push(item[0])
    }
    return (
      <div className='City'>
        <div className='cityHeader'>
          城市选择
          <div className='iconfont header-back' onClick={() => this.goBack()}>
            <i className='icon-arrow_lift' />
          </div>
        </div>
        <div className='search-wrapper'>
          <div className='search'>
            <input
              value={ this.state.keyword }
              ref={input => (this.second = input)}
              onChange={() => this.handleInputChange()}
              className='search-input'
              type='text'
              placeholder='输入城市名或拼音'
            />
          </div>
          {
            this.state.keyword !== ''
              ? <div
                className='search-content'
                ref='searchList'
              >
                <div>
                  {
                    this.state.list
                      ? this.state.list.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='search-item border-bottom'
                            onClick={() => { this.setCurrentCity(item) }}
                          >
                            {item}
                          </div>
                        )
                      })
                      : <li
                        className='search-item border-bottom'
                      >
                        没有找到匹配数据
                      </li>
                  }
                </div>
              </div>
              : <div ref='searchList'><div></div></div>
          }
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
                    {currentCity}
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
                        onClick={() => { this.setCurrentCity(item.name) }}
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
                    ref='cities'
                  >
                    <div className='title border-topbottom' ref={(citiesItem) => { this.citiesItem = citiesItem }} ref='citiesItems'>
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
        <div className='alphabet'>
          {
            this.state.keyword !== ''
              ? null
              : cityAlphabet.map((item, index) => {
                return (
                  <div
                    className='alphabet-item'
                    key={index}
                    onClick={() => { this.handleLetterClick(index) }}
                  >
                    {item}
                  </div>
                )
              })
          }
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
    if (!this.eScroll) {
      this.eScroll = new BScroll(this.refs.searchList, {
        click: true
      })
    }
  }
  componentWillUnmount() {
    const { dispathClearCity } = this.props
    dispathClearCity()
  }
  goBack() {
    this.props.history.push('/home')
  }
  handleLetterClick(index) {
    const cities = this.refs.list.getElementsByClassName('cities')
    const el = cities[index]
    this.sScroll.scrollToElement(el, 300)
  }
  handleInputChange() {
    const { city } = this.props
    const citys = city.toJS()
    this.setState(() => {
      return {
        keyword: this.second.value
      }
    })
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => { // Throttling function
      const result = []
      citys.forEach((item, index) => {
        item[1].forEach((jitem, jindex) => {
          if (jitem.name.indexOf(this.state.keyword) > -1 || jitem.spell.indexOf(this.state.keyword) > -1) {
            result.push(jitem.name)
          }
        })
      })
      this.setState(() => {
        return {
          list: result
        }
      })
    }, 100)
  }
  setCurrentCity(city) {
    const { dispathSetCurrentCity } = this.props
    dispathSetCurrentCity(city)
    this.setState(() => {
      return {
        keyword: ''
      }
    })
  }
}

const mapState = state => ({
  city: state.getIn(['city', 'city']),
  hotCity: state.getIn(['city', 'hotCity']),
  currentCity: state.getIn(['city', 'currentCity'])
})

const mapDispatch = dispatch => ({
  dispathCity() {
    dispatch(actionCreators.getCityData())
  },
  dispathSetCurrentCity(city) {
    dispatch(actionCreators.setCurrentCity(city))
  },
  dispathClearCity() {
    dispatch(actionCreators.clearCity())
  }
})

export default connect(
  mapState,
  mapDispatch
)(City)
