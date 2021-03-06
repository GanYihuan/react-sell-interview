﻿import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Layout, Input, Checkbox, Form } from 'element-react'
import axios from 'axios'
import CryptoJS from 'crypto-js' // 加密
import { Notyf } from 'notyf' // 提示插件
import Header from 'home/components/Header/Header'
// import 'element-theme-default'
import './register.styl'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statusMsg: '',
      form: {
        username: '',
        pass: '',
        email: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入用户名'))
            } else {
              callback()
            }
          } }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              callback()
            }
          } }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.state.form.pass) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          } }
        ]
      }
    }
  }
  render() {
    return (
      <div className='login-page'>
        <Header/>
        <Layout.Row>
          <Layout.Col span='20'>
            <Form className='demo-form-inline' ref='form' model={this.state.form} rules={this.state.rules} labelWidth='100'>
              <Form.Item label='用户名' prop='username'>
                <Input ref='name' value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} autoComplete='off'/>
              </Form.Item>
              <Form.Item prop='email' label='邮箱'>
                <Input ref='email' value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete='off'></Input>
              </Form.Item>
              <Form.Item label='密码' prop='pass'>
                <Input ref='password' value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete='off'/>
              </Form.Item>
              <Form.Item label='确认密码' prop='checkPass'>
                <Input type='password' value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete='off' />
              </Form.Item>
              <Form.Item label='发送验证码'>
                <Layout.Row>
                  <Layout.Col span='12'>
                    <Button onClick={() => this.sendMsg()}>发送验证码</Button>
                  </Layout.Col>
                  <Layout.Col span='12'>
                    <Input ref='code' />
                  </Layout.Col>
                </Layout.Row>
                <div className='status'>
                  {this.state.statusMsg}
                </div>
              </Form.Item>
              <Form.Item>
                <Button className='btn' type='warning' onClick={() => this.login()}>登录</Button>
              </Form.Item>
              <Form.Item>
                <Button className='btn' type='warning' onClick={() => this.register()}>注册</Button>
              </Form.Item>
            </Form>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
  }
  login() {
    this.props.history.push('/login')
  }
  register() {
    const notyf = new Notyf()
    let register = true
    if (!this.refs.name.props.value || !this.refs.email.props.value || !this.refs.password.props.value) {
      register = false
      notyf.error('请输入信息')
    }
    if (!register) {
      return
    }
    if (register) {
      axios
        .post('/users/signup', {
          username: window.encodeURIComponent(this.refs.name.props.value),
          password: CryptoJS.MD5(this.refs.password.props.value).toString(), // CryptoJS.MD5 encryption
          email: this.refs.email.props.value,
          code: this.refs.code.props.value
        })
        .then(({ status, data }) => {
          if (status === 200) {
            let count = 60
            if (data && data.code === 0) {
              this.props.history.push('/login')
            } else {
              notyf.error(`${data.msg}`)
              this.setState(() => {
                return {
                  statusMsg: `验证码已发送，剩余${count--}秒`
                }
              })
            }
          } else {
            notyf.error(`${data.msg}`)
            this.setState(() => {
              return {
                statusMsg: `服务器出错，错误码:${status}`
              }
            })
          }
        })
    }
  }
  sendMsg() {
    let sendMsg = true
    if (!this.refs.name.props.value || !this.refs.email.props.value || !this.refs.password.props.value) {
      sendMsg = false
    }
    if (!sendMsg) {
      return
    }
    if (sendMsg) {
      axios
        .post('/users/verify', {
          username: encodeURIComponent(this.refs.name.props.value), // encodeURIComponent: Encoding Chinese
          email: this.refs.email.props.value
        })
        .then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) { // After successful delivery, Verification code valid countdown
            let count = 60
            this.setState(() => {
              return {
                statusMsg: `验证码已发送，剩余${count--}秒`
              }
            })
            this.timerid = setInterval(() => {
              this.setState(() => {
                return {
                  statusMsg: `验证码已发送，剩余${count--}秒`
                }
              })
              if (count === 0) {
                clearInterval(this.timerid)
                this.setState(() => {
                  return {
                    statusMsg: ''
                  }
                })
              }
            }, 1000)
          } else {
            this.setState(() => {
              return {
                statusMsg: data.msg
              }
            })
          }
        })
    }
  }
}

export default Register
