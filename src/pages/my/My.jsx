import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom' // 路由
import { Notyf } from 'notyf' // 提示插件
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import { Layout, Button } from 'element-react'
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
              <li>
                <Layout.Row>
                  <Layout.Col span='8'>
                    <Button className='button login' type='warning' onClick={() => this.login()}>登录</Button>
                  </Layout.Col>
                  <Layout.Col span='8'>
                    <Button className='button logout' type='warning' onClick={() => this.logout()}>登出</Button>
                  </Layout.Col>
                  <Layout.Col span='8'>
                    <Button className='button register' type='warning' onClick={() => this.register()}>注册</Button>
                  </Layout.Col>
                </Layout.Row>
              </li>
            </ul>
          </div>
        </div>
        <BottomBar/>
      </div>
    )
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
  login() {
    this.props.history.push('/login')
  }
  register() {
    this.props.history.push('/register')
  }
}

export default My
