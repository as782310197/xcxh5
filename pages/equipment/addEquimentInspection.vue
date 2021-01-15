<template>
	<view class="container">
		<!-- 设备类型 -->
		<view class="uni-type-box">
			<view class="uni-icon"><uni-icons type="info" size="24" color="#848587"></uni-icons></view>
			<view class="uni-info">{{ deviceType }}</view>
		</view>
		<!-- 设备种类 -->
		<view class="uni-class-box">{{ model }}</view>

		<!-- 添加设备巡查记录表单 -->
		<view class="uni-form-box">
			<form class="uni-form" @submit="handleSubmit">
				<view class="uni-form-item">
					<view class="uni-label">
						<image class="uni-icon" src="../../static/icon/riqi.png" mode="widthFix"></image>
						<span>创建时间:</span>
					</view>
					<view class="uni-input-box">{{ dateTime }}</view>
				</view>
				<view class="uni-form-item">
					<view class="uni-label"><image class="uni-icon" src="../../static/icon/dingwei.png" mode="widthFix"></image></view>
					<view class="uni-input-box">
						<view class="uni-choice-map" :class="address ? '' : 'active'" @click="getLocation">{{ address ? address : '请选择巡查位置' }}</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">机械照片</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 机械照片1 -->
						<view class="on-upload-img" @click="uploadMechanicsImg1">
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="loadingMechanicsImgSrc1" mode="aspectFit"></image>
							<image @load="loadingMechanicsImgSrc1 = false" class="img" :src="mechanicsImgSrc1" mode="scaleToFill" v-show="!loadingMechanicsImgSrc1"></image>
						</view>
						<!-- 机械照片2 -->
						<view class="on-upload-img" @click="uploadMechanicsImg2">
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="loadingMechanicsImgSrc2" mode="aspectFit"></image>
							<image  @load="loadingMechanicsImgSrc2 = false" class="img" :src="mechanicsImgSrc2" mode="scaleToFill" v-show="!loadingMechanicsImgSrc2"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">工地照片</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 工地照片1 -->
						<!-- <view class="on-upload-img" @click="uploadWorkSiteImg1"><image class="img" :src="workSiteImgSrc1" mode="scaleToFill"></image></view> -->
						<view class="on-upload-img" @click="uploadWorkSiteImg1">
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="loadingWorkSiteImgSrc1" mode="aspectFit"></image>
							<image  @load="loadingWorkSiteImgSrc1 = false" class="img" :src="workSiteImgSrc1" mode="scaleToFill" v-show="!loadingWorkSiteImgSrc1"></image>
						</view>
						<!-- 工地照片2 -->
						<!-- <view class="on-upload-img" @click="uploadWorkSiteImg2"><image class="img" :src="workSiteImgSrc2" mode="scaleToFill"></image></view> -->
						<view class="on-upload-img" @click="uploadWorkSiteImg2">
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="loadingWorkSiteImgSrc2" mode="aspectFit"></image>
							<image  @load="loadingWorkSiteImgSrc2 = false" class="img" :src="workSiteImgSrc2" mode="scaleToFill" v-show="!loadingWorkSiteImgSrc2"></image>
						</view>
					</view>
				</view>
				<!-- 说明 -->
				<view class="uni-explain-box">
					<p>说明：</p>
					<p>信息提交后将不可以更改删除。提交前请确认照片是否正确。</p>
				</view>
				<button class="uni-submit-btn" :class="!submitDisabled ? 'active' : ''" type="primary" :disabled="!submitDisabled" form-type="submit">提交巡查信息</button>
			</form>
		</view>
	</view>
</template>
<script>
import { uploadFile, formatDate } from '../../utils/common.js';
var jweixin = require('jweixin-module');

