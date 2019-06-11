import React from 'react'
import { connect } from 'react-redux'
import './NavHeader.scss'

/**
 * @constructor <NavHeader title={string}/>
 * @description 导航栏
 */
class NavHeader extends React.Component {
  goBack() {
    // window.history.back()
    // jsinvoke({
    //   cmd: 'goBack',
    //   data: {}
    // });
  }
  render() {
    return (
      <div className='nav'>
        <div onClick={() => this.goBack()} className='back-icon'></div>
        <h4 className='title'>{this.props.title}</h4>
      </div>
    )
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
})

export default connect(
  mapState,
  mapDispatch
)(NavHeader)
