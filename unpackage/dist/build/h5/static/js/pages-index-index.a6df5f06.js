(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"11d3":function(t,e,a){"use strict";a.r(e);var i=a("82a9"),n=a("4f22");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("5cc4");var o,c=a("f0c5"),s=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,"84024856",null,!1,i["a"],o);e["default"]=s.exports},"4f22":function(t,e,a){"use strict";a.r(e);var i=a("de02"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},"5cc4":function(t,e,a){"use strict";var i=a("d5bb"),n=a.n(i);n.a},"6f1a":function(t,e,a){"use strict";a("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.formatDate=n,e.uploadFile=r;var i="http://api.wangshuibao.com";function n(t,e){var a=new Date(t),i=a.getFullYear()+"-",n=(a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1)+"-",r=a.getDate()+" ",o=a.getHours()+":",c=a.getMinutes()+":",s=a.getSeconds();return e?"YYYY-MM"==e?i+n.substring(0,2):"YYYY-MM-DD"==e?i+n+r.substring(0,2):void 0:i+n+r+o+c+s}function r(){return new Promise((function(t,e){uni.chooseImage({sourceType:["camera"],sizeType:["compressed"],success:function(e){var a=e.tempFilePaths;uni.getImageInfo({src:a[0],success:function(e){var a=e.width,n=e.height,r=new Image;r.src=e.path;var o=document.createElement("canvas"),c=o.getContext("2d");o.width=a/4,o.height=n/4,c.drawImage(r,0,0,a/4,n/4);var s=o.toDataURL("image/jpeg",.5);uni.uploadFile({url:i+"/upload/singleFileUpload",filePath:s,name:"file",formData:{user:"test"},success:function(e){t(e)}})}})}})}))}},"77b5":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */*[data-v-84024856]{-webkit-box-sizing:border-box;box-sizing:border-box}[data-v-84024856]:not(not){-webkit-box-sizing:border-box;box-sizing:border-box}.container[data-v-84024856]{width:100%}.container .banner-box[data-v-84024856]{width:100%;height:%?320?%}.container .banner-box .banner-swiper[data-v-84024856]{width:100%;height:100%}.container .banner-box .banner-swiper .swiper-item[data-v-84024856]{width:100%;height:100%;display:block;text-align:center}.container .banner-box .banner-swiper .swiper-item .swiper-img[data-v-84024856]{width:100%;height:100%}.container .calculation-box[data-v-84024856]{width:100%;height:%?180?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.container .calculation-box .natural-person-btn[data-v-84024856]{width:46%;height:70%;color:#fff;font-size:%?34?%;line-height:%?126?%;background:-webkit-gradient(linear,left top,right top,from(#a9dbfe),to(#24a7fb));background:-webkit-linear-gradient(left,#a9dbfe,#24a7fb);background:linear-gradient(90deg,#a9dbfe 0,#24a7fb);padding:0;margin-left:%?20?%}.container .calculation-box .self-employed-person-btn[data-v-84024856]{width:46%;height:70%;color:#fff;font-size:%?34?%;line-height:%?126?%;background:-webkit-gradient(linear,left top,right top,from(#ffb695),to(#ea6a60));background:-webkit-linear-gradient(left,#ffb695,#ea6a60);background:linear-gradient(90deg,#ffb695 0,#ea6a60);padding:0;margin-right:%?20?%}.container .calculation-box .natural-person-btn[data-v-84024856]::after{border:none}.container .calculation-box .self-employed-person-btn[data-v-84024856]::after{border:none}.container .myVehicle-box[data-v-84024856]{width:100%;height:%?400?%;margin-top:%?10?%}.container .myVehicle-box .statistics-card[data-v-84024856]{width:94%;height:100%;margin:0 auto}.container .myVehicle-box .statistics-card .card-header[data-v-84024856]{width:100%;height:20%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.container .myVehicle-box .statistics-card .card-header .card-title[data-v-84024856]{font-size:%?34?%;font-weight:500}.container .myVehicle-box .statistics-card .card-header .card-btn[data-v-84024856]{height:%?60?%;color:#fff;font-size:%?30?%;line-height:%?60?%;background:#178aff;margin:0;padding-left:%?10?%;padding-right:%?10?%;-webkit-border-radius:%?4?%;border-radius:%?4?%}.container .myVehicle-box .statistics-card .card-header .card-btn .add-icon[data-v-84024856]{width:%?30?%;height:%?30?%;margin-right:%?10?%}.container .myVehicle-box .statistics-card .card-header .card-btn[data-v-84024856]::after{border:none}.container .myVehicle-box .statistics-card .card-body[data-v-84024856]{width:100%;height:70%;background-color:#f0f0f0;margin-top:%?20?%;-webkit-border-radius:%?8?%;border-radius:%?8?%}.container .myVehicle-box .statistics-card .card-body .card-body-top[data-v-84024856]{width:100%;height:65%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.container .myVehicle-box .statistics-card .card-body .card-body-top .number[data-v-84024856]{width:50%;height:50%;text-align:center}.container .myVehicle-box .statistics-card .card-body .card-body-top .number .describe-text[data-v-84024856]{color:#a09fa4;font-size:%?26?%}.container .myVehicle-box .statistics-card .card-body .card-body-top .number .number-text[data-v-84024856]{color:#000;font-size:%?30?%}.container .myVehicle-box .statistics-card .card-body .card-body-top .profit[data-v-84024856]{width:50%;height:50%;text-align:center}.container .myVehicle-box .statistics-card .card-body .card-body-top .profit .describe-text[data-v-84024856]{color:#a09fa4;font-size:%?26?%}.container .myVehicle-box .statistics-card .card-body .card-body-top .profit .profit-text[data-v-84024856]{color:#ff6e03;font-size:%?30?%}.container .myVehicle-box .statistics-card .card-body .card-body-bottom[data-v-84024856]{width:100%;height:35%}.container .myVehicle-box .statistics-card .card-body .card-body-bottom .view-vehicle-btn[data-v-84024856]{width:100%;height:100%;color:#ff6e03;font-size:%?30?%;background-color:#f0f0f0;padding-top:%?10?%}.container .myVehicle-box .statistics-card .card-body .card-body-bottom .view-vehicle-btn[data-v-84024856]::after{border:none;border-top:1px solid #e0e0e0}.container .common-problem-box[data-v-84024856]{width:100%;margin-top:%?10?%}.container .common-problem-box .problem-card[data-v-84024856]{width:100%}.container .common-problem-box .problem-card .card-header[data-v-84024856]{width:94%;height:%?80?%;line-height:%?80?%;font-size:%?34?%;font-weight:500;margin:0 auto}.container .common-problem-box .problem-card .card-body[data-v-84024856]{width:100%}.container .common-problem-box .problem-card .card-body .problem-list .problem-list-item[data-v-84024856]{border-bottom:1px solid #f0f0f0}',""]),t.exports=e},"82a9":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"banner-box"},[a("v-uni-swiper",{staticClass:"banner-swiper",attrs:{"indicator-dots":!0,autoplay:!0,interval:3e3,duration:1e3,circular:!0,"indicator-active-color":"#FF6C02"}},t._l(t.bannerData,(function(t){return a("v-uni-swiper-item",{key:t.id,staticClass:"swiper-item"},[a("v-uni-image",{staticClass:"swiper-img",attrs:{src:t.url,mode:"scaleToFill"}})],1)})),1)],1),a("v-uni-view",{staticClass:"myVehicle-box"},[a("v-uni-view",{staticClass:"statistics-card"},[a("v-uni-view",{staticClass:"card-header"},[a("v-uni-view",{staticClass:"card-title"},[t._v("我的车辆")])],1),a("v-uni-view",{staticClass:"card-body"},[a("v-uni-view",{staticClass:"card-body-top"},[a("v-uni-view",{staticClass:"number"},[a("v-uni-view",{staticClass:"describe-text"},[t._v("出租汽车数量")]),a("v-uni-view",{staticClass:"number-text"},[a("span",[t._v(t._s(t.carNumber))]),t._v("辆")])],1),a("v-uni-view",{staticClass:"profit"},[a("v-uni-view",{staticClass:"describe-text"},[t._v("预计收益")]),a("v-uni-view",{staticClass:"profit-text"},[t._v("¥"),a("span",[t._v(t._s(t.carProfit))]),t._v("元")])],1)],1),a("v-uni-view",{staticClass:"card-body-bottom"},[a("v-uni-button",{staticClass:"view-vehicle-btn",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.viewCar.apply(void 0,arguments)}}},[t._v("查看车辆")])],1)],1)],1)],1),a("v-uni-view",{staticClass:"myVehicle-box"},[a("v-uni-view",{staticClass:"statistics-card"},[a("v-uni-view",{staticClass:"card-header"},[a("v-uni-view",{staticClass:"card-title"},[t._v("我的设备")])],1),a("v-uni-view",{staticClass:"card-body"},[a("v-uni-view",{staticClass:"card-body-top"},[a("v-uni-view",{staticClass:"number"},[a("v-uni-view",{staticClass:"describe-text"},[t._v("出租设备数量")]),a("v-uni-view",{staticClass:"number-text"},[a("span",[t._v(t._s(t.deviceNumber))]),t._v("台")])],1),a("v-uni-view",{staticClass:"profit"},[a("v-uni-view",{staticClass:"describe-text"},[t._v("预计收益")]),a("v-uni-view",{staticClass:"profit-text"},[t._v("¥"),a("span",[t._v(t._s(t.deviceAccumulatedIncome))]),t._v("元")])],1)],1),a("v-uni-view",{staticClass:"card-body-bottom"},[a("v-uni-button",{staticClass:"view-vehicle-btn",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.viewEquipment.apply(void 0,arguments)}}},[t._v("查看设备")])],1)],1)],1)],1)],1)},r=[]},d5bb:function(t,e,a){var i=a("77b5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("1f0b05c6",i,!0,{sourceMap:!1,shadowMode:!1})},de02:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a("6f1a");var i={data:function(){return{carNumber:"0",carProfit:"0",deviceNumber:"0",deviceAccumulatedIncome:"0",bannerData:[],problemList:[]}},onLoad:function(){this.getQuestionData(),this.getBannerData()},onShow:function(){var t=uni.getStorageSync("userInfo");t&&this.getearningsData()},methods:{getBannerData:function(){var t=this;this.http({url:"/system/sysBanner/findSysBannerPage",method:"post",data:{entity:{},page:{current:1,page:4}}}).then((function(e){var a=e.data;1==a.code&&(t.bannerData=a.result.records)}))},getearningsData:function(){var t=this,e=uni.getStorageSync("userInfo")&&uni.getStorageSync("userInfo").id;this.http({url:"/api/bizMember/getMyIncomeInfo",method:"post",data:{memberId:e}}).then((function(e){1==e.data.code&&(console.log(e),uni.setStorageSync("earningsInfo",e.data.result),t.carNumber=e.data.result.carNumbers,t.carProfit=e.data.result.estimatedIncome,t.deviceNumber=e.data.result.deviceNumber,t.deviceAccumulatedIncome=e.data.result.deviceAccumulatedIncome)}))},getQuestionData:function(){var t=this,e={entity:{},page:{current:1,size:3}};this.http({url:"/system/sysFaq/findSysFaqPage",method:"post",data:e}).then((function(e){if(1==e.data.code){var a=e.data.result.records;t.problemList=a,uni.setStorageSync("questionDataList",a)}}))},viewQuestions:function(t){uni.navigateTo({url:"/pages/index/problem?id="+t})},authorization:function(){var t="wx0f4ea2610e201e3d",e=encodeURIComponent("http://www.baidu.com/"),a="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+t+"&redirect_uri="+e+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";this.$nextTick((function(){window.location.href=a}))},viewCar:function(){uni.navigateTo({url:"/pages/mine/car"})},viewEquipment:function(){uni.navigateTo({url:"/pages/equipment/equipmentLeaseList"})}},onPullDownRefresh:function(){setTimeout((function(){uni.stopPullDownRefresh()}),1500)}};e.default=i}}]);