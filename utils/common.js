// 上传文件基础路径
var baseUrl = 'http://api.wangshuibao.com';
// var baseUrl = 'http://47.115.183.171:8080'

// 格式化日期格式分三种情况 年月、年月日、年月日时分秒
export function formatDate(timestamp, format) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	if (format) {
		if (format == 'YYYY-MM') {
			return Y + M.substring(0, 2)
		} else if (format == 'YYYY-MM-DD') {
			return Y + M + D.substring(0, 2)
		}
	} else {
		return Y + M + D + h + m + s;
	}
}

// 上传图片
export function uploadFile() {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			sizeType: ['compressed'],
//			sourceType: ['camera','album'], 从相册选择
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				// 压缩图片
				uni.getImageInfo({
					src: tempFilePaths[0],
					success(res) {
						let canvasWidth = res.width //图片原始长宽
						let canvasHeight = res.height
						let img = new Image()
						img.src = res.path
						let canvas = document.createElement('canvas');
						let ctx = canvas.getContext('2d')
						canvas.width = canvasWidth / 4
						canvas.height = canvasHeight / 4
						ctx.drawImage(img, 0, 0, canvasWidth / 4, canvasHeight / 4)
						var base64 = canvas.toDataURL('image/jpeg', 0.5)
						uni.uploadFile({
							url: baseUrl + '/upload/singleFileUpload',
							filePath: base64,
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								resolve(uploadFileRes)
							}
						});
					}
				})

			}
		});
	})
	
}

// // 上传图片
// export function uploadFile() {
// 	return new Promise((resolve, reject) => {
// 		uni.chooseImage({
// 			sourceType: ['camera'],
// 			sizeType: ['compressed'],
// 			success: (chooseImageRes) => {
// 				// console.log(chooseImageRes)
// 				const tempFilePaths = chooseImageRes.tempFilePaths;
// 				uni.uploadFile({
// 					url: baseUrl + '/upload/singleFileUpload',
// 					filePath: tempFilePaths[0],
// 					name: 'file',
// 					formData: {
// 						'user': 'test'
// 					},
// 					success: (uploadFileRes) => {
// 						resolve(uploadFileRes)
// 					}
// 				});
// 			}
// 		});
// 	})
// }
