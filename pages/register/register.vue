<template>
	<view class="container">
		<!-- <view class="popup-header">
			<view class="title">验证码登陆</view>
			<uni-icons class="close-icon" type="closeempty" size="26" color="#C6C6C6" @click="hiddenPopup"></uni-icons>
    </view>-->
		<view class="icon-box">
			<image class="icon" src="../../static/images/qichebao.png" mode="widthFix"></image>
			<view class="icon-text">网税宝</view>
		</view>
		<view class="popup-content">
			<form class="register-form" @submit="handleRegisterSubmit">
				<view class="form-item">
					<view class="label">手机号</view>
					<input class="input" name="phone" v-model="phone" type="text" placeholder="请输入手机号" placeholder-style="color: #d0d0d0;" @blur="validatePhone" />
				</view>
				<view class="form-item">
					<view class="label">验证码</view>
					<input class="input code-input" name="verifyCode" v-model="verifyCode" type="text" placeholder="请输入验证码" placeholder-style="color: #d0d0d0;" />
					<button class="getCode-btn" type="default" @click="handlGetCode" :disabled="getCodeDisabled">{{ codeText }}</button>
				</view>
				<button class="submit-btn" type="primary" form-type="submit">确定</button>
				<view class="hint">该手机号如未注册，则自动注册并登陆</view>
				<view class="agreement-box">
					<view class="agreement-item" @click="goToPrivacyAgreement">隐私声明</view>
					<view class="agreement-item driver">|</view>
					<view class="agreement-item" @click="goToServiceAgreement">服务协议</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			verifyCode: '', // 短信验证码
			hintInfo: '手机号码格式不正确', // 手机号码提示信息
			phone: '', // 注册的手机号码
			codeText: '获取验证码',
			getCodeDisabled: false
		};
	},
	methods: {
		// 隐私声明
		goToPrivacyAgreement () {
			uni.navigateTo({
				url: '/pages/agreement/privacyAgreement'
			})
		},
		// 服务协议
		goToServiceAgreement () {
			uni.navigateTo({
				url: '/pages/agreement/serviceAgreement'
			})
		},
		// 验证手机号码
		validatePhone(e) {
			// console.log(e.detail.value, this.phone);
			if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '手机号码格式不正确!',
					icon: 'none',
					duration: 2000
				});
				return;
			}
		},
		// 确定登陆按钮
		handleRegisterSubmit(e) {
			// console.log(e.detail.value)
			var param = e.detail.value;
			param.openId = '123456789';
			console.log(param);
			this.http({
				url: "/api/bizMember/registerMember",
				method: "POST",
				data: param,
			}).then((res) => {
				console.log(res);
				if (res.data.code === 1) {
					uni.showToast({
						title: "登陆成功",
						icon: "none",
						duration: 2000,
					});
					uni.setStorageSync("userInfo", res.data.result);
					uni.switchTab({
						url: "/pages/index/index",
					});
				} else {
					uni.showToast({
						title: res.data.message,
						icon: "none",
						duration: 2000,
					});
				}
			});
		},
		// 点击获取验证码
		handlGetCode() {
			if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '手机号码格式不正确!',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			console.log(this.phone);
			this.http({
				url: '/api/common/getCAPTCHAP',
				method: 'POST',
				hideLoading: true,
				data: {
					phone: this.phone
				}
			}).then(res => {
				// console.log(res);
			});
			let self = this;
			//验证码
			self.getCodeDisabled = true;
			var time = 60; //时间为60s，可以按情况更改
			var timer = setInterval(fun, 1000); //设置定时器
			function fun() {
				time--;
				if (time >= 0) {
					self.codeText = time + '秒';
				} else if (time < 0) {
					self.codeText = '重新获取';
					self.getCodeDisabled = false; //倒计时结束能够重新点击发送的按钮
					clearInterval(timer); //清除定时器
					time = 10; //设置循环重新开始条件
				}
			}
		}
	}
};
</script>

<style scoped lang="scss">
// 引用公共样式————设置通配选择器
@import '/common/lib/uni.css';

.container {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.popup-header {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;

		.title {
			color: #000000;
			font-size: 34rpx;
			font-weight: bold;
			flex: 1;
			text-align: center;
			padding-left: 50rpx;
		}

		.close-icon {
			width: 50rpx;
			margin-right: 20rpx;
		}
	}

	.icon-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
		.icon {
			width: 200rpx;
		}
		.icon-text {
			color: #9A5A1C;
			font-size: 40rpx;
			font-weight: bold;
			margin-top: 20rpx;
		}
	}

	.popup-content {
		width: 90%;
		margin: 20rpx auto 0rpx;
		font-size: 30rpx;

		.register-form {
			width: 100%;

			.form-item {
				width: 100%;
				height: 80rpx;
				border-bottom: 1px solid #e5e4e5;
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.label {
					flex: 1;
					color: #616162;
					font-size: 30rpx;
				}

				.input {
					flex: 3;
					height: 100%;
					line-height: 80rpx;
					font-size: 30rpx;
				}

				.code-input {
					flex: 2;
				}

				// 获取验证码按钮
				.getCode-btn {
					width: 150rpx;
					height: 50rpx;
					line-height: 50rpx;
					color: #616162;
					font-size: 22rpx;
					padding-left: 5rpx;
					padding-right: 5rpx;
				}

				.getCode-btn::after {
					padding: 0rpx;
				}
			}

			// 保存按钮
			.submit-btn {
				width: 100%;
				height: 80rpx;
				font-size: 30rpx;
				background-color: #FF6D00;
				line-height: 80rpx;
				border-radius: 40rpx;
				margin-top: 50rpx;
			}

			.hint {
				text-align: center;
				color: #f00;
				margin-top: 15rpx;
			}
			
			.agreement-box {
				margin-top: 15rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #333;
				.agreement-item + .agreement-item {
					margin-left: 20rpx;
				}
				.agreement-item {
					color: #007AFF;
				}
				.driver {
					color: #333;
				}
			}
		}
	}
}
</style>
