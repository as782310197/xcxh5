import Vue from 'vue'
import App from './App'
// 挂载到原型上
import http from './utils/request.js'

Vue.prototype.http = http

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
