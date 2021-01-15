<template>
	<view class="container">
		<view v-show="!noData">
			<!-- 银行卡列表 -->
			<view class="bankcard-list-view">
				<!-- 银行卡 -->
				<view class="list-item-view" v-for="item in bankList" :key="item.id">
					<view class="bank-icon">
						<!-- 银行卡所属银行图标 -->
						<image class="icon-img" :src="item.bankIconSrc" mode="scaleToFill"></image>
					</view>
					<view class="bank-msg">
						<!-- 银行卡所属银行名称 -->
						<view class="bank-name">{{ item.name }}</view>
						<view class="bank-info">
							<!-- 银行卡类型 -->
							<view class="bank-type">{{ item.type }}</view>
							<!-- 银行卡所属支行 -->
							<view class="bank-subBranch">{{ item.subBranch }}</view>
						</view>
						<!-- 银行卡号 -->
						<view class="bank-number">{{ item.number }}</view>
					</view>
				</view>
			</view>
			<!-- 更新银行卡按钮 -->
			<view class="update-bankcard-link">
				<button class="update-btn" type="default" @click="goToUpdateBankCard">更新银行卡</button>
			</view>
		</view>
		<!-- 暂无数据(无数据时显示) -->
		<view class="no-data" v-show="noData">
			<image class="no-data-icon" src="../../static/images/noData/zanwuyinhangka.png" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noData: false,
				bankList: [{
						id: '1',
						name: '中国建设银行',
						type: '储蓄卡',
						subBranch: '站西支行',
						number: '6222803327041009143',
						bankIconSrc: '../../static/icon/bank/jianshe.png'
					},
					{
						id: '2',
						name: '中国工商银行',
						type: '储蓄卡',
						subBranch: '站西支行',
						number: '6222803327041009143',
						bankIconSrc: '../../static/icon/bank/gongshang.png'
					}
				]
			}
		},
		created() {
			var data = this.bankList
			if (data.length == 0) {
				this.noData = true
			} else {
				this.noData = false
			}
		},
		methods: {
			goToUpdateBankCard() {
				uni.navigateTo({
					url: '/pages/mine/updateBankCard'
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
		min-height: 100vh;
		background-color: #F0F0F0;
		position: relative;

		// 银行卡列表
		.bankcard-list-view {
			width: 90%;
			margin: 0 auto;
			padding-top: 20rpx;

			.list-item-view {
				width: 100%;
				height: 200rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-top: 20rpx;
				// margin-bottom: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bank-icon {
					width: 20%;
					height: 100%;

					.icon-img {
						width: 100rpx;
						height: 100rpx;
						margin-left: 20rpx;
						margin-top: 30rpx;
					}
				}

				.bank-msg {
					width: 80%;
					height: 80%;

					.bank-name {
						color: #000000;
						font-size: 30rpx;
						font-weight: bold;
					}

					.bank-info {
						display: flex;
						color: #8D8D8D;
						font-size: 24rpx;
						margin-top: 10rpx;

						.bank-type {
							text-align: center;
							border: 1rpx solid #8D8D8D;
							border-radius: 6rpx;
							padding-left: 8rpx;
							padding-right: 8rpx;
						}

						.bank-subBranch {
							font-weight: bold;
							margin-left: 10rpx;
						}
					}

					.bank-number {
						color: #555555;
						font-size: 28rpx;
						margin-top: 20rpx;
					}
				}
			}
		}

		// 更新银行卡按钮
		.update-bankcard-link {
			width: 100%;
			height: 120rpx;
			position: absolute;
			bottom: 0;
			background-color: #F0F0F0;

			.update-btn {
				width: 90%;
				height: 80rpx;
				line-height: 80rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				background-color: #FF6C00;
				border-radius: 40rpx;
				margin: 0 auto;
				margin-top: 20rpx;
			}
		}

		// 暂无数据
		.no-data {
			width: 100%;
			padding-top: 100rpx;
			text-align: center;

			.no-data-img {
				width: 480rpx;
				height: 480rpx;
			}
		}
	}
</style>
