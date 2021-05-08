module.exports = {
	// publicPath: process.env.NODE_ENV === 'production' ? './' : './' ,//打包APP的时候用到
	productionSourceMap: false,//关闭source map
	//减少打包编译的时间；
	// 避免在生产环境中用F12开发者工具在Sources中看到源码
	devServer: {
		proxy: {
			'/apis': {
				//测试环境
				target: 'http://test.tongxintailm.com/api',//域名
				// target: 'http://www.wanxiit.com/Christmas2020/api/vote.php',//原公司的投票系统
				changeOrigin: true,//是否跨域
				pathRewrite: {
					'^/apis': ''//需要rewrite重写的
				}
			},
		}
	},
	//去除console.log
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
		  config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
		}
	  }
}





// // vue.config.js
// module.exports = {
//     // 选项...
//     // title:'同心台'
//     productionSourceMap:false,
//     devServer: {
//       proxy: {
//         '/api': {
//           target: 'http://test.tongxintailm.com',
//           changeOrigin: true
//         }
//       }
//       // proxy: 'http://test.tongxintailm.com/api/1/'
//     }
//   }