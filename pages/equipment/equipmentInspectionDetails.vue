<template>
	<view class="container">
		<!-- 设备类型 -->
		<view class="uni-type-box">
			<view class="uni-icon">
				<uni-icons type="info" size="24" color="#848587"></uni-icons>
			</view>
			<view class="uni-info">{{ deviceType }}</view>
		</view>
		<!-- 设备种类 -->
		<view class="uni-class-box">
			{{ model }}
		</view>

		<!-- 巡查记录具体信息 -->
		<view class="uni-info-box">
			<view class="uni-info-item">
				<view class="uni-label">
					<image class="uni-icon" src="../../static/icon/riqi.png" mode="widthFix"></image>
					<span>创建时间:</span>
				</view>
				<view class="uni-input-box">
					{{ dateTime }}
				</view>
			</view>
			<view class="uni-info-item">
				<view class="uni-label">
					<image class="uni-icon" src="../../static/icon/dingwei.png" mode="widthFix"></image>
				</view>
				<view class="uni-input-box">
					<view class="uni-choice-map">{{ address }}</view>
				</view>
			</view>
			<!-- 机械照片 -->
			<view class="uni-img-box">
				<view class="uni-lable">机械照片</view>
				<view class="uni-img-list">
					<image class="img" :src="mechanicsImgSrc1" mode="scaleToFill" @click="previewMechanicsImg1"></image>
					<image class="img" :src="mechanicsImgSrc2" mode="scaleToFill" @click="previewMechanicsImg2"></image>
				</view>
			</view>
			<!-- 工地照片 -->
			<view class="uni-img-box">
				<view class="uni-lable">工地照片</view>
				<view class="uni-img-list">
					<image class="img" :src="workSiteImgSrc1" mode="scaleToFill" @click="previewWorkSiteImg1"></image>
					<image class="img" :src="workSiteImgSrc2" mode="scaleToFill" @click="previewWorkSiteImg2"></image>
				</view>
			</view>
		</view>
	
		<!-- 返回按钮 -->
		<view class="uni-back-btn" @click="goBack">返回</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deviceType: '',  //设备类型
				model: '',  //设备种类
				dateTime: '', // 日期时间
				address: '', // 地理位置
				mechanicsImgSrc1: '', // 机械照片1
				mechanicsImgSrc2: '', // 机械照片2
				workSiteImgSrc1: '', // 工地照片1
				workSiteImgSrc2: '', // 工地照片2
			}
		},
		onLoad: function(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			if(item){
				this.deviceType = item.deviceType;
				this.model = item.model;
				this.dateTime = item.recordDate;
				this.address = item.recordLocate;
				this.mechanicsImgSrc1 = item.photo1 ? item.photo1 : '';
				this.mechanicsImgSrc2 = item.photo2 ? item.photo2 : '';
				this.workSiteImgSrc1 = item.photo3 ? item.photo3 : '';
				this.workSiteImgSrc2 = item.photo4 ? item.photo4 : '';
			}
		},
		methods: {
			previewMechanicsImg1() {
				// 预览图片
				uni.previewImage({
					// 预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
					urls: [this.mechanicsImgSrc1]
				});
			},
			previewMechanicsImg2() {
				// 预览图片
				uni.previewImage({
					// 预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
					urls: [this.mechanicsImgSrc2]
				});
			},
			previewWorkSiteImg1() {
				// 预览图片
				uni.previewImage({
					// 预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
					urls: [this.workSiteImgSrc1]
				});
			},
			previewWorkSiteImg2() {
				// 预览图片
				uni.previewImage({
					// 预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
					urls: [this.workSiteImgSrc2]
				});
			},
			// 点击返回按钮
			goBack() {
				uni.navigateBack({
					delta: 1
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
			background-color: #F0F4F7;
			margin: 0rpx auto;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		// 巡查记录具体信息
		.uni-info-box {
			width: 100%;

			.uni-info-item {
				width: 90%;
				min-height: 80rpx;
				padding: 20rpx 0rpx;
				margin: 0rpx auto;
				border-bottom: 1rpx solid #EAEAEA;
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
					}
				}
			}

			.uni-img-box {
				width: 100%;
				margin-top: 20rpx;
				padding: 0rpx 20rpx;

				.uni-lable {
					color: #616162;
					font-weight: bold;
					font-size: 26rpx;
					margin-left: 20rpx;
				}

				.uni-img-list {
					width: 100%;
					height: 200rpx;
					margin-top: 20rpx;
					// margin-bottom: 10rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.img {
						width: 300rpx;
						height: 200rpx;
					}
				}
			}

		}
	
		// 返回按钮
		.uni-back-btn {
			width: 90%;
			height: 90rpx;
			margin: 50rpx auto;
			font-size: 30rpx;
			color: #000;
			border: 1rpx solid #EAEAEA;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
