<template>
	<view class="container">
		<!-- 发票列表 -->
		<view class="invoice-list-view" v-show="!noData" v-for="item in invoiceListData" :key="item.id">
			<view class="list-item-view">
				<view class="title">发票抬头</view>
				<view class="info">{{ item.rise }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">发票类型</view>
				<view class="info">{{ item.type }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">税务登记号</view>
				<view class="info">{{ item.number }}</view>
			</view>
		</view>
		<!-- 暂无数据(无数据时显示) -->
		<view class="no-data" v-show="noData">
			<image class="no-data-icon" src="../../static/images/noData/zanwufapiao.png" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noData: false,
				invoiceListData: [{
					id: '1',
					rise: '广州臻一计算机系统有限公司',
					type: '增值税普通发票',
					number: '12345678912345'
				}]
			}
		},
		created() {
			var data = this.invoiceListData
			if (data.length == 0) {
				this.noData = true
			} else {
				this.noData = false
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		// 发票列表
		.invoice-list-view {
			width: 94%;
			height: 200rpx;
			background-color: #F0F0F0;
			border-radius: 10rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			padding: 10rpx 10rpx;

			.list-item-view {
				width: 100%;
				height: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					flex: 1;
					font-size: 28rpx;
					color: #808080;
				}

				.info {
					flex: 2;
					font-size: 28rpx;
					color: #000;
					text-align: right;
				}
			}
		}

		// 暂无数据
		.no-data {
			width: 100%;
			margin-top: 100rpx;
			text-align: center;

			.no-data-img {
				width: 480rpx;
				height: 480rpx;
			}
		}
	}
</style>
