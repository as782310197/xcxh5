<template>
	<view class="container">
		<!-- 设备列表 -->
		<view class="uni-equimentList-view" v-if="equimentList.length !== 0">
			<scroll-view class="uni-scroll-view" scroll-y="true" @scrolltolower="scrolltolower">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1, // 分页查询，当前页数
				totalPage: 0, // 总页数
				list: [],
				// 设备列表
				equimentList: []
			}
		},
		onLoad() {
			this.getEquipmentList();
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
					url: '/api/bizDeviceRequirement/getMyAddDevicePage',
					method: 'post',
					data: param
				}).then(res => {
					if (res.data.code == 1) {
						var result = res.data.result.records
						if(result.length === 0) {
							uni.showModal({
							    title: '暂无设备需求',
							    content: '请先从后台添加设备需求',
								showCancel: false,
								confirmColor: '#FF6D00',
								confirmText: '返回',
							    success: function (res1) {
							        if (res1.confirm) {
										uni.navigateBack()
							        }
							    }
							});
						}else {
							this.equimentList = this.equimentList.concat(result);
							uni.setStorageSync('addEquimentDataList', this.equimentList);
							this.totalPage = res.data.result.pages;
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
					url: '/pages/equipment/addEquimentLease?id=' + id
				});
			}
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
			height: 100vh;
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

	}
</style>
