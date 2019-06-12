﻿import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../pages/home/components/Header/Header'
import { Button, Layout, Input, Checkbox } from 'element-react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import 'element-theme-default'
import './Login.styl'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      show: false,
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
          <Layout.Col span='6' offset='4'>
            {
              this.state.show
                ? <div className='error'>
                  {this.state.error}
                </div>
                : ''
            }
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <input className='input' ref={this.usernameRef} placeholder='请输入用户名' />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <input className='input' ref={this.passwordRef} placeholder='请输入密码'/>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <div className='foot'>
              <Checkbox></Checkbox>
              7天内自动登录
              <Link
                className='link'
                to='/register'
              >
                注册账号
              </Link>
            </div>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Button className='btn-login' onClick={() => this.login()}>登录</Button>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
  login() {
    if (this.usernameRef.current.value === '') {
      this.setState(() => {
        return {
          error: '请输入用户名',
          show: true
        }
      })
      return
    }
    if (this.passwordRef.current.value === '') {
      this.setState(() => {
        return {
          error: '请输入密码',
          show: true
        }
      })
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
            this.setState(() => {
              return {
                error: data.msg,
                show: true
              }
            })
          }
        } else {
          // this.error = `服务器出错`
          // this.setState(() => {
          //   return {
          //     error: `服务器出错`,
          //     show: true
          //   }
          // })
          console.log(this.state.error, this.state.show, 'error: data msg...2')
        }
      })
  }
}

export default Login