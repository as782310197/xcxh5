<template>
	<view class="container">
		<!-- 上部——头像、用户名部分 -->
		<view class="top-box">
			<!-- 头像 -->
			<view class="avatar-view" @click="handleChangeAvatarImg">
				<image class="avatar-img" :src="userInfo.portrait" mode="scaleToFill"></image>
			</view>
			<view class="msg-box">
				<!-- 认证 -->
				<view class="authentication-view">
					<view class="name">{{ userInfo.nick }}</view>
					<view class="status_name">{{ userInfo.statusName }}</view>
					<view class="attestation-btn" v-if="userInfo.status === 0" @click="goToCertification">去认证>></view>
					<!-- <image class="authentication-icon" :src="authenticationIconScr" mode="aspectFill"></image> -->
				</view>
				<!-- 经营者 -->
				<view class="operator-view">
					经营者：{{ userInfo.nick }}
				</view>
			</view>
		</view>
		<!-- 中部——收益统计部分 -->
		<view class="center-box">
			<view class="icon-view">
				<image class="shouyi-icon" src="../../static/icon/shouyi01.png" mode="scaleToFill"></image>
			</view>
			<!-- 预计租金收益 -->
			<view class="expected-revenue-view">
				<view class="describe-text">预计租金收益</view>
				<view class="expected-revenue-number">{{ expectedRevenueNumber || 0 }}元</view>
			</view>
			<!-- 累计租金收益 -->
			<view class="cumulative-income-view">
				<view class="describe-text">累计租金收益</view>
				<view class="expected-revenue-number">{{ cumulativeIncomeNumber || 0 }}元</view>
				<view class="view-order-link" @click="goToBankOrder">查看订单</view>
			</view>
		</view>
		<!-- 下部——列表部分 -->
		<view class="bottom-box">
			<uni-list class="list-view">
				<!-- <uni-list-item class="list-item-view" title="注册" @click="handleRegister"></uni-list-item> -->
				<!-- <uni-list-item class="list-item-view" title="个人信息实名认证" @click="goToCertification"></uni-list-item> -->
				<uni-list-item class="list-item-view" title="我的订单" @click="goToBankOrder"></uni-list-item>
				<uni-list-item class="list-item-view" title="我的账单" @click="goToBill"></uni-list-item>
				<!-- <uni-list-item class="list-item-view" title="银行卡" @click="goToBankCard"></uni-list-item> -->
				<uni-list-item class="list-item-view" title="我的车辆" @click="goToCar"></uni-list-item>
				<uni-list-item class="list-item-view" title="我的设备" @click="goToEquimentLeaseList"></uni-list-item>
				<uni-list-item class="list-item-view" title="我的租约" @click="goToLease"></uni-list-item>
				<!-- <uni-list-item class="list-item-view" title="我的发票" @click="goToInvoice"></uni-list-item> -->
				<uni-list-item class="list-item-view" title="客服" @click="goToCustomerService"></uni-list-item>
				<uni-list-item class="list-item-view" title="关于网税宝" @click="about"></uni-list-item>
				<uni-list-item class="list-item-view" title="退出登录" @click="loginOut" v-show="showLoginOut"></uni-list-item>
			</uni-list>
		</view>

		<!-- 注册弹框 -->
		<!-- <view class="popup-view" :hidden="showPopup">
			<view class="popup-header">
				<view class="title">验证码登陆</view>
				<uni-icons class="close-icon" type="closeempty" size="26" color="#C6C6C6" @click="hiddenPopup"></uni-icons>
			</view>
			<view class="popup-content">
				<form class="register-form" @submit="handleRegisterSubmit">
					<view class="form-item">
						<view class="label">手机号</view>
						<input class="input" name="phone" @blur="validatePhone" v-model="phone" type="text" placeholder="请输入手机号" placeholder-style="color: #d0d0d0;" />
					</view>
					<view class="form-item">
						<view class="label">验证码</view>
						<input class="input code-input" name="verifyCode" v-model="verifyCode" type="text" placeholder="请输入验证码" placeholder-style="color: #d0d0d0;" />
						<button class="getCode-btn" type="default" @click="handlGetCode" :disabled="getCodeDisabled">{{ codeText }}</button>
					</view>
					<button class="submit-btn" type="primary" form-type="submit">确定</button>
					<view class="hint">该手机号如未注册，则自动注册并登陆</view>
				</form>
			</view>
		</view> -->
		<!-- 注册弹框——蒙板 -->
		<!-- <view class="popup_overlay" :hidden="showPopup"></view> -->
	</view>
</template>

