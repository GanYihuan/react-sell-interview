import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../pages/home/components/Header/Header'
import { Button, Layout, Input, Checkbox } from 'element-react'
import 'element-theme-default'
import './Login.styl'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      show: false,
      password: null,
      checked: ''
    }
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
          <Layout.Col span='5' offset='4'>
            {
              this.state.show
                ? <div className='tips'>
                  {this.state.error}
                </div>
                : ''
            }
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Input placeholder='请输入内容' />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span='16' offset='4'>
            <Input
              value={this.state.password}
              className='password'
              icon='el-icon-date'
              placeholder='请输入密码'
              type='password'
            />
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
      </div>
    )
  }
}

export default Login
