import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { apiDomain } from '@/tool/path'
import axios from '@/tool/axios'

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
Vue.use(Vuex)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/home',
    name: 'Homecopy',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/myfriend',
    name: 'myfriend',//3
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myfriend" */ '../views/myfriend.vue')
  },
  {
    path: '/myFriendList',
    name: 'myFriendList',//2
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myFriendList" */ '../views/myFriendList.vue')
  },
  {
    path: '/myTeam',
    name: 'myTeam',//1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myTeam" */ '../views/myTeam.vue')
  },
  {
    path: '/payment',
    name: 'payment',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "payment" */ '../views/payment.vue')
  },
  {
    //登陆
    path: '/login',
    name: 'login',
    // meta: { wxt: true },
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    //找回密码
    path: '/wjmm',
    name: 'wjmm',
    meta: { wxt: true },
    component: () => import(/* webpackChunkName: "wjmm" */ '../views/wjmm.vue')
  },
  {
    //注册
    path: '/register',
    name: 'register',
    // meta: { wxt: true },
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
  },
  // {
  //   //销售
  //   path: '/plan',
  //   name: 'plan', // 1
  //   meta: { requiresAuth: true, wxt: true },
  //   component: () => import(/* webpackChunkName: "plan" */ '../views/plan.vue')
  // },
  {
    //收款人
    path: '/toPay',
    name: 'toPay', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "toPay" */ '../views/toPay.vue')
  },
  {
    //代理分歧款支付
    // 未打款按钮进来页面
    path: '/payOnline',
    name: 'payOnline', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "payOnline" */ '../views/payOnline.vue')
  },

  {
    //我的
    path: '/me',
    name: 'me', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "me" */ '../views/me.vue')
  },
  {
    // 实名认证
    path: '/userInfo',
    name: 'userInfo', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "userInfo" */ '../views/userInfo.vue')
  },
  {
    //联系我们
    path: '/contactus',
    name: 'contactus', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "contactus" */ '../views/contactus.vue')
  },
  {
    //付款列表
    path: '/paylist',
    name: 'paylist', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "paylist" */ '../views/paylist.vue')
  },
  {
    //收款列表
    path: '/collist',
    name: 'collist', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "collist" */ '../views/collist.vue')
  },
  {
    //付款信息
    path: '/payInfo',
    name: 'payInfo', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "payInfo" */ '../views/payInfo.vue')
  },
  {
    //相互帮助
    path: '/help',
    name: 'help', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "help" */ '../views/help.vue')
  },
  {
    //互帮系统——说明
    path: '/helpdetails/:id',
    name: 'helpdetails', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "helpdetails" */ '../views/helpdetails.vue')
  },
  {
    //详情
    path: '/helpdetaild/:id',
    name: 'helpdetaild', // 1
    // meta: { requiresAuth: true, wxt: true },
    // meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "helpdetaild" */ '../views/helpdetaild.vue')
  },
  {
    //同心台
    path: '/too',
    name: 'too', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "too" */ '../views/too.vue')
  },
  {
    //我的消息
    path: '/myMessage',
    name: 'myMessage', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myMessage" */ '../views/myMessage.vue')
  },
  {
    //付款信息
    path: '/payInfod',
    name: 'payInfod', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "payInfod" */ '../views/payInfod.vue')
  }
  // 康养帮详情
  ,
  {
    // 康养帮详情
    path: '/helpDetail',
    name: 'helpDetail', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "helpDetail" */ '../views/helpdetail.vue')
  }
  // 康养帮详情
  ,
  {
    //互帮申请
    path: '/helpApply',
    name: 'helpApply', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "helpApply" */ '../views/helpApply.vue')
  }
  ,
  {
    //紧急帮申请
    path: '/urgency',
    name: 'urgency', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "urgency" */ '../views/urgency.vue')
  }
  // 康养帮中心
  ,
  {
    path: '/helpCenter',
    name: 'helpCenter', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "helpCenter" */ '../views/helpCenter.vue')
  }
  // 金额
  ,
  {
    //我的互助计划
    path: '/myplanlist',
    name: 'myplanlist', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myplanlist" */ '../views/myplanlist.vue')
  }
  // 充值
  ,
  {
    //充值
    path: '/recharge',
    name: 'recharge', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "recharge" */ '../views/recharge.vue')
  }
  // 报案
  ,
  {
    //互助计划
    path: '/applyhelp',
    name: 'applyhelp', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "applyhelp" */ '../views/applyhelp.vue')
  }
  // 城市监督员
  ,
  {
    //城市监督员
    path: '/citySuper',
    name: 'citySuper', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "citySuper" */ '../views/citySuper.vue')
  }
  // 绑定银行卡
  ,
  {
    //绑定银行卡
    path: '/bindCard',
    name: 'bindCard', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "bindCard" */ '../views/bindCard.vue')
  }
  // 绑定支付宝
  ,
  {
    //绑定支付宝
    path: '/bindAlipay',
    name: 'bindAlipay', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "bindAlipay" */ '../views/bindAlipay.vue')
  },
  {
    //绑定微信
    path: '/bindWeChat',
    name: 'bindWeChat', // 1
    meta: { wxt: true },
    component: () => import(/* webpackChunkName: "bindWeChat" */ '../views/bindWeChat.vue')
  },
  {
    // 会员提现
    path: '/memWal/:id',
    name: 'memWal', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "memWal" */ '../views/memWal.vue')
  }

  ,
  {
    //空白
    path: '/paystatus',
    name: 'paystatus', // 1
    meta: { wxt: true },
    component: () => import(/* webpackChunkName: "paystatus" */ '../views/paystatus.vue')
  },
  {
    //互助公示
    path: '/publicitylist',
    name: 'publicitylist', // 1
    // meta: { requiresAuth: true, wxt: true },
    // meta: { requiresAuth: true},
    component: () => import(/* webpackChunkName: "publicitylist" */ '../views/publicitylist.vue')
  },
  {
    //我的收益
    path: '/myEarn',
    name: 'myEarn', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myEarn" */ '../views/myEarn.vue')
  },
  {
    //推广积分
    path: '/myPoints',
    name: 'myPoints', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myPoints" */ '../views/myPoints.vue')
  },
  {
    path: '/myPointstwo',
    name: 'myPointstwo', // 原始积分
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "myPointstwo" */ '../views/myPointstwo.vue')
  },
  {
    path: '/withdraw',
    name: 'withdraw', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "withdraw" */ '../views/withdraw.vue')
  },
  {
    path: '/wxtransfer',
    name: 'wxtransfer', // 1
    // meta: { wxt: true },
    component: () => import(/* webpackChunkName: "wxtransfer" */ '../views/wxtransfer.vue')
  },
  {
    //医护帮公约
    //21-5-20修改，点开协议后，返回之前输入的不应该清空
    //加两个动态路由进去/:sess_name?/:sess_carid?
    /**
     * 
     */
    path: '/convention',
    name: 'convention', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "convention" */ '../views/convention.vue')
  },
  {
    //终互帮公约
    //21-5-20修改，点开协议后，返回之前输入的不应该清空
    //加两个动态路由进去
    //修改，不让写在路由中:sess_name?/:sess_carid?
    path: '/endHelp',
    name: 'endHelp', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "endHelp" */ '../views/endHelp.vue')
  },
  {
    //老人互帮公约
    path: '/oldHelp',
    name: 'oldHelp', // 1
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "oldHelp" */ '../views/oldHelp.vue')
  },
  {
    //教学
    path: '/teaching/:id',
    name: 'teaching',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "teaching" */ '../views/teaching.vue')
  },
  {
    //视频详情页面
    path: '/video/:id',
    name: 'video',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/* webpackChunkName: "video" */ '../views/video.vue')
  },
  {
    //下载页面
    path: '/download',
    name: 'download',
    meta: { wxt: true },
    component: () => import(/* webpackChunkName: "download" */ '../views/download.vue')
  },
  {
    //隐私协议
    path: '/privacy',
    name: 'privacy',
    meta: { wxt: true },
    component: () => import(/* webpackChunkName: "privacy" */ '../views/privacy.vue')
  },
  {
    // 商品详情
    path: '/goods/:type/:id',
    name: 'goods',
    // meta: { requiresAuth: true },
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "goods" */ '../views/goods.vue')
  },
  {
    // 合伙人告知
    path: '/notice',
    name: 'notice',
    // meta: { requiresAuth: true },
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "notice" */ '../views/notice.vue')
  },
  {
    // 明细
    path: '/detail',
    name: 'detail',
    // meta: { requiresAuth: true },
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "detail" */ '../views/detail.vue')
  },
  {
    // 字体图标展示
    path: '/iconsss',
    name: 'iconsss',
    // meta: { requiresAuth: true },
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "iconsss" */ '../views/iconsss.vue')
  },
  {
    path: '/addresses',
    name: 'addresses',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "addresses" */ '../views/addresses.vue')
  },
  {
    //聊天系统
    path: '/chat',
    name: 'chat',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "chat" */ '../views/chat.vue')
  },
  {
    //历史记录
    path: '/history/:type_id',
    name: 'history',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "history" */ '../views/history.vue')
  },
  {
    //爱心积分
    path: '/loveprofit',
    name: 'loveprofit',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "loveprofit" */ '../views/loveprofit.vue')
  },
  {
    //电销详细
    path: '/salesDetailed',
    name: 'salesDetailed',
    meta: { requiresAuth: true, wxt: true },
    component: () => import(/*webpackChunkName: "salesDetailed" */ '../views/salesDetailed.vue')
  }

];
const router = new VueRouter({
  // mode:'hash',//打包APK的时候才用到
  routes
})
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/weibo/i) == "weibo") {
    return true;
    // return false;
  } else {
    return false;
  }
};
router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/dx/') != -1 && to.fullPath.indexOf('?') == -1) {
    // window.location.href = to.fullPath;
    console.log(to, 'to');
    console.log(to.fullPath, 'to.fullPath');
    let url = window.location.href; //获取网址的hash值
    let site = url.split('=')[1];//获取=后面的
    let _site = site.replace(/%2F/g, '/');//替换字符串
    console.log(url, 'url');
    console.log(site, 'site=等号后面的');
    console.log(_site, '替换字符串后');
    console.log(_site, '_site');
    // let _siteT = _site.substr(1);//删除第一个
    /**
     * 这里错了
     * 不是多了个/
     * 而是少了一个#
     */
    // window.location.href = `${window.location.protocol}//${window.location.host}/dx/${_siteT}`;//地址跳转
    console.log(`${_site.slice(0, 4)} + '#/' + ${_site.slice(4)}`, '修改后的');
    window.location.href = `${_site.slice(0, 4)}` + '#/' + `${_site.slice(4)}`
    return;
  } else if (to.matched.some(record => record.meta.wxt) && is_weixn()) {

    next({
      path: '/wxtransfer',
      query: { redirect2: to.fullPath, f: 'pps' }
      // query: { redirect: to.fullPath, f: 'pps' }
    });
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    axios.get(`${apiDomain}/islogin`)
      .then((res) => {
        let { data } = res
        if (data.status === 1) {
          sessionStorage.setItem("open_academy", data.info.open_academy);//商学院——存在/移除
          sessionStorage.setItem("recommender_name", data.info.parent.username);//紧急帮——推荐人——姓名
          sessionStorage.setItem("recommender_phone", data.info.parent.mobile);//紧急帮——推荐人——电话
          sessionStorage.setItem("chat_url", data.info.chat_url);//聊天地址
          sessionStorage.setItem("upgrade_amount", data.info.upgrade_amount);//销售余额
          sessionStorage.setItem("extent_point", data.info.extent_point);//推广积分
          // sessionStorage.setItem("msg", data.info.msg);//msg
          sessionStorage.setItem("user_id", data.info.user_id);//user_id
          sessionStorage.setItem("title", data.info.title);
          sessionStorage.setItem("name", data.info.name || '我的好友');
          sessionStorage.setItem("mobile", data.info.mobile);
          sessionStorage.setItem("is_certification", data.info.is_certification);
          sessionStorage.setItem("card_id", data.info.card_id);
          sessionStorage.setItem("available_amount", data.info.available_amount);
          sessionStorage.setItem("id", data.info.id);
          sessionStorage.setItem('icon_url', data.info.icon_url);
          if (data.info.msg) {
            sessionStorage.setItem("msg", data.info.msg);//msg
          } else {
            //删除一条键值对缓存
            sessionStorage.removeItem("msg");
          }
          next()
        } else {
          sessionStorage.setItem("open_academy", '');//商学院——存在/移除
          sessionStorage.setItem("name", '');
          sessionStorage.setItem("title", '');
          sessionStorage.setItem("mobile", '');
          sessionStorage.setItem("is_certification", '');
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      }).catch((err) => {
        this.$toast('登录异常，请重新登录')
        sessionStorage.setItem("open_academy", '');//商学院——存在/移除
        sessionStorage.setItem("name", '');
        sessionStorage.setItem("title", '');
        sessionStorage.setItem("mobile", '');
        sessionStorage.setItem("is_certification", '');
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      })

  } else if (!is_weixn() && to.query.f === 'pps') {
    next(to.query.redirect2)
  } else {
    next()
  }
})

export default router
