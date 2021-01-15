<template>
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
				<view class="btn-view"><button class="clear-btn" type="primary" @click="clearDate" v-show="showClearBtn">清空</button></view>
			</view>
		</view>
		<view class="tab">
			<view v-for="item in tabList" :key="item.value" :class="{ 'tab-item': true, current: currentTab === item.value }" @click="handleTabClick(item.value)">
				{{ item.label }}
			</view>
		</view>
		<view class="lease-list-view" v-show="!noData" v-for="item in billList" :key="item.id" @click="goToBillDetails(item.id)">
			<view class="list-item-view">
				<view class="title">账单名称</view>
				<view class="info">{{ item.billName }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">状态</view>
				<view class="info">{{ item.statusName }}</view>
			</view>
		</view>

		<!-- 暂无数据(无数据时显示) -->
		<view class="no-data" v-show="noData">
			<image class="no-data-icon" src="../../static/images/noData/zanwuzhangdan.png" mode="scaleToFill"></image>
			<view class="text">暂无账单</view>
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
			billList: [],
			currentTab: '1', // 当前tab显示的页面
			tabList: [
				{
					label: '车辆账单',
					value: '1'
				},
				{
					label: '设备账单',
					value: '2'
				}
			]
		};
	},
	created() {
		this.getBillData();
	},
	// 触底刷新钩子函数
	onReachBottom() {
		// 触底当前页数加一
		this.current = this.current + 1;
		// 判断当前页数是否小于等于总页数
		if (this.current <= this.totalPage) {
			this.getBillData(true);
		}
	},
	methods: {
		// 清除时间
		clearDate() {
			this.date = '';
			this.showTime = false;
			this.showClearBtn = false;
			this.getBillData();
		},
		// 选择时间
		bindDateChange(e) {
			this.date = e.target.value;
			if (this.date !== '') {
				this.showTime = true;
				this.showClearBtn = true;
			}
			this.current = 1;
			this.getBillData();
		},
		// 切换tab栏
		handleTabClick(type) {
			if (this.currentTab === type) return false; // 已经是当前则不切换
			this.currentTab = type;
			this.current = 1; // 重置当前页
			this.getBillData();
		},
		// 获取我的账单数据
		getBillData(reachBottom) {
			var memberId = uni.getStorageSync('userInfo').id;
			this.http({
				url: '/api/bizBill/getMyBill',
				method: 'post',
				data: {
					memberId,
					page: {
						current: this.current,
						size: 8
					},
					bizType: this.currentTab,
					month: this.date
				}
			}).then(res => {
				if (res.data.code == 1) {
					if (reachBottom) {
						this.billList = this.billList.concat(res.data.result.records);
					} else {
						this.billList = res.data.result.records;
					}
					uni.setStorageSync('billDataList', this.billList);
					this.totalPage = res.data.result.pages;
					if (this.billList.length == 0) {
						this.noData = true;
					} else {
						this.noData = false;
					}
				} else {
					uni.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 点击租约列表,跳转到租约详情
		goToBillDetails(id) {
			uni.navigateTo({
				url: './billDetails?id=' + id
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
	// 筛选订单
	.filter-orders {
		width: 100%;
		height: 70rpx;
		border-bottom: 1rpx solid #e0e0e0;
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
			color: #c0c0c0;
			&.current {
				font-weight: bold;
				color: #ff6e03;
				border-bottom: 6rpx solid #ff6e03;
			}
		}
	}

	.lease-list-view {
		width: 94%;
		margin: 20rpx auto 0rpx;
		background-color: #f0f0f0;
		background-image: url(../../static/icon/youjiantou.png);
		background-repeat: no-repeat;
		background-size: 50rpx 50rpx;
		background-position: 100% 50%;
		padding: 20rpx 50rpx 20rpx 20rpx;
		border-radius: 10rpx;

		.list-item-view + .list-item-view {
			margin-top: 10rpx;
		}

		.list-item-view {
			width: 100%;
			// height: 50rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				flex: 1;
				color: #5a5e61;
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
