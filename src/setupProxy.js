/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-07-27 21:21:52
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-16 04:47:09
 */
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/users', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/goods', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/csellers', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/ratings', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/homes', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/cmerchants', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/locations', {
    target: 'http://localhost:3000'
  }))
  app.use(proxy('/orders', {
    target: 'http://localhost:3000'
  }))
}
