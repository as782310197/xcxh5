// api.js
// const BASE_URL = 'http://192.168.50.12:8000'
const BASE_URL = 'http://api.wangshuibao.com'
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.status !== 0) {
					return uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: '请求失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}
