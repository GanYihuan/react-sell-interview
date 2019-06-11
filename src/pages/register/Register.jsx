import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../pages/home/components/Header/Header'
import { Button, Layout, Input, Checkbox, Form } from 'element-react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import 'element-theme-default'
import './Register.styl'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statusMsg: '',
      error: '',
      show: false,
      checked: '',
      username: '',
      pass: '1',
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
              if (this.state.form.checkPass !== '') {
                this.refs.form.validateField('checkPass')
              }
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
    this.formRef = React.createRef()
    this.usernameRef = React.createRef()
    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
  }
  render() {
    return (
      <div className='login-page'>
        <Header/>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <div className='form'>
              注册账号
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
          <Layout.Col span='20'>
            <Form className='demo-form-inline' ref={this.formRef} model={this.state.form} rules={this.state.rules} labelWidth='100'>
              <Form.Item label='用户名' prop='username'>
                <Input ref={this.usernameRef} value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} autoComplete='off'/>
              </Form.Item>
              <Form.Item prop='email' label='邮箱'>
                <Input ref={this.emailRef} value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete='off'></Input>
              </Form.Item>
              <Form.Item label='密码' prop='pass'>
                <Input ref={this.passwordRef} value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete='off'/>
              </Form.Item>
              <Form.Item label='确认密码' prop='checkPass'>
                <Input type='password' value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete='off' />
              </Form.Item>
              <Form.Item label='发送验证码'>
                <Button onClick={() => this.sendMsg()}>发送验证码</Button>
                <div className='status'>
                  {this.state.statusMsg}
                </div>
              </Form.Item>
              <Form.Item>
                <Button className='btn-login' onClick={() => this.register()}>注册</Button>
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
  register() {
    // this.refs.form.validate((valid) => {
    //   if (valid) {
    //     alert('submit!')
    //   } else {
    //     console.log('error submit!!')
    //     return false
    //   }
    // })
  }
  sendMsg() {
    let sendMsg = true
    console.log(this.usernameRef.current.props.value, 'this.usernameRef.current.value')
    if (!this.usernameRef.current.props.value || !this.emailRef.current.props.value || !this.passwordRef.current.props.value) {
      sendMsg = false
    }
    console.log(sendMsg, 'send...')
    if (!sendMsg) {
      return
    }
    if (sendMsg) {
      axios
        .post('/users/verify', {
          username: encodeURIComponent(this.usernameRef.current.props.value), // encodeURIComponent: Encoding Chinese
          email: this.emailRef.current.props.value
        })
        .then(({ status, data }) => {
          if (status === 200 && data && data.code === 0) { // After successful delivery, Verification code valid countdown
            let count = 60
            // this.statusMsg = `验证码已发送，剩余${count--}秒`
            this.setState(() => {
              return {
                statusMsg: `验证码已发送，剩余${count--}秒`
              }
            })
            this.timerid = setInterval(() => {
              // this.statusMsg = `验证码已发送，剩余${count--}秒`
              this.setState(() => {
                return {
                  statusMsg: `验证码已发送，剩余${count--}秒`
                }
              })
              if (count === 0) {
                clearInterval(this.timerid)
                // this.statusMsg = ''
                this.setState(() => {
                  return {
                    statusMsg: ''
                  }
                })
              }
            }, 1000)
          } else {
            // this.statusMsg = data.msg
            this.setState(() => {
              return {
                statusMsg: data.msg
              }
            })
          }
        })
    }
    // this.refs['usernameRef'].validate('form.uername', valid => {
    //   namePass = valid
    // })
    // this.usernameRef.validate('form.uername', valid => {
    //   namePass = valid
    // })
  }
}

export default Register
