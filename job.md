简介：使用 react, 实现一个餐馆点餐 App

react lazy & Suspense 实现代码拆分。lazy 懒加载组件, Suspense 维护子组件的 loading
react-router-dom, <BrowserRouter> 对 Router 的封装, <Switch> 将多个 <Route> 包裹在一起, <Route> 路由匹配, <Redirect> 页面重定向, <Link> 锚点连接, <NavLink> 自定义样式锚点连接
react-redux, Provider 为整个 App 传递 store, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, connect() 调用 mapStateToProps, mapDispatchToProps
redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
redux, compose 开启 chrome redux 插件, applyMiddleware 将所有中间件组成一个数组，依次执行, createStore 创建 store
immutable, redux-immutable 提供的 combineReducers 实现 immutable, fromJS() redux 数据使其成为 immutable 数据, 组件中通过 getIn() & get() 获取 redux 的数据, toJS() immutable 对象转原生 js 用在组件里, merge() 对象合并处理 immutable 的数据
nuka-carousel 实现图标轮播图功能

axios 前端请求，后端配置了用户名密码信息的后端数据接口, 前端请求该接口
element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码
crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
prop-types 对父组件传来的 props 进行检查
moment 评论界面的时间格式处理
react-transition-group CSSTransition 用于编写商家界面的动画
