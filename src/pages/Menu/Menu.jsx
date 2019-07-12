import React, { Component } from 'react'
import NavHeader from 'NavHeader/NavHeader'
import ShopBar from './components/shopBar/shopBar'
import CartControl from './components/cartControl/cartControl'
import Good from './components/Good/Good'

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
        <NavHeader/>
        <Good />
        <ShopBar name={this.state.name} img={this.state.img} />
      </div>
    )
  }
  componentDidMount() {
    const { match } = this.props
    const name = match.params.name
    const img = decodeURIComponent(match.params.img)
    this.setState(() => {
      return {
        name: name,
        img: img
      }
    })
  }
}

export default Menu
