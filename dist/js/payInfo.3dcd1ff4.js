(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["payInfo"],{"2e1c":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"payinfo-wrapper"},[e("van-nav-bar",{staticClass:"navbar",attrs:{border:!1,title:"付款信息","left-arrow":""},on:{"click-left":t.onarrowLeftClick}}),e("div",{staticClass:"payinfo-form"},[e("van-field",{staticClass:"mb10 br5",attrs:{border:!1,label:"收款渠道",value:"微信或支付宝",readonly:""}}),e("van-field",{staticClass:"mb10 br5",attrs:{border:!1,label:"账号",placeholder:"请输入微信或支付宝收款账号"},model:{value:t.accountNumber,callback:function(a){t.accountNumber=a},expression:"accountNumber"}}),e("div",{staticClass:"mb10 br5 payinfo-form-upload"},[e("van-uploader",{attrs:{"preview-full-image":!1,"after-read":t.afterRead}},[e("div",{staticClass:"payinfoFormItem_1"},[e("div",{staticClass:"payinfoFormItem_1_img"},[t.imgurl1?e("img",{staticStyle:{width:"100%",height:"4rem"},attrs:{src:t.imgurl1,alt:""}}):e("van-icon",{attrs:{name:"qr"}})],1)]),e("div",{staticClass:"payinfoFormItem_2"},[t._v("点击上传收款二维码")]),t.uploadMask?e("div",{staticClass:"payinfo-form-upload-mask"},[e("van-loading",[t._v("上传中...")])],1):t._e()])],1),e("div",[e("van-field",{staticClass:"mb10 br5",attrs:{label:"验证码",border:!1,readonly:"",clickable:""},scopedSlots:t._u([{key:"button",fn:function(){return[e("van-button",{staticClass:"postmess",attrs:{size:"small",type:"primary"},on:{click:t.postmess}},[t._v(t._s(t.phoneMess))])]},proxy:!0}]),model:{value:t.value,callback:function(a){t.value=a},expression:"value"}})],1),e("van-button",{staticClass:"payinfo-save-btn",attrs:{type:"primary"},on:{click:t.payinfoSaveBtn}},[t._v("保存")])],1),e("popup"),e("Footer",{attrs:{isActive:1}})],1)},o=[],i=(e("99af"),e("0418")),n=e("fd2d"),r=e("7766"),c=e("2dbd"),l=e("4328"),u=e.n(l),m={data:function(){return{numArrowLeft:1,accountNumber:"",show:!1,value:"",imgurl:"",imgurl1:"",uploadMask:!1,timeout:null,times:60,phoneMess:"获取验证码",isclick:!1,apiUrl:this.$store.state.apiDomain,staUrl:this.$store.state.staticDomain}},components:{Header:i["a"],Footer:n["a"],popup:r["a"]},created:function(){},mounted:function(){this.onLoad()},methods:{keyshow:function(){var t=document.body.scrollHeight||document.documentElement.scrollHeight;window.scrollTo({top:t,behavior:"smooth"})},postmess:function(){var t=this;this.isclick||c["a"].post("".concat(this.apiUrl,"/smsSend"),u.a.stringify({mobile:t.accountNumber,type:"register"})).then((function(a){t.setTimes();var e=a.data;1===e.status?t.$toast("发送成功"):(clearInterval(t.timeout),t.$toast({message:e.message,forbidClick:!0,overlay:!0}))})).catch((function(a){clearInterval(t.timeout)}))},setTimes:function(){var t=this;t.timeout=setInterval((function(){t.times>0?(t.times--,t.phoneMess=t.times+"s",t.isclick=!0):(t.times=60,clearInterval(t.timeout),t.isclick=!1,t.phoneMess="获取验证码")}),1e3)},payinfoSaveBtn:function(){},onarrowLeftClick:function(t){1===this.numArrowLeft&&this.$router.go(-1)},afterRead:function(t){this.uploadMask=!0,this.uploadFile(t)},uploadFile:function(t){var a=this,e=this,s=new FormData;s.append("img",t.file),c["a"].post("".concat(this.apiUrl,"/uploadImage"),s).then((function(s){var o=s.data;a.uploadMask=!1,1===o.status?(e.imgurl="".concat(o.info.filename),e.imgurl1=t.content):e.$toast({forbidClick:!0,message:o.message})}))},onLoad:function(){var t=this,a=t.$toast.loading({message:"加载中...",forbidClick:!0,duration:0});c["a"].get("".concat(this.apiUrl,"/getPaymentType")).then((function(e){var s=e.data;1===s.status?(t.accountNumber=s.info.account,t.imgurl="".concat(s.info.payment_img),t.imgurl1="".concat(t.staUrl).concat(s.info.payment_img)):t.$toast(s.message),a.clear()})).catch((function(t){a.clear()}))}}},f=m,p=(e("e4f1"),e("2877")),d=Object(p["a"])(f,s,o,!1,null,null,null);a["default"]=d.exports},"6c64":function(t,a,e){},e4f1:function(t,a,e){"use strict";var s=e("6c64"),o=e.n(s);o.a}}]);