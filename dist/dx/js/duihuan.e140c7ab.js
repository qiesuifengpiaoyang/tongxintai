(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["duihuan"],{"0cbb":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("van-popup",{staticClass:"scgood-plu-01",attrs:{value:e.showpop,"overlay-style":{background:"rgba(0,0,0,0)"}},on:{"click-overlay":e.clickoverlay}},[r("ul",[r("li",{on:{click:function(t){return e.gohref(1)}}},[r("van-icon",{attrs:{name:"home-o"}}),r("span",[e._v("首页")])],1),r("li",{on:{click:function(t){return e.gohref(2)}}},[r("van-icon",{attrs:{name:"shopping-cart-o"}}),r("span",[e._v("购物车")])],1),r("li",{on:{click:function(t){return e.gohref(3)}}},[r("van-icon",{attrs:{name:"apps-o"}}),r("span",[e._v("分类搜索")])],1),r("li",{on:{click:function(t){return e.gohref(4)}}},[r("van-icon",{attrs:{name:"contact"}}),r("span",[e._v("我的")])],1)])])},i=[],a=(r("ac1f"),r("5319"),{data:function(){return{}},props:{showpop:{}},mounted:function(){},methods:{gohref:function(e){1===e?this.$router.replace({name:"index2"}):2===e?this.$router.replace({name:"shopcat"}):3===e?this.$router.replace({name:"classification",params:{type:1}}):4===e&&(window.location.href="/#/me")},clickoverlay:function(){this.$emit("update:showpop",!1)}}}),o=a,s=r("2877"),c=Object(s["a"])(o,n,i,!1,null,null,null);t["a"]=c.exports},1528:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box overall_background_color"},[r("van-nav-bar",{staticClass:"fbpl",attrs:{title:"领取奖品","left-text":"返回","left-arrow":""},on:{"click-left":e.onClickLeft,"click-right":e.onClickRight},scopedSlots:e._u([{key:"right",fn:function(){return[r("van-icon",{attrs:{name:"weapp-nav",size:"18"}})]},proxy:!0}])}),r("div",{staticClass:"jieshao"},[r("div",[r("img",{attrs:{src:e.prize.prize_cover_img,alt:""}})]),r("div",{staticClass:"text"},[r("p",[e._v(" 奖品名称："),r("span",[e._v(e._s(e.prize.prize_title))])]),r("p",[e._v(" 奖品价值："),r("span",[e._v(e._s(e.prize.prize_money))])]),r("p",[e._v(" 奖品描述："),r("span",[e._v(e._s(e.prize.prize_synopsis))])])])]),r("div",{staticClass:"postage"},[r("span",[e._v("邮费：")]),r("span",[e._v(e._s(e.price/100)+"元")])]),r("div",{staticStyle:{height:"0.3rem"}}),r("div",{staticClass:"shopcat-address"},[r("van-cell",{staticClass:"sad",attrs:{icon:e.addressli.icon,"is-link":""},on:{click:e.shopcatadscl},scopedSlots:e._u([{key:"title",fn:function(){return[e.addresslia.mobile?r("div",[r("p",[e._v(e._s(e.addresslia.mobile))]),r("p",[e._v(" "+e._s(e.addresslia.province)+e._s(e.addresslia.market)+e._s(e.addresslia.area)+" ")]),r("p",[e._v(" "+e._s(e.addresslia.address)+" ")])]):r("div",[e._v("请选择收货地址")])]},proxy:!0}])})],1),r("div",{staticClass:"xiangqing"},[r("p",[e._v("详情：")]),r("div",{domProps:{innerHTML:e._s(e.prize.prize_detail)}})]),r("div",{staticClass:"freight"},[r("p",[e._v("邮费说明：")]),r("div",{domProps:{innerHTML:e._s(e.postage)}})]),r("div",{staticClass:"zffs01"},[r("van-radio-group",{model:{value:e.radiopay,callback:function(t){e.radiopay=t},expression:"radiopay"}},[r("van-cell-group",e._l(e.actionsPay,(function(t,n){return r("van-cell",{key:n,class:"p-"+t.icon,attrs:{title:t.name,clickable:"",icon:t.icon},on:{click:function(r){e.radiopay=t.id}},scopedSlots:e._u([{key:"right-icon",fn:function(){return[r("van-radio",{attrs:{name:t.id}})]},proxy:!0}],null,!0)})})),1)],1)],1),r("van-submit-bar",{attrs:{price:e.price,"button-text":"确认领取"},on:{submit:e.onSubPay}}),r("more-btn",{attrs:{showpop:e.showpop},on:{"update:showpop":function(t){e.showpop=t}}})],1)},i=[],a=r("4328"),o=r.n(a),s=r("a813"),c=r("be3b"),l=r("0cbb"),u={data:function(){return{showpop:!1,postage:null,addresslia:{mobile:"",province:"",market:"",area:"",address:""},addressli:{icon:"add-square",icon1:"location",id:"",mobile:"",province:"",province_id:0,market:"",market_id:0,area:"",area_id:0,address:""},prize:[],has_pay:"",actionsPay:[{id:1,name:"支付宝",icon:"alipay"},{id:2,name:"余额支付",icon:"gold-coin"}],price:0,radiopay:1,address_id:this.$route.params.address_id||0}},created:function(){this.dzxq(),this.jpxq(),this.freight()},components:{moreBtn:l["a"]},updated:function(){""!=this.addresslia.mobile&&(this.prize.province==this.addresslia.province?this.price=100*this.prize.freight:this.price=100*this.prize.freight_out)},methods:{dzxq:function(){var e=this;c["a"].post("".concat(s["b"],"/address/detail"),o.a.stringify({address_id:this.$route.params.address_id||0})).then((function(t){var r=t.data,n=r.info,i=(r.message,r.status);1==i&&(e.addresslia.mobile=n.mobile,e.addresslia.province=n.province,e.addresslia.market=n.market,e.addresslia.area=n.area,e.addresslia.address=n.address)}))},freight:function(){var e=this;c["a"].post("".concat(s["b"],"/turntable/class")).then((function(t){var r=t.data,n=r.info;r.message,r.status;e.postage=n.freight}))},shopcatadscl:function(){this.$router.push({path:"/addresses",query:{ref_page:"duihuan",address_id:this.$route.params.address_id||0,draw_id:this.$route.params.draw_id}})},jpxq:function(){var e=this;c["a"].post("".concat(s["b"],"/turntable/detail"),o.a.stringify({draw_id:this.$route.params.draw_id})).then((function(t){var r=t.data,n=r.status,i=r.message,a=r.info;e.prize=a,-1==n&&e.$toast("".concat(i))}))},onSubPay:function(){var e=this;this.addresslia.mobile?c["a"].post("".concat(s["b"],"/turntable/bonusProcessing"),o.a.stringify({draw_id:this.$route.params.draw_id,type:1,address_id:this.$route.params.address_id,pay_type:this.radiopay})).then((function(t){var r=t.data,n=r.info,i=r.message;r.status;e.$toast("".concat(i)),1==n.has_pay&&(window.location.href=n.direct_url)})):this.$toast("请选择收货地址")},onClickLeft:function(){this.$router.go(-1)},onClickRight:function(){this.showpop=!this.showpop}}},p=u,d=(r("de94"),r("2877")),f=Object(d["a"])(p,n,i,!1,null,null,null);t["default"]=f.exports},4127:function(e,t,r){"use strict";var n=r("d233"),i=r("b313"),a=Object.prototype.hasOwnProperty,o={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},s=Array.isArray,c=Array.prototype.push,l=function(e,t){c.apply(e,s(t)?t:[t])},u=Date.prototype.toISOString,p=i["default"],d={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:p,formatter:i.formatters[p],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},f=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},h=function e(t,r,i,a,o,c,u,p,h,y,v,m,g){var b=t;if("function"===typeof u?b=u(r,b):b instanceof Date?b=y(b):"comma"===i&&s(b)&&(b=n.maybeMap(b,(function(e){return e instanceof Date?y(e):e})).join(",")),null===b){if(a)return c&&!m?c(r,d.encoder,g,"key"):r;b=""}if(f(b)||n.isBuffer(b)){if(c){var _=m?r:c(r,d.encoder,g,"key");return[v(_)+"="+v(c(b,d.encoder,g,"value"))]}return[v(r)+"="+v(String(b))]}var w,k=[];if("undefined"===typeof b)return k;if(s(u))w=u;else{var j=Object.keys(b);w=p?j.sort(p):j}for(var x=0;x<w.length;++x){var O=w[x],S=b[O];if(!o||null!==S){var C=s(b)?"function"===typeof i?i(r,O):r:r+(h?"."+O:"["+O+"]");l(k,e(S,C,i,a,o,c,u,p,h,y,v,m,g))}}return k},y=function(e){if(!e)return d;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||d.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=i["default"];if("undefined"!==typeof e.format){if(!a.call(i.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=i.formatters[r],o=d.filter;return("function"===typeof e.filter||s(e.filter))&&(o=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:d.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?d.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:d.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?d.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:d.encode,encoder:"function"===typeof e.encoder?e.encoder:d.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:d.encodeValuesOnly,filter:o,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:d.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:d.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:d.strictNullHandling}};e.exports=function(e,t){var r,n,i=e,a=y(t);"function"===typeof a.filter?(n=a.filter,i=n("",i)):s(a.filter)&&(n=a.filter,r=n);var c,u=[];if("object"!==typeof i||null===i)return"";c=t&&t.arrayFormat in o?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var p=o[c];r||(r=Object.keys(i)),a.sort&&r.sort(a.sort);for(var d=0;d<r.length;++d){var f=r[d];a.skipNulls&&null===i[f]||l(u,h(i[f],f,p,a.strictNullHandling,a.skipNulls,a.encode?a.encoder:null,a.filter,a.sort,a.allowDots,a.serializeDate,a.formatter,a.encodeValuesOnly,a.charset))}var v=u.join(a.delimiter),m=!0===a.addQueryPrefix?"?":"";return a.charsetSentinel&&("iso-8859-1"===a.charset?m+="utf8=%26%2310003%3B&":m+="utf8=%E2%9C%93&"),v.length>0?m+v:""}},4328:function(e,t,r){"use strict";var n=r("4127"),i=r("9e6a"),a=r("b313");e.exports={formats:a,parse:i,stringify:n}},5319:function(e,t,r){"use strict";var n=r("d784"),i=r("825a"),a=r("7b0b"),o=r("50c4"),s=r("a691"),c=r("1d80"),l=r("8aa5"),u=r("14c3"),p=Math.max,d=Math.min,f=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,y=/\$([$&'`]|\d\d?)/g,v=function(e){return void 0===e?e:String(e)};n("replace",2,(function(e,t,r,n){var m=n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,g=n.REPLACE_KEEPS_$0,b=m?"$":"$0";return[function(r,n){var i=c(this),a=void 0==r?void 0:r[e];return void 0!==a?a.call(r,i,n):t.call(String(i),r,n)},function(e,n){if(!m&&g||"string"===typeof n&&-1===n.indexOf(b)){var a=r(t,e,this,n);if(a.done)return a.value}var c=i(e),f=String(this),h="function"===typeof n;h||(n=String(n));var y=c.global;if(y){var w=c.unicode;c.lastIndex=0}var k=[];while(1){var j=u(c,f);if(null===j)break;if(k.push(j),!y)break;var x=String(j[0]);""===x&&(c.lastIndex=l(f,o(c.lastIndex),w))}for(var O="",S=0,C=0;C<k.length;C++){j=k[C];for(var P=String(j[0]),E=p(d(s(j.index),f.length),0),N=[],$=1;$<j.length;$++)N.push(v(j[$]));var z=j.groups;if(h){var A=[P].concat(N,E,f);void 0!==z&&A.push(z);var D=String(n.apply(void 0,A))}else D=_(P,f,E,N,z,n);E>=S&&(O+=f.slice(S,E)+D,S=E+P.length)}return O+f.slice(S)}];function _(e,r,n,i,o,s){var c=n+e.length,l=i.length,u=y;return void 0!==o&&(o=a(o),u=h),t.call(s,u,(function(t,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return r.slice(0,n);case"'":return r.slice(c);case"<":s=o[a.slice(1,-1)];break;default:var u=+a;if(0===u)return t;if(u>l){var p=f(u/10);return 0===p?t:p<=l?void 0===i[p-1]?a.charAt(1):i[p-1]+a.charAt(1):t}s=i[u-1]}return void 0===s?"":s}))}}))},"7f75":function(e,t,r){},"9e6a":function(e,t,r){"use strict";var n=r("d233"),i=Object.prototype.hasOwnProperty,a=Array.isArray,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},c=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",p=function(e,t){var r,p={},d=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,f=t.parameterLimit===1/0?void 0:t.parameterLimit,h=d.split(t.delimiter,f),y=-1,v=t.charset;if(t.charsetSentinel)for(r=0;r<h.length;++r)0===h[r].indexOf("utf8=")&&(h[r]===u?v="utf-8":h[r]===l&&(v="iso-8859-1"),y=r,r=h.length);for(r=0;r<h.length;++r)if(r!==y){var m,g,b=h[r],_=b.indexOf("]="),w=-1===_?b.indexOf("="):_+1;-1===w?(m=t.decoder(b,o.decoder,v,"key"),g=t.strictNullHandling?null:""):(m=t.decoder(b.slice(0,w),o.decoder,v,"key"),g=n.maybeMap(c(b.slice(w+1),t),(function(e){return t.decoder(e,o.decoder,v,"value")}))),g&&t.interpretNumericEntities&&"iso-8859-1"===v&&(g=s(g)),b.indexOf("[]=")>-1&&(g=a(g)?[g]:g),i.call(p,m)?p[m]=n.combine(p[m],g):p[m]=g}return p},d=function(e,t,r,n){for(var i=n?t:c(t,r),a=e.length-1;a>=0;--a){var o,s=e[a];if("[]"===s&&r.parseArrays)o=[].concat(i);else{o=r.plainObjects?Object.create(null):{};var l="["===s.charAt(0)&&"]"===s.charAt(s.length-1)?s.slice(1,-1):s,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&s!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(o=[],o[u]=i):o[l]=i:o={0:i}}i=o}return i},f=function(e,t,r,n){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,s=/(\[[^[\]]*])/g,c=r.depth>0&&o.exec(a),l=c?a.slice(0,c.index):a,u=[];if(l){if(!r.plainObjects&&i.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}var p=0;while(r.depth>0&&null!==(c=s.exec(a))&&p<r.depth){if(p+=1,!r.plainObjects&&i.call(Object.prototype,c[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(c[1])}return c&&u.push("["+a.slice(c.index)+"]"),d(u,t,r,n)}},h=function(e){if(!e)return o;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?o.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?o.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:o.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:o.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:o.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:o.comma,decoder:"function"===typeof e.decoder?e.decoder:o.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:o.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:o.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:o.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:o.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:o.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:o.strictNullHandling}};e.exports=function(e,t){var r=h(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var i="string"===typeof e?p(e,r):e,a=r.plainObjects?Object.create(null):{},o=Object.keys(i),s=0;s<o.length;++s){var c=o[s],l=f(c,i[c],r,"string"===typeof e);a=n.merge(a,l,r)}return n.compact(a)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,i=/%20/g,a=r("d233"),o={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=a.assign({default:o.RFC3986,formatters:{RFC1738:function(e){return n.call(e,i,"+")},RFC3986:function(e){return String(e)}}},o)},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,i=Array.isArray,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(i(r)){for(var n=[],a=0;a<r.length;++a)"undefined"!==typeof r[a]&&n.push(r[a]);t.obj[t.prop]=n}}},s=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},c=function e(t,r,a){if(!r)return t;if("object"!==typeof r){if(i(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(a&&(a.plainObjects||a.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var o=t;return i(t)&&!i(r)&&(o=s(t,a)),i(t)&&i(r)?(r.forEach((function(r,i){if(n.call(t,i)){var o=t[i];o&&"object"===typeof o&&r&&"object"===typeof r?t[i]=e(o,r,a):t.push(r)}else t[i]=r})),t):Object.keys(r).reduce((function(t,i){var o=r[i];return n.call(t,i)?t[i]=e(t[i],o,a):t[i]=o,t}),o)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},u=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(i){return n}},p=function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var i="",o=0;o<n.length;++o){var s=n.charCodeAt(o);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?i+=n.charAt(o):s<128?i+=a[s]:s<2048?i+=a[192|s>>6]+a[128|63&s]:s<55296||s>=57344?i+=a[224|s>>12]+a[128|s>>6&63]+a[128|63&s]:(o+=1,s=65536+((1023&s)<<10|1023&n.charCodeAt(o)),i+=a[240|s>>18]+a[128|s>>12&63]+a[128|s>>6&63]+a[128|63&s])}return i},d=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var i=t[n],a=i.obj[i.prop],s=Object.keys(a),c=0;c<s.length;++c){var l=s[c],u=a[l];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:l}),r.push(u))}return o(t),e},f=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},h=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},y=function(e,t){return[].concat(e,t)},v=function(e,t){if(i(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:s,assign:l,combine:y,compact:d,decode:u,encode:p,isBuffer:h,isRegExp:f,maybeMap:v,merge:c}},de94:function(e,t,r){"use strict";var n=r("7f75"),i=r.n(n);i.a}}]);