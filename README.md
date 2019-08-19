<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-05-26 02:39:53
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-19 17:06:35
 -->

# react 实现餐馆点餐

## 功能

- 增: 点菜界面选择菜品增加到购物车里, 结算后购物车菜品添加到 mongodb. 订单界面能读取出这些购物车菜品
- 删: 订单界面删除购买到的菜品, 能删除 mongodb 里保存的数据
- 改: 修改城市能显示不同城市的商家
- 查: 选择不同城市, 能查询出 mongodb 里的城市数据
- 登录: 填写用户名和密码, 从数据库里面读取对应保存的用户名和邮箱进行登录
- 注册: 填写用户名, 密码, 邮箱后点击验证码, 发一封邮件到填写的邮箱, 输入正确的验证码后注册, mongodb 保存用户数据
- 登出: 用户界面用户名和邮箱清空

## 运行

> 构建 mongodb 数据, 仅仅是看效果请移步 local-project 分支, 此分支不需要构建 mongodb 数据, 也不需要启动 server

- 创建 `sell` 数据库, 该图是使用 Robo 3T 创建的 mongodb 数据库
![Robo 3T](https://i.loli.net/2019/08/15/6xL9MRak8FOo7Tz.png)

- 进入 dbs 目录
(`cseller` dbname, Robo 3T `csellers` collection name)

- 打开一个终端, 添加数据到 mongodb 数据库里面

```node
格式: mongoimport -d `数据库名` -c `collection` `dat 文件`
```

```node
mongoimport -d sell -c cmerchants cmerchant.dat
mongoimport -d sell -c csellers cseller.dat
mongoimport -d sell -c goods good.dat
mongoimport -d sell -c homes homes.dat
mongoimport -d sell -c locations location.dat
mongoimport -d sell -c ratings ratings.dat
```

安装 mongo & redis

```node
brew install redis
brew install mongodb
```

- 打开一个终端

```node
sudo mongod
```

- 再打开一个终端

```node
mongo
```

- 再打开一个终端

```node
redis-server
```

- 再打开一个终端

> cd server 目录或者 [下载 server 项目](https://github.com/GanYihuan/vue-sell-interview-koa)

```node
npm install
npm run start
```

- 再打开一个终端

> cd react-sell-interivew

```node
npm install
npm run start
```

## 介绍

> 简介：使用 react, 实现餐馆点餐 App

1. react 版本 "^16.8.6"
2. Robo 3T, Postman 管理 MongoDB 数据库, VSCode 编辑器编辑代码
3. 利用 MongoDB 数据库管理数据，
4. koa2 为前端提供请求接口
5. stylus 编写其样式，
6. webpack 配置别名和代理。
7. element-react 样式框架实现布局
8. git 管理项目

## 项目介绍-前端部分

> 样式

- 使用 stylus 预编译
- 粘连布局: 菜单弹出层使用粘连布局
- 两列自适应布局: Flex 布局实现, 底部菜单栏图标布局设置
- 不同分辨率下的一像素线适配
- 2X 3X 图适配

> 插件

1. http-proxy-middleware 配置代理， 代理到后端接口上
2. react-loadable 实现代码拆分。懒加载组件
3. react-router-dom, `<BrowserRouter>` 对 Router 的封装, `<Switch>` 将多个 `<Route>` 包裹在一起, `<Route>` 路由匹配, `<Redirect>` 页面重定向, `<Link>` 锚点连接, `<NavLink>` 自定义样式锚点连接, `<withRouter>` 函数返回一个组件。返回的组件外层是 Route
4. react-redux, `<Provider>` 为整个 App 传递 store, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, connect() 调用 mapStateToProps, mapDispatchToProps
5. redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据, 项目里请求的是 koa2 提供的接口
6. redux, 实现数据共享, compose 开启 chrome redux 插件, applyMiddleware 将所有中间件组成一个数组，依次执行, createStore 创建 store
7. immutable 数据被修改时仍然能够保持修改前的状态, 省去拷贝操作, redux-immutable 提供的 combineReducers 实现 immutable
8. better-scroll 实现界面卷轴滚动功能
9. moment 评论界面的时间格式处理
10. axios 前端请求，后端配置了数据接口, 前端请求该接口
11. element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码的验证功能
12. crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
13. prop-types 对父组件传来的 props 进行检查
14. react-transition-group, CSSTransition 用于编写商家界面的动画
15. notyf 用于实现提示信息的插件, 当注册界面或者登录界面有错误信息时要显示提示

## 项目介绍-后端部分

**特别说明: dbs/config.js 里面的邮箱要修改成自己的 qq 邮箱, SMTP 要开启腾讯设置查询到属于自己的号码。注册功能需要用到!**

> server 安装

```node
npm i koa-generator -g
koa2 -e vue-sell-interview-koa
npm install
npm run start
```

> 下载工具

- 下载 Robo 3T 用来管理 mongodb 数据库
- 下载 postman 用来查看请求的数据

> postman 请求接口

```node
http://localhost:3000/cmerchants/getMerchant
http://localhost:3000/csellers/getSeller
http://localhost:3000/goods/getGood
http://localhost:3000/homes/getHome
http://localhost:3000/locations/getCity
http://localhost:3000/orders/getOrder
http://localhost:3000/ratings/getRating
http://localhost:3000/users/getUser
```

> koa 插件

- koa

```node
const Koa = require('koa') // koa
```

- koa-views

```node
const views = require('koa-views') // 用于 koa@2 的模板呈现中间件
```

- koa-json

```node
const json = require('koa-json') // JSON 漂亮打印响应中间件
```

- koa-onerror

```node
const onerror = require('koa-onerror') // 一个用于 koa 的错误处理程序
```

- koa-bodyparser

```node
const bodyparser = require('koa-bodyparser') // 针对请求报文的处理 一个基于co-body的koa体解析器。支持json，表单和文本类型的主体。
```

- koa-logger

```node
const logger = require('koa-logger') // 用于koa的开发风格日志记录器中间件。
```

- koa-generic-session

```node
const session = require('koa-generic-session') // Koa通用的session中间件
```

- mongoose

```node
const mongoose = require('mongoose') // Mongoose是一个MongoDB对象建模工具，设计用于在异步环境中工作
```

- koa-redis

```node
const Redis = require('koa-redis') // Redis存储用于Koa会话中间件/缓存，支持前哨和集群
```

- axios

```node
const axios = require('axios') // Promise based HTTP client for the browser and node.js
```

- koa-passport

```node
const passport = require('koa-passport') // 用于Koa的Passport中间件
```

- passport-local

```node
const LocalStrategy = require('passport-local') // 使用用户名和密码进行身份验证的Passport策略。
```

- koa-router

```node
const Router = require('koa-router') // koa 路由
```

- nodemail

```node
const nodeMailer = require('nodemailer') // 从Node.js发送电子邮件
```

## 运行界面

![首页](https://i.loli.net/2019/07/07/5d21dcb8ec98213034.png)
![我的](https://i.loli.net/2019/07/07/5d21dcc8187b090045.png)
![订单](https://i.loli.net/2019/07/07/5d21ddfe3953132679.png)
![评价](https://i.loli.net/2019/07/07/5d21de109e60c60434.png)
![登录](https://i.loli.net/2019/07/07/5d21dde55a95667685.png)
![注册](https://i.loli.net/2019/07/07/5d21ddd7c135584780.png)
![城市选择](https://i.loli.net/2019/07/07/5d21dcdccdd8e17054.png)
![搜索](https://i.loli.net/2019/07/07/5d21dcfa7599180670.png)
![点菜](https://i.loli.net/2019/07/07/5d21dd3cac9b233136.png)
![弹层](https://i.loli.net/2019/07/07/5d21dd967e11592097.png)
![购物车](https://i.loli.net/2019/07/07/5d21dd864f1d082015.png)
![食物](https://i.loli.net/2019/07/07/5d21ddc04587a74086.png)
![商家评价](https://i.loli.net/2019/07/07/5d21dd1e48ba716486.png)
![商家](https://i.loli.net/2019/07/07/5d21dd0e5ad8351348.png)
