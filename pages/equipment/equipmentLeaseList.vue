<template>
	<view class="container">
		<!-- 设备列表 -->
		<view class="uni-equimentList-view" v-if="equimentList.length !== 0">
			<scroll-view class="uni-scroll-view" scroll-y="true">
				<view class="uni-scroll-item-box">
					<view class="uni-scroll-item" v-for="(item, index) of equimentList" :key="index" @click="goToEquimentDetails(item.id)">
						<view class="uni-item-left">
							<view class="uni-msg-view">
								<view class="uni-title">设备主信息</view>
								<view class="uni-content">{{ item.deviceOwner }}</view>
							</view>
							<view class="uni-msg-view">
								<view class="uni-title">设备类型</view>
								<view class="uni-content">{{ item.deviceType }}</view>
							</view>
						</view>
						<view class="uni-item-right">
							<view class="uni-status-view">{{ item.statusName }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 设备列表为空时显示 -->
		<view class="uni-noData-view" v-if="equimentList.length === 0">
			<view class="uni-text1">没有出租的设备</view>
			<view class="uni-text2">请添加你需要出租的设备</view>
		</view>
		<!-- 底部按钮栏 -->
		<view class="uni-bottom-btn-view">
			<button class="uni-btn uni-add-btn" type="primary" @click="goToAddEquimentLease">+&nbsp;新增设备</button>
			<!-- <button class="uni-btn uni-register-btn" type="primary" @click="goToEquimentLogin">注册个体户</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				current: 1, // 分页查询，当前页数
				totalPage: 0, // 总页数
				// 设备列表
				equimentList: [
					/* {
						name: '白居易',
						type: '挖掘机械',
						status: '审核通过'
					},
					{
						name: '白居易',
						type: '挖掘机械',
						status: '审核通过'
					},
					{
						name: '白居易',
						type: '挖掘机械',
						status: '审核通过'
					} */
				]
			}
		},
		onLoad(option) {
			this.getEquipmentList();
			this.id = option.id;
		},
		methods: {
			// 获取设备列表
			getEquipmentList() {
				var memberId = uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').id;
				var param = {
					memberId,
					page: {
						current: this.current,
						size: 10
					}
				};
				this.http({
					url: '/api/bizDeviceRequirement/getMyDeviceRequirement',
					method: 'post',
					data: param
				}).then(res => {
					if (res.data.code == 1) {
						var result = res.data.result.records
						this.equimentList = this.equimentList.concat(result);
						uni.setStorageSync('equimentDataList', this.equimentList);
						this.totalPage = res.data.result.pages;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			// scroll-view触底事件
			scrolltolower() {
				// 触底当前页数加一
				this.current = this.current + 1;
				// 判断当前页数是否小于等于总页数
				if (this.current <= this.totalPage) {
					this.getEquipmentList();
				}
			},
			
			// 跳转到设备详情页
			goToEquimentDetails(id) {
				uni.navigateTo({
					url: '/pages/equipment/equimentDetails?id=' + id
				});
			},
			// 跳转到添加设备列表页
			goToAddEquimentLease() {
				uni.navigateTo({
					url: '/pages/equipment/addEquipmentLeaseList'
				});
			}
			// 跳转到设备登录页
			// goToEquimentLogin() {
			// 	uni.navigateTo({
			// 		url: '/pages/equipment/equipmentLogin'
			// 	});
			// }
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;
		background-color: #f0f0f0;

		// 设备列表
		.uni-equimentList-view {
			width: 100%;
			height: calc(100vh - 110rpx);
			background-color: #f0f0f0;

			.uni-scroll-view {
				width: 100%;
				height: 100%;

				.uni-scroll-item-box {
					width: 100%;
					min-height: 100%;
					padding: 25rpx 0rpx;

					.uni-scroll-item+.uni-scroll-item {
						margin-top: 20rpx;
					}

					.uni-scroll-item {
						width: 95%;
						height: 120rpx;
						background-color: #FFFFFF;
						padding: 20rpx 60rpx 20rpx 20rpx;
						margin: 0rpx auto;
						background-image: url(../../static/icon/youjiantou.png);
						background-repeat: no-repeat;
						background-size: 50rpx 50rpx;
						background-position: 98% 50%;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.uni-item-left {
							display: flex;
							// align-items: center;

							.uni-msg-view+.uni-msg-view {
								margin-left: 40rpx;
							}

							.uni-msg-view {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: space-between;
								.uni-title {
									font-size: 22rpx;
									color: #909090;
								}

								.uni-content {
									font-size: 30rpx;
									font-weight: bold;
									color: #333333;
								}
							}
						}

						.uni-item-right {
							.uni-status-view {
								font-size: 22rpx;
								font-weight: 500;
								color: #FFFFFF;
								background-color: #4CB050;
								border-radius: 10rpx;
								padding: 5rpx 10rpx;
							}
						}
					}
				}
			}
		}

		// 设备列表为空时显示
		.uni-noData-view {
			width: 100%;
			height: calc(100vh - 110rpx);
			background-color: #f0f0f0;
			padding-top: 300rpx;

			.uni-text1 {
				width: 100%;
				font-size: 36rpx;
				font-weight: 500;
				color: #999999;
				text-align: center;
			}

			.uni-text2 {
				width: 100%;
				font-size: 32rpx;
				font-weight: 500;
				color: #F06907;
				text-align: center;
			}
		}

		// 底部按钮栏
		.uni-bottom-btn-view {
			width: 100%;
			background-color: #FFFFFF;
			padding: 10rpx 0rpx;

			// .uni-btn+.uni-btn {
			// 	margin-top: 10rpx;
			// }

			.uni-btn {
				width: 90%;
				height: 90rpx;
				font-size: 28rpx;
				background-color: #FF6D00;
				border-radius: 45rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.uni-btn::after {
				content: '';
				border: none;
			}
		}
	}
</style>
