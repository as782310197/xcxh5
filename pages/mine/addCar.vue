<template>
	<view class="container">
		<view class="add-car-form-view">
			<form class="form" @submit="handleSubmit">
				<input type="text" name="id" v-model="carDetailsList.id" v-show="false">
				<view class="form-item">
					<view class="label">车主姓名</view>
					<input class="input" name="carOwner" type="text" v-model="carDetailsList.carOwner" placeholder="请输入车主真实姓名"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">车辆品牌</view>
					<input class="input" name="brand" type="text" v-model="carDetailsList.brand" placeholder="请输入车辆所属品牌"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">车辆型号</view>
					<input class="input" name="vehicleModel" type="text" v-model="carDetailsList.vehicleModel" placeholder="请输入车辆型号"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">发动机号</view>
					<input class="input" name="engineNumber" type="text" v-model="carDetailsList.engineNumber" placeholder="请输入发动机号"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">车架号</view>
					<input class="input" name="identifyNumber" type="text" v-model="carDetailsList.identifyNumber" placeholder="请输入车辆所属车架号"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">车辆使用油号</view>
					<input class="input" name="oilType" type="text" v-model="carDetailsList.oilType" placeholder="请输入车辆使用油号"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">年检日期</view>
					<picker mode="date" name="inspectionDate" :value="carDetailsList.inspectionDate" @change="bindDateChange" class="input">
						<view class="uni-input">{{ carDetailsList.inspectionDate }}</view>
					</picker>
				</view>
				<view class="upload-img-view">
					<view class="label">商业险保单</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 商业险保单 -->
						<view class="on-upload-img" @click="uploadInsuranceImg01">
							<image v-show="commercialInsuranceLoading" class="loading" src="../../static/images/loading/loading.gif" mode="aspectFit"></image>
							<image @load="commercialInsuranceLoading = false" v-show="carDetailsList.commercialInsurance && !commercialInsuranceLoading" class="img" :src="carDetailsList.commercialInsurance" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">交强险保单</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 交强险保单 -->
						<view class="on-upload-img" @click="uploadInsuranceImg02">
							<image v-show="insuranceLoading" class="loading" src="../../static/images/loading/loading.gif" mode="aspectFit"></image>
							<image @load="insuranceLoading = false" v-show="carDetailsList.insurance && !insuranceLoading" class="img" :src="carDetailsList.insurance" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">行驶证正本</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证正本 -->
						<view class="on-upload-img" @click="uploadDriverImg01">
							<image v-show="drivingPermitFrontLoading" class="loading" src="../../static/images/loading/loading.gif" mode="aspectFit"></image>
							<image @load="drivingPermitFrontLoading = false" v-show="carDetailsList.drivingPermitFront && !drivingPermitFrontLoading" class="img" :src="carDetailsList.drivingPermitFront" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">行驶证副本</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadDriverImg02">
							<image v-show="drivingPermitBackLoading" class="loading" src="../../static/images/loading/loading.gif" mode="aspectFit"></image>
							<image @load="drivingPermitBackLoading = false" v-show="carDetailsList.drivingPermitBack && !drivingPermitBackLoading" class="img" :src="carDetailsList.drivingPermitBack" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<button class="submit-btn" form-type="submit" type="primary">保存</button>
			</form>
		</view>
	</view>
</template>

