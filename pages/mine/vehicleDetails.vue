<template>
	<view class="container">
		<view class="car-details-view">
			<!-- 基本信息 -->
			<view class="basic-info-view">
				<view class="list-item-view">
					<view class="title">租车公司名称</view>
					<view class="info">{{ carDetailsList.enterpriseName }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">车主姓名</view>
					<view class="info">{{ carDetailsList.carOwner }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">车牌号</view>
					<view class="info">{{ carDetailsList.carNumber }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">车辆品牌</view>
					<view class="info">{{ carDetailsList.brand }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">车辆型号</view>
					<view class="info">{{ carDetailsList.vehicleModel }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">租金</view>
					<view class="info">{{ carDetailsList.rent }}元</view>
				</view>
				<view class="list-item-view">
					<view class="title">结算周期(月)</view>
					<view class="info">{{ carDetailsList.period }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">所属银行</view>
					<view class="info">{{ carDetailsList.bank }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">开户行</view>
					<view class="info">{{ carDetailsList.accountHolder }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">银行账号</view>
					<view class="info">{{ carDetailsList.account }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">出租状态</view>
					<view class="info">{{ carDetailsList.rentStatusName }}</view>
				</view>
			</view>
			<!-- 证件图片 -->
			<view class="certificates-img-view">
				<!-- 保险凭证 -->
				<view class="insurance-certificate-view">
					<view class="title">保险凭证</view>
					<view class="img-box">
						<!-- 保险凭证1 -->
						<image class="image" @tap="_previewImage(carDetailsList.commercialInsurance)" :src="carDetailsList.commercialInsurance"
						 mode="widthFix"></image>
						<!-- 保险凭证2 -->
						<image class="image" @tap="_previewImage(carDetailsList.insurance)" :src="carDetailsList.insurance" mode="widthFix"></image>
					</view>
				</view>
				<!-- 驾驶证正副本 -->
				<view class="driver-license-view">
					<view class="title">驾驶证正副本</view>
					<view class="img-box">
						<!-- 驾驶证正本 -->
						<image class="image" @tap="_previewImage(carDetailsList.drivingPermitBack)" :src="carDetailsList.drivingPermitBack"
						 mode="widthFix"></image>
						<!-- 驾驶证副本 -->
						<image class="image" @tap="_previewImage(carDetailsList.drivingPermitFront)" :src="carDetailsList.drivingPermitFront"
						 mode="widthFix"></image>
					</view>
				</view>
			</view>
			<!-- 状态信息 -->
			<!-- <view class="state-info-view">
				<view class="list-item-view">
					<view class="title">出租状态</view>
					<view class="info">{{ carDetailsList.rentalStatus }}</view>
				</view>
				<view class="list-item-view">
					<view class="title">行驶证正副本</view>
					<view class="info">{{ carDetailsList.drivingLicenseStatus }}</view>
				</view>
			</view> -->
			<!-- 阅读同意勾选设备租赁协议 -->
			<view class="uni-agree-agreement-box" v-if="carDetailsList.requirementStatus === 3">
				<view class="uni-check-icon-box" @click="changeCkeck">
					<uni-icons type="circle" :size="20" color="#5A5E61" v-if="!isCheck"></uni-icons>
					<uni-icons type="checkbox-filled" :size="20" color="#0A76E6" v-if="isCheck"></uni-icons>
				</view>
				<text>我已阅读并同意</text>
				<span @click="readLeaseAgreement">《车辆租赁协议》</span>
			</view>
			<view class="hidden-box" v-if="carDetailsList.requirementStatus === 1 || carDetailsList.requirementStatus === 3"></view>
			<!-- 按钮 -->
			<view class="btn-view">
				<button v-if="carDetailsList.requirementStatus === 1" class="button" type="default" @click="handleAddCar">更新车辆信息</button>
				<button v-if="carDetailsList.requirementStatus === 3" :class="!isCheck ? 'active button' : 'button'" :disabled="isCheckDisibled" class="button" type="default" @click="handleCheck">确认租约</button>
			</view>
		</view>
		<!-- 设备租赁协议弹框 -->
		<wybPopup class="uni-wybPopup" ref="popup" type="center" height="1000" width="650" radius="6" :showCloseIcon="true">
			<view class="popup-content">
				<view class="uni-title">车辆租赁协议</view>
				<view class="uni-content">
					<scroll-view class="scroll-view" scroll-y="true"><rich-text :nodes="leaseAgreement"></rich-text></scroll-view>
				</view>
			</view>
		</wybPopup>
	</view>
</template>

<script>
	import wybPopup from '@/components/wyb-popup/wyb-popup.vue';
	export default {
		components: {
			wybPopup
		},
		data() {
			return {
				carDetailsList: {},
				carId: null,// 车辆信息id
				isCheck: false,
				isCheckDisibled: false,
				leaseAgreement: '', //租赁协议，html格式
			}
		},
		onLoad(option) {
			var carId = option.id;
			this.carId = carId;
			this.carDetailsList = uni.getStorageSync('carData');
		},
		methods: {
			handleAddCar() {
				uni.navigateTo({
					url: '/pages/mine/addCar?id=' + this.carId
				})
			},
			_previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			// 点击改变勾选状态
			changeCkeck() {
				this.isCheck = !this.isCheck;
				if (this.isCheck) {
					this.isCheckDisibled = false;
				} else {
					this.isCheckDisibled = true;
				}
			},
			// 查看车辆租赁协议
			readLeaseAgreement() {
				this.http({
					url: '/api/common/getDeviceAgreement',
					method: 'post'
				}).then(res => {
					if( res.data.code === 1 ){
						this.leaseAgreement = res.data.result.configValue;
						this.$refs.popup.show();
					}else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			// 点击确认租约按钮
			handleCheck() {
				let param = {
					id: this.carDetailsList.requirementId
				};
				this.http({
					url: '/api/bizCarInfo/carOwnerSign',
					method: 'post',
					data: param
				}).then(res => {
					if(res.data.code === 1 ){
						uni.showToast({
							title: res.data.result + ',正在跳转',
							icon: 'none',
							duration: 2000
						});
						uni.navigateTo({
							url: '/pages/mine/car'
						})
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		.car-details-view {
			width: 94%;
			margin: 0 auto;

			// position: relative;
			// 基本信息
			.basic-info-view {
				background-color: #f0f0f0;
				margin-top: 20rpx;
				padding: 10rpx 10rpx 10rpx 10rpx;

				.list-item-view {
					width: 100%;
					height: 80rpx;
					border-bottom: 1rpx solid #ECF0F3;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						flex: 1;
						color: #5A5E61;
						font-size: 28rpx;
					}

					.info {
						flex: 2;
						color: #000000;
						font-size: 28rpx;
						text-align: right;
					}
				}
			}

			// 证件图片
			.certificates-img-view {
				margin-top: 20rpx;
				background-color: #f0f0f0;
				padding: 10rpx 10rpx 10rpx 10rpx;

				// 保险凭证
				.insurance-certificate-view {
					.title {
						color: #000000;
						font-size: 24rpx;
						font-weight: bold;
					}

					.img-box {
						margin-top: 5rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;

						.image {
							width: 240rpx;
							height: 240rpx;
						}
					}
				}

				// 驾驶证正副本
				.driver-license-view {
					margin-top: 10rpx;

					.title {
						color: #000000;
						font-size: 24rpx;
						font-weight: bold;
					}

					.img-box {
						margin-top: 5rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;

						.image {
							width: 240rpx;
							height: 240rpx;
						}
					}
				}
			}

			// 状态信息
			.state-info-view {
				background-color: #f0f0f0;
				margin-top: 20rpx;
				padding: 10rpx 10rpx 10rpx 10rpx;

				.list-item-view {
					width: 100%;
					height: 80rpx;
					border-bottom: 1rpx solid #ECF0F3;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						flex: 1;
						color: #5A5E61;
						font-size: 28rpx;
					}

					.info {
						flex: 2;
						color: #000000;
						font-size: 28rpx;
						text-align: right;
					}
				}
			}
			.btn-view {
				// 更新按钮
				.button {
					position: fixed;
					bottom: 20rpx;
					left: 3%;
					width: 94%;
					height: 80rpx;
					color: #FFFFFF;
					font-size: 28rpx;
					line-height: 80rpx;
					border-radius: 40rpx;
					background-color: #FF6C00;
					&.active {
						background-color: #ffb681;
					}
				}
			}
			
			// 阅读同意勾选设备租赁协议
			.uni-agree-agreement-box {
				width: 100%;
				margin: 20rpx 0rpx 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				text {
					font-size: 32rpx;
					font-weight: 500;
					color: #000;
					margin-left: 15rpx;
				}
				span {
					font-size: 32rpx;
					font-weight: 500;
					color: #e37422;
				}
			}
			.hidden-box {
				height: 120rpx;
			}
		}
		// 设备租赁协议弹框
		.uni-wybPopup {
			.popup-content {
				.uni-title {
					width: 100%;
					height: 100rpx;
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.uni-content {
					width: 100%;
					height: 900rpx;
					font-size: 30rpx;
					font-weight: 500;
					padding: 0rpx 20rpx 30rpx;
					.scroll-view {
						width: 100%;
						height: 100%;
						.uni-scroll-item {
							width: 100%;
							min-height: 100%;
						}
					}
				}
			}
		}
	}
</style>
