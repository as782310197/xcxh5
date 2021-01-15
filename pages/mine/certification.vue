<template>
	<view class="container">
		<view class="certification-form-view">
			<form class="form" @submit="handleSubmit">
				<view class="form-item">
					<view class="label">姓名：</view>
					<input class="input" name="realName" type="text" placeholder="请输入真实姓名" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">性别：</view>
					<!-- <input class="input" name="getder" type="text" placeholder="请输入真实姓名" placeholder-style="color: #d0d0d0;" /> -->
					<picker class="input" mode="selector" name="getder" :value="genderIndex" :range="genderList" @change="genderPickerChange">
						<view :class="genderIndex === -1 ? 'unInput' : ''">{{ genderIndex !== -1 ? genderList[genderIndex] : '请选择性别' }}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">身份证号码：</view>
					<input class="input" name="idCard" type="text" v-model="idCard" @blur="valiteidCard" placeholder="请输入身份证号码"
					 placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="idcard-img-view">
					<view class="upload-img-view">
						<view class="label">身份证正面照片</view>
						<view class="idCard-photo front-photo" @up-success="uploadFrontPhoto" @click="uploadFrontPhoto">
							<image v-show="frontPhotoLoading" class="loading" src="../../static/images/loading/loading.gif" mode="aspectFit"></image>
							<image v-show="!frontPhotoLoading" @load="frontPhotoLoading = false" class="idcard-img" :src="frontPhotoSrc" :imageName="frontPhotoName" mode="scaleToFill"></image>
						</view>
					</view>
					<view class="upload-img-view">
						<view class="label">身份证反面照片</view>
						<view class="idCard-photo reverse-photo" @click="uploadReversePhoto">
							<image v-show="reversePhotoLoading" class="loading" src="../../static/images/loading/loading.gif" mode="aspectFit"></image>
							<image v-show="!reversePhotoLoading" @load="reversePhotoLoading = false" class="idcard-img" :src="reversePhotoSrc" :imageName="reversePhotoName" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<button class="submit-btn" form-type="submit" type="primary">确定</button>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		uploadFile
	} from '../../utils/common.js'
	export default {
		data() {
			return {
				genderList: ['男', '女'],
				genderIndex: -1,
				idCard: '', // 身份证号码
				frontPhotoSrc: '', // 身份证正面照
				frontPhotoName: '', // 身份证正面照名字
				reversePhotoSrc: '', // 身份证反面照
				reversePhotoName: '' ,// 身份证反面照名字
				frontPhotoLoading: false, // 上传加载中
				reversePhotoLoading: false, // 上传加载中
			}
		},
		methods: {
			genderPickerChange(e) {
				this.genderIndex = e.target.value;
			},
			// 验证身份证格式
			valiteidCard() {
				// 身份证正则表达式
				var card = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				if (!(card.test(this.idCard))) {
					uni.showToast({
						title: '身份证号码错误！',
						icon: 'none',
						duration: 2000
					});
					return true
				}
			},
			// 上传身份证正面照
			uploadFrontPhoto() {
				if(this.frontPhotoLoading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.frontPhotoSrc = JSON.parse(res.data).url;
						this.frontPhotoLoading = true;
					}
				})
			},
			// 上传身份证反面照
			uploadReversePhoto() {
				if(this.reversePhotoLoading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.reversePhotoSrc = JSON.parse(res.data).url;
						this.reversePhotoLoading = true;
					}
				})
			},
			// 确定按钮
			handleSubmit(e) {
				var idCard = this.valiteidCard();
				if (idCard) {
					uni.showToast({
						title: '身份证号码错误！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!e.detail.value.realName) {
					uni.showToast({
						title: '姓名不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!this.frontPhotoSrc) {
					uni.showToast({
						title: '身份证正面照片不能为空！',
						icon: 'none',
						duration: 2000
					});
					return

				} else if (!this.reversePhotoSrc) {
					uni.showToast({
						title: '身份证反面照片不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (this.genderIndex === -1) {
					uni.showToast({
						title: '请选择性别！',
						icon: 'none',
						duration: 2000
					});
					return
				}

				var memberId = uni.getStorageSync('userInfo').id;
				const param = e.detail.value;
				param.idCardFront = this.frontPhotoSrc;
				param.idCardReverse = this.reversePhotoSrc;
				param.memberId = memberId;
				this.http({
					url: '/api/bizMember/memberAuthentication',
					method: 'post',
					data: param
				}).then(res => {
					if (res.data.code == 1) {
						uni.showToast({
							title: res.data.message + '，页面将在2秒后跳转至个人中心页面',
							icon: 'none',
							duration: 2000
						})
					} else {
						uni.showToast({
							title: res.data.message + '，页面将在2秒后跳转至个人中心页面',
							icon: 'none',
							duration: 2000
						})
					}
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/mine/mine'
						});
					}, 2000)
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

		.certification-form-view {
			width: 90%;
			margin: 50rpx auto 0rpx;

			.form {
				width: 100%;

				.form-item {
					width: 100%;
					height: 80rpx;
					border-bottom: 1px solid #e5e4e5;
					margin-top: 10rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.label {
						flex: 1;
						color: #616162;
						font-size: 26rpx;
						text-align: right;
					}

					.input {
						flex: 3;
						height: 100%;
						line-height: 80rpx;
						font-size: 30rpx;
						margin-left: 20rpx;
						.unInput {
							color: #d0d0d0;
						}
					}
				}

				.idcard-img-view {
					width: 100%;
					margin-top: 20rpx;
					// display: flex;
					// justify-content: space-between;
					// align-items: center;

					.upload-img-view {
						width: 50%;
						// border-bottom: 1px solid #e5e4e5;
						margin-top: 20rpx;

						.label {
							color: #616162;
							font-size: 26rpx;
						}

						.idCard-photo {
							width: 300rpx;
							height: 200rpx;
							border: 1rpx solid #CCCCCC;
							background-color: #e5e4e5;
							background-image: url(../../static/icon/add-icon.png);
							background-repeat: no-repeat;
							background-position: 50% 50%;
							background-size: 100rpx 100rpx;
							margin-top: 20rpx;
							margin-left: 50%;
							margin-bottom: 10rpx;

							.idcard-img {
								width: 100%;
								height: 100%;
							}
							
							.loading {
								width: 100%;
								height: 100%;
								background-color: #fff;
							}
						}
					}
				}

				// 保存按钮
				.submit-btn {
					width: 100%;
					height: 80rpx;
					font-size: 30rpx;
					background-color: #FF6D00;
					line-height: 80rpx;
					border-radius: 40rpx;
					margin-top: 50rpx;
				}
			}
		}
	}
</style>