<script>
	// 引入图片组件
	// import unloadImage from '@/components/common/unload-image.vue'
	import {
		uploadFile
	} from '../../utils/common.js'

	export default {
		// components: {
		// 	unloadImage
		// },
		data() {
			return {
				carDetailsList: {},// 车辆信息
				commercialInsuranceLoading: false,
				insuranceLoading: false, //上传图片的加载中
				drivingPermitFrontLoading: false,
				drivingPermitBackLoading: false
			}
		},
		onLoad(option) {
			var carId = option.id;
			this.carId = carId;
			this.carDetailsList = uni.getStorageSync('carData');
		},
		methods: {
			bindDateChange(val) {
				this.carDetailsList.inspectionDate = val.target.value
			},
			// 保存数据
			handleSubmit(e) {
				var param = e.detail.value;
				if (!param.carOwner) {
					uni.showToast({
						title: '车主姓名不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!param.brand) {
					uni.showToast({
						title: '车辆品牌不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!param.vehicleModel) {
					uni.showToast({
						title: '车辆型号不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!param.engineNumber) {
					uni.showToast({
						title: '发动机号不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!param.identifyNumber) {
					uni.showToast({
						title: '车架号不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!param.oilType) {
					uni.showToast({
						title: '车辆使用油号不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!param.inspectionDate) {
					uni.showToast({
						title: '年检日期不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!this.carDetailsList.commercialInsurance) {
					uni.showToast({
						title: '商业险保单不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!this.carDetailsList.insurance) {
					uni.showToast({
						title: '交强险保单不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!this.carDetailsList.drivingPermitFront) {
					uni.showToast({
						title: '行驶证正本不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!this.carDetailsList.drivingPermitBack) {
					uni.showToast({
						title: '行驶证副本不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				}
				param.commercialInsurance = this.carDetailsList.commercialInsurance;
				param.insurance = this.carDetailsList.insurance;
				param.drivingPermitFront = this.carDetailsList.drivingPermitFront;
				param.drivingPermitBack = this.carDetailsList.drivingPermitBack;
				this.http({
					url: '/api/bizCarInfo/updateMyCarInfo',
					method: 'post',
					data: param
				}).then(res => {
					if(res.data.code === 1) {
						uni.showToast({
							title: res.data.message+'，正在跳转',
							icon: 'none',
							duration: 2000
						});
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/mine/car'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.data.message ? res.data.message : '更新失败',
							icon: 'none',
							duration: 2000
						});
					}
				})

			},
			// 上传图片
			// 商业险保单
			uploadInsuranceImg01() {
				if (this.commercialInsuranceLoading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.carDetailsList.commercialInsurance = JSON.parse(res.data).url;
						this.commercialInsuranceLoading = true;
					}
				})
			},
			// 交强险保单
			uploadInsuranceImg02() {
				if (this.insuranceLoading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.carDetailsList.insurance = JSON.parse(res.data).url;
						this.insuranceLoading = true;
					}
				})
			},
			// 行驶证正本
			uploadDriverImg01() {
				uploadFile().then(res => {
					if (this.drivingPermitFrontLoading) return false;
					if (res.statusCode == 200) {
						this.carDetailsList.drivingPermitFront = JSON.parse(res.data).url;
						this.drivingPermitFrontLoading = true;
					}
				})
			},
			// 驾驶证副本
			uploadDriverImg02() {
				uploadFile().then(res => {
					if (this.drivingPermitBackLoading) return false;
					if (res.statusCode == 200) {
						this.carDetailsList.drivingPermitBack = JSON.parse(res.data).url;
						this.drivingPermitBackLoading = true;
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

		.add-car-form-view {
			width: 90%;
			margin: 20rpx auto 0rpx;

			.form {
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
						font-size: 28rpx;
					}

					.input {
						flex: 2;
						height: 100%;
						line-height: 80rpx;
						font-size: 28rpx;
					}
				}

				.upload-img-view {
					width: 100%;
					margin-top: 20rpx;

					.label {
						color: #616162;
						font-size: 26rpx;
					}

					.upload-box {
						width: 100%;
						height: 200rpx;
						margin-top: 20rpx;
						// margin-bottom: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.on-upload-img {
							width: 300rpx;
							height: 200rpx;
							border: 1rpx solid #CCCCCC;
							background-color: #e5e4e5;
							background-image: url(../../static/icon/add-icon.png);
							background-repeat: no-repeat;
							background-position: 50% 50%;
							background-size: 100rpx 100rpx;
							// margin-top: 20rpx;
							// margin-left: 50%;
							// margin-bottom: 10rpx;

							.img {
								width: 100%;
								height: 100%;
							}
							
							.loading {
								width: 100%;
								height: 100%;
								background-color: #fff;
							}
						}
					}
				}

				// 保存按钮
				.submit-btn {
					width: 100%;
					height: 80rpx;
					font-size: 28rpx;
					line-height: 80rpx;
					border-radius: 40rpx;
					background-color: #FF6D00;
					margin-top: 50rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
