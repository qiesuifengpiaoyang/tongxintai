(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["makegroup"],{"0b65":function(t,e,a){"use strict";var i=a("7c32"),n=a.n(i);n.a},"7c32":function(t,e,a){},ab16:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"makegroup-wrapper overall_background_color"},[a("van-nav-bar",{staticClass:"fbpl",attrs:{title:"拼团详情","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft},scopedSlots:t._u([{key:"right",fn:function(){return[a("van-icon",{attrs:{name:"share"},on:{click:t.onShare}})]},proxy:!0}])}),a("van-swipe",{staticClass:"swiper-n2"},t._l(t.list.banner,(function(t,e){return a("van-swipe-item",{key:e},[a("a",{attrs:{href:"javascript:;"}},[a("img",{attrs:{src:t,alt:t.title}})])])})),1),a("p",{staticClass:"title light_colour"},[t._v(t._s(t.list.title))]),a("p",{staticClass:"price light_colour"},[a("span",[t._v("¥"+t._s(t.list.group_price)),a("del",[t._v(t._s(t.list.price))])])]),a("div",{staticClass:"price-box light_colour"},[a("p",{staticClass:"tit"},[t._v("拼团信息")]),a("p",{staticClass:"price1"},[t._v("拼团数量："+t._s(t.list.price_num))]),a("p",{staticClass:"price1"},[t._v("开团人数："+t._s(t.list.open_num))]),a("p",{staticClass:"price1"},[t._v("拼团人数："+t._s(t.num)+"/"+t._s(t.list.need_num))])]),a("div",{staticClass:"member"},[t._l(t.list.member,(function(e,i){return a("div",{key:i,staticClass:"head_img_list",style:{height:t.imgheight},on:{click:function(a){return a.stopPropagation(),t.setDeputyLeader(e)}}},[e.head_img?a("img",{attrs:{src:e.head_img,alt:""}}):a("div",{staticClass:"head_img"},[t._v(" "+t._s(e.first||"同")+" ")]),e.mime?a("van-icon",{staticClass:"icon-clear",attrs:{name:"clear"},on:{click:function(a){return a.stopPropagation(),t.quit(e)}}}):t._e()],1)})),t._l(t.memberk,(function(e){return a("div",{key:e+"k",staticClass:"head_img_list",style:{height:t.imgheight}},[a("div",{staticClass:"head_img"},[a("van-icon",{staticClass:"icon-plus",attrs:{name:"plus"},on:{click:function(e){return e.stopPropagation(),t.joinTheGroup(e)}}})],1)])}))],2),1===t.level?a("div",{staticClass:"makebtn",on:{click:t.open}},[t._v("开团")]):t._e(),a("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":"取消"},on:{select:t.onSelect},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}}),a("van-share-sheet",{attrs:{title:"立即分享给好友",options:t.options},on:{select:t.onSelectShare},model:{value:t.showShare,callback:function(e){t.showShare=e},expression:"showShare"}}),a("van-popup",{attrs:{"get-container":"body"},model:{value:t.showcanvasrq,callback:function(e){t.showcanvasrq=e},expression:"showcanvasrq"}},[a("canvas",{attrs:{id:"canvasrq"}})])],1)},n=[],s=(a("99af"),a("4160"),a("d81d"),a("ac1f"),a("5319"),a("159b"),a("5530")),o=a("4328"),r=a.n(o),c=a("a813"),l=a("be3b"),m=a("b311"),u=a.n(m),d=a("d055"),h=a.n(d),f={data:function(){return{showcanvasrq:!1,show:!1,showShare:!1,list:{},team_id:this.$route.params.team_id,imgheight:0,num:0,level:0,memberk:0,deputy_leader:0,open_num:0,actions:[],options:[[{name:"复制链接",icon:"link",id:1,className:"clipboardUrl"},{name:"二维码",icon:"qrcode",id:2,className:"rqUrl"}]]}},created:function(){this.imgheight=(window.screen.width-34)/5+"px"},mounted:function(){this.detail()},methods:{onShare:function(){this.showShare=!this.showShare},onSelectShare:function(t){var e=this;1===t.id?e.$nextTick((function(){var t=new u.a(".clipboardUrl",{text:function(){return window.location.href}});t.on("success",(function(a){e.$toast({message:"复制成功",forbidClick:!0}),a.clearSelection(),t.destroy()})),t.on("error",(function(a){e.$toast({message:"该浏览器不支持自动复制",forbidClick:!0}),t.destroy()}))})):2===t.id&&(e.showcanvasrq=!0,e.$nextTick((function(){var t=document.getElementById("canvasrq");h.a.toCanvas(t,"".concat(window.location.href),{width:200,margin:2},(function(t){}))}))),e.showShare=!1},onSelect:function(t){this.show=!1,this.leadercl(t)},open:function(){var t=this;if(t.list.member.length>=t.open_num){var e=t.$toast.loading({duration:0,forbidClick:!0});l["a"].post("".concat(c["b"],"/team/open"),r.a.stringify({team_id:t.team_id})).then((function(a){var i=a.data,n=i.status,s=i.message;i.info;e.clear(),t.$toast("".concat(s)),1===n&&setTimeout((function(){t.$router.replace({path:"/makeOrder",query:{team_id:t.team_id}})}),300)}))}else t.$toast("开团人数不足")},leadercl:function(t){var e,a=this;if(3===t.action)e="/team/cancelDeputyLeader";else if(2===t.action){var i=0;if(a.list.member.map((function(t){i=t.level+i})),i>a.deputy_leader)return void a.$toast("副团长人数已到上限");e="/team/setDeputyLeader"}var n=a.$toast.loading({duration:0,forbidClick:!0});l["a"].post("".concat(c["b"]).concat(e),r.a.stringify({order_id:a.list.order_id})).then((function(e){var i=e.data,s=i.status,o=i.message;i.info;n.clear(),a.$toast("".concat(o)),1===s&&(a.list.member=a.list.member.map((function(e){e.order_id===t.order_id&&(e.level=t.action)})))}))},onClickLeft:function(){this.$router.replace({name:"makelist"})},detail:function(){var t=this,e=t.$toast.loading({duration:0,message:"加载中...",forbidClick:!0});l["a"].post("".concat(c["b"],"/team/detail"),r.a.stringify({team_id:t.team_id})).then((function(a){var i=a.data,n=i.status,o=i.message,r=i.info;if(e.clear(),1===n){var c=r.need_num;t.open_num=r.open_num,t.deputy_leader=r.deputy_leader,t.level=r.level;var l=Array.isArray(r.member)?r.member.length:0;t.memberk=c-l,t.num=r.num,t.list=Object(s["a"])({},r)}else t.$toast("".concat(o))}))},filtername:function(t){var e=t||"同";return e.substring(0,1)},setDeputyLeader:function(t){if(1!==t.mime&&1===this.level){var e={},a=[];e.order_id=t.order_id,2===t.level?(e.name="取消副团长",e.action=3):3===t.level&&(e.name="设置副团长",e.action=2),a.push(e),this.actions=a,this.show=!0}},joinTheGroup:function(){var t=this,e=t.list.member,a=!1;e.forEach((function(t){t.mime&&(a=!0)})),a?t.$toast("已参与拼团，请勿重复添加1"):t.$dialog.confirm({message:"您确定要加入该拼团吗"}).then((function(){var e=t.$toast.loading({duration:0,forbidClick:!0});l["a"].post("".concat(c["b"],"/team/joinTheGroup"),r.a.stringify({team_id:t.team_id})).then((function(a){var i=a.data,n=i.status,s=i.message,o=i.info;e.clear(),1===n?t.list.member.push({order_id:o.order_id,mime:1,username:sessionStorage.getItem("name"),mobile:sessionStorage.getItem("mobile"),first:t.filtername(sessionStorage.getItem("name"))}):t.$toast("".concat(s))}))}))},quit:function(t){var e=this,a="";1===t.level?a="您是团长，确认取消团队吗？请您再确认一次":2===t.level?a="您是副团长，确认退出拼团吗？请您再确认一次":3===t.level&&(a="您是成员，确认退出拼团吗？请您再确认一次"),e.$dialog.confirm({message:a}).then((function(){var t=e.$toast.loading({duration:0,forbidClick:!0});l["a"].post("".concat(c["b"],"/team/quit"),r.a.stringify({order_id:e.list.order_id})).then((function(a){var i=a.data,n=i.status,s=i.message;i.info;t.clear(),1===n?e.$router.replace({name:"makelist"}):e.$toast("".concat(s))}))}))}}},p=f,v=(a("0b65"),a("2877")),_=Object(v["a"])(p,i,n,!1,null,null,null);e["default"]=_.exports}}]);