<template>
	<view class="container">
		<!-- 基本信息 -->
		<view class="basic-info-view">
			<view class="list-item-view">
				<view class="title">车主姓名</view>
				<view class="info">{{ leaseDetailsDate.carOwner }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">车牌号</view>
				<view class="info">{{ leaseDetailsDate.carNumber }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">租金</view>
				<view class="info">{{ leaseDetailsDate.rent }}元</view>
			</view>
			<view class="list-item-view">
				<view class="title">租用周期</view>
				<view class="info">{{ leaseDetailsDate.period }}个月</view>
			</view>
			<view class="list-item-view">
				<view class="title">状态</view>
				<view class="info">{{ leaseDetailsDate.statusName }}</view>
			</view>
			<view class="list-item-view">
				<view class="title">创建时间</view>
				<view class="info">{{ leaseDetailsDate.createTime }}</view>
			</view>
		</view>
		<!-- 租赁协议 -->
		<view class="lease-agreement-view" @click="handleViewAgreement">
			<view class="title">租赁协议</view>
			<view class="view-text">查看</view>
		</view>
		<!-- 查看租赁协议弹框 -->
		<view class="popup-view" :hidden="showPopup">
			<view class="popup-header">
				<view class="title">租车协议</view>
				<uni-icons class="close-icon" type="closeempty" size="26" color="#C6C6C6" @click="hiddenPopup"></uni-icons>
			</view>
			<view class="popup-content" v-html="protocolData.configValue">
				<!-- 天道酬诚信
				泱泱古国，悠悠华夏。五千年的历史轨迹，五千年的文化传承。五千年的风霜雨雪没有将龙的传人的那些优良传统埋没，而是历久弥新，薪尽火传，古人推崇诚信者，今人厚爱诚信者，
				历史选择诚信者。
				孔曰成仁，孟曰取义。仁者，发乎礼，义者，发乎情，止乎心，正乎身。在儒家看来，行仁施义的先决条件为内心的向善，所谓勤心诚意者也。心中信守诚信，方能宁静安心，进而修身
				、齐家、治国、平天下，行义者亦应以诚信为本。义之所存，诚信存之也，读《大学》《中庸》，一字以蔽之，诚也，诚包罗万象，诚信是它的具体体现。
				在滚滚而来，浩荡而去的历史长河中，涌现出的诚信者比比皆是，荆轲于"风萧萧兮易水寒"中作别太子丹，壮士一去，只为报知遇之恩，虽蹈死地亦无怨无悔。伍子胥逃离楚国，得吴王
				重用，答应替他报仇，从此伍子胥尽心辅佐，纵然之后受猜忌可仍然不改忠心。陶朱公荡舟西湖之上，得以"千金散尽还复来"的秘诀便是诚信经商，后世徽商，晋商皆履行了这一原则，才有
				了商行的繁荣昌盛。
				诚信在心，将诚信发挥在经商致富中，能够家财万贯；将诚信延伸到安身立命上，能够后世传颂；将诚信拓展到八荒六合，四海之内，则可万民归心，顺天地阴阳、法四季轮回，运之则
				五岳震荡，百川奔涌，诸侯朝服，天下匡正。屈原被发行呤泽畔时，叹"举世皆浊而我独清，众人皆醉而我独醒"，他愤恨那些"以身之察察，受物之汶汶"者，他忠君恋阙，心系国家，屈子一
				跃，一河碧水为之激荡，千载令名不朽。刘邦入守关中，之所以能够深得民心，在于履行约法三章，秋毫无犯，刘备跨有荆益，保其岩阻之碍，与邻国交好，于内则治民，诚信于民，是以三
				分天下；李世民深知"水能载舟，亦能覆舟"，他对百姓有诚信，天下人拥他之王，他便要对万千黎民百姓谋福祉，是以创造了"贞观之治"……凡此种种，皆言诚信为人立身之本，天道酬诚信 -->
			</view>
			<!-- <rich-text style="width: 100%" :nodes="protocolData.configValue" space="ensp" selectable></rich-text> -->
		</view>
		<!-- 查看租赁协议弹框——蒙板 -->
		<view class="popup_overlay" :hidden="showPopup" @click="hiddenPopup()"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPopup: true,
				leaseDetailsDate: {
					name: '周先生',
					licensePlateNumber: '粤A12345',
					rent: '108000.00',
					leaseDuration: '12',
					status: '出租中',
					createTime: '2020-07-10 16:42:20'
				},
				protocolData: ''
			}
		},
		onLoad(option) {
			var leaseDataList = uni.getStorageSync('leaseDataList');
			leaseDataList.forEach(v => {
				if (v.id == option.leaseId) {
					this.leaseDetailsDate = JSON.parse(JSON.stringify(v))
				}
			});
			this.getProtocol();
		},
		methods: {
			// 获取协议信息
			getProtocol() {
				this.http({
					url: '/api/common/getRentalAgreement',
					method: 'post'
				}).then(res => {
					if (res.data.code == 1) {
						this.protocolData = res.data.result
					}
				})
			},
			handleViewAgreement() {
				this.showPopup = false
			},
			hiddenPopup() {
				this.showPopup = true
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
			padding: 10rpx 20rpx 10rpx 20rpx;

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

		// 租赁协议
		.lease-agreement-view {
			width: 90%;
			height: 80rpx;
			margin: 0 auto;
			background-color: #f0f0f0;
			border-radius: 10rpx;
			padding: 0rpx 60rpx 0rpx 20rpx;
			background-image: url(../../static/icon/youjiantou01.png);
			background-repeat: no-repeat;
			background-size: 50rpx 50rpx;
			background-position: 98% 50%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				flex: 1;
				color: #D96B1E;
				font-size: 28rpx;
			}

			.view-text {
				flex: 1;
				text-align: right;
				color: #8D8E92;
				font-size: 28rpx;
			}
		}

		// 查看租赁协议弹框——蒙板
		.popup_overlay {
			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background-color: #3C3C3C;
			z-index: 1001;
			-moz-opacity: 0.6;
			opacity: .60;
			filter: alpha(opacity=66);
		}

		// 查看租赁协议弹框
		.popup-view {
			position: fixed;
			top: 5%;
			left: 5%;
			width: 90%;
			height: 90%;
			border: 1rpx solid white;
			background-color: white;
			z-index: 1002;
			overflow: auto;
			border-radius: 30rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.popup-header {
				height: 80rpx;
				line-height: 80rpx;
				display: flex;
				justify-content: space-between;

				.title {
					color: #000000;
					font-size: 34rpx;
					font-weight: bold;
					flex: 1;
					text-align: center;
					padding-left: 50rpx;
				}

				.close-icon {
					width: 50rpx;
				}
			}

			.popup-content {
				font-size: 30rpx;
			}
		}
	}
</style>
