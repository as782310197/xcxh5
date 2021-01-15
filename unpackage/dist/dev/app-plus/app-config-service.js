
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/mine/mine","pages/mine/updateBankCard","pages/mine/lease","pages/mine/vehicleDetails","pages/mine/customerService","pages/mine/bankCard","pages/mine/order","pages/mine/invoice","pages/mine/car","pages/mine/addCar","pages/mine/leaseDetails"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#707070","selectedColor":"#ED7312","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/icon/index.png","selectedIconPath":"static/icon/index-select.png","text":"首页"},{"pagePath":"pages/mine/mine","iconPath":"static/icon/mine.png","selectedIconPath":"static/icon/mine-select.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uniQiCheBao","compilerVersion":"2.6.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","enablePullDownRefresh":true}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/mine/updateBankCard","meta":{},"window":{"navigationBarTitleText":"更新银行卡"}},{"path":"/pages/mine/lease","meta":{},"window":{"navigationBarTitleText":"我的租约"}},{"path":"/pages/mine/vehicleDetails","meta":{},"window":{"navigationBarTitleText":"车辆详情"}},{"path":"/pages/mine/customerService","meta":{},"window":{"navigationBarTitleText":"客服"}},{"path":"/pages/mine/bankCard","meta":{},"window":{"navigationBarTitleText":"我的银行卡"}},{"path":"/pages/mine/order","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/mine/invoice","meta":{},"window":{"navigationBarTitleText":"我的发票"}},{"path":"/pages/mine/car","meta":{},"window":{"navigationBarTitleText":"我的车辆信息"}},{"path":"/pages/mine/addCar","meta":{},"window":{"navigationBarTitleText":"新增汽车"}},{"path":"/pages/mine/leaseDetails","meta":{},"window":{"navigationBarTitleText":"租约详情"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
