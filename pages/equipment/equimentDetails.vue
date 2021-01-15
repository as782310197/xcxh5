<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="uni-basic-info-box">
			<view class="uni-info-item">
				<view class="uni-title">租赁公司名称</view>
				<view class="uni-info">{{ equipmentInfo.enterpriseName }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">设备主姓名</view>
				<view class="uni-info">{{ deviceInfo.deviceOwner }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">设备类型</view>
				<view class="uni-info">{{ deviceInfo.deviceType }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">设备种类</view>
				<view class="uni-info">{{ deviceInfo.model }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">设备品牌</view>
				<view class="uni-info">{{ deviceInfo.brand }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">设备型号</view>
				<view class="uni-info">{{ deviceInfo.mechanical }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">预计日租金</view>
				<view class="uni-info">{{ equipmentInfo.rent ? equipmentInfo.rent + '元' : '' }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">结算方式</view>
				<view class="uni-info">{{ equipmentInfo.payType }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">工程名称</view>
				<view class="uni-info">{{ equipmentInfo.projectName }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">工程所在地</view>
				<view class="uni-info">{{ equipmentInfo.location }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">所属银行</view>
				<view class="uni-info">{{ account.accountHolder }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">开户行</view>
				<view class="uni-info">{{ account.bank }}</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-title">银行账号</view>
				<view class="uni-info">{{ account.account }}</view>
			</view>
		</view>

		<!-- 设备相关照片 -->
		<view class="uni-imgList-box" v-if="imgList.length != 0">
			<view class="uni-img-box" v-for="(item, index) of imgList" :key="index" @click="previewImg(index)"><image class="uni-img" :src="item" mode="scaleToFill"></image></view>
		</view>

		<!-- 出租状态 -->
		<view class="uni-status-info-box" v-if="equipmentInfo.status !== 5">
			<view class="uni-info-item">
				<view class="uni-title">出租状态</view>
				<view class="uni-info">{{ equipmentInfo.statusName }}</view>
			</view>
		</view>

		<!-- 阅读同意勾选设备租赁协议 -->
		<view class="uni-agree-agreement-box" v-if="equipmentInfo.status === 5">
			<view class="uni-check-icon-box" @click="changeCkeck">
				<uni-icons type="circle" :size="20" color="#5A5E61" v-if="!isCheck"></uni-icons>
				<uni-icons type="checkbox-filled" :size="20" color="#0A76E6" v-if="isCheck"></uni-icons>
			</view>
			<text>我已阅读并同意</text>
			<span @click="readLeaseAgreement">《设备租赁协议》</span>
		</view>

		<!-- 按钮组 -->
		<view class="uni-bottom-box">
			<button
				class="uni-btn uni-ischeck-btn"
				:class="!isCheck ? 'active' : ''"
				type="primary"
				:disabled="isCheckDisibled"
				v-if="equipmentInfo.status === 5"
				@click="handleCheck"
			>
				确认租约
			</button>
			<button class="uni-btn" type="primary" v-if="equipmentInfo.status !== 5" @click="goToEquimentInspection">巡查记录</button>
		</view>

		<!-- 设备租赁协议弹框 -->
		<wybPopup class="uni-wybPopup" ref="popup" type="center" height="1000" width="650" radius="6" :showCloseIcon="true">
			<view class="popup-content">
				<view class="uni-title">设备租赁协议</view>
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
			equimentId: '', // 设备id
			equimentDataList: [], // 设备列表
			equipmentInfo: {
				enterpriseName: ''
			}, // 设备基本信息
			account: {}, // 银行信息
			deviceInfo: {}, // 设备详情
			enterpriseName: '', // 公司名称
			// 设备相关照片列表
			imgList: [],
			status: 0, // 出租状态
			isCheck: false, // 是否勾选已阅读并同意协议
			isCheckDisibled: true, // 设置确认租约按钮是否可点击
			leaseAgreement: '' //租赁协议，html格式
		};
	},
	onLoad(options) {
		this.equimentId = options.id;
		this.getEquimentDetail();
		let arr = uni.getStorageSync('equimentDataList');
		let obj = arr.find(item => item.id = this.equimentId);
		this.enterpriseName = obj.enterpriseName;
	},
	methods: {
		// 获取设备详情
		getEquimentDetail() {
			var param = {
				id: this.equimentId
			};
			this.http({
				url: '/api/bizDeviceRequirement/get',
				method: 'post',
				data: param
			}).then(res => {
				if (res.data.code == 1) {
					var result = res.data.result;
					this.equipmentInfo = result.requirement ? result.requirement : {};
					this.equipmentInfo.enterpriseName = this.enterpriseName;
					this.account = result.account ? result.account : {};
					this.deviceInfo = result.deviceInfo ? result.deviceInfo : {};
					if (result.deviceInfo) {
						this.imgList = [result.deviceInfo.devicePhoto1, result.deviceInfo.devicePhoto2, result.deviceInfo.devicePhoto3, result.deviceInfo.devicePhoto4, result.deviceInfo.certificate, result.deviceInfo.nameplate];
					}
					uni.setStorageSync('equipmentInfo', result);
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},

		// 预览图片
		previewImg(index) {
			uni.previewImage({
				current: index,
				// 预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				urls: this.imgList
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
		// 点击设备租赁协议
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
			let param = this.equipmentInfo;
			this.http({
				url: '/api/bizDeviceRequirement/ensureDeviceRequirement',
				method: 'post',
				data: param
			}).then(res => {
				if(res.data.code === 1 ){
					uni.showToast({
						title: res.data.result,
						icon: 'none',
						duration: 2000
					});
					this.getEquimentDetail();
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 点击巡查记录按钮跳转到巡查记录页
		goToEquimentInspection() {
			uni.navigateTo({
				url: '/pages/equipment/equimentInspection?id=' + this.equimentId
			});
		}
	}
};
</script>

<style scoped lang="scss">
// 引用公共样式————设置通配选择器
@import '/common/lib/uni.css';
.container {
	width: 100%;

	// 基本信息
	.uni-basic-info-box {
		width: 95%;
		border-radius: 10rpx;
		background-color: #f0f0f0;
		padding: 0rpx 10rpx;
		margin: 20rpx auto;
		.uni-info-item + .uni-info-item {
			border-top: 1rpx solid #e0eeee;
		}
		.uni-info-item {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.uni-title {
				flex: 1;
				color: #5a5e61;
				font-size: 28rpx;
			}
			.uni-info {
				flex: 2;
				color: #000000;
				font-size: 28rpx;
				text-align: right;
			}
		}
	}

	// 设备相关照片
	.uni-imgList-box {
		width: 95%;
		border-radius: 10rpx;
		background-color: #f0f0f0;
		padding: 20rpx;
		margin: 20rpx auto;
		display: flex;
		flex-wrap: wrap;
		.uni-img-box {
			width: 45%;
			height: 200rpx;
			margin: 10rpx 16rpx;
			.uni-img {
				width: 100%;
				height: 100%;
			}
		}
	}

	// 出租状态
	.uni-status-info-box {
		width: 95%;
		border-radius: 10rpx;
		background-color: #f0f0f0;
		padding: 0rpx 10rpx;
		margin: 20rpx auto;
		.uni-info-item {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.uni-title {
				flex: 1;
				color: #5a5e61;
				font-size: 28rpx;
			}
			.uni-info {
				flex: 2;
				color: #000000;
				font-size: 28rpx;
				text-align: right;
			}
		}
	}

	// 阅读同意勾选设备租赁协议
	.uni-agree-agreement-box {
		width: 100%;
		margin: 20rpx 0rpx;
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

	// 按钮组
	.uni-bottom-box {
		width: 100%;
		padding: 20rpx 0rpx;
		.uni-btn {
			width: 95%;
			height: 90rpx;
			font-size: 28rpx;
			line-height: 90rpx;
			border-radius: 45rpx;
			background-color: #ff6d00;
		}
		.uni-btn::after {
			content: '';
			border: none;
		}
		.uni-ischeck-btn {
			&.active {
				background-color: #ffb681;
			}
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
