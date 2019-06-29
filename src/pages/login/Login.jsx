import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Layout, Input, Checkbox } from 'element-react'
import axios from 'axios'
import Header from 'home/components/Header/Header'
import CryptoJS from 'crypto-js'
import { Notyf } from 'notyf'
import 'element-theme-default'
import './Login.styl'

@withRouter
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: '',
      username: '',
      password: '1'
    }
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
  }
  render() {
    return (
      <div className='login-page'>
        <Header/>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <div className='form'>
              账号登录
            </div>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Input className='input' ref={this.usernameRef} placeholder='请输入用户名' icon='information' />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Input className='input' ref={this.passwordRef} placeholder='请输入密码' icon='edit' />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Button className='btn' type='warning' onClick={() => this.login()}>登录</Button>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Button className='btn' type='warning' onClick={() => this.register()}>注册</Button>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
  register() {
    this.props.history.push('/register')
  }
  login() {
    const notyf = new Notyf()
    if (this.usernameRef.current.value === '') {
      notyf.error('请输入用户名')
      return
    }
    if (this.passwordRef.current.value === '') {
      notyf.error('请输入密码')
      return
    }
    axios
      .post('/users/signin', {
        username: window.encodeURIComponent(this.usernameRef.current.value), // encodeURIComponent: Encoding Chinese
        password: CryptoJS.MD5(this.passwordRef.current.value).toString() // CryptoJS.MD5 encryption
      })
      .then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            this.props.history.push('/my')
          } else {
            notyf.error(`${data.msg}`)
          }
        } else {
          notyf.error('服务器错误!')
        }
      })
  }
}

export default Login
