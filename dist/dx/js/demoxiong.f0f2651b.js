(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["demoxiong"],{"076e":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("van-tabbar",{attrs:{route:"",value:t.active,"active-color":"#e02e24","inactive-color":"#000"}},[a("van-tabbar-item",{attrs:{icon:"home-o",name:"首页",to:"/"}},[t._v("首页")]),a("van-tabbar-item",{attrs:{icon:"apps-o",name:"分类",to:"/classification/1"}},[t._v("分类")]),a("van-tabbar-item",{attrs:{icon:"shopping-cart-o",name:"购物车",to:"/shopcat"}},[t._v("购物车")]),a("van-tabbar-item",{attrs:{icon:"contact",name:"个人中心",to:"/personal"}},[t._v("个人中心")]),a("van-tabbar-item",{attrs:{icon:"home-o"},on:{click:t.fh}},[t._v("同心台")])],1)},s=[],c={data:function(){return{}},props:{active:{}},methods:{fh:function(){window.location.href="/#/"}}},n=c,r=a("2877"),o=Object(r["a"])(n,i,s,!1,null,null,null);e["a"]=o.exports},"66ed":function(t,e,a){},abe9:function(t,e,a){"use strict";var i=a("66ed"),s=a.n(i);s.a},dd63:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tx-dx-index"},[a("div",{staticClass:"css-in-hed"},[a("van-sticky",[a("van-button",{attrs:{type:"primary"}},[t._v("基础用法")])],1),t._m(0)],1),a("div",{staticClass:"fstp-mark"},[a("div",{staticClass:"banner-swiper-box",staticStyle:{background:"rgb(78, 50, 46)"}},[a("van-swipe",{staticClass:"css-in-swiper",attrs:{autoplay:"3000"},on:{change:t.onChange},scopedSlots:t._u([{key:"indicator",fn:function(){return[a("div",{staticClass:"custom-indicator"},[a("span",[t._v(" "+t._s(t.current+1)+"/4 ")])])]},proxy:!0}])},t._l(t.listswiper,(function(t,e){return a("van-swipe-item",{key:e},[a("a",{attrs:{href:"javascript:;"}},[a("img",{attrs:{src:t.url,alt:t.text}})])])})),1),a("div",{staticClass:"ft-svg"})],1),a("van-grid",{staticClass:"css-in-list-circle",attrs:{gutter:10,"icon-size":"100%",border:!1,"column-num":"5"}},t._l(t.listch,(function(t,e){return a("van-grid-item",{key:e,attrs:{icon:t.url,text:t.text}})})),1)],1),a("div",{staticClass:"css-in-list-circle0"},t._l(t.listah,(function(e,i){return a("div",{key:i},[a("img",{attrs:{src:e.url,alt:e.text}}),i<t.listah.length-1?a("div",{staticClass:"line"}):t._e()])})),0),a("div"),a("div",{staticStyle:{background:"#000"}}),a("Footer",{on:{onFvtabCl:t.onFvtabCl}})],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lb"},[a("div",{staticStyle:{"background-image":"url('https://img30.360buyimg.com/mobilecms/jfs/t1/130513/24/6814/24930/5f32452bE25f6606c/7f88d0f26b5016d9.jpg')"}})])}],c=a("076e"),n={data:function(){return{current:0,listswiper:[{url:"https://img30.360buyimg.com/jddjadvertise/jfs/t1/111928/10/14192/79120/5f2ba2f9E9581bad3/bb2219537fd4dad4.png",text:""},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/134783/8/6836/264558/5f35f28aEb3451ce0/32f23abced9af656.png",text:""},{url:"https://img30.360buyimg.com/jddjadvertise/jfs/t1/129069/20/8347/188233/5f2276a0E057d61db/28e9abeebf75e863.png",text:""}],listch:[{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/110355/36/3573/7822/5e12fdadEddc69a75/709e7b81b039de24.png",text:"批发"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/93109/40/9960/10139/5e12fe63Eccaacb36/1b74d332f526868f.png",text:"拼团"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/93109/40/9960/10139/5e12fe63Eccaacb36/1b74d332f526868f.png",text:"幸运购"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/103222/36/9831/8835/5e130149Ece00bda1/f107c39cabe5676d.png",text:"一元购"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/93109/40/9960/10139/5e12fe63Eccaacb36/1b74d332f526868f.png",text:"转盘"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/90395/11/9898/8772/5e1319ecE2a70bb80/9b0967954d11eb0b.png",text:"京东到家"}],listah:[{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/109835/6/3520/7728/5e12d655E319cc259/358c4927153f21f5.png",text:"会员"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/121308/5/8312/8363/5f23c23dEa98377fa/75ef463f99540244.jpg",text:"会员"},{url:"https://img30.360buyimg.com/mobilecms/jfs/t1/110957/5/7398/10584/5ec4a58fEe0aa9bb0/7c8732b6583e782e.png",text:"会员"}]}},components:{Footer:c["a"]},methods:{onChange:function(t){this.current=t},onFvtabCl:function(t){}}},r=n,o=(a("abe9"),a("2877")),l=Object(o["a"])(r,i,s,!1,null,null,null);e["default"]=l.exports}}]);