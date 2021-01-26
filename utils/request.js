
// var baseUrl = 'http://111.229.170.129:8080'
// var baseUrl = 'http://47.115.183.171:8080'
// var baseUrl = 'http://api.wangshuibao.com'
baseUrl = 'http://47.115.183.171:8080'

module.exports = params => {
	let curPage = getCurrentPages();
	let curRoute = curPage.length > 0 ? curPage[curPage.length - 1].route : '';
	var phone = uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').phone;
	// 没有电话或当前页面不是注册页时,跳转去注册页
	if (!phone && curRoute!=='pages/register/register') {
		uni.navigateTo({
			url: '/pages/register/register'
		})
	}
	let url = baseUrl + params.url;
	let method = params.method;
	let header = params.herder || {};
	let data = params.data || {};
	// 请求方式 GET POST
	if (method) {
		method = method.toUpperCase(); // 小写转大写
		if (method == 'POST') {
			header = {'content-type': 'application/json'}
		}
	}
	// 发起请求 加载动画
	if (!params.hideLoading) {
		uni.showLoading({
			title: '加载中'
		})
	}
	// 发起网络请求
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method || 'GET',
			header: header,
			data: data,
			dataType: 'json',
			sslVerify: false,
			success: res => {
				resolve(res)
			},
			fail: err => {
				uni.showModal({
					content: err.errMsg
				})
				reject(err)
			},
			complete: e => {
				uni.hideLoading();
			}
		})
	})
}




// 基于Promise的ajax函数
// function ajax(param) {
// 	if (!param.method) {
// 		param.method = 'get';
// 	}
// 	return new Promise((resolve, reject) => {
// 		var xhr = new XMLHttpRequest();
// 		xhr.onreadystatechange = function() {
// 			if(xhr.readyState == 4 && xhr.status == 200) {
// 				resolve(JSON.parse(xhr.responseText))
// 			}
// 		};
// 		xhr.open(param.method, param.url + '?' + param.data, true);
// 		if (param.method == 'post') {
// 			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 		}
// 		if (param.method == 'get') {
// 			xhr.send(null);
// 		} else if(param.method == 'post') {
// 			xhr.send(param.data || '');
// 		}
// 	})
// }

// 输出字符串中字符的个数
// var str = 'helloworld';
// var dict = {};
// for(var i = 0; i < str.length; i++) {
// 	if (dict[str[i]] === undefined) {
// 		dict[str[i]] = 1;
// 	} else {
// 		dict[str[i]] += 1
// 	}
// }

// 编写一个方法 求一个字符串的字节长度
// function getBytes(s) {
// 	var len = s.length;
// 	var bytes = len;
// 	for(var i = 0; i < len; i++) {
// 		if (s.charCodeAt(i) > 255) bytes++;
// 	}
// 	return bytes;
// }














