import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Layout } from 'element-react'
import 'element-theme-default'
import BottomBar from 'BottomBar/BottomBar'
import './My.styl'

class My extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '默认用户名',
      email: ''
    }
    this.request = this.request.bind(this)
  }
  componentDidMount() {
    this.request()
  }
  async request() {
    const { status, data: { user, email }} = await axios.get('/users/getUser')
    if (status === 200) {
      this.setState(() => {
        return {
          user: user,
          email: email
        }
      })
    }
  }
  render() {
    return (
      <div>
        <div className='my'>
          <div className='header'>
            <Link to={'/login'}>
              <img className='icon'/>
            </Link>
            <p className='nickname'>{this.state.user}</p>
          </div>
          <div className='content'>
            <ul className='items'>
              <li className='address'>
                <Layout.Row>
                  <Layout.Col span='5'>用户名</Layout.Col>
                  <Layout.Col span='5' offset='1'>{this.state.user}</Layout.Col>
                </Layout.Row>
              </li>
            </ul>
            <ul className='items'>
              <li className='email'>
                <Layout.Row>
                  <Layout.Col span='5'>Email 地址</Layout.Col>
                  <Layout.Col span='5' offset='1'>{this.state.email}</Layout.Col>
                </Layout.Row>
              </li>
            </ul>
          </div>
        </div>
        <BottomBar/>
      </div>
    )
  }
}

export default My
