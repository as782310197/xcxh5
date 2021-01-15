<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="basic-info-view">
			<view class="list-item-view">
				<view class="title">账单名称</view>
				<view class="info">{{ leaseDetailsDate.billName }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">账单周期</view>
				<view class="info">{{ leaseDetailsDate.billCycle }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">需支付金额</view>
				<view class="info">{{ leaseDetailsDate.amount }}元</view>
			</view>
			<view class="list-item-view">
				<view class="title">数量</view>
				<view class="info">{{ leaseDetailsDate.count }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">账单金额</view>
				<view class="info">{{ leaseDetailsDate.rent }}元</view>
			</view>
			<view class="list-item-view">
				<view class="title">状态</view>
				<view class="info">{{ leaseDetailsDate.statusName }}</view>
			</view>
			<view class="voucher-image-view">
				<view class="title">凭证支付</view>
				<view class="img-box" v-show="leaseDetailsDate.voucherImage">
					<image class="image" @tap="_previewImage(leaseDetailsDate.voucherImage)" :src="leaseDetailsDate.voucherImage" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leaseDetailsDate: {
					billName: '广州臻一计算机系统有限公司账单',
					billCycle: '2020-09-10-2020-12-12',
					amount: '12000',
					count: '1',
					rent: '5000',
					status: '待支付',
					voucherImage: '../../static/images/banner/banner01.jpg'
				}
			}
		},
		onLoad(option) {
			const billId = option.id;
			const billDataList = uni.getStorageSync('billDataList');
			billDataList.forEach(v => {
				if (v.id == billId) {
					this.leaseDetailsDate = JSON.parse(JSON.stringify(v));
				}
			})
		},
		methods: {
			_previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
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

		// 基本信息
		.basic-info-view {
			width: 90%;
			margin: 20rpx auto;
			border-radius: 10rpx;
			background-color: #f0f0f0;
			padding: 10rpx 20rpx 20rpx 20rpx;

			.list-item-view {
				width: 100%;
				height: 80rpx;
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

			.voucher-image-view {
				margin-top: 10rpx;

				.title {
					color: #000000;
					font-size: 24rpx;
					font-weight: bold;
				}

				.img-box {
					margin-top: 10rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.image {
						width: 90%;
						height: 300rpx;
					}
				}
			}
		}
	}
</style>
