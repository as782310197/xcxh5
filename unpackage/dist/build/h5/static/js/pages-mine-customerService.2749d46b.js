(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-customerService"],{"0ad9":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"container"},t._l(t.service,(function(e){return o("v-uni-view",{key:e.id,staticClass:"weChat"},[o("v-uni-view",{staticClass:"title"},[t._v(t._s(e.description))]),o("v-uni-view",{staticClass:"name"},[t._v(t._s(e.configValue)),o("v-uni-image",{staticClass:"copy",attrs:{src:n("12c6")},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.copy(e.configValue)}}})],1)],1)})),1)},r=[]},"12c6":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAL9ElEQVR4Xu2dbchlVRmGr/mTYaZSYFEpQkZhTVqWpWAo9kmUmUkoJEP2yVD9SAeCwuZH0Zd/IqQmQSgECTUyKcmkfkSRZKYwRWNoGVJS0heGQVA8w+mPvefde6+17mefs9e9YXgHzlr3Ws+19nW+9zp78GECJrCWwB6zMQETWE/AgvjsMIFdCFgQnx4mYEF8DphAGQE/gpRxc69OCFiQThbaZZYRsCBl3NyrEwIWpJOFdpllBCxIGTf36oSABelkoV1mGQELUsbNvTohYEE6WWiXWUbAgpRxc69OCFiQThbaZZYRsCBl3NyrEwIWpJOFdpllBHoR5CzgXOCZZZjcK4HAb4HDwC+BxxPGGzXE0gW5FPgEsHcUDTfaFAI/A+4C4u/Nc05qyYKcDfx0TrgeuwmBO4HPA/E3/ViyIN8HLkwn6gFVBL4EfEgVvi53qYI8D/h9NkyPJycQa/rG1esU+WAxwFIFOQf4cQpBDzIHgVOy7gCXKsiLgF/NsXIeM4XAPcBrgH+qR1uqIE8H/q6G5/xZCVwPvFc9g6UKEtxuBC5XA3T+rAQuAH6onMGSBQlu8T56fEjoY5kEbgUuUZa2dEGC3RXAxcD5wIlKmM6ehYD0UaQHQWZZNQ86mcBJQLw7tQ/YP6H3dRPbT4he7tu8kyC48cYRuBKIF+Fjjj8BIZfk8COIBKtDGxC4A3jDyJx46vy3kW0nNbMgk3C5cSKB9wFfGTne84EHR7ad1MyCTMLlxokETgMeGDneq4C7R7ad1MyCTMLlxskE/jNyPNk7WRZk5Aq42SwELMgs2D3othCwINuyUp7nLAQsyCzYPei2EOhOkB9sy8p4nkcJxNfJHwP+DBwBvgX8IZFNd4KMLThxDTzURALfBm4HDk3sV9J87PmymHexxhZcAtN9cgnERUshiVKUseeLBclde482gcANwLsntJ/S1IJMoeW2G0sgLlqKe/HWhwVpTdR5sxH4MvDBxqNbkMZAHTcvgYPAJxtOwYI0hOmozSDwltW7XC1mY0FaUHTGRhGIt4Hf2mhGFqQRSMdsFoE3A99pMCULsgbiTs9jp3zzeCewu/Wf2v7J067t3+BckkQcBzwHeMnEHfLjQqcPNJiRBVkDUfbBT4NF6zHi5NU14q8fWXx8HSXEqj0siAWpPYfS+sd13/FdujNHjtjiTs6CWJCRp9tmNHsb8M2RU3kHcMvItuuaWRALUnkK5XaPR5G/jBwyXoOM3XTBgqwIzH6PMHJx3Ww9gXtHPs36OPCpSpCzny9T3hmqrPVo99kLblFE5xnxOiS2cR06WnyqPvv5YkGGltm3P5mABRGeE7PfIwhr6yXagghX2oII4SZFWxAhaAsihJsUbUGEoC2IEG5StAURgrYgQrhJ0RZECNqCCOEmRVsQIWgLIoSbFG1BhKAtiBBuUrQFEYK2IEK4SdEWRAjaggjhJkVbECFoCyKEmxRtQYSgLYgQblK0BRGCtiBCuEnRFkQI2oII4SZFWxAhaAsihJsUbUGEoC2IEG5StAURgp5LkJcDxwvr2uToh4FHgH81mqQFaQRyp5hMQY4BPg1cDjxbWNM2RD8KfA040GCyFqQBxHURWYKcCjwkrGNbo68Crq2cvAWpBLhb9yxB7gReK6xjm6Nj47f7KgqwIBXwhrpmCHISEE8pfOxM4GPAZyrgWJAKeENdMwR5JXD30EQ6vv024KKK+i1IBbyhrhmCnA4cHppIx7dfB+yvqN+CVMAb6pohyDOAx4Ym0vHtlwE3VdRvQSrgDXXNECTmED9NvG9oMh3e3uLXaC2I8MTJEiRKuBW4WFjLtkU/AZwBHKmcuAWpBLhb90xBYh7xKPJh4IXAscK6Njn6u6s3LVr9+qwFEa52tiDCUrqNtiDCpbcgQrhJ0RZECNqCCOEmRVsQIWgLIoSbFG1BhKAtiBBuUrQFEYK2IEK4SdEWRAjaggjhJkVbECFoCyKEmxRtQYSgLYgQblK0BRGCtiBCuEnRFkQI2oII4SZFWxAhaAsihJsUbUGEoC2IEG5StAURgrYgQrhJ0RZECNqCCOEmRVsQIeg5BDkHeDVwgrCuTY5+cLWz4l2NJmlBGoHcKSZTkLNXOyteKKxnm6J/BJzXYMIWpAHEdRFZglwKfENYx7ZGHwLeXzl5C1IJcLfuWYLcD+wV1rHN0W8C7qgowIJUwBvqmiHIKcDvhibS8e2xq2Lsrlh6WJBSciP6ZQhyPhCL6GNnArVb/1gQ4ZmVIchpwAPCGrY92o8gE1Zwz4S2LZpmCHIc8I8Wk11ohl+DTFjYJQoS5cceUNdM4NBLU7+LNXGllypIYHjX6leVJiJZbHN/DlKwtEsWJHCctdpdMV6XPLWAzxK6fA+4B4i/LQ6/SG9BcU1GxmsQ4fQdvXqHMN4pHDoOrp7qDrXb7fbZz5elP4LULI777kzAjyDCM2P2ewRhbb1EWxDhSlsQIdykaAsiBG1BhHCToi2IELQFEcJNirYgQtAWRAg3KdqCCEFbECHcpGgLIgRtQYRwk6ItiBC0BRHCTYq2IELQFkQINynagghBWxAh3KRoCyIEbUGEcJOiLYgQtAURwk2KtiBC0BZECDcp2oIIQWcLcgYQl5jG7orHC+va5OjfrHZWjKssWxwWpAXFNRmZgnwU+IKwlm2LfgKIO4wjlRO3IJUAd+ueJcjngKuFdWxrdO2WP1G3BRGufoYgx6w2jnuWsI5tjr4MuKmiAAtSAW+oa4YgL2jwNGKojm2+/Tpgf0UBFqQC3lDXDEHipw5+MjSRjm+/Dbioon4LUgFvqGuGIN6bd/dViH15Y3fF0sOClJIb0S9DkKcAvwZOHTGfHpucCdxXUbgFqYA31DVDkJiDN7DeeSWuAq4dWqSB2y1IJcDdumcJEnOIR5AbgXOF9WxL9KOrXSYPNJiwBWkAcV1EpiAxh3i69faVLL3urBiffcTOiq029LYgCxJEWEq30RZEuPTZjyDCUrqNtiDCpbcgQrhJ0RZECNqCCOEmRVsQIWgLIoSbFG1BhKAtiBBuUrQFEYK2IEK4SdEWRAjaggjhJkVbECFoCyKEmxRtQYSgLYgQblK0BRGCtiBCuEnRFkQI2oII4SZFWxAhaAsihJsUbUGEoC2IEG5StAURgrYgQrhJ0RZECNqCCOEmRVsQIWgLIoSbFN1KkBNXOz3uA+L/cdXjH59UwzUja7oAiAvDmh97mifuHmhBkoELhmshSOwZcEPDjTUsiGChHVlGoFaQ2FXl3rKh1/ayII2BOq6cQK0gv1g9tSqfwf/3tCAtaTqrikCNILHTzENVo+/c2YIIoDqyjECNIKr9yixI2Vq6l4BAjSCK1x9RogURLLQjywjUCBIj/hU4oWxov0j/HwHZPULjhekxrlaQ+Nwj3uJtecjOF38O0nKZ+siqFSQoxe8ljv0QcAxVCzKGktukEGghSEw0Xo/Eo0m8cH/u6qlXfJL+74IqDvqT9AJq7iIh0EoQyeRah/opVmuiy8+zIMI19nexhHCToi2IELQFEcJNirYgQtAWRAg3KdqCCEE/Dhw7Ij9+hTV+jdXH5hGwIMI1eRg4eUT+R4AvjmjnJvkELIiQ+c+Bl43Ij58Me8WIdm6ST8CCCJnfDFwyMv/rwBUj27pZHgELImR9JXD9hPyQ5NDqGoJHJvRzUx0BC6Jjy+nAYWG+ozeHQHz9I75ztdVH9ifpAeuW1U8zbzU4T36QgAUZRLRzA9VVZYXTcTcRAQtSAfarwHsq+rvr5hOwIBVrFFeUxe4WcRG/j2USsCCV67oXuL8yw903l4AFabA2caHM7auLZxrEOWKDCFiQhovxWeBAwzxHzU/AgjReg9cBVwPx18f2E7AgojV8J3De6t9LRWM4Vk/AgugZ8zQ4+un7i/2OVwLt9kP4k/T2TJ1oAptDYI6vmmxO9Z6JCQwQsCA+RUxgFwIWxKeHCVgQnwMmUEbAjyBl3NyrEwIWpJOFdpllBCxIGTf36oSABelkoV1mGQELUsbNvTohYEE6WWiXWUbAgpRxc69OCFiQThbaZZYRsCBl3NyrEwIWpJOFdpllBCxIGTf36oSABelkoV1mGYH/Au2InfaAwXXIAAAAAElFTkSuQmCC"},3638:function(t,e,n){"use strict";n.r(e);var o=n("0ad9"),i=n("831a");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("526f");var c,a=n("f0c5"),s=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"3df9bb6a",null,!1,o["a"],c);e["default"]=s.exports},"526f":function(t,e,n){"use strict";var o=n("d8d7"),i=n.n(o);i.a},"831a":function(t,e,n){"use strict";n.r(e);var o=n("b9b5"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},"8e6c":function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */*[data-v-3df9bb6a]{box-sizing:border-box}[data-v-3df9bb6a]:not(not){box-sizing:border-box}.container[data-v-3df9bb6a]{width:100%}.container .weChat[data-v-3df9bb6a]{width:90%;height:%?300?%;margin:0 auto;margin-top:%?30?%;text-align:center;background-color:#f0f0f0}.container .weChat .title[data-v-3df9bb6a]{color:#333;font-size:%?32?%;font-weight:500;padding-top:%?120?%}.container .weChat .name[data-v-3df9bb6a]{color:#fe6d02;font-size:%?32?%;font-weight:500}.container .weChat .copy[data-v-3df9bb6a]{margin-left:%?10?%;width:%?32?%;height:%?32?%;vertical-align:middle}.container .official-account[data-v-3df9bb6a]{width:90%;height:%?300?%;margin:0 auto;margin-top:%?30?%;text-align:center;background-color:#f0f0f0}.container .official-account .title[data-v-3df9bb6a]{color:#333;font-size:%?32?%;font-weight:500;padding-top:%?120?%}.container .official-account .name[data-v-3df9bb6a]{color:#fe6d02;font-size:%?32?%;font-weight:500}',""]),t.exports=e},b9b5:function(t,e,n){"use strict";var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("d484")),r={data:function(){return{service:[]}},onShow:function(){var t=this;this.http({url:"/api/common/getCustomerService",method:"post"}).then((function(e){1==e.data.code&&(t.service=e.data.result)}))},methods:{copy:function(t){(0,i.default)({content:t,success:function(t){uni.showToast({title:t,icon:"none"})},error:function(t){uni.showToast({title:t,icon:"none",duration:3e3})}})}}};e.default=r},d484:function(t,e,n){"use strict";function o(t){var e=t.content,n=t.success,o=t.error;if(!e)return o("复制的内容不能为空 !");e="string"===typeof e?e:e.toString(),document.queryCommandSupported("copy")||o("浏览器不支持");var i=document.createElement("textarea");i.value=e,i.readOnly="readOnly",document.body.appendChild(i),i.select(),i.setSelectionRange(0,e.length);var r=document.execCommand("copy");r?n("复制成功~"):o("复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！"),i.remove()}n("d3b7"),n("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=o},d8d7:function(t,e,n){var o=n("8e6c");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("fbbc0138",o,!0,{sourceMap:!1,shadowMode:!1})}}]);