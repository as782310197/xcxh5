(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-register"],{"1c45":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{verifyCode:"",hintInfo:"手机号码格式不正确",phone:"",codeText:"获取验证码",getCodeDisabled:!1}},methods:{goToPrivacyAgreement:function(){uni.navigateTo({url:"/pages/agreement/privacyAgreement"})},goToServiceAgreement:function(){uni.navigateTo({url:"/pages/agreement/serviceAgreement"})},validatePhone:function(e){/^1[3456789]\d{9}$/.test(this.phone)||uni.showToast({title:"手机号码格式不正确!",icon:"none",duration:2e3})},handleRegisterSubmit:function(e){var t=e.detail.value;t.openId="123456789",console.log(t),this.http({url:"/api/bizMember/registerMember",method:"POST",data:t}).then((function(e){console.log(e),1===e.data.code?(uni.showToast({title:"登陆成功",icon:"none",duration:2e3}),uni.setStorageSync("userInfo",e.data.result),uni.switchTab({url:"/pages/index/index"})):uni.showToast({title:e.data.message,icon:"none",duration:2e3})}))},handlGetCode:function(){if(/^1[3456789]\d{9}$/.test(this.phone)){console.log(this.phone),this.http({url:"/api/common/getCAPTCHAP",method:"POST",hideLoading:!0,data:{phone:this.phone}}).then((function(e){}));var e=this;e.getCodeDisabled=!0;var t=60,n=setInterval(i,1e3)}else uni.showToast({title:"手机号码格式不正确!",icon:"none",duration:2e3});function i(){t--,t>=0?e.codeText=t+"秒":t<0&&(e.codeText="重新获取",e.getCodeDisabled=!1,clearInterval(n),t=10)}}}};t.default=i},"4af2":function(e,t,n){var i=n("c600");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("6e13e6b0",i,!0,{sourceMap:!1,shadowMode:!1})},"5ce8":function(e,t,n){"use strict";var i=n("4af2"),a=n.n(i);a.a},b2d0:function(e,t,n){e.exports=n.p+"static/img/qichebao.66a943a2.png"},c600:function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */*[data-v-15a54ab2]{box-sizing:border-box}[data-v-15a54ab2]:not(not){box-sizing:border-box}.container[data-v-15a54ab2]{width:100%;height:100vh;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.container .popup-header[data-v-15a54ab2]{height:%?80?%;line-height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.container .popup-header .title[data-v-15a54ab2]{color:#000;font-size:%?34?%;font-weight:700;-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:center;padding-left:%?50?%}.container .popup-header .close-icon[data-v-15a54ab2]{width:%?50?%;margin-right:%?20?%}.container .icon-box[data-v-15a54ab2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;margin-bottom:%?20?%}.container .icon-box .icon[data-v-15a54ab2]{width:%?200?%}.container .icon-box .icon-text[data-v-15a54ab2]{color:#9a5a1c;font-size:%?40?%;font-weight:700;margin-top:%?20?%}.container .popup-content[data-v-15a54ab2]{width:90%;margin:%?20?% auto %?0?%;font-size:%?30?%}.container .popup-content .register-form[data-v-15a54ab2]{width:100%}.container .popup-content .register-form .form-item[data-v-15a54ab2]{width:100%;height:%?80?%;border-bottom:1px solid #e5e4e5;margin-top:%?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.container .popup-content .register-form .form-item .label[data-v-15a54ab2]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#616162;font-size:%?30?%}.container .popup-content .register-form .form-item .input[data-v-15a54ab2]{-webkit-box-flex:3;-webkit-flex:3;flex:3;height:100%;line-height:%?80?%;font-size:%?30?%}.container .popup-content .register-form .form-item .code-input[data-v-15a54ab2]{-webkit-box-flex:2;-webkit-flex:2;flex:2}.container .popup-content .register-form .form-item .getCode-btn[data-v-15a54ab2]{width:%?150?%;height:%?50?%;line-height:%?50?%;color:#616162;font-size:%?22?%;padding-left:%?5?%;padding-right:%?5?%}.container .popup-content .register-form .form-item .getCode-btn[data-v-15a54ab2]::after{padding:%?0?%}.container .popup-content .register-form .submit-btn[data-v-15a54ab2]{width:100%;height:%?80?%;font-size:%?30?%;background-color:#ff6d00;line-height:%?80?%;border-radius:%?40?%;margin-top:%?50?%}.container .popup-content .register-form .hint[data-v-15a54ab2]{text-align:center;color:red;margin-top:%?15?%}.container .popup-content .register-form .agreement-box[data-v-15a54ab2]{margin-top:%?15?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;color:#333}.container .popup-content .register-form .agreement-box .agreement-item + .agreement-item[data-v-15a54ab2]{margin-left:%?20?%}.container .popup-content .register-form .agreement-box .agreement-item[data-v-15a54ab2]{color:#007aff}.container .popup-content .register-form .agreement-box .driver[data-v-15a54ab2]{color:#333}',""]),e.exports=t},c730:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"container"},[i("v-uni-view",{staticClass:"icon-box"},[i("v-uni-image",{staticClass:"icon",attrs:{src:n("b2d0"),mode:"widthFix"}}),i("v-uni-view",{staticClass:"icon-text"},[e._v("网税宝")])],1),i("v-uni-view",{staticClass:"popup-content"},[i("v-uni-form",{staticClass:"register-form",on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.handleRegisterSubmit.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"form-item"},[i("v-uni-view",{staticClass:"label"},[e._v("手机号")]),i("v-uni-input",{staticClass:"input",attrs:{name:"phone",type:"text",placeholder:"请输入手机号","placeholder-style":"color: #d0d0d0;"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.validatePhone.apply(void 0,arguments)}},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),i("v-uni-view",{staticClass:"form-item"},[i("v-uni-view",{staticClass:"label"},[e._v("验证码")]),i("v-uni-input",{staticClass:"input code-input",attrs:{name:"verifyCode",type:"text",placeholder:"请输入验证码","placeholder-style":"color: #d0d0d0;"},model:{value:e.verifyCode,callback:function(t){e.verifyCode=t},expression:"verifyCode"}}),i("v-uni-button",{staticClass:"getCode-btn",attrs:{type:"default",disabled:e.getCodeDisabled},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handlGetCode.apply(void 0,arguments)}}},[e._v(e._s(e.codeText))])],1),i("v-uni-button",{staticClass:"submit-btn",attrs:{type:"primary","form-type":"submit"}},[e._v("确定")]),i("v-uni-view",{staticClass:"hint"},[e._v("该手机号如未注册，则自动注册并登陆")]),i("v-uni-view",{staticClass:"agreement-box"},[i("v-uni-view",{staticClass:"agreement-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goToPrivacyAgreement.apply(void 0,arguments)}}},[e._v("隐私声明")]),i("v-uni-view",{staticClass:"agreement-item driver"},[e._v("|")]),i("v-uni-view",{staticClass:"agreement-item",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.goToServiceAgreement.apply(void 0,arguments)}}},[e._v("服务协议")])],1)],1)],1)],1)},o=[]},c918:function(e,t,n){"use strict";n.r(t);var i=n("1c45"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},d9d6:function(e,t,n){"use strict";n.r(t);var i=n("c730"),a=n("c918");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("5ce8");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"15a54ab2",null,!1,i["a"],r);t["default"]=s.exports}}]);