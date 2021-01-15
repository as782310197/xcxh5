<script>
export default {
	onLaunch: function() {
		// console.log('App Launch');
		// uni.setStorageSync('memberId', '99999999');
		var phone = uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').phone;
		if (phone) {
			uni.switchTab({
				url: '/pages/index/index'
			});  
		}
	},
	onShow: function() {
		// console.log('App Show');
		// var memberId = uni.getStorageSync('memberId');
		// this.http({
		// 	url: '/api/bizMember/getMembderInfo',
		// 	method: 'post',
		// 	data: {
		// 		memberId
		// 	}
		// }).then(res => {
		// 	console.log(res);
		// 	if (res.data.code == 1) {
		// 		let userInfo = res.data.result;
		// 		uni.setStorageSync('userInfo', userInfo);
		// 		// this.userInfo = userInfo;
		// 	}
		// })
		// console.log('全局show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
