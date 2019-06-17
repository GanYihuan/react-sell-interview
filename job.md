## 餐馆点餐 App

1. reset.css 全局重置样式，使用通用配置的样式设置

2. react 中的 lazy & Suspense 实现代码拆分, 最外层的 Suspense 中统一维护子组件的 loading, lazy 实现懒加载组件

3. react-redux React 与 Redux 绑定, 通过 Provider 为整个 App 传递 store

4. react-router-dom, BrowserRouter 对 Router 的封装, 服务器响应web的请求

5. <Switch>组件可以用来将多个<Route>“包裹”在一起

6. 路由匹配是通过将<Route>组件的path属性与当前的location的pathname进行比较来完成的

7. 页面重定向时，我们可以使用<Redirect>组件, 当一个<Redirect>组件被渲染时，页面将被渲染到<Redirect>组件的to属性指定的位置上

8. PureComponent, 减少不必要的 render 操作的次数，从而提高性能，而且可以少写 shouldComponentUpdate 函数，节省了点代码

9. react-redux, connect 包装两个函数, mapStateToProps 这个函数允许我们将 store 中的数据作为 props 绑定到组件上， mapDispatchToProps 将 action 作为 props 绑定到 MyComp 上

10. nuka-carousel 实现轮播图组件功能, 首页里的图标轮播组件

11. immutable.js 用来限制对 state 的修改, 在 mapState 通过 state.getIn() 来获取 redux 的数据, toJS() 处理获取过来的数组， get() 处理获取过来的对象， fromJS() 定义 redux 数据使其成为 immutable 数据, state.merge() 合并处理 reducer 里面的 immutable 的数据, state.get() 获取 immutable 定义的 redux 数据

12. axios 前端请求, axios.all 实现多个请求发起，配置了用户名即对应密码信息的后端数据接口

13. redux, dispatch() 调用 action

14. react-router-dom withRouter 一个函数返回一个组件。返回的组件外层是Route, this.props.history.push() 实现路由跳转, Link 实现锚点连接跳转
