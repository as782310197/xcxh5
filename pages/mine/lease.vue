<template>
	<view class="container">
		<view class="lease-list-view" v-show="!noData" v-for="item in leaseList" :key="item.id" @click="goToLeaseDetails(item)">
			<view class="list-item-view">
				<view class="title">车主姓名</view>
				<view class="info">{{ item.carOwner }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">车牌号</view>
				<view class="info">{{ item.carNumber }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">租金</view>
				<view class="info">{{ item.rent }}元</view>
			</view>
			<view class="list-item-view">
				<view class="title">租用时长</view>
				<view class="info">{{ item.duration }}个月</view>
			</view>
			<view class="list-item-view">
				<view class="title">结算周期</view>
				<view class="info">{{ item.period }}个月</view>
			</view>
			<view class="list-item-view">
				<view class="title">状态</view>
				<view class="info">{{ item.statusName }}</view>
			</view>
		</view>

		<!-- 暂无数据(无数据时显示) -->
		<view class="no-data" v-show="noData">
			<image class="no-data-icon" src="../../static/images/noData/zanwuzuyue.png" mode="scaleToFill"></image>
			<view class="text">暂无租约</view>
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
				leaseList: [
					// {
					// 	id: '1',
					// 	carOwner: '周先生',
					// 	carNumber: '粤A12345',
					// 	rent: '108000.00',
					// 	duration: '12',
					// 	period: '1',
					// 	statusName: '出租中',
					// 	createTime: '2020-12-30'
					// }
				]
			}
		},
		created() {
			this.getLeaseData();
		},
		// 触底刷新钩子函数
		onReachBottom() {
			// 触底当前页数加一
			this.current = this.current + 1;
			// 判断当前页数是否小于等于总页数
			if (this.current <= this.totalPage) {
				this.getLeaseData();
			}
		},
		methods: {
			// 点击租约列表,跳转到租约详情
			goToLeaseDetails(data) {
				uni.navigateTo({
					url: '/pages/mine/leaseDetails?leaseId=' + data.id
				})
			},
			// 获取我的租约数据
			getLeaseData() {
				var memberId = uni.getStorageSync('userInfo').id;
				this.http({
					url: '/api/bizRequirement/getMyEnterpriseRequirement',
					method: 'post',
					data: {
						memberId,
						page: {
							current: this.current,
							size: 4
						}
					}
				}).then(res => {
					if (res.data.code == 1) {
						this.leaseList = this.leaseList.concat(res.data.result.records);
						uni.setStorageSync('leaseDataList', this.leaseList);
						this.totalPage = res.data.result.pages;
						if (this.leaseList.length == 0) {
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
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		.lease-list-view {
			width: 94%;
			margin: 20rpx auto 0rpx;
			background-color: #f0f0f0;
			background-image: url(../../static/icon/youjiantou.png);
			background-repeat: no-repeat;
			background-size: 50rpx 50rpx;
			background-position: 98% 50%;
			padding: 20rpx 90rpx 20rpx 20rpx;
			border-radius: 10rpx;

			.list-item-view {
				width: 100%;
				height: 50rpx;
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
