简介：使用 react, 实现一个餐馆点餐 App

react lazy & Suspense 实现代码拆分。lazy 懒加载组件, Suspense 维护子组件的 loading
react-router-dom, <BrowserRouter> 对 Router 的封装, <Switch> 将多个 <Route> 包裹在一起, <Route> 路由匹配, <Redirect> 页面重定向, <Link> 锚点连接, <NavLink> 自定义样式锚点连接
react-redux, Provider 为整个 App 传递 store
redux-thunk, action dispatch 之后，到达 reducer 之前, 调用异步接口请求数据
redux, compose 开启 chrome redux 插件, applyMiddleware 将所有中间件组成一个数组，依次执行, createStore 创建 store

react-redux, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, dispatch() 调用 action
nuka-carousel 实现轮播图组件功能, 首页里的图标轮播组件
immutable.js 用来限制对 state 的修改. fromJS() 定义 redux 数据使其成为 immutable 数据, 组件中通过 state.getIn() 来获取 redux 的数据, toJS() 处理获取过来的数组， get() 处理获取过来的对象, reducer 中 state.merge() 合并处理immutable 的数据, state.get() 获取对象 immutable 定义的 redux 数据
axios 前端请求，后端配置了用户名密码信息的后端数据接口, 前端请求该接口
element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码
crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
prop-types 对父组件传来的 props 进行检查
moment 评论界面的时间格式处理
react-transition-group CSSTransition 用于编写商家界面的动画
