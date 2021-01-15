<template>
	<view class="px-2">
		<view class="uni-uploader">
			<!-- <view class="uni-uploader-head">
				<view class="uni-uploader-title">点击可预览选好的图片</view>
				<view class="uni-uploader-info">{{imageList.length}}/2</view>
			</view> -->

			<view class="uni-uploader-body">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img rounded" :src="image" :data-src="image" @tap="previewImage" mode="aspectFill"></image>
							<!-- <uni-icons type="clear" size="20" class="uni-delete-img" @tap="deleteImg(index)"></uni-icons> -->
							<view class="uni-delete-img" @tap="deleteImg(index)"></view>
						</view>
					</block>
					<view class="uni-uploader__input-box rounded">
						<view class="uni-uploader__input" @tap="chooseImage" v-show="showUploadBtn"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// import permision from "@/common/permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				title: 'choose/previewImage',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 1,
				count: [1, 2],
				showUploadBtn: true
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
		},
		methods: {
			// 删除图片
			deleteImg(index) {
				console.log('删除图片', index)
				var index = this.imageList.findIndex(item => {
					if (item.index === index) {
						return true
					}
				})
				this.imageList.splice(index, 1)
			},
			// 选择上传图片
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				// if (this.sourceTypeIndex !== 2) {
				// 	let status = await this.checkPermission();
				// 	if (status !== 1) {
				// 		return;
				// 	}
				// }
				// #endif

				// if (this.imageList.length === 2) {
				// 	let isContinue = await this.isFullImg();
				// 	console.log("是否继续?", isContinue);
				// 	if (!isContinue) {
				// 		return;
				// 	}
				// }
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 1 ? 1 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						this.$emit('choose', this.imageList)
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						// if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
						// 	this.checkPermission(err.code);
						// }
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			// isFullImg: function() {
			// 	return new Promise((res) => {
			// 		uni.showModal({
			// 			content: "已经有2张图片了,是否清空现有图片？",
			// 			success: (e) => {
			// 				if (e.confirm) {
			// 					this.imageList = [];
			// 					res(true);
			// 				} else {
			// 					res(false)
			// 				}
			// 			},
			// 			fail: () => {
			// 				res(false)
			// 			}
			// 		})
			// 	})
			// },
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			}
			// async checkPermission(code) {
			// 	let type = code ? code - 1 : this.sourceTypeIndex;
			// 	let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
			// 		await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
			// 			'android.permission.READ_EXTERNAL_STORAGE');

			// 	if (status === null || status === 1) {
			// 		status = 1;
			// 	} else {
			// 		uni.showModal({
			// 			content: "没有开启权限",
			// 			confirmText: "设置",
			// 			success: function(res) {
			// 				if (res.confirm) {
			// 					permision.gotoAppSetting();
			// 				}
			// 			}
			// 		})
			// 	}

			// 	return status;
			// }
		},
		watch: {
			imageList() {
				if (this.imageList.length === 2) {
					this.showUploadBtn = false
				} else {
					this.showUploadBtn = true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.px-2 {
		width: 100%;
		box-sizing: border-box;

		.uni-uploader {
			width: 100%;
			box-sizing: border-box;

			.uni-uploader-head {
				width: 100%;
				height: 40rpx;
				color: #d0d0d0;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0;
				padding: 0;

				.uni-uploader-title {
					font-size: 24rpx;
				}

				.uni-uploader-info {
					font-size: 20rpx;
				}
			}

			.uni-uploader-body {
				width: 100%;
				margin-top: 20rpx;

				.uni-uploader__files {
					width: 100%;
					display: flex;
					justify-content: space-around;
					align-items: center;
					box-sizing: border-box;

					.uni-uploader__file {
						position: relative;
						box-sizing: border-box;

						.uni-uploader__img {
							width: 300rpx;
							height: 200rpx;
							// border: 1rpx solid #CCCCCC;
							box-sizing: border-box;
						}

						.uni-delete-img {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							background-image: url(../../static/icon/delete.png);
							background-repeat: no-repeat;
							background-position: center center;
							background-size: 50rpx 50rpx;
							background-color: #fff;
							box-sizing: border-box;
							position: absolute;
							top: -18rpx;
							right: -18rpx;
							z-index: 10;
						}
					}

					.uni-uploader__input-box {
						box-sizing: border-box;

						.uni-uploader__input {
							width: 200rpx;
							height: 200rpx;
							border: 1rpx solid #CCCCCC;
							background-color: #e5e4e5;
							background-image: url(../../static/icon/add-icon.png);
							background-repeat: no-repeat;
							background-position: 50% 50%;
							background-size: 100rpx 100rpx;
							box-sizing: border-box;
						}
					}
				}
			}
		}
	}

	/* .cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	} */
</style>
