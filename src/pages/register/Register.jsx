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
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
    this.formRef = React.createRef()
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    })
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
                <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')} autoComplete='off'/>
              </Form.Item>
              <Form.Item prop='email' label='邮箱'>
                <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')} autoComplete='off'></Input>
              </Form.Item>
              <Form.Item label='密码' prop='pass'>
                <Input value={this.state.form.pass} onChange={this.onChange.bind(this, 'pass')} autoComplete='off'/>
              </Form.Item>
              <Form.Item label='确认密码' prop='checkPass'>
                <Input type='password' value={this.state.form.checkPass} onChange={this.onChange.bind(this, 'checkPass')} autoComplete='off' />
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
  register() {
    console.log('register')
    // this.refs.formRef.validate((valid) => {
    //   if (valid) {
    //     alert('submit!')
    //   } else {
    //     console.log(valid, 'valid')
    //     return false
    //   }
    // })
    // console.log(this.formRef.current, 'register')
    // this.formRef.current.validate(valid => {
    //   console.log(valid, 'valid')
    //   if (valid) {
    //     console.log('valid')
    //     axios
    //       .post('/users/signup', {
    //         username: window.encodeURIComponent(this.state.form.username),
    //         password: CryptoJS.MD5(this.state.form.pass).toString(), // CryptoJS.MD5 encryption
    //         email: this.state.form.email,
    //         code: this.state.form.code
    //       })
    //       .then(({ status, data }) => {
    //         if (status === 200) {
    //           if (data && data.code === 0) {
    //             location.href = '/login'
    //           } else {
    //             this.error = data.msg
    //           }
    //         } else {
    //           this.error = `服务器出错，错误码:${status}`
    //         }
    //         setTimeout(() => {
    //           this.error = ''
    //         }, 1500)
    //       })
    //   }
    // })
  }
}

export default Register
