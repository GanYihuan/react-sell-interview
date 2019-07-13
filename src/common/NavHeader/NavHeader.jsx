import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import StarScore from 'StarScore/StarScore'
import { actionCreators } from './store'
import './NavHeader.styl'

@withRouter
class NavHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailShow: false,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
  render() {
    const { tabs, navHeader } = this.props
    const tabsArray = tabs.toJS()
    const supports = navHeader.toJS().supports
    return (
      <div className='header'>
        <div className='content-wrapper'>
          <div
            className='back'
            onClick={() => this.goBack()}
          >
            <i className='icon-arrow_lift' />
          </div>
          <div className='avatar'>
            <img src={navHeader.get('avatar')} />
          </div>
          <div className='content'>
            <div className='title'>
              <span className='brand' />
              <span className='name'>{navHeader.get('name')}</span>
            </div>
            <div className='description'>
              {navHeader.get('description')} / {navHeader.get('deliveryTime')}分钟送达
            </div>
            <div
              className='support'
            >
              <span className='icon decrease'/>
              <span className='text'>
                {navHeader.getIn(['infos', 0])}
              </span>
            </div>
            <div
              className='support-count'
              onClick={() => this.showDetail()}
            >
              <span className='count'>{navHeader.get('deliveryPrice')}个</span>
              <i className='icon-keyboard_arrow_right' />
            </div>
          </div>
        </div>
        <div className='bulletin-wrapper'>
          <span className='bulletin-title' /><span className='bulletin-text'>{navHeader.get('bulletin')}</span>
          <i className='icon-keyboard_arrow_right' />
        </div>
        <div className='background'>
          <img src={navHeader.get('avatar')}/>
        </div>
        <div className='tab border-1px'>
          {this.renderTabs()}
        </div>
        {
          this.state.detailShow
            ? <CSSTransition in={this.state.detailShow} timeout ={1000} classNames ='fade' unmountOnExit appear={true}>
              <div className='detail'>
                <div className='detail-wrapper clearfix'>
                  <div className='detail-main'>
                    <h1 className='name'>
                      {navHeader.get('name')}
                    </h1>
                    <div className='star-wrapper'>
                      <StarScore score={navHeader.get('foodScore')} size={48}/>
                    </div>
                    <div className='title'>
                      <div className='line' />
                      <div className='text'>
                      优惠信息
                      </div>
                      <div className='line' />
                    </div>
                    <ul className='supports'>
                      {
                        supports !== undefined
                          ? supports.map((item, index) => {
                            const icon = this.state.classMap[item.type] + ' icon'
                            return (
                              <li key={index} className='support-item'>
                                <span className={icon}></span>
                                <span className='text'>{item.description}</span>
                              </li>
                            )
                          })
                          : null
                      }
                    </ul>
                    <div className='title'>
                      <div className='line' />
                      <div className='text'>
                      商家公告
                      </div>
                      <div className='line' />
                    </div>
                    <div className='bulletin'>
                      <p className='content'>
                        {navHeader.get('bulletin')}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='detail-close' onClick={() => this.hideDetail()}>
                  <i className='icon-close' />
                </div>
              </div>
            </CSSTransition>
            : null
        }
      </div>
    )
  }
  componentDidMount() { // async, get ajax async data
    const { addArticleList } = this.props
    addArticleList()
  }
  renderTabs() {
    const { tabs, name, img } = this.props
    const newList = tabs.toJS()
    return newList.map((item) => {
      return (
        <div className='tab-item' key={item.key}>
          <NavLink
            className='btn-Item'
            activeClassName='activeDes'
            replace={true}
            to={`/${item.key}/${name}&${encodeURIComponent(img)}`}
          >
            <div className='icon' />
            <div className='des'>{item.name}</div>
          </NavLink>
        </div>
      )
    })
  }
  goBack() {
    this.props.history.push(`/home`)
  }
  showDetail() {
    this.setState(() => {
      return {
        detailShow: !this.state.detailShow
      }
    })
  }
  hideDetail() {
    this.setState(() => {
      return {
        detailShow: !this.state.detailShow
      }
    })
  }
}

const mapState = state => ({
  tabs: state.getIn(['main', 'tabs']),
  navHeader: state.getIn(['main', 'navHeader'])
})

const mapDispatch = dispatch => ({
  addArticleList() {
    dispatch(actionCreators.getNavHeaderData())
  }
})

export default connect(
  mapState,
  mapDispatch
)(NavHeader)
