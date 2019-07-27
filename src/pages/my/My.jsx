import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { Layout, Button } from 'element-react'
import { Notyf } from 'notyf' // Pure js message notification plugin
import 'element-theme-default'
import BottomBar from 'BottomBar/BottomBar'
import './my.styl'

@withRouter
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
          <div className='myHeader'>
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
          <Layout.Row>
            <Layout.Col span='16'>
              <Button className='btn login' type='warning' onClick={() => this.login()}>登录</Button>
            </Layout.Col>
          </Layout.Row>
          <Layout.Row>
            <Layout.Col span='16'>
              <Button className='btn logout' type='warning' onClick={() => this.logout()}>登出</Button>
            </Layout.Col>
          </Layout.Row>
          <Layout.Row>
            <Layout.Col span='16'>
              <Button className='btn register' type='warning' onClick={() => this.register()}>注册</Button>
            </Layout.Col>
          </Layout.Row>
        </div>
        <BottomBar/>
      </div>
    )
  }
  login() {
    this.props.history.push('/login')
  }
  async logout() {
    const { status, data } = await axios.get('/users/exit')
    const notyf = new Notyf()
    if (status === 200 && data && data.code === 0) {
      this.setState(() => {
        return {
          user: '',
          email: ''
        }
      })
      notyf.success(`登出操作`)
    }
  }
  register() {
    this.props.history.push('/register')
  }
}

export default My
