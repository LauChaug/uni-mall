
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import mySearch from './@/components/my-search/my-search.vue'
Vue.component('my-search',mySearch)

// 定义提示消息!
uni.$showMsg = function(title='数据加载失败！',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
}

// 导入网络请求的包
import {$http} from '@escook/request-miniprogram'

uni.$http = $http

// 请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中....'
	})
}
// 请求根路径	
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// 响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif