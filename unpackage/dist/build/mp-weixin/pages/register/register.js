(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"067c":function(e,t,n){},"3ecf":function(e,t,n){"use strict";(function(e){n("4d6d");o(n("66fd"));var t=o(n("d9d6"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6f17":function(e,t,n){"use strict";var o=n("067c"),a=n.n(o);a.a},"7f93":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},c918:function(e,t,n){"use strict";n.r(t);var o=n("f9c5"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},d9d6:function(e,t,n){"use strict";n.r(t);var o=n("7f93"),a=n("c918");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("6f17");var r,c=n("f0c5"),u=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"7091eb70",null,!1,o["a"],r);t["default"]=u.exports},f9c5:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{verifyCode:"",hintInfo:"手机号码格式不正确",phone:"",codeText:"获取验证码",getCodeDisabled:!1}},methods:{goToPrivacyAgreement:function(){e.navigateTo({url:"/pages/agreement/privacyAgreement"})},goToServiceAgreement:function(){e.navigateTo({url:"/pages/agreement/serviceAgreement"})},validatePhone:function(t){/^1[3456789]\d{9}$/.test(this.phone)||e.showToast({title:"手机号码格式不正确!",icon:"none",duration:2e3})},handleRegisterSubmit:function(t){var n=t.detail.value;n.openId="123456789",console.log(n),this.http({url:"/api/bizMember/registerMember",method:"POST",data:n}).then((function(t){console.log(t),1===t.data.code?(e.showToast({title:"登陆成功",icon:"none",duration:2e3}),e.setStorageSync("userInfo",t.data.result),e.switchTab({url:"/pages/index/index"})):e.showToast({title:t.data.message,icon:"none",duration:2e3})}))},handlGetCode:function(){if(/^1[3456789]\d{9}$/.test(this.phone)){console.log(this.phone),this.http({url:"/api/common/getCAPTCHAP",method:"POST",hideLoading:!0,data:{phone:this.phone}}).then((function(e){}));var t=this;t.getCodeDisabled=!0;var n=60,o=setInterval(a,1e3)}else e.showToast({title:"手机号码格式不正确!",icon:"none",duration:2e3});function a(){n--,n>=0?t.codeText=n+"秒":n<0&&(t.codeText="重新获取",t.getCodeDisabled=!1,clearInterval(o),n=10)}}}};t.default=n}).call(this,n("543d")["default"])}},[["3ecf","common/runtime","common/vendor"]]]);