<template>
	<view class="container">
		<!-- 设备添加要求 -->
		<view class="uni-requirement-box">
			<view class="uni-title">设备上线要求：</view>
			<view class="uni-requirement-content">
				<ol class="uni-ol">
					<li class="uni-li">设备工作年限限8年或12000小时以下；</li>
					<li class="uni-li">照片内容必须清晰；</li>
					<li class="uni-li">填写信息必须要与名牌信息相同，数据为真实。</li>
				</ol>
			</view>
		</view>
		
		<!-- 注意 -->
		<view class="uni-be-careful-box">
			<view class="uni-text1">注意:</view>
			<view class="uni-msg-list">
				<view class="uni-li">
					<view class="uni-label">工程名称:</view>
					<view class="uni-info">{{ requirement.projectName ? requirement.projectName : info.projectName }}</view>
				</view>
				<view class="uni-li">
					<view class="uni-label">工程所在地:</view>
					<view class="uni-info">{{ requirement.location ? requirement.location : info.location }}</view>
				</view>
				<view class="uni-li">
					<view class="uni-label">预计日租金:</view>
					<view class="uni-info">{{ requirement.rent ? requirement.rent : info.rent }}元</view>
				</view>
				<view class="uni-li">
					<view class="uni-label">结算方式:</view>
					<view class="uni-info">{{ requirement.payType ? requirement.payType : info.payType }}</view>
				</view>
			</view>
			<view class="uni-text2">请根据租金上传对应的设备信息。</view>
			<!-- <view class="uni-text2">请仔细核对填写的信息，提交后将不能进行修改。</view> -->
		</view>
		
		<!-- 添加设备信息表单 -->
		<view class="uni-form-box">
			<form class="form" @submit="handleSubmit">
				<view class="form-item">
					<view class="label">设备类型</view>
					<picker class="uni-picker" mode="selector" name='deviceType' :value="deviceTypeIndex" :range="deviceTypeList" @change="bindChangeDeviceType">
						<view class="uni-input" :class="deviceTypeIndex === -1 ? 'unInput' : ''">{{ deviceTypeIndex !== -1 ? deviceTypeList[deviceTypeIndex] : '请选择设备类型' }}</view>
					</picker>
				</view>
				<view class="form-item" @click="clickModel">
					<view class="label">设备种类</view>
					<picker class="uni-picker" mode="selector" name='model' :value="modelIndex" :range="modelList" :disabled="modelDisabled" @change="bindChangeModel">
						<view class="uni-input" :class="modelIndex === -1 ? 'unInput' : ''">{{ modelIndex !== -1 ? modelList[modelIndex] : '请选择设备种类' }}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">设备主姓名</view>
					<input class="input" type="text" name="deviceOwner" :value="deviceInfo.deviceOwner" placeholder="请输入设备主姓名" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">预计单价</view>
					<input class="input" type="text" name="rent" :value="requirement.rent" placeholder="请输入预计单价" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">机械品牌</view>
					<input class="input" type="text" name="brand" :value="deviceInfo.brand" placeholder="请输入机械品牌" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">机械型号</view>
					<input class="input" type="text" name="mechanical" :value="deviceInfo.mechanical ? deviceInfo.mechanical : info.mechanical" placeholder="请输入机械型号" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">机械位置</view>
					<input class="input" type="text" name="locate" :value="deviceInfo.locate" placeholder="请输入机械位置" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="form-item">
					<view class="label">出厂日期</view>
					<picker class="uni-picker" mode="date" name="productionDate" :value="deviceInfo.productionDate" @change="changeDate">
						<view class="uni-input" :class="deviceInfo.productionDate ? '' : 'unInput'">{{ deviceInfo.productionDate ? deviceInfo.productionDate : '请选择出厂日期' }}</view>
					</picker>
				</view>
				<view class="form-item">
					<view class="label">其他说明</view>
					<input class="input" type="text" name="instruction" :value="deviceInfo.instruction" placeholder="请输入" placeholder-style="color: #d0d0d0;" />
				</view>
				<view class="upload-img-view">
					<view class="label">机械整机照片</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadCompleteMachineImg">
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="devicePhoto1Loading" mode="aspectFit"></image>
							<image @load="devicePhoto1Loading = false" v-show="!devicePhoto1Loading" class="img" :src="deviceInfo.devicePhoto1" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">机械产品铭牌</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadBankImg">
							<!-- <image class="img" :src="deviceInfo.nameplate" mode="scaleToFill"></image> -->
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="nameplateLoading" mode="aspectFit"></image>
							<image @load="nameplateLoading = false" v-show="!nameplateLoading" class="img" :src="deviceInfo.nameplate" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">机械合格证照片</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadCertificateImg">
							<!-- <image class="img" :src="deviceInfo.certificate" mode="scaleToFill"></image> -->
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="certificateLoading" mode="aspectFit"></image>
							<image @load="certificateLoading = false" v-show="!certificateLoading" class="img" :src="deviceInfo.certificate" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<!-- <view>
					 <view>
					      <button type="primary" @click="img">button</button>
					      <button type="primary" @tap="info">info</button>
					 </view>
					
				</view> -->
				<view class="upload-img-view">
					<view class="label">机械正面照</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadPositiveImg">
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="devicePhoto2Loading" mode="aspectFit"></image>
							<image @load="devicePhoto2Loading = false" v-show="!devicePhoto2Loading" class="img" :src="deviceInfo.devicePhoto2" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">机械背面照</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadBackImg">
							<!-- <image class="img" :src="deviceInfo.devicePhoto3" mode="scaleToFill"></image> -->
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="devicePhoto3Loading" mode="aspectFit"></image>
							<image @load="devicePhoto3Loading = false" v-show="!devicePhoto3Loading" class="img" :src="deviceInfo.devicePhoto3" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<view class="upload-img-view">
					<view class="label">机械侧面照</view>
					<!-- 单图上传 -->
					<view class="upload-box">
						<!-- 驾驶证副本 -->
						<view class="on-upload-img" @click="uploadSideImg">
							<!-- <image class="img" :src="deviceInfo.devicePhoto4" mode="scaleToFill"></image> -->
							<image class="loading" src="../../static/images/loading/loading.gif" v-show="devicePhoto4Loading" mode="aspectFit"></image>
							<image @load="devicePhoto4Loading = false" v-show="!devicePhoto4Loading" class="img" :src="deviceInfo.devicePhoto4" mode="scaleToFill"></image>
						</view>
					</view>
				</view>
				<button class="submit-btn" form-type="submit" type="primary">提交设备信息</button>
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
				equimentId: '', // 设备id
				info: {},
				requirement: {}, // 基本信息
				deviceInfo: {
					deviceType: '', // 设备类型
					model: '',// 设备种类
					productionDate: '', // 出厂日期
					devicePhoto1: '', // 机械整机照片
					nameplate: '', // 机械产品铭牌
					certificate: '', // 机械合格证照片
					devicePhoto2: '', // 机械正面照
					devicePhoto3: '', // 机械背面照
					devicePhoto4: '', // 机械侧面照
				}, // 设备信息
				deviceTypeList: ['挖掘机械', '起重机械', '装载机械', '隧道机械', '打桩机械', '自卸车', '叉车', '运输车', '混泥土机械', '路面机械'], // 设备类型
				deviceTypeIndex: -1,
				deviceTypeListData: [
					{
						deviceType: '挖掘机械',
						modelList: ['正铲挖掘机', '轮式挖掘机', '船式挖掘机', '反铲挖掘机', '履带挖掘机']
					},
					{
						deviceType: '起重机械',
						modelList: ['全地面起重机', '越野吊车', '高空作业车', '随车起重机', '剪叉式高空平台', '施工升降机', '伸缩式高空平台', '塔式起重机', '履带起重机', '汽车起重机']
					},
					{
						deviceType: '装载机械',
						modelList: ['叉装车', '铲运车', '装载机', '滑移装载机', '挖掘装载机']
					},
					{
						deviceType: '隧道机械',
						modelList: ['气动式凿岩机','液压凿岩钻车','掘进机','空压机','盾构机']
					},
					{
						deviceType: '打桩机械',
						modelList: ['强夯','旋喷钻机','潜钻孔','锚杆钻机','冲击钻','循环钻机','连续墙抓斗','潜水钻','水平定向钻','预制桩机','搅拌桩机','深井钻机','旋挖钻机','潜风钻','长螺旋钻机']
					},
					{
						deviceType: '自卸车',
						modelList: ['矿用自卸车', '工程自卸车']
					},
					{
						deviceType: '叉车',
						modelList: ['半电动托盘叉车','全电动托盘叉车','手动液压叉车','内燃机托盘叉车']
					},
					{
						deviceType: '运输车',
						modelList: ['集装箱运输车','冷藏运输车','厢式货车','普通火车','仓栅式货车','平板运输车','特种运输车','危险化学品运输车','半挂牵引车']
					},
					{
						deviceType: '混泥土机械',
						modelList: ['车载泵','混凝土喷射车','喷浆机','混意土输送泵','搅拌站','混凝土搅拌机','泵车','拖泵','搅拌运输车']
					},
					{
						deviceType: '路面机械',
						modelList: ['同步封层机','再生机械','路面铣刨机','稳定土摊铺机','稳定拌合机','沥青摊铺机','沥青搅拌设备','沥青路面修补车','水泥摊铺机','力气撒布机','稳定土拌合站','抛丸机','灌缝机械','推土机','压路机','水泥路面维修破碎机','平板夯','稀浆封层机','石屑撒布机','养护车/抢修车','冲击夯','开槽设备','平地机']
					}
				], // 设备类型,设备种类级联
				modelList: [],// 设备种类
				modelIndex: -1,
				modelDisabled: true,
				nameplateLoading: false, // 图片加载中
				certificateLoading: false,
				devicePhoto1Loading: false,
				devicePhoto2Loading: false,
				devicePhoto3Loading: false,
				devicePhoto4Loading: false,
			}
		},
		onLoad(options) {
			this.equimentId = options.id;
			const arr = uni.getStorageSync('addEquimentDataList');
			this.info = arr.find(item => item.id = this.equimentId);
			this.getEquimentDetail();
		},
		methods: {
			// 获取设备详情
			getEquimentDetail() {
				var param = {
					id: this.equimentId
				};
				this.http({
					url: '/api/bizDeviceRequirement/get',
					method: 'post',
					data: param
				}).then(res => {
					if (res.data.code == 1) {
						var result = res.data.result;
						if (result.requirement) {
							this.requirement = result.requirement;
						}
						if (result.deviceInfo) {
							this.deviceInfo = result.deviceInfo;
							var deviceInfo = result.deviceInfo;
							this.getDeviceTypeAndModelIndex(deviceInfo);
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
			
			// 获取设备类型和设备种类的index
			getDeviceTypeAndModelIndex(deviceInfo) {
				var deviceType = deviceInfo.deviceType;
				var model = deviceInfo.model;
				var deviceTypeIndex = this.deviceTypeList.findIndex((item) => item == deviceType);
				this.modelList = this.deviceTypeListData[deviceTypeIndex].modelList;
				var modelIndex = this.modelList.findIndex((item) => item == model);
				this.deviceTypeIndex = deviceTypeIndex;
				this.modelIndex = modelIndex;
			},
			// 选择设备类型
			bindChangeDeviceType(e) {
				this.deviceTypeIndex = e.target.value;
				if(this.deviceTypeIndex !== -1) {
					const index = this.deviceTypeIndex;
					this.deviceInfo.deviceType = this.deviceTypeList[index];
					this.modelList = this.deviceTypeListData[index].modelList;
					this.modelIndex = 0;
					this.deviceInfo.model = this.modelList[this.modelIndex];
				}
			},
			// 选择设备种类
			bindChangeModel(e) {
				this.modelIndex = e.target.value
				if(this.modelIndex !== -1) {
					const index = this.modelIndex;
					this.deviceInfo.model = this.modelList[index];
				}
			},
			clickModel() {
				if(this.modelIndex !== -1) {
					this.modelDisabled = false;
				} else {
					uni.showToast({
						title: '请先选择设备类型',
						icon: 'none',
						duration: 2000
					})
				}
			},
			// 选择出厂日期
			changeDate(e) {
				this.deviceInfo.productionDate = e.target.value;
			},
			// 上传机械整机照片
			uploadCompleteMachineImg() {
				if(this.devicePhoto1Loading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.deviceInfo.devicePhoto1 = JSON.parse(res.data).url;
						this.devicePhoto1Loading = true;
					}
				})
			},
			// 上传机械产品铭牌
			uploadBankImg() {
				if(this.nameplateLoading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.deviceInfo.nameplate = JSON.parse(res.data).url;
						this.nameplateLoading = true;
					}
				})
			},
			// 上传机械合格证照片
			uploadCertificateImg() {
				if(this.certificateLoading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.deviceInfo.certificate = JSON.parse(res.data).url;
						this.certificateLoading = true;
					}
				})
			},
			// 上传机械正面照
			uploadPositiveImg() {
				if(this.devicePhoto2Loading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.deviceInfo.devicePhoto2 = JSON.parse(res.data).url;
						this.devicePhoto2Loading = true;
					}
				})
			},
			// 上传机械背面照
			uploadBackImg() {
				if(this.devicePhoto3Loading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.deviceInfo.devicePhoto3 = JSON.parse(res.data).url;
						this.devicePhoto3Loading = true;
					}
				})
			},
			// 上传机械侧面照
			uploadSideImg() {
				if(this.devicePhoto4Loading) return false;
				uploadFile().then(res => {
					if (res.statusCode == 200) {
						this.deviceInfo.devicePhoto4 = JSON.parse(res.data).url;
						this.devicePhoto4Loading = true;
					}
				})
			},
			img() {
					console.log(71)
					Wuni.chooseImage({
						// count:  允许上传的照片数量
						count: 5,
						// sizeType:  original 原图，compressed 压缩图，默认二者都有
						sizeType: "original",
						success(res) {
							console.log(res)
							uni.previewImage({
								// 对选中的图片进行预览
								urls: res.tempFilePaths,
								// urls:['','']  图片的地址 是数组形式
							})
						}
					});
				},
			info() {
					uni.getImageInfo({
						src: 'http://tmp/touristappid..4zDrukCye8Nz43bf15211b0e1e455089ee0b03dac6b7.png',
						success(res) {
							console.log(res)
						}
					})
				},
			// 点击提交设备信息按钮
			handleSubmit(e) {
				// this.deviceInfo.deviceType = e.detail.value.deviceType // 设备类型
				// this.deviceInfo.model = e.detail.value.model // 设备种类
				this.deviceInfo.deviceOwner = e.detail.value.deviceOwner // 设备主姓名
				this.deviceInfo.brand = e.detail.value.brand // 机械品牌
				this.deviceInfo.mechanical = e.detail.value.mechanical // 机械型号
				this.deviceInfo.locate = e.detail.value.locate // 机械位置
				this.deviceInfo.instruction = e.detail.value.instruction // 其他说明
				this.deviceInfo.productionDate = e.detail.value.productionDate // 出厂日期
				
				var deviceInfo = this.deviceInfo;
				var rent = this.requirement.rent
				if (!rent) {
					uni.showToast({
						title: '预计单价不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.deviceType) {
					uni.showToast({
						title: '设备类型不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.model) {
					uni.showToast({
						title: '设备种类不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.deviceOwner) {
					uni.showToast({
						title: '设备主姓名不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.brand) {
					uni.showToast({
						title: '机械品牌不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.mechanical) {
					uni.showToast({
						title: '机械型号不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.locate) {
					uni.showToast({
						title: '机械位置不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				}else if (!deviceInfo.productionDate) {
					uni.showToast({
						title: '出厂日期不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.devicePhoto1) {
					uni.showToast({
						title: '机械整机照片不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.nameplate) {
					uni.showToast({
						title: '机械产品铭牌不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.certificate) {
					uni.showToast({
						title: '机械合格证照片不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.devicePhoto2) {
					uni.showToast({
						title: '机械正面照不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.devicePhoto3) {
					uni.showToast({
						title: '机械背面照不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				} else if (!deviceInfo.devicePhoto4) {
					uni.showToast({
						title: '机械侧面照不能为空！',
						icon: 'none',
						duration: 2000
					});
					return
				}
				
				var param = {
					id: this.equimentId,
					deviceInfo: this.deviceInfo,
					rent: this.requirement.rent
				};
				
				this.http({
					url: '/api/bizDeviceRequirement/importDeviceRequirement',
					method: 'post',
					data: param
				}).then(res => {
					if (res.data.code == 1) {
						uni.showToast({
							title: res.data.result + '，页面跳转中',
							icon: 'none',
							duration: 2000
						});
						// 跳转到新增列表页
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages/equipment/addEquipmentLeaseList'
							})
						},2000)
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
		
		// 设备添加要求
		.uni-requirement-box {
			width: 100%;
			padding: 20rpx;
			background-color: #FFFBE5;
			.uni-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #4A4A4A;
			}
			.uni-requirement-content {
				width: 100%;
				overflow: hidden;
				.uni-ol {
					margin-left: -40rpx;
					.uni-li {
						font-size: 28rpx;
						color: #515151;
					}
				}
			}
		}
		
		// 注意
		.uni-be-careful-box {
			width: 100%;
			padding: 30rpx 20rpx;
			.uni-text1 {
				font-size: 28rpx;
				font-weight: bold;
				color: #F4493C;
			}
			.uni-msg-list {
				width: 100%;
				padding: 0rpx 20rpx;
				.uni-li {
					width: 100%;
					min-height: 50rpx;
					padding-left: -50rpx;
					list-style: none;
					display: flex;
					align-items: center;
					.uni-label {
						flex: 1;
						font-size: 28rpx;
					}
					.uni-info {
						flex: 3;
						font-size: 28rpx;
						font-weight: bold;
						color: #F4493C;
					}
				}
			}
			.uni-text2 {
				font-size: 28rpx;
				margin-top: 15rpx;
			}
		}
		
		// 添加设备信息表单
		.uni-form-box {
			.form {
				.form-item + .form-item {
					margin-top: 10rpx;
				}
				.form-item {
					width: 100%;
					height: 80rpx;
					border-bottom: 1px solid #e5e4e5;
					padding: 0rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.label {
						flex: 1;
						color: #616162;
						font-size: 28rpx;
					}
					.input {
						flex: 2;
						height: 100%;
						line-height: 80rpx;
						font-size: 28rpx;
					}
					.uni-picker {
						flex: 2;
						height: 100%;
						line-height: 80rpx;
						font-size: 28rpx;
						.uni-input {
							&.unInput {
								color: #d0d0d0;
							}
						}
					}
				}
				
				.upload-img-view {
					width: 100%;
					margin-top: 20rpx;
					padding: 0rpx 20rpx;
				
					.label {
						color: #616162;
						font-size: 26rpx;
					}
				
					.upload-box {
						width: 100%;
						height: 200rpx;
						margin-top: 20rpx;
						// margin-bottom: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
				
						.on-upload-img {
							width: 300rpx;
							height: 200rpx;
							border: 1rpx solid #CCCCCC;
							background-color: #e5e4e5;
							background-image: url(../../static/icon/add-icon.png);
							background-repeat: no-repeat;
							background-position: 50% 50%;
							background-size: 100rpx 100rpx;
							// margin-top: 20rpx;
							// margin-left: 50%;
							// margin-bottom: 10rpx;
				
							.img {
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
				
				// 提交设备信息按钮
				.submit-btn {
					width: 90%;
					height: 80rpx;
					font-size: 28rpx;
					line-height: 80rpx;
					border-radius: 40rpx;
					background-color: #FF6D00;
					margin-top: 50rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>
