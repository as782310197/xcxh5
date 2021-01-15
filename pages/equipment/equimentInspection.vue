<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="uni-basic-info-box">
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
				<view class="uni-title">巡查状态</view>
				<view class="uni-record-status" :class="recordStatus === 0 ? '' : 'active'">{{ recordStatus === 0 ? '本日未记录' : '本日已记录' }}</view>
			</view>
		</view>
		
		<!-- 新增巡查记录按钮 -->
		<view class="uni-add-btn-box">
			<button class="uni-btn" type="primary" @click="goToAddEquimentInspection">+&nbsp;新增巡查记录</button>
		</view>
		
		<!-- 巡查记录列表 -->
		<view class="uni-recordList-box" v-if="recordList.length !== 0">
			<view class="uni-record-item" v-for="(item, index) of recordList" :key="index" @click="goToEquipmentInspectionDetails(item)">
				<view class="uni-text">巡查记录时间</view>
				<view class="uni-create-time">
					{{ item.recordDate }}
					<uni-icons class="uni-icons" type="forward" size="16" color="#87898B"></uni-icons>
				</view>
			</view>
		</view>
		
		<!-- 巡查记录列表无记录时显示 -->
		<view class="uni-noRecord-box" v-if="recordList.length === 0">
			<view class="uni-text">暂无巡查记录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				deviceInfo: {}, // 设备信息
				recordStatus: 0, // 今日是否已记录，0未记录
				recordList: [], // 巡查记录列表
				systemTime: '' // 当前系统时间
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getRecordList();
		},
		methods: {
			// 获取巡查记录列表
			getRecordList() {
				this.http({
					url: '/api/bizDeviceRequirement/getDeviceRecord',
					method: 'post',
					data: { id: this.id }
				}).then(res=>{
					if(res.data.code === 1){
						const { deviceInfo, recordStatus, records} = res.data.result
						this.deviceInfo = deviceInfo;
						this.recordStatus = recordStatus;
						this.recordList = records;
					}
				})
			},
			// 点击新增巡查记录按钮，跳转到新增巡查记录页
			goToAddEquimentInspection() {
				uni.navigateTo({
					url: `/pages/equipment/addEquimentInspection?id=${this.id}&&deviceType=${this.deviceInfo.deviceType}&&model=${this.deviceInfo.model}`
				})
			},
			// 点击查看详情，跳转到查看巡查记录详情页
			goToEquipmentInspectionDetails(item) {
				item.deviceType = this.deviceInfo.deviceType;
				item.model = this.deviceInfo.model;
				uni.navigateTo({
					url: '/pages/equipment/equipmentInspectionDetails?item='+ encodeURIComponent(JSON.stringify(item))
				})
			},
			// 获取当前系统日期
			getDate() {
				let nowDate = new Date()
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate()
				}
				this.systemTime = date.year + '-' + date.month + '-' + date.date;
			}
		}
	}
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
				border-top: 1rpx solid #E0EEEE;
			}
			.uni-info-item {
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.uni-title {
					flex: 1;
					color: #5A5E61;
					font-size: 28rpx;
				}
				.uni-info {
					flex: 2;
					color: #000000;
					font-size: 28rpx;
					text-align: right;
				}
				.uni-record-status {
					height: 40rpx;
					font-size: 20rpx;
					color: #fff;
					padding: 5rpx 10rpx;
					background-color: #FF4442;
					border-radius: 5rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					&.active {
						background-color: #4CD964;
					}
				}
			}
		}
		
		
		// 新增巡查记录按钮
		.uni-add-btn-box {
			width: 100%;
			padding: 20rpx 0rpx;
			.uni-btn {
				width: 95%;
				height: 90rpx;
				font-size: 28rpx;
				line-height: 90rpx;
				border-radius: 45rpx;
				background-color: #FF6D00;
			}
			.uni-btn::after {
				content: '';
				border: none;
			}
		}
		
		// 巡查记录列表
		.uni-recordList-box {
			width: 100%;
			.uni-record-item + .uni-record-item {
				border-top: 1rpx solid #E0EEEE;
			}
			.uni-record-item {
				width: 90%;
				height: 80rpx;
				margin: 0rpx auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.uni-text {
					font-size: 28rpx;
					color: #333;
				}
				.uni-create-time {
					font-size: 26rpx;
					color: #87898B;
				}
			}
		}
		
		// 巡查记录列表无记录时显示
		.uni-noRecord-box {
			width: 100%;
			margin: 20rpx 0rpx;
			.uni-text {
				width: 100%;
				font-size: 30rpx;
				color: #959595;
				text-align: center;
			}
		}
	}
</style>
