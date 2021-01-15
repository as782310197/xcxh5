<template>
	<view class="container">
		<!-- 设备登录页背景图 -->
		<view class="uni-bg-view"></view>
		<!-- 设备租赁 -->
		<view class="uni-center-btn-view">
			<view class="uni-lease-btn">设备租赁</view>
		</view>
		<!-- 登录表单 -->
		<view class="uni-login-form-box">
			<form class="uni-form" @submit="handleSubmit">
				<view class="uni-form-item">
					<input class="uni-input" type="text" name="phone" v-model="phone" placeholder="请输入您的手机号码" placeholder-style="color: #E2E2E2;"
					 @blur="validatePhone" />
				</view>
				<view class="uni-form-item">
					<input class="uni-input" type="text" name="code" :value="code" placeholder="请输入验证码" placeholder-style="color: #E2E2E2;" @input="codeInput"/>
					<button class="uni-getcode-btn" :class="getCodeDisabled ? 'active' : ''" type="primary" :disabled="getCodeDisabled"
					 @click="handlGetCode">{{ codeText }}</button>
				</view>
				<button class="uni-submit-btn" :class="submitDisabled ? 'active' : ''" form-type="submit" type="primary" :disabled="submitDisabled">登录</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeText: '获取验证码',
				getCodeDisabled: true, // 设置获取验证码按钮是否可点击
				submitDisabled: true, // 设置登录按钮是否可点击
				phone: '', // 手机号
				code: '', // 验证码
			}
		},
		methods: {
			// 验证手机号码
			validatePhone() {
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: "手机号码格式不正确!",
						icon: "none",
						duration: 2000,
					});
				} else {
					this.getCodeDisabled = false;
				}
			},
			codeInput(e) {
				var codeValue = e.detail.value
				if(codeValue.length === 6) {
					this.code = codeValue
					this.submitDisabled = false
				}
			},
			// 点击获取验证码
			handlGetCode() {
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: "手机号码格式不正确!",
						icon: "none",
						duration: 2000,
					});
					return;
				}
				// this.http({
				// 	url: "/api/common/getCAPTCHAP",
				// 	method: "POST",
				// 	hideLoading: true,
				// 	data: {
				// 		phone: this.phone,
				// 	},
				// }).then((res) => {
				// });
				let self = this;
				//验证码
				self.getCodeDisabled = true;
				var time = 60; //时间为60s，可以按情况更改
				var timer = setInterval(fun, 1000); //设置定时器
				function fun() {
					time--;
					if (time >= 0) {
						self.codeText = time + "秒";
					} else if (time < 0) {
						self.codeText = "重新获取";
						self.getCodeDisabled = false; //倒计时结束能够重新点击发送的按钮
						clearInterval(timer); //清除定时器
						time = 10; //设置循环重新开始条件
					}
				}
			},
			// 点击登录按钮
			handleSubmit(e) {
			}
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		// 设备登录页背景图
		.uni-bg-view {
			width: 100%;
			height: 600rpx;
			// background-color: #6CE1FD;
			background-color: #8CE8FD;
			background-image: url(../../static/images/bgImg/login-bg-img.png);
			background-repeat: no-repeat;
			background-size: 180% 120%;
			background-position: -245rpx 40rpx;
		}

		// 设备租赁
		.uni-center-btn-view {
			width: 100%;
			padding: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.uni-lease-btn {
				width: 166rpx;
				height: 70rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: #EF7114;
				border: 4rpx solid #EF7114;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		// 登录表单
		.uni-login-form-box {
			width: 100%;
			padding: 0rpx 25rpx;
			margin-top: 50rpx;

			.uni-form {
				.uni-form-item {
					width: 100%;
					height: 100rpx;
					border-bottom: 1rpx solid #e7e7e7;
					display: flex;
					align-items: center;

					.uni-input {
						flex: 1;
						font-size: 32rpx;
						color: #000;
						font-weight: 500;
					}

					.uni-getcode-btn {
						width: 140rpx;
						height: 50rpx;
						background-color: #EF7114;
						font-size: 20rpx;
						padding: 0rpx;
						border-radius: 50rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						&.active {
							background-color: #FFB681;
						}
					}

					.uni-getcode-btn::after {
						content: '';
						border: none;
					}
				}

				.uni-submit-btn {
					width: 100%;
					background-color: #EF7114;
					border-radius: 5rpx;
					margin-top: 80rpx;

					&.active {
						background-color: #FFB681;
					}
				}

				.uni-submit-btn::after {
					content: '';
					border: none;
				}
			}
		}

	}
</style>
