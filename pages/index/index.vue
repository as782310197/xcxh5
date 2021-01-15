<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="banner-box">
			<swiper class="banner-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			 indicator-active-color="#FF6C02">
				<swiper-item class="swiper-item" v-for="item of bannerData" :key="item.id">
					<image class="swiper-img" :src="item.url" mode="scaleToFill"></image>
				</swiper-item>
				<!-- <swiper-item class="swiper-item">
					<image class="swiper-img" src="../../static/images/banner/banner02.jpg" mode="scaleToFill"></image>
				</swiper-item>
				<swiper-item class="swiper-item">
					<image class="swiper-img" src="../../static/images/banner/banner03.jpg" mode="scaleToFill"></image>
				</swiper-item> -->
			</swiper>
		</view>
		<!-- 测算 -->
		<!-- <view class="calculation-box">
			<button type="default" class="natural-person-btn">汽车自然人收益测算</button>
			<button type="default" class="self-employed-person-btn">汽车个体户收益测算</button>
		</view> -->
		<!-- 我的车辆 -->
		<view class="myVehicle-box">
			<view class="statistics-card">
				<view class="card-header">
					<view class="card-title">我的车辆</view>
					<!-- <button class="card-btn" type="default" @click="addCar">
						<image class="add-icon" src="../../static/icon/add-icon.png" mode="scaleToFill"></image>
						出租车辆
					</button> -->
				</view>
				<view class="card-body">
					<view class="card-body-top">
						<view class="number">
							<view class="describe-text">出租汽车数量</view>
							<view class="number-text"><span>{{ carNumber }}</span>辆</view>
						</view>
						<view class="profit">
							<view class="describe-text">预计收益</view>
							<view class="profit-text">&#165; &nbsp;<span>{{ carProfit }}</span>元</view>
						</view>
					</view>
					<view class="card-body-bottom">
						<button class="view-vehicle-btn" type="default" @click="viewCar">查看车辆</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的设备 -->
		<view class="myVehicle-box">
			<view class="statistics-card">
				<view class="card-header">
					<view class="card-title">我的设备</view>
					<!-- <button class="card-btn" type="default" @click="addCar">
						<image class="add-icon" src="../../static/icon/add-icon.png" mode="scaleToFill"></image>
						出租设备
					</button> -->
				</view>
				<view class="card-body">
					<view class="card-body-top">
						<view class="number">
							<view class="describe-text">出租设备数量</view>
							<view class="number-text"><span>{{ deviceNumber }}</span>台</view>
						</view>
						<view class="profit">
							<view class="describe-text">预计收益</view>
							<view class="profit-text">&#165; &nbsp;<span>{{ deviceAccumulatedIncome }}</span>元</view>
						</view>
					</view>
					<view class="card-body-bottom">
						<button class="view-vehicle-btn" type="default" @click="viewEquipment">查看设备</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 常见问题 -->
		<!-- <view class="common-problem-box">
			<view class="problem-card">
				<view class="card-header">常见问题</view>
				<view class="card-body">
					<uni-list class="problem-list" v-for="item in problemList" :key="item.id">
						<uni-list-item class="problem-list-item" :title="item.question" :ellipsis="1" @click="viewQuestions(item.id)"></uni-list-item>
					</uni-list>
				</view>
			</view>
		</view> -->
	</view>
</template>
<script>
	import {
		formatDate,
		showModal
	} from '../../utils/common.js'
	export default {
		data() {
			return {
				carNumber: '0',
				carProfit: '0',
				deviceNumber: '0',
				deviceAccumulatedIncome: '0',
				bannerData: [],
				problemList: []
			}
		},
		onLoad() {
			this.getQuestionData();
			// uni.setStorageSync('memberId', '99999999');
			// this.getearningsData();
			this.getBannerData();
		},
		onShow() {
			var userInfo = uni.getStorageSync('userInfo');
			// if (!userInfo) {
			// 	uni.navigateTo({
			// 		url: '/pages/register/register'
			// 	})
			// }
			if (userInfo) {
				this.getearningsData();
			}
		},
		methods: {
			// 获取轮播图数据
			getBannerData() {
				this.http({
					url: '/system/sysBanner/findSysBannerPage',
					method: 'post',
					data: {
						entity: {},
						page: {
							current: 1,
							page: 4
						}
					}
				}).then(res => {
					var result = res.data;
					if (result.code == 1) {
						this.bannerData = result.result.records;
					}
				})
			},
			// 获取收益数据
			getearningsData() {
				var memberId = uni.getStorageSync('userInfo') && uni.getStorageSync('userInfo').id;
				this.http({
					url: '/api/bizMember/getMyIncomeInfo',
					method: 'post',
					data: {
						memberId
					}
				}).then(res => {
					if (res.data.code == 1) {
						console.log(res);
						uni.setStorageSync('earningsInfo', res.data.result);
						this.carNumber = res.data.result.carNumbers;
						this.carProfit = res.data.result.estimatedIncome;
						this.deviceNumber = res.data.result.deviceNumber;
						this.deviceAccumulatedIncome = res.data.result.deviceAccumulatedIncome;
					}
				})
			},
			// 获取常见问题数据
			getQuestionData() {
				var param = {
					entity: {},
					page: {
						current: 1,
						size: 3
					}
				}
				this.http({
					url: '/system/sysFaq/findSysFaqPage',
					method: 'post',
					data: param
				}).then(res => {
					if (res.data.code == 1) {
						var result = res.data.result.records
						this.problemList = result;
						uni.setStorageSync('questionDataList', result);
					}
				})
			},
			// 添加出租车辆
			// addCar() {
			// 	uni.navigateTo({
			// 		url: '../mine/addCar'
			// 	})
			// },
			// 查看常见问题详情
			viewQuestions(id) {
				uni.navigateTo({
					url: '/pages/index/problem?id=' + id
				})
			},
			authorization() {
				let appID = "wx0f4ea2610e201e3d";
				// let appID = 'wx520c15f417810387'
				let redirectUri = encodeURIComponent("http://www.baidu.com/");
				let strUrl =
					"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
					appID +
					"&redirect_uri=" +
					redirectUri +
					"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				this.$nextTick(() => {
					window.location.href = strUrl;
				});
			},
			// 查看车辆
			viewCar() {
				uni.navigateTo({
					url: '/pages/mine/car'
				})
			},
			// 查看设备
			viewEquipment() {
				uni.navigateTo({
					url: '/pages/equipment/equipmentLeaseList'
				})
			}
		},
		// 监听该页面用户下拉刷新事件
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh() // 停止下拉刷新
			}, 1500)
		}
	}
