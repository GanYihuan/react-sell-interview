﻿<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-13 09:09:12
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 16:46:26
 -->

# 简介：使用 react, 实现餐馆点餐 App

react 版本 "^16.8.6"

前端部分:
http-proxy-middleware 配置代理， 代理到后端接口上
react lazy & Suspense 实现代码拆分。lazy 懒加载组件, Suspense 维护子组件的 loading
react-router-dom, BrowserRouter 对 Router 的封装, Switch 将多个 Route 包裹在一起, Route 路由匹配, Redirect 页面重定向, Link 锚点连接, NavLink 自定义样式锚点连接, withRouter 函数返回一个组件。返回的组件外层是 Route
react-redux, Provider 为整个 App 传递 store, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, connect() 调用 mapStateToProps, mapDispatchToProps
redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据, 项目里请求的是 koa2 提供的接口
redux, 实现数据共享, compose 开启 chrome redux 插件, applyMiddleware 将所有中间件组成一个数组，依次执行, createStore 创建 store
immutable 数据被修改时仍然能够保持修改前的状态, 省去拷贝操作, redux-immutable 提供的 combineReducers 实现 immutable, fromJS() redux 数据使其成为 immutable 数据, 组件中通过 getIn() & get() 获取 redux 的数据, reducer 里 toJS() 将 immutable 对象转原生 js, merge() 合并处理 immutable 的数据
nuka-carousel 实现图标轮播图功能
better-scroll 实现界面卷轴滚动功能
moment 评论界面的时间格式处理
axios 前端请求，后端配置了数据接口, 前端请求该接口
element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码的验证功能
crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
prop-types 对父组件传来的 props 进行检查
react-transition-group, CSSTransition 用于编写商家界面的动画
notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示

## struture

bottombar
my
order -> evalue
city
home -> header \ Category \ ContentList
