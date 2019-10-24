const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: " http://172.16.221.16:7001/", // 访问数据的计算机域名
        // target: "http://10.75.18.245:7001/",
        // target:"http://172.16.221.16:7001",
      //  target:'http://10.75.18.7:7001',
        ws: true, // 是否启用websockets
        changOrigin: true //开启代理
      }
    }
  },
   
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
  }
  
};
