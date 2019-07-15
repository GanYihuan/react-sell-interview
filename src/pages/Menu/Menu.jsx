import React, { Component } from 'react'
import { Route, withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import NavHeader from 'NavHeader/NavHeader'
import Good from './components/Good/Good'
import Rating from './components/Rating/Rating'
import Restanurant from './components/Restanurant/Restanurant'
import Food from './components/Food/Food'
import { actionCreators } from './store'

@withRouter
class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      img: ''
    }
  }
  render() {
    return (
      <div>
        <NavHeader name={this.state.name} img={this.state.img} />
        <Route path='/good' component={Good}/>
        <Route path='/rating' component={Rating}/>
        <Route path='/restanurant' component={Restanurant}/>
        <Route path='/food' component={Food}/>
      </div>
    )
  }
  componentDidMount() {
    const { match, dispathSaveSellerInfo } = this.props
    const name = match.params.name
    const img = decodeURIComponent(match.params.img)
    this.setState(() => {
      return {
        name: name,
        img: img
      }
    })
    dispathSaveSellerInfo(name, img)
  }
}

const mapState = state => ({
})

const mapDispatch = dispatch => ({
  dispathSaveSellerInfo(name, img) {
    dispatch(actionCreators.saveSellerInfo(name, img))
  }
})

export default connect(
  mapState,
  mapDispatch
)(Menu)
