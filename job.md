简介：使用 react, 实现一个餐馆点餐 App

结构：
用户界面：显示用户信息, 能跳转到注册和登录界面
注册登录界面: 请求后端数据库保存的用户名和密码, 实现注册登录
首页界面：显示首页标题，内容分类, 商家列表。商家列表能跳转到商家主页
商家主页: 具备点餐功能，查看评论，商家信息功能

1. reset.css 全局重置样式
2. react 中的 lazy & Suspense 实现代码拆分。Suspense 中统一维护子组件的 loading, lazy 实现懒加载组件
3. react-redux React 与 Redux 绑定, 通过 Provider 为整个 App 传递 store
4. react-router-dom, <BrowserRouter> 对 Router 的封装, 服务器响应 web 请求, <Switch> 组件可将多个 <Route> “包裹”在一起, <Route> 组件路由匹配, <Redirect> 用于页面重定向, <Link> 实现锚点连接跳转, <NavLink> 可以自定义其样式来表示当前页面位置
5. react-redux, mapStateToProps 将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到组件上, dispatch() 调用 action
6. nuka-carousel 实现轮播图组件功能, 首页里的图标轮播组件
7. immutable.js 用来限制对 state 的修改. fromJS() 定义 redux 数据使其成为 immutable 数据, 组件中通过 state.getIn() 来获取 redux 的数据, toJS() 处理获取过来的数组， get() 处理获取过来的对象, reducer 中 state.merge() 合并处理immutable 的数据, state.get() 获取对象 immutable 定义的 redux 数据
8. axios 前端请求，后端配置了用户名密码信息的后端数据接口, 前端请求该接口
9. element-react, 实现 Layout 布局, 表单验证. 用于注册界面填写的密码，邮箱，验证码
10. crypto-js 用于注册界面, 注册时输入密码需要加密传输到后端数据接口里
11. better-scroll 实现滚动功能，配置横向滚动与纵向滚动功能
12. prop-types 对父组件传来的 props 进行检查
13. moment 评论界面的时间格式处理
14. react-transition-group CSSTransition 用于编写商家界面的动画

