## 餐馆点餐 App

简介：使用 react, 实现一个餐馆点餐 App。采用 koa2 编写后端数据, 使用 MongoDB 用来储存用户数据, 商家内容采取 axios 方式请求静态数据。stylus 编写样式。

结构：

用户界面：具体显示用户信息与跳转注册和登录界面，

注册登录界面: 请求后端数据库保存的用户名和密码来实现注册登录。

首页界面：显示首页标题，内容分类与商家列表。商家列表能跳转到该商家主页

商家主页: 具备点餐功能，查看评论，商家信息功能

前端部分:

1. reset.css 全局重置样式，使用通用配置的样式设置

2. react 中的 lazy & Suspense 实现代码拆分, 最外层的 Suspense 中统一维护子组件的 loading, lazy 实现懒加载组件

3. react-redux React 与 Redux 绑定, 通过 Provider 为整个 App 传递 store

4. react-router-dom, BrowserRouter 对 Router 的封装, 服务器响应web的请求

5. <Switch> 组件可以用来将多个 <Route> “包裹”在一起

6. 路由匹配是通过将 <Route> 组件的path属性与当前的 location的pathname 进行比较来完成的

7. 页面重定向时，我们可以使用 <Redirect> 组件, 当一个 <Redirect> 组件被渲染时，页面将被渲染到 <Redirect> 组件的 to 属性指定的位置上

8. PureComponent, 减少不必要的 render 操作的次数，从而提高性能，而且可以少写 shouldComponentUpdate 函数，节省了点代码

9. react-redux, connect 包装两个函数, mapStateToProps 这个函数允许我们将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到 MyComp 上

10. nuka-carousel 实现轮播图组件功能, 首页里的图标轮播组件

11. immutable.js 用来限制对 state 的修改, 在 mapState 通过 state.getIn() 来获取 redux 的数据, toJS() 处理获取过来的数组， get() 处理获取过来的对象， fromJS() 定义 redux 数据使其成为 immutable 数据, state.merge() 合并处理 reducer 里面的 immutable 的数据, state.get() 获取 immutable 定义的 redux 数据

12. axios 前端请求, axios.all 实现多个请求发起，配置了用户名即对应密码信息的后端数据接口

13. redux, dispatch() 调用 action

14. react-router-dom withRouter 一个函数返回一个组件。返回的组件外层是 Route, this.props.history.push() 实现路由跳转, Link 实现锚点连接跳转, <NavLink> 组件是一个特殊的<Link>组件。当它的 path 与当前 location 匹配时，可以自定义其样式来表示当前页面位置

15. element-react, 实现 Layout 布局, 实现表单验证，验证注册界面填写的密码，邮箱，验证码的信息格式要求

16. crypto-js 前端加密，注册时输入密码需要加密传输到后端数据接口里

17. better-scroll 实现滚动功能，配置横向滚动与纵向滚动功能

18. prop-types 对父组件传来的props进行检查


19. moment 时间格式处理，评论界面的时间格式处理

20. react-transition-group 动画过度库, CSSTransition 编写动画

后端部分：



主要接口：登录接口 /signin, 注册接口 /signup, 验证接口 /verify, 退出接口 /exit, 获取用户信息接口 /getUser

1. koa 使用 koa2 编写后端数据

2. mongoose 使用 MongoDB 存储数据
3. consola 优雅的控制台日志

4. koa-bodyparser 针对请求报文的处理

5. koa-generic-session Koa通用的session中间件

6. koa-redis Redis 用于koa会话中间件/缓存的Redis存储

7. koa-json JSON漂亮打印响应中间件

8. koa-passport 用于Koa的Passport中间件，登录时通过验证用户名和密码返回对应状态，实现不同情况的登录状态数据

9. passport-local 当点击登录按钮时，用于验证用户名对应的密码验证，看看是否符合数据库保存的信息

10. koa-router koa 的路由库

11. koa-redis koa会话中间件/缓存的Redis存储

12. nodemailer 从Node.js发送电子邮件oDB 用来储存用户数据。商家数据采取静态数据方式请求。




