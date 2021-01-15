<template>
	<view class="container">
		<!-- 车辆列表 -->
		<view class="car-list-view" v-show="!noData">
			<view class="list-item-view" v-for="item in carList" :key="item.id" @click="goToVehicleDetails(item.id)">
				<!-- 车牌号 -->
				<view class="license-plate">{{ item.carNumber }}</view>
				<!-- 状态 -->
				<view class="state">
					<!-- 车辆状态 -->
					<view class="vehicle-status">车辆状态：{{ item.statusName }}</view>
					<!-- 出租状态 -->
					<view class="rental-status">出租状态：{{ item.requirementStatusName }}</view>
				</view>
			</view>
		</view>

		<!-- 按钮 -->
		<!-- <view class="btn-view">
			<button class="button" type="default" @click="handleAddCar">新增汽车</button>
		</view> -->

		<!-- 暂无数据(无数据时显示) -->
		<view class="no-data" v-show="noData">
			<image class="no-data-icon" src="../../static/images/noData/zanwudingdan.png" mode="scaleToFill"></image>
			<view class="text">暂无车辆</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noData: false,
				current: 1, // 分页查询，当前页数
				totalPage: 0, // 总页数
				carList: []
			}
		},
		created() {
			this.getCarInfo();
		},
		// 触底刷新钩子函数
		onReachBottom() {
			// 触底当前页数加一
			this.current = this.current + 1;
			// 判断当前页数是否小于等于总页数
			if (this.current <= this.totalPage) {
				this.getCarInfo();
			}
		},
		methods: {
			// 获取车辆信息
			getCarInfo() {
				var memberId = uni.getStorageSync('userInfo').id;
				this.http({
					url: '/api/bizCarInfo/getMyEnterpriseCarInfo',
					method: 'post',
					data: {
						memberId,
						page: {
							current: this.current,
							size: 10
						}
					}
				}).then(res => {
					var data = res.data;
					if (data.code == 1) {
						this.carList = this.carList.concat(data.result.records);
						this.totalPage = res.data.result.pages;
						if (this.carList.length == 0) {
							this.noData = true
						} else {
							this.noData = false
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			goToVehicleDetails(id) {
				uni.setStorageSync('carData', this.carList.find(i => i.id === id));
				uni.navigateTo({
					url: '/pages/mine/vehicleDetails?id=' + id
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

		// 车辆列表
		.car-list-view {
			width: 94%;
			margin: 0 auto;
			margin-bottom: 110rpx;

			.list-item-view {
				width: 100%;
				height: 150rpx;
				background-color: #F0F0F0;
				background-image: url(../../static/icon/youjiantou.png);
				background-repeat: no-repeat;
				background-size: 50rpx 50rpx;
				background-position: 98% 50%;
				border-radius: 10rpx;
				margin-top: 20rpx;
				padding-top: 20rpx;
				padding-left: 20rpx;

				// 车牌号
				.license-plate {
					width: 180rpx;
					height: 50rpx;
					line-height: 50rpx;
					color: #FFFFFF;
					font-size: 32rpx;
					text-align: center;
					background-color: #FF6D00;
					border-radius: 10rpx;
				}

				.state {
					color: #9C9D9F;
					font-size: 28rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20rpx;

					// 车辆状态
					.vehicle-status {
						flex: 1;
					}

					// 出租状态
					.rental-status {
						flex: 1;
					}
				}
			}
		}

		.btn-view {
			width: 100%;
			height: 110rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #FFFFFF;
			padding-top: 15rpx;

			// .button {
			// 	width: 94%;
			// 	height: 80rpx;
			// 	color: #FFFFFF;
			// 	font-size: 28rpx;
			// 	line-height: 80rpx;
			// 	border-radius: 40rpx;
			// 	background-color: #FF6C00;
			// 	margin-bottom: 10rpx;
			// }
		}

		// 暂无数据
		.no-data {
			width: 100%;
			margin-top: 100rpx;
			text-align: center;

			.no-data-icon {
				width: 200rpx;
				height: 200rpx;
			}
			
			.text {
				margin-top: 10rpx;
				text-align: center;
				font-size: 32rpx;
				color: #BFBFBF;
			}
		}
	}
</style>
