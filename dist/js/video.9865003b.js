(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["video"],{3736:function(e,t,r){"use strict";var n=r("f5ca"),o=r.n(n);o.a},4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,s=Array.prototype.push,l=function(e,t){s.apply(e,c(t)?t:[t])},f=Date.prototype.toISOString,u=o["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:u,formatter:o.formatters[u],indices:!1,serializeDate:function(e){return f.call(e)},skipNulls:!1,strictNullHandling:!1},d=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},y=function e(t,r,o,i,a,s,f,u,y,h,m,b,v){var g=t;if("function"===typeof f?g=f(r,g):g instanceof Date?g=h(g):"comma"===o&&c(g)&&(g=n.maybeMap(g,(function(e){return e instanceof Date?h(e):e})).join(",")),null===g){if(i)return s&&!b?s(r,p.encoder,v,"key"):r;g=""}if(d(g)||n.isBuffer(g)){if(s){var w=b?r:s(r,p.encoder,v,"key");return[m(w)+"="+m(s(g,p.encoder,v,"value"))]}return[m(r)+"="+m(String(g))]}var O,S=[];if("undefined"===typeof g)return S;if(c(f))O=f;else{var j=Object.keys(g);O=u?j.sort(u):j}for(var x=0;x<O.length;++x){var k=O[x],N=g[k];if(!a||null!==N){var C=c(g)?"function"===typeof o?o(r,k):r:r+(y?"."+k:"["+k+"]");l(S,e(N,C,o,i,a,s,f,u,y,h,m,b,v))}}return S},h=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o["default"];if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=p.filter;return("function"===typeof e.filter||c(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,n,o=e,i=h(t);"function"===typeof i.filter?(n=i.filter,o=n("",o)):c(i.filter)&&(n=i.filter,r=n);var s,f=[];if("object"!==typeof o||null===o)return"";s=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var u=a[s];r||(r=Object.keys(o)),i.sort&&r.sort(i.sort);for(var p=0;p<r.length;++p){var d=r[p];i.skipNulls&&null===o[d]||l(f,y(o[d],d,u,i.strictNullHandling,i.skipNulls,i.encode?i.encoder:null,i.filter,i.sort,i.allowDots,i.serializeDate,i.formatter,i.encodeValuesOnly,i.charset))}var m=f.join(i.delimiter),b=!0===i.addQueryPrefix?"?":"";return i.charsetSentinel&&("iso-8859-1"===i.charset?b+="utf8=%26%2310003%3B&":b+="utf8=%E2%9C%93&"),m.length>0?b+m:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");e.exports={formats:i,parse:o,stringify:n}},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},s=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",f="utf8=%E2%9C%93",u=function(e,t){var r,u={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,y=p.split(t.delimiter,d),h=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<y.length;++r)0===y[r].indexOf("utf8=")&&(y[r]===f?m="utf-8":y[r]===l&&(m="iso-8859-1"),h=r,r=y.length);for(r=0;r<y.length;++r)if(r!==h){var b,v,g=y[r],w=g.indexOf("]="),O=-1===w?g.indexOf("="):w+1;-1===O?(b=t.decoder(g,a.decoder,m,"key"),v=t.strictNullHandling?null:""):(b=t.decoder(g.slice(0,O),a.decoder,m,"key"),v=n.maybeMap(s(g.slice(O+1),t),(function(e){return t.decoder(e,a.decoder,m,"value")}))),v&&t.interpretNumericEntities&&"iso-8859-1"===m&&(v=c(v)),g.indexOf("[]=")>-1&&(v=i(v)?[v]:v),o.call(u,b)?u[b]=n.combine(u[b],v):u[b]=v}return u},p=function(e,t,r,n){for(var o=n?t:s(t,r),i=e.length-1;i>=0;--i){var a,c=e[i];if("[]"===c&&r.parseArrays)a=[].concat(o);else{a=r.plainObjects?Object.create(null):{};var l="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,f=parseInt(l,10);r.parseArrays||""!==l?!isNaN(f)&&c!==l&&String(f)===l&&f>=0&&r.parseArrays&&f<=r.arrayLimit?(a=[],a[f]=o):a[l]=o:a={0:o}}o=a}return o},d=function(e,t,r,n){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,s=r.depth>0&&a.exec(i),l=s?i.slice(0,s.index):i,f=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;f.push(l)}var u=0;while(r.depth>0&&null!==(s=c.exec(i))&&u<r.depth){if(u+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;f.push(s[1])}return s&&f.push("["+i.slice(s.index)+"]"),p(f,t,r,n)}},y=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}};e.exports=function(e,t){var r=y(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?u(e,r):e,i=r.plainObjects?Object.create(null):{},a=Object.keys(o),c=0;c<a.length;++c){var s=a[c],l=d(s,o[s],r,"string"===typeof e);i=n.merge(i,l,r)}return n.compact(i)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i=r("d233"),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=i.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},a)},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)"undefined"!==typeof r[i]&&n.push(r[i]);t.obj[t.prop]=n}}},c=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},s=function e(t,r,i){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var a=t;return o(t)&&!o(r)&&(a=c(t,i)),o(t)&&o(r)?(r.forEach((function(r,o){if(n.call(t,o)){var a=t[o];a&&"object"===typeof a&&r&&"object"===typeof r?t[o]=e(a,r,i):t.push(r)}else t[o]=r})),t):Object.keys(r).reduce((function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t}),a)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},f=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},u=function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var o="",a=0;a<n.length;++a){var c=n.charCodeAt(a);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?o+=n.charAt(a):c<128?o+=i[c]:c<2048?o+=i[192|c>>6]+i[128|63&c]:c<55296||c>=57344?o+=i[224|c>>12]+i[128|c>>6&63]+i[128|63&c]:(a+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(a)),o+=i[240|c>>18]+i[128|c>>12&63]+i[128|c>>6&63]+i[128|63&c])}return o},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],c=Object.keys(i),s=0;s<c.length;++s){var l=c[s],f=i[l];"object"===typeof f&&null!==f&&-1===r.indexOf(f)&&(t.push({obj:i,prop:l}),r.push(f))}return a(t),e},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},y=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},h=function(e,t){return[].concat(e,t)},m=function(e,t){if(o(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:c,assign:l,combine:h,compact:p,decode:f,encode:u,isBuffer:y,isRegExp:d,maybeMap:m,merge:s}},e001:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box"},[r("van-nav-bar",{staticClass:"navbar",attrs:{border:!1,title:e.list.title+"详情","left-arrow":""},on:{"click-left":e.onClickLeft}}),r("div",{staticClass:"videoBox"},[e.list.video?r("video",{attrs:{poster:e.list.image,src:e.list.video,controls:"controls",width:"100%",height:"100%",controlslist:"nodownload",disablePictureInPicture:"",noremoteplayback:""}},[e._v(" 您的浏览器不支持 video 标签 ")]):e._e(),r("div",{staticClass:"kongjianBox"},[r("span",{staticClass:"biaoti"},[e._v(e._s(e.list.title))]),r("span",{staticClass:"fenxiang",on:{click:e.ShareBtn}},[e._v("分享")])])]),r("div",{staticClass:"textBox",domProps:{innerHTML:e._s(e.list.detail)}}),r("van-share-sheet",{attrs:{title:"立即分享给好友",options:e.Options},on:{select:e.OnSelectShare},model:{value:e.ShowShare,callback:function(t){e.ShowShare=t},expression:"ShowShare"}}),r("van-popup",{attrs:{"get-container":"html"},model:{value:e.Showcanvasrq,callback:function(t){e.Showcanvasrq=t},expression:"Showcanvasrq"}},[r("canvas",{attrs:{id:"Canvasrq"}})]),r("popup")],1)},o=[],i=r("2dbd"),a=r("7766"),c=r("4328"),s=r.n(c),l=r("b311"),f=r.n(l),u=r("d055"),p=r.n(u),d={data:function(){return{apiUrl:this.$store.state.apiDomain,staticUrl:this.$store.state.staticDomain,id:parseInt(this.$route.params.id),list:{},Showcanvasrq:!1,ShowShare:!1,Options:[[{name:"复制链接",icon:"link",id:1,className:"clipboardUrl"},{name:"二维码",icon:"qrcode",id:2,className:"rqUrl"}]]}},components:{popup:a["a"]},created:function(){},mounted:function(){this.onLoad()},methods:{isIntNum:function(e){var t=/(^[1-9]\d*$)/;return!!t.test(e)},onLoad:function(){var e=this;this.isIntNum(this.id)?i["a"].post("".concat(this.apiUrl,"/academy/detail"),s.a.stringify({id:this.id})).then((function(t){var r=t.data,n=r.info;r.message,r.status;e.list=n})):this.$toast("访问不合法")},ShareBtn:function(){this.ShowShare=!this.ShowShare},OnSelectShare:function(e){var t=this;1===e.id?t.$nextTick((function(){var e=new f.a(".clipboardUrl",{text:function(){return window.location.href}});e.on("success",(function(r){t.$toast({message:"复制成功",forbidClick:!0}),r.clearSelection(),e.destroy()})),e.on("error",(function(r){t.$toast({message:"该浏览器不支持自动复制",forbidClick:!0}),e.destroy()}))})):2===e.id&&(t.Showcanvasrq=!0,t.$nextTick((function(){var e=document.getElementById("Canvasrq");p.a.toCanvas(e,"".concat(window.location.href),{width:200,margin:2},(function(e){}))}))),t.ShowShare=!1},onClickLeft:function(){this.$router.go(-1)}}},y=d,h=(r("3736"),r("2877")),m=Object(h["a"])(y,n,o,!1,null,null,null);t["default"]=m.exports},f5ca:function(e,t,r){}}]);