</script>

<style scoped lang="scss">
	// 引用公共样式————设置通配选择器
	@import '/common/lib/uni.css';

	.container {
		width: 100%;

		// 轮播图
		.banner-box {
			width: 100%;
			height: 320rpx;

			.banner-swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					width: 100%;
					height: 100%;
					display: block;
					text-align: center;

					.swiper-img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		// 测算
		.calculation-box {
			width: 100%;
			height: 180rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.natural-person-btn {
				width: 46%;
				height: 70%;
				color: #FFFFFF;
				font-size: 34rpx;
				line-height: 126rpx;
				background: linear-gradient(to right, #A9DBFE 0%, #24A7FB 100%);
				padding: 0;
				margin-left: 20rpx;
			}

			.self-employed-person-btn {
				width: 46%;
				height: 70%;
				color: #FFFFFF;
				font-size: 34rpx;
				line-height: 126rpx;
				background: linear-gradient(to right, #FFB695 0%, #EA6A60 100%);
				padding: 0;
				margin-right: 20rpx;
			}

			.natural-person-btn::after {
				border: none;
			}

			.self-employed-person-btn::after {
				border: none;
			}
		}

		// 我的车辆
		.myVehicle-box {
			width: 100%;
			height: 400rpx;
			margin-top: 10rpx;

			.statistics-card {
				width: 94%;
				height: 100%;
				margin: 0 auto;

				.card-header {
					width: 100%;
					height: 20%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.card-title {
						font-size: 34rpx;
						font-weight: 500;
					}

					.card-btn {
						height: 60rpx;
						color: #FFFFFF;
						font-size: 30rpx;
						line-height: 60rpx;
						background: #178AFF;
						margin: 0;
						padding-left: 10rpx;
						padding-right: 10rpx;
						border-radius: 4rpx;

						.add-icon {
							width: 30rpx;
							height: 30rpx;
							margin-right: 10rpx;
						}
					}

					.card-btn::after {
						border: none;
					}
				}

				.card-body {
					width: 100%;
					height: 70%;
					background-color: #F0F0F0;
					// background-color: #F0F4F7;
					margin-top: 20rpx;
					border-radius: 8rpx;

					.card-body-top {
						width: 100%;
						height: 65%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.number {
							width: 50%;
							height: 50%;
							text-align: center;

							.describe-text {
								color: #A09FA4;
								font-size: 26rpx;
							}

							.number-text {
								color: #000000;
								font-size: 30rpx;
							}
						}

						.profit {
							width: 50%;
							height: 50%;
							text-align: center;

							.describe-text {
								color: #A09FA4;
								font-size: 26rpx;
							}

							.profit-text {
								color: #FF6E03;
								font-size: 30rpx;
							}
						}
					}

					.card-body-bottom {
						width: 100%;
						height: 35%;

						.view-vehicle-btn {
							width: 100%;
							height: 100%;
							color: #FF6E03;
							font-size: 30rpx;
							background-color: #F0F0F0;
							padding-top: 10rpx;
						}

						.view-vehicle-btn::after {
							border: none;
							border-top: 1px solid #E0E0E0;
						}
					}
				}
			}
		}

		// 常见问题
		.common-problem-box {
			width: 100%;
			margin-top: 10rpx;

			// margin-bottom: 20rpx;
			.problem-card {
				width: 100%;

				.card-header {
					width: 94%;
					height: 80rpx;
					line-height: 80rpx;
					font-size: 34rpx;
					font-weight: 500;
					margin: 0 auto;
				}

				.card-body {
					width: 100%;

					.problem-list {

						.problem-list-item {
							border-bottom: 1px solid #F0F0F0;
						}
					}
				}
			}
		}
	}
</style>
