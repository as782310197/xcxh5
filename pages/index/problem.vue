<template>
	<view class="container">
		<view class="title">
			{{ title }}
		</view>
		<view class="content">
			{{ content }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '为什么现在很多人都在租车，租车有什么好处？',
				content: '可以根据业务需求灵活的选择车型人在社会上生存，免不了也与其他朋友来往，此时出行的交通工具就显得非常的重要了。如果只是普通的公共交通工具，则会显得很浪费时间，但是如果个人可以租车，那么可根据需要随时开不同类型不同档次的车，这样会显得很方便，例如遇重要的贵宾、或商务谈判，开着高档的私家车可以显示出对于客户的重视程度，也能彰显个人的实力。可以根据业务需求灵活的选择车型人在社会上生存，免不了也与其他朋友来往，此时出行的交通工具就显得非常的重要了。如果只是普通的公共交通工具，则会显得很浪费时间，但是如果个人可以租车，那么可根据需要随时开不同类型不同档次的车，这样会显得很方便，例如遇重要的贵宾、或商务谈判，开着高档的私家车可以显示出对于客户的重视程度，也能彰显个人的实力。'
			}
		},
		methods: {

		},
		onLoad(option) {
			const questionData = uni.getStorageSync('questionDataList');
			const questionId = option.id;
			questionData.forEach(v => {
				if (v.id == questionId) {
					this.title = v.question;
					this.content = v.answer
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';
	
	.container {
		width: 100%;

		.title {
			width: 90%;
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
			margin: 20rpx auto 0rpx;
		}

		.content {
			width: 90%;
			font-size: 30rpx;
			margin: 20rpx auto 0rpx;
			padding: 10rpx 10rpx 10rpx 20rpx;
			background-color: #F0F0F0;
			border-radius: 10rpx;
			min-height: 200rpx;
		}
	}
</style>
