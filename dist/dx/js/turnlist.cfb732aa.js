(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["turnlist"],{4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,l=Array.prototype.push,s=function(e,t){l.apply(e,c(t)?t:[t])},u=Date.prototype.toISOString,f=o["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},y=function e(t,r,o,i,a,l,u,f,y,h,m,b,v){var g=t;if("function"===typeof u?g=u(r,g):g instanceof Date?g=h(g):"comma"===o&&c(g)&&(g=n.maybeMap(g,(function(e){return e instanceof Date?h(e):e})).join(",")),null===g){if(i)return l&&!b?l(r,p.encoder,v,"key"):r;g=""}if(d(g)||n.isBuffer(g)){if(l){var w=b?r:l(r,p.encoder,v,"key");return[m(w)+"="+m(l(g,p.encoder,v,"value"))]}return[m(r)+"="+m(String(g))]}var k,x=[];if("undefined"===typeof g)return x;if(c(u))k=u;else{var E=Object.keys(g);k=f?E.sort(f):E}for(var O=0;O<k.length;++O){var j=k[O],S=g[j];if(!a||null!==S){var T=c(g)?"function"===typeof o?o(r,j):r:r+(y?"."+j:"["+j+"]");s(x,e(S,T,o,i,a,l,u,f,y,h,m,b,v))}}return x},h=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o["default"];if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=p.filter;return("function"===typeof e.filter||c(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,n,o=e,i=h(t);"function"===typeof i.filter?(n=i.filter,o=n("",o)):c(i.filter)&&(n=i.filter,r=n);var l,u=[];if("object"!==typeof o||null===o)return"";l=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=a[l];r||(r=Object.keys(o)),i.sort&&r.sort(i.sort);for(var p=0;p<r.length;++p){var d=r[p];i.skipNulls&&null===o[d]||s(u,y(o[d],d,f,i.strictNullHandling,i.skipNulls,i.encode?i.encoder:null,i.filter,i.sort,i.allowDots,i.serializeDate,i.formatter,i.encodeValuesOnly,i.charset))}var m=u.join(i.delimiter),b=!0===i.addQueryPrefix?"?":"";return i.charsetSentinel&&("iso-8859-1"===i.charset?b+="utf8=%26%2310003%3B&":b+="utf8=%E2%9C%93&"),m.length>0?b+m:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");e.exports={formats:i,parse:o,stringify:n}},"81c3":function(e,t,r){"use strict";var n=r("bc6e"),o=r.n(n);o.a},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},l=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},s="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",f=function(e,t){var r,f={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,y=p.split(t.delimiter,d),h=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<y.length;++r)0===y[r].indexOf("utf8=")&&(y[r]===u?m="utf-8":y[r]===s&&(m="iso-8859-1"),h=r,r=y.length);for(r=0;r<y.length;++r)if(r!==h){var b,v,g=y[r],w=g.indexOf("]="),k=-1===w?g.indexOf("="):w+1;-1===k?(b=t.decoder(g,a.decoder,m,"key"),v=t.strictNullHandling?null:""):(b=t.decoder(g.slice(0,k),a.decoder,m,"key"),v=n.maybeMap(l(g.slice(k+1),t),(function(e){return t.decoder(e,a.decoder,m,"value")}))),v&&t.interpretNumericEntities&&"iso-8859-1"===m&&(v=c(v)),g.indexOf("[]=")>-1&&(v=i(v)?[v]:v),o.call(f,b)?f[b]=n.combine(f[b],v):f[b]=v}return f},p=function(e,t,r,n){for(var o=n?t:l(t,r),i=e.length-1;i>=0;--i){var a,c=e[i];if("[]"===c&&r.parseArrays)a=[].concat(o);else{a=r.plainObjects?Object.create(null):{};var s="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,u=parseInt(s,10);r.parseArrays||""!==s?!isNaN(u)&&c!==s&&String(u)===s&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(a=[],a[u]=o):a[s]=o:a={0:o}}o=a}return o},d=function(e,t,r,n){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,l=r.depth>0&&a.exec(i),s=l?i.slice(0,l.index):i,u=[];if(s){if(!r.plainObjects&&o.call(Object.prototype,s)&&!r.allowPrototypes)return;u.push(s)}var f=0;while(r.depth>0&&null!==(l=c.exec(i))&&f<r.depth){if(f+=1,!r.plainObjects&&o.call(Object.prototype,l[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(l[1])}return l&&u.push("["+i.slice(l.index)+"]"),p(u,t,r,n)}},y=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}};e.exports=function(e,t){var r=y(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?f(e,r):e,i=r.plainObjects?Object.create(null):{},a=Object.keys(o),c=0;c<a.length;++c){var l=a[c],s=d(l,o[l],r,"string"===typeof e);i=n.merge(i,s,r)}return n.compact(i)}},b311:function(e,t,r){
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(t,r){e.exports=r()})(0,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){function r(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var r=e.hasAttribute("readonly");r||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),r||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var n=window.getSelection(),o=document.createRange();o.selectNodeContents(e),n.removeAllRanges(),n.addRange(o),t=n.toString()}return t}e.exports=r},function(e,t){function r(){}r.prototype={on:function(e,t,r){var n=this.e||(this.e={});return(n[e]||(n[e]=[])).push({fn:t,ctx:r}),this},once:function(e,t,r){var n=this;function o(){n.off(e,o),t.apply(r,arguments)}return o._=t,this.on(e,o,r)},emit:function(e){var t=[].slice.call(arguments,1),r=((this.e||(this.e={}))[e]||[]).slice(),n=0,o=r.length;for(n;n<o;n++)r[n].fn.apply(r[n].ctx,t);return this},off:function(e,t){var r=this.e||(this.e={}),n=r[e],o=[];if(n&&t)for(var i=0,a=n.length;i<a;i++)n[i].fn!==t&&n[i].fn._!==t&&o.push(n[i]);return o.length?r[e]=o:delete r[e],this}},e.exports=r,e.exports.TinyEmitter=r},function(e,t,r){var n=r(3),o=r(4);function i(e,t,r){if(!e&&!t&&!r)throw new Error("Missing required arguments");if(!n.string(t))throw new TypeError("Second argument must be a String");if(!n.fn(r))throw new TypeError("Third argument must be a Function");if(n.node(e))return a(e,t,r);if(n.nodeList(e))return c(e,t,r);if(n.string(e))return l(e,t,r);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function a(e,t,r){return e.addEventListener(t,r),{destroy:function(){e.removeEventListener(t,r)}}}function c(e,t,r){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,r)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,r)}))}}}function l(e,t,r){return o(document.body,e,t,r)}e.exports=i},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var r=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===r||"[object HTMLCollection]"===r)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"===typeof e||e instanceof String},t.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},function(e,t,r){var n=r(5);function o(e,t,r,n,o){var i=a.apply(this,arguments);return e.addEventListener(r,i,o),{destroy:function(){e.removeEventListener(r,i,o)}}}function i(e,t,r,n,i){return"function"===typeof e.addEventListener?o.apply(null,arguments):"function"===typeof r?o.bind(null,document).apply(null,arguments):("string"===typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return o(e,t,r,n,i)})))}function a(e,t,r,o){return function(r){r.delegateTarget=n(r.target,t),r.delegateTarget&&o.call(e,r)}}e.exports=i},function(e,t){var r=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}function o(e,t){while(e&&e.nodeType!==r){if("function"===typeof e.matches&&e.matches(t))return e;e=e.parentNode}}e.exports=o},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var l=function(){function e(t){c(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var r=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=r+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=o()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=o()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"===typeof e?"undefined":i(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}(),s=l,u=r(1),f=r.n(u),p=r(2),d=r.n(p),y="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function v(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var g=function(e){function t(e,r){m(this,t);var n=b(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.resolveOptions(r),n.listenClick(e),n}return v(t,e),h(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof e.action?e.action:this.defaultAction,this.target="function"===typeof e.target?e.target:this.defaultTarget,this.text="function"===typeof e.text?e.text:this.defaultText,this.container="object"===y(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=d()(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return w("action",e)}},{key:"defaultTarget",value:function(e){var t=w("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return w("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"===typeof e?[e]:e,r=!!document.queryCommandSupported;return t.forEach((function(e){r=r&&!!document.queryCommandSupported(e)})),r}}]),t}(f.a);function w(e,t){var r="data-clipboard-"+e;if(t.hasAttribute(r))return t.getAttribute(r)}t["default"]=g}])["default"]}))},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i=r("d233"),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=i.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},a)},bb8e:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tx-dx-turnlist overall_background_color"},[r("van-nav-bar",{staticClass:"fbpl",attrs:{title:"转盘列表","left-text":"返回","left-arrow":""},on:{"click-left":e.onClickLeft}}),r("div",{staticClass:"switchover"},[r("span",{on:{click:function(t){return e.switchover(1)}}},[e._v(" 转盘 ")]),r("span",{on:{click:function(t){return e.switchover(0)}}},[e._v(" 赚吧 ")])]),e.zborzp?r("div",{staticClass:"turnlist-box"},[r("ul",e._l(e.list,(function(t){return r("li",{key:t.id,staticClass:"light_colour",on:{click:function(r){return e.go(t)}}},[r("p",{staticClass:"title"},[e._v(e._s(t.title))]),r("p",{staticClass:"money"},[e._v("总金额："+e._s(t.money))]),r("p",{staticClass:"now_money"},[e._v("累计用户投入："+e._s(t.now_money))]),r("p",{staticClass:"draw_money"},[e._v("已提取金额："+e._s(t.draw_money))]),r("p",{staticClass:"open_time"},[e._v("开盘时间："+e._s(t.open_time))]),r("van-icon",{staticClass:"arrow",attrs:{name:"arrow"}})],1)})),0)]):e._e()],1)},o=[],i=(r("99af"),r("4328"),r("a813")),a=r("be3b"),c=(r("b311"),{data:function(){return{zborzp:!0,message:null,list:[]}},created:function(){},mounted:function(){this.firstAPI()},methods:{switchover:function(e){this.zborzp=!!e},go:function(e){var t=parseInt((new Date).getTime()/1e3),r=parseInt(new Date(e.open_time).getTime()/1e3);r>t?this.$toast("未到开盘时间"):this.$router.push("turntables?".concat(e.id))},onClickLeft:function(){this.$router.go(-1)},firstAPI:function(){var e=this,t=e.$toast.loading({duration:0,forbidClick:!0});a["a"].post("".concat(i["b"],"/turntable/list")).then((function(r){var n=r.data,o=n.info,i=n.status,a=n.message;e.pageshow=!0,t.clear(),1===i?e.list=[].concat(o):(e.empty=!0,e.emptyText=a)}))}}}),l=c,s=(r("81c3"),r("2877")),u=Object(s["a"])(l,n,o,!1,null,null,null);t["default"]=u.exports},bc6e:function(e,t,r){},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)"undefined"!==typeof r[i]&&n.push(r[i]);t.obj[t.prop]=n}}},c=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},l=function e(t,r,i){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var a=t;return o(t)&&!o(r)&&(a=c(t,i)),o(t)&&o(r)?(r.forEach((function(r,o){if(n.call(t,o)){var a=t[o];a&&"object"===typeof a&&r&&"object"===typeof r?t[o]=e(a,r,i):t.push(r)}else t[o]=r})),t):Object.keys(r).reduce((function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t}),a)},s=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},u=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},f=function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var o="",a=0;a<n.length;++a){var c=n.charCodeAt(a);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?o+=n.charAt(a):c<128?o+=i[c]:c<2048?o+=i[192|c>>6]+i[128|63&c]:c<55296||c>=57344?o+=i[224|c>>12]+i[128|c>>6&63]+i[128|63&c]:(a+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(a)),o+=i[240|c>>18]+i[128|c>>12&63]+i[128|c>>6&63]+i[128|63&c])}return o},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],c=Object.keys(i),l=0;l<c.length;++l){var s=c[l],u=i[s];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:i,prop:s}),r.push(u))}return a(t),e},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},y=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},h=function(e,t){return[].concat(e,t)},m=function(e,t){if(o(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:c,assign:s,combine:h,compact:p,decode:u,encode:f,isBuffer:y,isRegExp:d,maybeMap:m,merge:l}}}]);