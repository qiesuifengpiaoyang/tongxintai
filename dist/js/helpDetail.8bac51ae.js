(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["helpDetail"],{4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},s=Array.isArray,c=Array.prototype.push,l=function(e,t){c.apply(e,s(t)?t:[t])},u=Date.prototype.toISOString,f=o["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},y=function e(t,r,o,i,a,c,u,f,y,h,m,b,g){var v=t;if("function"===typeof u?v=u(r,v):v instanceof Date?v=h(v):"comma"===o&&s(v)&&(v=n.maybeMap(v,(function(e){return e instanceof Date?h(e):e})).join(",")),null===v){if(i)return c&&!b?c(r,p.encoder,g,"key"):r;v=""}if(d(v)||n.isBuffer(v)){if(c){var w=b?r:c(r,p.encoder,g,"key");return[m(w)+"="+m(c(v,p.encoder,g,"value"))]}return[m(r)+"="+m(String(v))]}var j,O=[];if("undefined"===typeof v)return O;if(s(u))j=u;else{var x=Object.keys(v);j=f?x.sort(f):x}for(var k=0;k<j.length;++k){var S=j[k],N=v[S];if(!a||null!==N){var C=s(v)?"function"===typeof o?o(r,S):r:r+(y?"."+S:"["+S+"]");l(O,e(N,C,o,i,a,c,u,f,y,h,m,b,g))}}return O},h=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o["default"];if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=p.filter;return("function"===typeof e.filter||s(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,n,o=e,i=h(t);"function"===typeof i.filter?(n=i.filter,o=n("",o)):s(i.filter)&&(n=i.filter,r=n);var c,u=[];if("object"!==typeof o||null===o)return"";c=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=a[c];r||(r=Object.keys(o)),i.sort&&r.sort(i.sort);for(var p=0;p<r.length;++p){var d=r[p];i.skipNulls&&null===o[d]||l(u,y(o[d],d,f,i.strictNullHandling,i.skipNulls,i.encode?i.encoder:null,i.filter,i.sort,i.allowDots,i.serializeDate,i.formatter,i.encodeValuesOnly,i.charset))}var m=u.join(i.delimiter),b=!0===i.addQueryPrefix?"?":"";return i.charsetSentinel&&("iso-8859-1"===i.charset?b+="utf8=%26%2310003%3B&":b+="utf8=%E2%9C%93&"),m.length>0?b+m:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");e.exports={formats:i,parse:o,stringify:n}},"51db":function(e,t,r){},7766:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.msgs?r("div",{staticClass:"popUpBox"},[r("div",{staticClass:"popUp-content"},[r("span",{directives:[{name:"show",rawName:"v-show",value:e.msg,expression:"msg"}],staticClass:"iconfont icon-tongzhi"}),r("div",{staticClass:"text",domProps:{innerHTML:e._s(e.msg)}}),r("span",{directives:[{name:"show",rawName:"v-show",value:e.msg,expression:"msg"}],on:{click:function(t){e.msgs=!e.msgs}}},[e._v("×")])])]):e._e()},o=[],i={data:function(){return{msgs:!1,msg:""}},created:function(){},mounted:function(){var e=this;sessionStorage.getItem("msg")?(this.msgs=!0,setTimeout((function(){e.msg=sessionStorage.getItem("msg")}),1e3)):this.msgs=!1},methods:{}},a=i,s=(r("7899"),r("2877")),c=Object(s["a"])(a,n,o,!1,null,null,null);t["a"]=c.exports},7899:function(e,t,r){"use strict";var n=r("c1d8"),o=r.n(n);o.a},9224:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"helpdetail-wrapper"},[r("van-nav-bar",{staticClass:"navbar",attrs:{border:!1,title:"医互帮详情","left-arrow":""},on:{"click-left":e.onClickLeft}}),r("div",{staticClass:"helpdetail-con"},[r("p",[e._v("同心台星级会员或普通会员，都要心存善念，助人自助的思想。医互帮是一人生病，众人相帮，今天我生病，大家来帮我；明天他生病，我们去帮他；感谢同心台的所有成员，感恩大家的善心助力。")]),r("p",[e._v("医互帮的进行原则是，每一次有会员生病，申请互帮后，我们的监督管理员到生病会员指定的医院陪同检查，并证实生病属实。上传医院需要治疗的费用，系统收到证明材料后，三分钟之内负责把需要的钱打到生病会员的指定卡上（晚上五点半至早上九点前，礼拜六、礼拜天可能会出现稍微慢点，最长时间不会超过半小时，医互帮设定24小时专线服务，确保同心台会员生病无忧。如重大疑难重病，同心台将会启动直升机俱乐部救助会员紧急就医，同心台将和国家部队医院紧密合作）。")]),r("p",[e._v("互帮款来历：比如我们所有会员，在医互帮系统每人预存30元互助款，假如我们有100万会员。如果某一位会员生病需要3万元医疗款，那么系统将会在每个会员的帐户里自动扣除3分钱，系统为了便于好计算（每次最低扣0.1元），大家轮流依次扣。")]),r("van-checkbox",{staticClass:"lind",model:{value:e.checkedStatus,callback:function(t){e.checkedStatus=t},expression:"checkedStatus"}},[e._v("我已经明白互助的方法，我同意并支持这种方式进行互帮")]),r("div",{staticClass:"helpdbtn",on:{click:e.sureCl}},[e._v("确定申请互帮")])],1),r("popup")],1)},o=[],i=(r("ac1f"),r("1276"),r("4328"),r("7766")),a={data:function(){return{id:null,pageshow:!1,list:[],checkedStatus:!1,apiUrl:this.$store.state.apiDomain,staticUrl:this.$store.state.staticDomain}},components:{popup:i["a"]},mounted:function(){},created:function(){var e=window.location.href,t=e.split("?")[1];t&&(this.id=parseInt(t))},methods:{sureCl:function(){this.checkedStatus?this.id?this.$router.push("/helpApply?".concat(this.id)):this.$router.push("/helpApply"):this.$toast("请勾选同意并支持进行互帮")},onClickLeft:function(){this.$router.go(-1)}}},s=a,c=(r("eba7"),r("2877")),l=Object(c["a"])(s,n,o,!1,null,null,null);t["default"]=l.exports},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},c=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",f=function(e,t){var r,f={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,y=p.split(t.delimiter,d),h=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<y.length;++r)0===y[r].indexOf("utf8=")&&(y[r]===u?m="utf-8":y[r]===l&&(m="iso-8859-1"),h=r,r=y.length);for(r=0;r<y.length;++r)if(r!==h){var b,g,v=y[r],w=v.indexOf("]="),j=-1===w?v.indexOf("="):w+1;-1===j?(b=t.decoder(v,a.decoder,m,"key"),g=t.strictNullHandling?null:""):(b=t.decoder(v.slice(0,j),a.decoder,m,"key"),g=n.maybeMap(c(v.slice(j+1),t),(function(e){return t.decoder(e,a.decoder,m,"value")}))),g&&t.interpretNumericEntities&&"iso-8859-1"===m&&(g=s(g)),v.indexOf("[]=")>-1&&(g=i(g)?[g]:g),o.call(f,b)?f[b]=n.combine(f[b],g):f[b]=g}return f},p=function(e,t,r,n){for(var o=n?t:c(t,r),i=e.length-1;i>=0;--i){var a,s=e[i];if("[]"===s&&r.parseArrays)a=[].concat(o);else{a=r.plainObjects?Object.create(null):{};var l="["===s.charAt(0)&&"]"===s.charAt(s.length-1)?s.slice(1,-1):s,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&s!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(a=[],a[u]=o):a[l]=o:a={0:o}}o=a}return o},d=function(e,t,r,n){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,s=/(\[[^[\]]*])/g,c=r.depth>0&&a.exec(i),l=c?i.slice(0,c.index):i,u=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}var f=0;while(r.depth>0&&null!==(c=s.exec(i))&&f<r.depth){if(f+=1,!r.plainObjects&&o.call(Object.prototype,c[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(c[1])}return c&&u.push("["+i.slice(c.index)+"]"),p(u,t,r,n)}},y=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}};e.exports=function(e,t){var r=y(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?f(e,r):e,i=r.plainObjects?Object.create(null):{},a=Object.keys(o),s=0;s<a.length;++s){var c=a[s],l=d(c,o[c],r,"string"===typeof e);i=n.merge(i,l,r)}return n.compact(i)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i=r("d233"),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=i.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},a)},c1d8:function(e,t,r){},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)"undefined"!==typeof r[i]&&n.push(r[i]);t.obj[t.prop]=n}}},s=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},c=function e(t,r,i){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var a=t;return o(t)&&!o(r)&&(a=s(t,i)),o(t)&&o(r)?(r.forEach((function(r,o){if(n.call(t,o)){var a=t[o];a&&"object"===typeof a&&r&&"object"===typeof r?t[o]=e(a,r,i):t.push(r)}else t[o]=r})),t):Object.keys(r).reduce((function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t}),a)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},u=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},f=function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var o="",a=0;a<n.length;++a){var s=n.charCodeAt(a);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?o+=n.charAt(a):s<128?o+=i[s]:s<2048?o+=i[192|s>>6]+i[128|63&s]:s<55296||s>=57344?o+=i[224|s>>12]+i[128|s>>6&63]+i[128|63&s]:(a+=1,s=65536+((1023&s)<<10|1023&n.charCodeAt(a)),o+=i[240|s>>18]+i[128|s>>12&63]+i[128|s>>6&63]+i[128|63&s])}return o},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],s=Object.keys(i),c=0;c<s.length;++c){var l=s[c],u=i[l];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:i,prop:l}),r.push(u))}return a(t),e},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},y=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},h=function(e,t){return[].concat(e,t)},m=function(e,t){if(o(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:s,assign:l,combine:h,compact:p,decode:u,encode:f,isBuffer:y,isRegExp:d,maybeMap:m,merge:c}},eba7:function(e,t,r){"use strict";var n=r("51db"),o=r.n(n);o.a}}]);