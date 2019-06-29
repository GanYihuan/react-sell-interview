const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/users', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/goods', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/sellers', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/ratings', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/homes', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/merchants', {
    target: 'http://localhost:3000'
  }))
}
