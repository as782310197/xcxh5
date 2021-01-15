<template>
	<view class="container">
		<view class="uni-rich-box">
			<h4 class="title">网税宝</h4>
			<!-- <rich-text class="uni-rich-text" :nodes="content" space="emsp"></rich-text> -->
			<view v-html="content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				this.http({
					url: '/api/common/getAboutWSB',
					method: 'post'
				}).then(res => {
					if (res.data.code == 1) {
						this.content = res.data.result.configValue
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

		.uni-rich-box {
			width: 100%;

			// margin: 0 auto;
			.title {
				margin: 20rpx 0;
				text-align: center;
			}

			.uni-rich-text {
				width: 100%;
			}
		}
	}
</style>
