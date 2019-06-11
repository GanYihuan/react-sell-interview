const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/users', {
    target: 'http://localhost:3000'
    // cookieDomainRewrite: "http://localhost:3000"
  }))
}

// "proxy": {
//   "/users": {
//     "target": "http://localhost:3001"
//   }
// },
