const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    components: path.resolve(__dirname, 'src/components'),
    common: path.resolve(__dirname, 'src/common'),
    pages: path.resolve(__dirname, 'src/pages'),
    store: path.resolve(__dirname, 'src/store'),
    actions: path.resolve(__dirname, 'src/actions'),
    reducers: path.resolve(__dirname, 'src/reducers'),
    json: path.resolve(__dirname, 'src/json')
  }),
  // // antd按需加载
  // fixBabelImports('import', {
  //   libraryName: 'antd',
  //   libraryDirectory: 'es',
  //   style: 'css'
  // })
)
