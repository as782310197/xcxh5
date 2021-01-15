<template>
	<view class="container">
		<view class="update-form-view">
			<form class="update-form" @submit="updateBankCard">
				<!-- 基本信息 -->
				<view class="basic-info-view">
					<view class="form-item">
						<view class="title">持卡人姓名</view>
						<input class="input" value="周先生" name="name" placeholder="请输入持卡人姓名" />
					</view>
					<view class="form-item">
						<view class="title">所属银行</view>
						<input class="input" value="中国建设银行" name="bank" placeholder="请输入所属银行" />
					</view>
					<view class="form-item">
						<view class="title">所属省份</view>
						<input class="input" value="广东省" name="province" placeholder="请输入所属省份" />
					</view>
					<view class="form-item">
						<view class="title">所属城市</view>
						<input class="input" value="广州市" name="city" placeholder="请输入所属城市" />
					</view>
				</view>
				<!-- 卡号信息 -->
				<view class="card-info-view">
					<view class="form-item">
						<view class="title">银行卡号</view>
						<input class="input" value="6222803327041009143" name="cardNumber" placeholder="请输入银行卡号" />
					</view>
					<view class="form-item">
						<view class="title">开户支行</view>
						<input class="input" value="站西支行" name="subBranch" placeholder="请输入开户支行" />
					</view>
				</view>
				<!-- 说明文案 -->
				<view class="explain-view">
					<view>请填写正确的银行卡信息，以方便平台发放租金！！！</view>
					<view>银行卡更新后，将替代原来的银行卡信息</view>
				</view>
				<!-- 提交按钮 -->
				<view class="submit-btn-view">
					<button class="submit-btn" form-type="submit" type="default">提交银行卡信息</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			updateBankCard(e) {
			}
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		.update-form-view {
			width: 94%;
			margin: 0 auto;

			.update-form {
				width: 100%;

				// 基本信息
				.basic-info-view {
					// width: 100%;
					border-radius: 10rpx;
					background-color: #F2F3F7;
					margin-top: 30rpx;
					padding-top: 20rpx;
					padding-bottom: 20rpx;
					padding-left: 20rpx;
					padding-right: 20rpx;

					.form-item {
						// width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						border-bottom: 1px solid #F0F0F0;
						display: flex;

						.title {
							flex: 1;
							font-size: 32rpx;
							color: #68696D;
						}

						.input {
							flex: 2;
							height: 100%;
							font-size: 32rpx;
							text-align: right;
						}
					}
				}

				// 卡号信息
				.card-info-view {
					margin-top: 30rpx;
					border-top: 1px solid #F0F0F0;

					.form-item {
						height: 80rpx;
						line-height: 80rpx;
						display: flex;
						border-bottom: 1px solid #F0F0F0;
						padding-left: 40rpx;
						padding-right: 40rpx;

						.title {
							flex: 1;
							font-size: 28rpx;
							color: #E07E81;
						}

						.input {
							flex: 2;
							height: 80rpx;
							font-size: 28rpx;
							text-align: right;
						}
					}
				}

				// 说明文案
				.explain-view {
					color: #9F9F9F;
					font-size: 26rpx;
					margin-top: 20rpx;
					line-height: 50rpx;
				}

				// 提交按钮
				.submit-btn-view {
					width: 100%;
					margin-top: 20rpx;

					.submit-btn {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						color: #FFFFFF;
						font-size: 28rpx;
						background-color: #FF6C00;
						border-radius: 40rpx;
					}
				}
			}
		}
	}
</style>
