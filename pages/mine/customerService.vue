<template>
	<view class="container">
		<!-- 云税客服微信 -->
		<view class="weChat" v-for="item of service" :key="item.id">
			<view class="title">{{ item.description }}</view>
			<view class="name">{{ item.configValue }}<image @click="copy(item.configValue)" class="copy" src="../../static/icon/copy.png"></image></view>
		</view>
		<!-- 云税公众号 -->
		<!-- <view class="official-account">
			<view class="title">云税公众号</view>
			<view class="name">云税数字</view>
		</view> -->
	</view>
</template>

<script>
	import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
	export default {
		data() {
			return {
				service: []
			}
		},
		onShow() {
			this.http({
				url: '/api/common/getCustomerService',
				method: 'post'
			}).then(res => {
				if (res.data.code == 1) {
					this.service = res.data.result;
				}
			})
		},
		methods: {
			// 复制到粘贴板
			copy(content) {
				uniCopy({
					content,
					success:(res)=>{
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error:(e)=>{
						uni.showToast({
							title: e,
							icon: 'none',
							duration:3000,
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		// 云税客服微信
		.weChat {
			width: 90%;
			height: 300rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			text-align: center;
			background-color: #f0f0f0;

			.title {
				color: #333333;
				font-size: 32rpx;
				font-weight: 500;
				padding-top: 120rpx;
			}

			.name {
				color: #FE6D02;
				font-size: 32rpx;
				font-weight: 500;
			}
			
			.copy {
				margin-left: 10rpx;
				width: 32rpx;
				height: 32rpx;
				vertical-align: middle;
			}
		}

		// 云税公众号
		.official-account {
			width: 90%;
			height: 300rpx;
			margin: 0 auto;
			margin-top: 30rpx;
			text-align: center;
			background-color: #f0f0f0;

			.title {
				color: #333333;
				font-size: 32rpx;
				font-weight: 500;
				padding-top: 120rpx;
			}

			.name {
				color: #FE6D02;
				font-size: 32rpx;
				font-weight: 500;
			}
		}
	}
</style>