<script>
	import {
		uploadFile
	} from '../../utils/common.js'
	
	export default {
		data() {
			return {
				userInfo: {
					statusName: '已认证',
					nick: '小光头',
					operator: '',
					portrait: '../../static/icon/avatar-icon.png'
				},
				authenticationIconScr: '../../static/icon/yirenzheng01.png',
				verifyCode: '', // 短信验证码
				hintInfo: '手机号码格式不正确', // 手机号码提示信息
				phone: '', // 注册的手机号码
				expectedRevenueNumber: '0',
				cumulativeIncomeNumber: '0',

				showPopup: true, // 设置是否显示注册弹框，默认不显示
				getCodeDisabled: false,
				codeText: '获取验证码',
				showLoginOut: false // 是否显示退出登录列
			}
		},
		onLoad(option) {

		},
		onShow() {
			// 累计收益，预计收益
			var earningsInfo = uni.getStorageSync('earningsInfo');
			this.expectedRevenueNumber = earningsInfo.accumulatedIncome + earningsInfo.deviceAccumulatedIncome;
			this.cumulativeIncomeNumber = earningsInfo.estimatedIncome + earningsInfo.deviceEstimatedIncome;
			let userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
			// var phone = userInfo && userInfo.phone;
			// if (!phone) {
			// 	this.showPopup = false
			// }
			if (userInfo.portrait) {
				this.userInfo.portrait = userInfo.portrait;
			} else {
				this.userInfo.portrait = '../../static/icon/avatar-icon.png';
			}
			var memberId = userInfo && userInfo.id;
			if (memberId) {
				this.showLoginOut = true;
				this.http({
					url: '/api/bizMember/getMembderInfo',
					method: 'post',
					data: {
						memberId
					}
				}).then(res => {
					if (res.data.code == 1) {
						let userInfo = res.data.result;
						uni.setStorageSync('userInfo', userInfo);
						this.userInfo = userInfo;
					}
				})
			}
			// 网页授权获取code，通过请求获取openId，以下因域名未认证先自定义写法
			/* uni.setStorageSync('openId', '123456789');
			var memberId = uni.getStorageSync('memberId');
			this.http({
				url: '/api/bizMember/getMembderInfo',
				method: 'post',
				data: {
					memberId
				}
			}).then(res => {
				if (res.data.code == 1) {
					let userInfo = res.data.result;
					uni.setStorageSync('userInfo', userInfo);
					this.userInfo = userInfo;
				}
			}) */
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				var _this = this
				var memberId = _this.userInfo && _this.userInfo.id;
				var param = {
					memberId
				}
				if (memberId) {
					_this.http({
						url: '/api/bizMember/getMembderInfo',
						method: 'post',
						data: param
					}).then(res => {
						if (res.data.code == 1) {
							let userInfo = res.data.result;
							uni.setStorageSync('userInfo', userInfo);
							_this.userInfo = userInfo;
						}
					})
				}
			},
			validatePhone() {
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: '手机号码格式不正确!',
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 打开注册弹框
			/* handleRegister() {
				this.showPopup = false
			}, */
			// 确定登陆按钮
			/* handleRegisterSubmit(e) {
				var param = e.detail.value;
				param.openId = '123456789';
				this.http({
					url: '/api/bizMember/registerMember',
					method: 'POST',
					data: param
				}).then(res => {
					if (res.data.code === 1) {
						uni.showToast({
							title: '登陆成功',
							icon: 'none',
							duration: 2000
						});
						this.verifyCode = '';
						this.phone = '';
						this.userInfo = res.data.result;
						uni.setStorageSync('userInfo', res.data.result);
						this.showPopup = true;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
			}, */
			// 点击获取验证码
			/* handlGetCode() {
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				    uni.showToast({
				        title: '手机号码格式不正确!',
						icon: 'none',
				        duration: 2000
				    });
					return;
				}
				this.http({
					url: '/api/common/getCAPTCHAP',
					method: 'POST',
					hideLoading: true,
					data: {
						phone: this.phone
					}
				}).then(res => {
				})
				let self = this
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
			}, */
			// 关闭注册弹框
			/* hiddenPopup() {
				this.showPopup = true
				this.verifyCode = '';
				this.phone = '';
			}, */
			// 点击切换头像
			handleChangeAvatarImg() {
				const _this = this;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						// this.userInfo.portrait = JSON.parse(res.data).url;
						var portrait = JSON.parse(res.data).url;
						if (portrait) {
							var memberId = _this.userInfo && _this.userInfo.id;
							var param = {
								memberId: memberId,
								portrait: portrait
							}
							_this.http({
								url: '/api/bizMember/importPortrait',
								method: 'post',
								data: param
							}).then(res => {
								if (res.data.code == 1) {
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										duration: 2000
									})
									setTimeout(() => {
										this.getUserInfo();
									}, 1500)
								} else {
									uni.showToast({
										title: res.data.message,
										icon: 'none',
										duration: 2000
									})
								}
							})
						}
					}
				})
			},
			// 跳转到个人信息实名认证页
			goToCertification() {
				if (this.userInfo.status != 3) {
					uni.navigateTo({
						url: '/pages/mine/certification'
					})
				}
			},
			// 点击我的订单
			goToBankOrder() {
				uni.navigateTo({
					url: '/pages/mine/order'
				})
			},
			// 点击我的账单
			goToBill() {
				uni.navigateTo({
					url: '/pages/mine/bill'
				})
			},
			// 点击银行卡
			goToBankCard() {
				uni.navigateTo({
					url: '/pages/mine/bankCard'
				})
			},
			// 点击我的车辆
			goToCar() {
				uni.navigateTo({
					url: '/pages/mine/car'
				})
			},
			// 点击我的设备
			goToEquimentLeaseList() {
				uni.navigateTo({
					url: '/pages/equipment/equipmentLeaseList'
				})
			},
			// 点击我的租约
			goToLease() {
				uni.navigateTo({
					url: '/pages/mine/lease'
				})
			},
			// 点击我的发票
			// goToInvoice() {
			// 	uni.navigateTo({
			// 		url: '/pages/mine/invoice'
			// 	})
			// },
			// 点击客服
			goToCustomerService() {
				uni.navigateTo({
					url: '/pages/mine/customerService'
				})
			},
			// 关于企车宝
			about() {
				uni.navigateTo({
					url: '/pages/mine/about'
				})
			},
			// 退出登录
			loginOut() {
				var _this = this;
				uni.showModal({
					title: '退出登录',
					content: '确认退出？',
					success: function(res) {
						if (res.confirm) {
							_this.showLoginOut = false;
							uni.clearStorageSync();
							// uni.removeStorageSync('userInfo');
							// uni.removeStorageSync('openId');
							uni.navigateTo({
								url: '/pages/register/register'
							});
						} else if (res.cancel) {
						}
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

		// 上部——头像、用户名部分
		.top-box {
			width: 94%;
			height: 280rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			// 头像
			.avatar-view {
				width: 180rpx;
				height: 180rpx;
				border: 1rpx solid #F0F0F0;
				border-radius: 50%;
				margin-left: 10rpx;
				background-color: #F0F0F0;
				overflow: hidden;

				.avatar-img {
					width: 100%;
					height: 100%;
				}
			}

			.msg-box {
				width: 70%;
				height: 80%;

				.authentication-view {
					width: 100%;
					height: 50%;
					display: flex;
					padding-top: 40rpx;

					.status_name {
						margin-top: 10rpx;
						margin-left: 10rpx;
						font-size: 28rpx;
						color: #e46713;
						vertical-align: middle;
					}

					.name {
						color: #000000;
						font-size: 36rpx;
						font-weight: bold;
					}
					
					.attestation-btn {
						margin-top: 15rpx;
						margin-left: 10rpx;
						font-size: 24rpx;
						color: #BBBBBD;
						vertical-align: middle;
					}

					// .authentication-icon {
					// 	width: 90rpx;
					// 	height: 50rpx;
					// 	margin-left: 20rpx;
					// }
				}

				.operator-view {
					width: 100%;
					height: 40%;
					color: #75615D;
					font-size: 28rpx;
					border-top: 1rpx solid #ECECEC;
					padding-top: 20rpx;
				}
			}
		}

		// 中部——收益统计部分
		.center-box {
			width: 94%;
			margin: 0 auto;
			margin-top: 10rpx;
			border-radius: 10rpx;
			background: linear-gradient(to right, #FFD75D 0%, #E4B067 100%);
			display: flex;
			justify-content: space-between;
			align-items: center;

			.icon-view {
				width: 10%;
				height: 70%;
				text-align: center;

				.shouyi-icon {
					width: 80rpx;
					height: 80rpx;
					margin-top: 10rpx;
					margin-left: 20rpx;
				}
			}

			// 预计租金收益
			.expected-revenue-view {
				width: 45%;
				height: 70%;
				text-align: center;

				.describe-text {
					color: #9B6924;
					font-size: 24rpx;
					font-weight: 500;
				}

				.expected-revenue-number {
					color: #805447;
					font-size: 32rpx;
					font-weight: 600;
				}
			}

			// 累计租金收益
			.cumulative-income-view {
				width: 45%;
				height: 70%;
				text-align: center;

				.describe-text {
					color: #9B6924;
					font-size: 24rpx;
					font-weight: 500;
				}

				.expected-revenue-number {
					color: #805447;
					font-size: 32rpx;
					font-weight: 600;
				}

				.view-order-link {
					color: #804F1E;
					font-size: 22rpx;
				}
			}
		}

		// 下部——列表部分
		.bottom-box {
			width: 100%;
			margin-top: 10rpx;

			.list-view {
				width: 100%;

				.list-item-view {}
			}
		}

		// 查看租赁协议弹框——蒙板
		.popup_overlay {
			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background-color: #3C3C3C;
			z-index: 1;
			-moz-opacity: 0.6;
			opacity: .60;
			filter: alpha(opacity=66);
		}

		// 查看租赁协议弹框
		.popup-view {
			position: fixed;
			top: 25%;
			left: 10%;
			width: 80%;
			height: 35%;
			border: 1rpx solid white;
			background-color: white;
			z-index: 2;
			overflow: auto;
			border-radius: 30rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;

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
				}
			}

			.popup-content {
				font-size: 30rpx;

				.register-form {
					width: 100%;

					.form-item {
						width: 100%;
						height: 80rpx;
						border-bottom: 1px solid #e5e4e5;
						margin-top: 10rpx;
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
						line-height: 80rpx;
						border-radius: 40rpx;
						margin-top: 50rpx;
					}

					.hint {
						text-align: center;
						color: #f00;
						margin-top: 5rpx;
					}
				}
			}
		}
	}
</style>
