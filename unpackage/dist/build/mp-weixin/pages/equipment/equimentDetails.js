(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/equipment/equimentDetails"],{"22d3":function(e,t,n){},7891:function(e,t,n){"use strict";n.r(t);var i=n("beda"),o=n("be70");for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n("ed52");var a,u=n("f0c5"),s=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"73f8c664",null,!1,i["a"],a);t["default"]=s.exports},"7c11":function(e,t,n){"use strict";(function(e){n("4d6d");i(n("66fd"));var t=i(n("7891"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},be70:function(e,t,n){"use strict";n.r(t);var i=n("c6cb"),o=n.n(i);for(var c in i)"default"!==c&&function(e){n.d(t,e,(function(){return i[e]}))}(c);t["default"]=o.a},beda:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"6d48"))}},o=function(){var e=this,t=e.$createElement;e._self._c},c=[]},c6cb:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){n.e("components/wyb-popup/wyb-popup").then(function(){return resolve(n("998b"))}.bind(null,n)).catch(n.oe)},o={components:{wybPopup:i},data:function(){return{equimentId:"",equimentDataList:[],equipmentInfo:{enterpriseName:""},account:{},deviceInfo:{},enterpriseName:"",imgList:[],status:0,isCheck:!1,isCheckDisibled:!0,leaseAgreement:""}},onLoad:function(t){var n=this;this.equimentId=t.id,this.getEquimentDetail();var i=e.getStorageSync("equimentDataList"),o=i.find((function(e){return e.id=n.equimentId}));this.enterpriseName=o.enterpriseName},methods:{getEquimentDetail:function(){var t=this,n={id:this.equimentId};this.http({url:"/api/bizDeviceRequirement/get",method:"post",data:n}).then((function(n){if(1==n.data.code){var i=n.data.result;t.equipmentInfo=i.requirement?i.requirement:{},t.equipmentInfo.enterpriseName=t.enterpriseName,t.account=i.account?i.account:{},t.deviceInfo=i.deviceInfo?i.deviceInfo:{},i.deviceInfo&&(t.imgList=[i.deviceInfo.devicePhoto1,i.deviceInfo.devicePhoto2,i.deviceInfo.devicePhoto3,i.deviceInfo.devicePhoto4,i.deviceInfo.certificate,i.deviceInfo.nameplate]),e.setStorageSync("equipmentInfo",i)}else e.showToast({title:n.data.message,icon:"none",duration:2e3})}))},previewImg:function(t){e.previewImage({current:t,urls:this.imgList})},changeCkeck:function(){this.isCheck=!this.isCheck,this.isCheck?this.isCheckDisibled=!1:this.isCheckDisibled=!0},readLeaseAgreement:function(){var t=this;this.http({url:"/api/common/getDeviceAgreement",method:"post"}).then((function(n){1===n.data.code?(t.leaseAgreement=n.data.result.configValue,t.$refs.popup.show()):e.showToast({title:n.data.message,icon:"none",duration:2e3})}))},handleCheck:function(){var t=this,n=this.equipmentInfo;this.http({url:"/api/bizDeviceRequirement/ensureDeviceRequirement",method:"post",data:n}).then((function(n){1===n.data.code?(e.showToast({title:n.data.result,icon:"none",duration:2e3}),t.getEquimentDetail()):e.showToast({title:n.data.message,icon:"none",duration:2e3})}))},goToEquimentInspection:function(){e.navigateTo({url:"/pages/equipment/equimentInspection?id="+this.equimentId})}}};t.default=o}).call(this,n("543d")["default"])},ed52:function(e,t,n){"use strict";var i=n("22d3"),o=n.n(i);o.a}},[["7c11","common/runtime","common/vendor"]]]);