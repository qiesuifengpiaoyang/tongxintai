(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["history"],{"0645":function(t,e,o){},"43c4":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",{staticClass:"box"},[s("van-nav-bar",{staticClass:"navbar",attrs:{border:!1,title:"历史记录","left-arrow":""},on:{"click-left":t.onClickLeft}}),s("ul",{staticClass:"chatBox"},[t.noneSH?s("p",{staticClass:"none"},[t._v("没有更多信息啦^_^")]):t._e(),t._l(t.historyList,(function(e,n){return s("li",{key:"history"+n,class:[2==e.sign?"user":"service"]},[1===e.sign?[s("img",{staticClass:"portrait",attrs:{src:o("6911"),alt:""}}),s("div",{staticClass:"service-content contentBox"},[s("p",{staticClass:"urseName"},[t._v(t._s(e.name))]),s("div",{staticClass:"content"},[t._v(" "+t._s(e.content)+" ")])])]:t._e(),2===e.sign?[s("img",{staticClass:"portrait",attrs:{src:o("6911"),alt:""}}),s("div",{staticClass:"user-content contentBox"},[s("p",[t._v(t._s(e.name))]),s("div",{staticClass:"content"},[t._v(" "+t._s(e.content)+" ")])])]:t._e()],2)}))],2)],1)},n=[],i=(o("99af"),{data:function(){return{scrollBottom:0,noneSH:!1,num:0,residue:!0,page:0,historyList:[],toast1:null,websock:null,uid:sessionStorage.getItem("user_id"),type_id:this.$route.params.type_id}},mounted:function(){this.toast1=this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.initWebSocket(),setTimeout((function(){window.scrollTo({top:document.body.scrollHeight})}),500)},methods:{onClickLeft:function(){this.$router.go(-1)},initWebSocket:function(){var t=this,e="ws://192.168.1.2:8181";t.websock=new WebSocket(e),t.websock.onopen=t.websocketonopen,t.websock.onerror=t.websocketonerror,t.websock.onmessage=t.websocketonmessage,t.websock.onclose=t.websocketclose},reconnect:function(){var t=this;t.lockReconnect||(t.lockReconnect=!0,t.timeoutnum&&clearTimeout(t.timeoutnum),t.timeoutnum=setTimeout((function(){t.initWebSocket(),t.lockReconnect=!1}),5e3))},websocketonopen:function(){console.log("WebSocket连接成功"),this.toast1.clear();var t={type:"read_record",type_id:this.type_id,uid:this.uid};this.websock.send(JSON.stringify(t)),this.start()},websocketonerror:function(t){this.$toast("连接错误"),console.log("WebSocket连接发生错误",t),this.reconnect()},websocketclose:function(t){console.log("连接关闭事件",t),this.reconnect()},websockOpen:function(){console.log("WebSocket连接成功"),this.start()},websocketonmessage:function(t){console.log(t.data);var e=JSON.parse(t.data),o=e.status,s=e.data;1==o?s.length?(this.chatList=[].concat(s.data),this.reset()):this.noneSH=!0:this.$toast("数据返回错误，请稍后重试")},start:function(){var t=this,e=3;t.timeoutObj&&clearTimeout(t.timeoutObj),t.serverTimeoutObj&&clearTimeout(t.serverTimeoutObj),t.timeoutObj=setTimeout((function(){1===t.websock.readyState?t.websock.send("heartCheck"):t.reconnect(),t.serverTimeoutObj=setTimeout((function(){e--,0===e&&t.websocketclose()}),t.timeout)}),t.timeout)},reset:function(){var t=this;clearTimeout(t.timeoutObj),clearTimeout(t.serverTimeoutObj),t.start()}}}),c=i,a=(o("b367"),o("2877")),r=Object(a["a"])(c,s,n,!1,null,"fd3459a2",null);e["default"]=r.exports},6911:function(t,e,o){t.exports=o.p+"img/4.52d78c21.png"},b367:function(t,e,o){"use strict";var s=o("0645"),n=o.n(s);n.a}}]);