export default {
	data() {
		return {
			id: '',
			deviceType: '', //设备类型
			model: '', //设备种类
			dateTime: formatDate(new Date()), // 日期时间
			address: '', // 地理位置
			mechanicsImgSrc1: '', // 机械照片1
			mechanicsImgSrc2: '', // 机械照片2
			workSiteImgSrc1: '', // 工地照片1
			workSiteImgSrc2: '', // 工地照片2
			// submitDisabled: true, // 提交巡查信息按钮是否 可点击
			params: {
				appId: '',
				nonceStr: '',
				signature: '',
				timestamp: '',
				url: '',
			},
			loadingMechanicsImgSrc1: false,
			loadingMechanicsImgSrc2: false,
			loadingWorkSiteImgSrc1: false,
			loadingWorkSiteImgSrc2: false,
		};
	},
	computed: {
		submitDisabled: function() {
			// 只要都不为空才可以上传
			return this.address !== '' && this.mechanicsImgSrc1 !== '' && this.mechanicsImgSrc2 !== '' && this.workSiteImgSrc1 !== '' && this.workSiteImgSrc2 !== '';
		}
	},
	onLoad(option) {
		this.deviceType = option.deviceType ? option.deviceType : '';
		this.model = option.model ? option.model : '';
		this.id = option.id;
		this.getParams();
	},
	methods: {
		// 获取js-sdk配置参数
		getParams(){
			console.log(location.href.split('#')[0]);
			this.http({
				url: '/api/wx/getSign',
				method: 'post',
				data:{
					url: location.href.split('#')[0]
				}
			}).then(res => {
				if (res.data.code === 1) {
					this.params = res.data.result
					this.getLocation();
				} else {
					console.log('获取配置参数失败');
				}
			});
		},
		// 获取当前位置
		getLocation() {
			const _this = this;
			// 判断是否支持获取定位
			jweixin.config({
				debug: false, //开启debug模式.正式环境设置为false,测试环境设置为true
				appId: this.params.appId,
				timestamp: this.params.timestamp,
				nonceStr: this.params.nonceStr,
				signature: this.params.signature,
				jsApiList: ['getLocation'] //根据需要看需要哪些SDK的功能
			});
			// sdk加载完成后执行
			jweixin.ready(function() {
				jweixin.checkJsApi({
					jsApiList: ['getLocation'],
					success: function(res) {
						if (res.checkResult.getLocation == false) {
							alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
							return;
						}
					}
				});
				jweixin.error(function(res) {
					console.log('接口调取失败');
				});
				// 获取位置
				jweixin.getLocation({
					type: 'gcj02',
					success: res => {
						_this.http({
							url: '/api/common/regeo',
							method: 'post',
							data: {
								lng: res.longitude,
								lat: res.latitude
							}
						}).then(res1 => {
							if (res1.data.code === 1) {
								_this.address = res1.data.result;
							} else {
								uni.showToast({
									title: '当前经纬度解析失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					},
					cancel: function(res) {
						alert('您已禁止获取位置信息');
					}
				});
			});
		},
		// 机械照片1
		uploadMechanicsImg1() {
			uploadFile().then(res => {
				if (this.loadingMechanicsImgSrc1) return false;
				if (res.statusCode == 200) {
					this.mechanicsImgSrc1 = JSON.parse(res.data).url;
					this.loadingMechanicsImgSrc1 = true;
				}
			});
		},
		// 机械照片2
		uploadMechanicsImg2() {
			if (this.loadingMechanicsImgSrc2sss) return false;
			uploadFile().then(res => {
				if (res.statusCode == 200) {
					this.mechanicsImgSrc2 = JSON.parse(res.data).url;
					this.loadingMechanicsImgSrc2 = true;
				}
			});
		},
		// 工地照片1
		uploadWorkSiteImg1() {
			uploadFile().then(res => {
				if (this.loadingWorkSiteImgSrc1) return false;
				if (res.statusCode == 200) {
					this.workSiteImgSrc1 = JSON.parse(res.data).url;
					this.loadingWorkSiteImgSrc1 = true;
				}
			});
		},
		// 工地照片2
		uploadWorkSiteImg2() {
			uploadFile().then(res => {
				if (this.loadingWorkSiteImgSrc2) return false;
				if (res.statusCode == 200) {
					this.workSiteImgSrc2 = JSON.parse(res.data).url;
					this.loadingWorkSiteImgSrc2 = true;
				}
			});
		},
		//  点击提交按钮
		handleSubmit() {
			const { id, dateTime, address, mechanicsImgSrc1, mechanicsImgSrc2, workSiteImgSrc1, workSiteImgSrc2 } = this.$data;
			this.http({
				url: '/api/bizDeviceRequirement/importInspectionRecord',
				method: 'post',
				data: {
					requirementId: id,
					recordDate: dateTime,
					recordLocate: address,
					photo1: mechanicsImgSrc1,
					photo2: mechanicsImgSrc2,
					photo3: workSiteImgSrc1,
					photo4: workSiteImgSrc2
				}
			}).then(res => {
				if (res.data.code === 1) {
					uni.showToast({
						title: res.data.result + '，页面跳转中',
						icon: 'none',
						duration: 2000
					});
					// 跳转回巡查记录页
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/equipment/equimentInspection?id=' + this.id
						});
					}, 2000);
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		loadOver() {
			console.log('上传完毕');
		}
	}
};
</script>

<style scoped lang="scss">
// 引用公共样式————设置通配选择器
@import '/common/lib/uni.css';

.container {
	width: 100%;

	// 设备类型
	.uni-type-box {
		width: 100%;
		padding: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.uni-info {
			font-size: 32rpx;
			color: #000;
		}
	}

	// 设备种类
	.uni-class-box {
		width: 90%;
		height: 100rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #000;
		background-color: #f0f4f7;
		margin: 0rpx auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 添加设备巡查记录表单
	.uni-form-box {
		width: 100%;

		.uni-form {
			width: 100%;

			.uni-form-item {
				width: 90%;
				min-height: 80rpx;
				padding: 20rpx 0rpx;
				margin: 0rpx auto;
				border-bottom: 1rpx solid #eaeaea;
				display: flex;
				align-items: center;

				// justify-content: space-between;
				.uni-label {
					display: flex;
					align-items: center;
					justify-content: center;

					.uni-icon {
						width: 45rpx;
						display: inline-block;
					}

					span {
						font-size: 28rpx;
						color: #575757;
						margin-left: 20rpx;
					}
				}

				.uni-input-box {
					flex: 1;
					min-height: 80rpx;
					font-size: 28rpx;
					color: #575757;
					margin-left: 30rpx;
					display: flex;
					align-items: center;

					.uni-picker {
						.uni-input {
							font-size: 28rpx;
							color: #575757;
						}
					}

					.uni-choice-map {
						width: 100%;
						min-height: 80rpx;
						display: flex;
						align-items: center;
						&.active {
							color: #d0d0d0;
						}
					}
				}
			}

			.upload-img-view {
				width: 100%;
				margin-top: 20rpx;
				padding: 0rpx 20rpx;

				.label {
					color: #616162;
					font-weight: bold;
					font-size: 26rpx;
					margin-left: 20rpx;
				}

				.upload-box {
					width: 100%;
					height: 200rpx;
					margin-top: 20rpx;
					// margin-bottom: 10rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.on-upload-img {
						width: 300rpx;
						height: 200rpx;
						border: 1rpx solid #cccccc;
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

			// 说明
			.uni-explain-box {
				width: 100%;
				font-size: 24rpx;
				color: #939393;
				padding: 40rpx;

				p + p {
					margin-top: 10rpx;
				}
			}

			.uni-submit-btn {
				width: 90%;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 45rpx;
				font-size: 28rpx;
				background-color: #ff6d00;
				margin-bottom: 30rpx;

				&.active {
					background-color: #ffb681;
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
