<template>
	<view>
		<view class="container">
			<!-- 筛选-订单-按月份 -->
			<view class="filter-orders">
				<view class="left-view">时间</view>
				<view class="right-view">
					<!-- 选择时间 -->
					<view class="time-view">
						<picker class="date-picker" mode="date" fields="month" :value="date" @change="bindDateChange">
							<view class="time" v-show="!showTime">全部</view>
							<view class="time" v-show="showTime">{{ date }}</view>
							<image class="down-icon" src="../../static/icon/down.png" mode="scaleToFill"></image>
						</picker>
					</view>
					<view class="btn-view">
						<button class="clear-btn" type="primary" @click="clearDate" v-show="showClearBtn">清空</button>
					</view>
				</view>
			</view>
			<view class="tab">
				<view v-for="item in tabList" :key="item.value" :class="{'tab-item': true, current: currentTab === item.value}" @click="handleTabClick(item.value)">
					{{ item.label }}
				</view>
			</view>

			<view class="order-list-box">
				<view class="order-list-view" v-show="!noData" v-for="(item, index) in orderListData" :key="index">
					<view class="list-item-view">
						<view class="title">订单编号</view>
						<view class="info">{{ item.id }}</view>
					</view>
					<view class="list-item-view">
						<view class="title">租车公司名称</view>
						<view class="info">{{ item.enterpriseName }}</view>
					</view>
					<view class="list-item-view">
						<view class="title">账单周期</view>
						<view class="info">{{ item.billCycle }}</view>
					</view>
					<view class="list-item-view">
						<view class="title">账单租金</view>
						<view class="info">{{ item.rent }}元</view>
					</view>
					<view class="list-item-view">
						<view class="title">账单状态</view>
						<view class="info">{{ item.statusName }}</view>
					</view>
					<view class="list-item-view">
						<view class="title">创建时间</view>
						<view class="info">{{ item.createTime }}</view>
					</view>
				</view>
			</view>

			<!-- 暂无数据(无数据时显示) -->
			<view class="no-data" v-show="noData">
				<image class="no-data-icon" src="../../static/images/noData/zanwudingdan.png" mode="scaleToFill"></image>
				<view class="text">暂无订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showClearBtn: false,
				showTime: false,
				date: '',
				noData: false,
				current: 1, // 分页查询，当前页数
				totalPage: 0, // 总页数
				orderListData: [],
				currentTab: '1', // 当前tab显示的页面
				tabList: [{
					label: '车辆订单',
					value: '1'
				},{
					label: '设备订单',
					value: '2'
				}]
			}
		},
		created() {
			// 当time不为空是,显示选择的时间和清空按钮
			if (this.date !== '') {
				this.showTime = true
				this.showClearBtn = true
			}
			this.getOrderInfo();
		},
		watch: {
			// 当time不为空是,显示选择的时间和清空按钮
			time() {
				if (this.date !== '') {
					this.showTime = true
					this.showClearBtn = true
				}
			}
		},
		onReachBottom() {
			// 触底当前页数加一
			this.current = this.current + 1;
			// 判断当前页数是否小于等于总页数
			if (this.current <= this.totalPage) {
				this.getOrderInfo(true);
			}
		},
		methods: {
			clearDate() {
				this.date = ''
				this.showTime = false
				this.showClearBtn = false
				this.getOrderInfo();
			},
			// 选择时间
			bindDateChange(e) {
				this.date = e.target.value
				if (this.date !== '') {
					this.showTime = true
					this.showClearBtn = true
				}
				this.current = 1;
				this.getOrderInfo();
			},
			// 切换tab栏
			handleTabClick(type) {
				if( this.currentTab === type) return false; // 已经是当前则不切换
				this.currentTab = type;
				this.current = 1; // 重置当前页
				this.getOrderInfo()
			},
			// 获取用户订单信息
			getOrderInfo(reachBottom) {
				var memberId = uni.getStorageSync('userInfo').id;
				this.http({
					url: '/api/bizOrder/getMyOrder',
					method: 'POST',
					data: {
						memberId,
						page: {
							current: this.current,
							size: 4
						},
						bizType: this.currentTab,
						month: this.date
					}
				}).then(res => {
					if (res.data.code === 1) {
						if(reachBottom) {
							this.orderListData = this.orderListData.concat(res.data.result.records);
						}else {
							this.orderListData = res.data.result.records;
						}
						this.totalPage = res.data.result.pages
						if (this.orderListData.length == 0) {
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
			}
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		// 筛选订单
		.filter-orders {
			width: 100%;
			height: 70rpx;
			border-bottom: 1rpx solid #E0E0E0;
			padding-left: 10rpx;
			padding-right: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left-view {
				flex: 1;
				font-size: 28rpx;
			}

			.right-view {
				flex: 2;
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.time-view {
					display: block;
					font-size: 28rpx;
					cursor: pointer;

					// display: flex;
					// justify-content: flex-end;
					// align-items: center;
					.date-picker {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						position: relative;
						padding-right: 40rpx;

						.time {
							// height: 40rpx;
							display: inline-block;
						}

						.down-icon {
							display: inline-block;
							width: 40rpx;
							height: 40rpx;
							position: absolute;
							// top: 5rpx;
							right: 5rpx;
						}

					}

				}

				.btn-view {

					.clear-btn {
						width: 100rpx;
						height: 40rpx;
						line-height: 40rpx;
						font-size: 20rpx;
						background-color: #FF6C00;
						padding-left: 0rpx;
						padding-right: 0rpx;
					}
				}
			}
		}
		
		// tab 
		.tab {
			display: flex;
			align-items: center;
			.tab-item {
				height: 90rpx;
				line-height: 90rpx;
				font-size: 32rpx;
				text-align: center;
				width: 50%;
				color: #C0C0C0;
				&.current {
					font-weight: bold;
					color: #FF6E03;
					border-bottom: 6rpx solid #FF6E03;
				}
			}
		}
		// 订单列表
		.order-list-box {
			width: 94%;
			margin: 20rpx auto 0rpx;

			.order-list-view {
				width: 100%;
				height: 340rpx;
				background-color: #f0f0f0;
				// background-color: #F0F4F7;
				margin-top: 20rpx;
				padding: 20rpx;
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
