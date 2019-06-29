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
      form: {
        name: '',
        pwd: ''
      }
    }
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign(this.state.form, { [key]: value })
    })
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
            <Input className='input' ref='name' placeholder='请输入用户名' icon='information' value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Input className='input' ref='password' placeholder='请输入密码' icon='edit' value={this.state.form.pwd} onChange={this.onChange.bind(this, 'pwd')} type='password'/>
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
    if (this.refs.name.props.value === '') {
      notyf.error('请输入用户名')
      return
    }
    if (this.refs.password.props.value === '') {
      notyf.error('请输入密码')
      return
    }
    axios
      .post('/users/signin', {
        username: window.encodeURIComponent(this.refs.name.props.value), // encodeURIComponent: Encoding Chinese
        password: CryptoJS.MD5(this.refs.password.props.value).toString() // CryptoJS.MD5 encryption
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
