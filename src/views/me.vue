<template>
  <div class="me-wrapper">
    <div class="me-top">
      <div class="me-header">
        <div class="me-header-left logo">
          <img :src="icon_url" alt="" />
        </div>
        <div class="me-header-right">
          <p>{{ username }}</p>
          <p>{{ title }}</p>
        </div>
        <!-- <div class="qwidt">
        <van-button color="#fff" plain type="primary" @click="goldFn"
          >原始积分</van-button
        >
      </div> -->
      </div>
      <div class="control">
        <div @click="toMemWal(0)">
          <p>{{ upgrade_amount == "undefined" ? 0 : upgrade_amount }}</p>
          <button>销售余额</button>
        </div>
        <div @click="toMemWal(1)">
          <p>{{ extent_point == "undefined" ? 0 : extent_point }}</p>
          <button>推广积分</button>
        </div>
      </div>
    </div>
    <div class="per-order">
      <div class="hed">
        <div>我的订单</div>
        <span @click="goToRoders(0)">查看全部<van-icon name="arrow" /></span>
      </div>
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          icon="completed"
          text="已完成"
          badge=""
          @click="goToRoders(1)"
        />
        <van-grid-item
          icon="pending-payment"
          text="待付款"
          badge=""
          @click="goToRoders(2)"
        />
        <van-grid-item
          icon="underway-o"
          text="待发货"
          badge=""
          @click="goToRoders(3)"
        />
        <van-grid-item
          icon="logistics"
          text="待收货"
          badge=""
          @click="goToRoders(4)"
        />
        <van-grid-item
          icon="thumb-circle-o"
          text="待评价"
          badge=""
          @click="goToRoders(5)"
        />
      </van-grid>
    </div>
    <div class="per-list">
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          icon="cash-back-record"
          text="我的钱包"
          @click="show = !show"
        />
        <van-grid-item icon="balance-pay" text="优惠券" @click="couponcl" />
        <!-- cart-circle-o -->
        <van-grid-item
          icon="balance-pay"
          text="消费积分"
          @click="goGiftCARDS"
        />
        <van-grid-item icon="like-o" text="爱心积分" to="loveprofit" />
        <van-grid-item icon="location-o" text="收货地址" @click="addressescl" />
        <van-grid-item icon="bag-o" text="我的拼单" @click="bagocal" />
        <!-- <van-grid-item icon="setting-o" text="设置" /> -->

        <van-grid-item icon="chat-o" text="互帮中心" to="helpCenter" />
        <van-grid-item icon="user-o" text="实名认证" to="userInfo" />
        <van-grid-item
          icon="balance-list-o"
          text="绑定支付"
          @click="bd = !bd"
        />
        <!-- <van-grid-item icon="idcard" text="绑定银行卡" to="bindCard" />
        <van-grid-item icon="alipay" text="绑定支付宝" to="bindAlipay" />
        <van-grid-item icon="wechat" text="绑定微信" to="bindWeChat" /> -->

        <!-- <van-grid-item
          icon="balance-pay"
          text="我的钱包"
          @click="toBalancelog"
        /> -->
        <!-- <van-grid-item icon="friends-o" text="我的好友" /> -->
      </van-grid>
    </div>
    <div class="me-list">
      <!-- <van-cell icon="user-o" title="实名认证" is-link to="userInfo" />
      <van-cell icon="idcard" title="绑定银行卡" is-link to="bindCard" />
      <van-cell icon="alipay" title="绑定支付宝" is-link to="bindAlipay" />
      <van-cell icon="wechat" title="绑定微信" is-link to="bindWeChat" /> -->
      <!-- <van-cell
        icon="cash-back-record"
        title="我的收益"
        is-link
        @click="myEarnCl"
      /> -->
      <van-cell icon="friends-o" title="我的好友" is-link to="myfriend" />
      <!-- <van-cell icon="chat-o" title="互帮中心" is-link to="helpCenter" /> -->
      <van-cell
        icon="comment-circle-o"
        title="联系我们"
        is-link
        to="contactus"
      />
      <!-- <van-cell icon="gold-coin-o" title="收款方式" is-link  to="payment"/> -->
      <!-- <van-cell icon="orders-o" title="付款列表" is-link to="paylist"/>隐藏 -->
      <!-- <van-cell icon="orders-o" title="收款列表" is-link to="collist"/> -->
      <!--21-5-8修改，暂时取消销售加盟商-->
      <!-- <van-cell icon="friends-o" title="消费代理商" is-link to="myTeam" /> -->
      <!-- <van-cell icon="phone-circle-o" title="客服聊天" is-link to="chat" /> --><!--废弃-->

      <van-cell
        icon="phone-circle-o"
        title="客服聊天"
        is-link
        @click="urlBtn"
      />
      <van-cell icon="location-o" title="收货地址" is-link to="addresses" />
      <van-cell
        class="fzwx"
        icon="phone-circle-o"
        title="电商客服：18011680349（微信同步）"
        is-link
        @click="wx"
      />
    </div>
    <div class="exit-btn" @click="logout">退出登录</div>
    <Footer :isActive="isActive" @click="onhrefFn" />
    <!-- 我的钱包 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <!-- 绑定支付 -->
    <van-action-sheet
      v-model="bd"
      :actions="bds"
      cancel-text="取消"
      close-on-click-action
      @select="onbd"
    />
    <popup></popup>
    <!-- <p class="records" @click="referenceBtn">蜀ICP备20018437号-1</p> -->
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
import qs from "qs";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      isActive: 4,
      pageshow: false,
      show: false,
      actions: [
        { name: "销售提现", id: 1, url: "memWal" },
        { name: "互帮提现", id: 2, url: "memWal" },
        { name: "电销提现", id: 3, url: "memWal" },
      ],
      bd: false,
      bds: [
        { name: "绑定银行卡", id: 1, url: "memWal" },
        { name: "绑定支付宝", id: 2, url: "memWal" },
        { name: "绑定微信", id: 3, url: "memWal" },
      ],
      username: sessionStorage.getItem("name"),
      title: sessionStorage.getItem("title"),
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      icon_url: sessionStorage.getItem("icon_url")
        ? `${sessionStorage.getItem("icon_url")}`
        : "../assets/img/logo.png",
      extent_point: sessionStorage.getItem("extent_point") || 0, //推广积分
      upgrade_amount: sessionStorage.getItem("upgrade_amount") || 0, //销售余额
      url: "", //获取网址的hash值
    };
  },
  components: {
    Footer,
    popup,
  },
  mounted() {
    console.log(this.extent_point);
    console.log(this.upgrade_amount);
  },
  created() {
    let _url = window.location.href.replace(/#/, "dx/#");
    this.url = _url.replace(/me/, "");

    const toast1 = this.$toast.loading({
      duration: 0,
      forbidClick: true,
    });
    axios.post(`${this.apiUrl}/balance`).then((res) => {
      toast1.clear();
      let { data } = res;
      let { status, info, message } = data;
      console.log(res);
      if (status === 1) {
        this.money = info.money;
      } else {
        this.$toast(`${message}`);
      }
    });
  },
  computed: {},
  methods: {
    //唤起微信
    wx() {
      let that = this;
      that.$nextTick(() => {
        let clipboardUrl = new ClipboardJS(".fzwx", {
          text: function () {
            return 18011680349;
          },
        });
        clipboardUrl.on("success", function (e) {
          that.$toast({
            message: "复制成功",
            forbidClick: true,
          });
          e.clearSelection();
          clipboardUrl.destroy();
          window.location.href = "weixin://";
        });
        clipboardUrl.on("error", function (e) {
          that.$toast({
            message: "该浏览器不支持自动复制",
            forbidClick: true,
          });
          clipboardUrl.destroy();
          window.location.href = "weixin://";
        });
      });
    },
    //备案号
    // referenceBtn() {
    //   window.location.href = "https://beian.miit.gov.cn/#/home";
    // },
    //跳转客服
    urlBtn() {
      window.location.href = sessionStorage.getItem("chat_url");
    },
    //收货地址
    shdz() {
      console.log("收货地址");
    },
    //原始积分
    // goldFn() {
    //   this.$router.push({
    //     name: "myPointstwo",
    //   });
    // },
    toMemWal(n) {
      if (n === 0) {
        this.$router.push("memWal/1");
      } else if (n === 1) {
        this.$router.push("myPoints");
      }
    },
    //我的钱包————余额
    // toBalancelog() {
    //   window.location.href = `${this.url}balancelog`;
    // },
    //我的订单
    goToRoders(n) {
      // this.$router.push({
      //   name: "orders",
      //   params: { type: n },
      // });
      // console.log(`${this.url}orders/${n}`);
      window.location.href = `${this.url}orders/${n}`;
    },
    //代金卷
    couponcl() {
      // this.$router.push({
      //   name: "coupon",
      // });
      window.location.href = `${this.url}coupon`;
    },
    // 购物卡
    goGiftCARDS() {
      window.location.href = `${this.url}GiftCARDS`;
    },
    //收货地址
    addressescl() {
      // this.$router.push({
      //   name: "addresses",
      // });
      window.location.href = `${this.url}addresses`;
    },
    //我的拼单
    bagocal() {
      // this.$router.push({
      //   name: "makelist",
      // });
      window.location.href = `${this.url}makelist`;
    },
    onhrefFn(n) {
      this.$router.push(n.url);
    },
    //我的钱包
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // if (item.id === 3) {
      //   this.show = false;
      //   window.location.href = `${this.url}balancelog`;
      // } else {
      //   this.$router.push({
      //     name: item.url,
      //     params: { id: item.id },
      //   });
      // }
      this.$router.push({
          name: item.url,
          params: { id: item.id },
        });
      this.show = false;
    },
    // 绑定支付
    onbd(item) {
      this.show = false;
      if (item.id === 1) {
        this.$router.push({
          name: "bindCard",
        });
        return;
      }
      if (item.id === 2) {
        this.$router.push({
          name: "bindAlipay",
        });
        return;
      }
      if (item.id === 3) {
        this.$router.push({
          name: "bindWeChat",
        });
        return;
      }
    },
    myEarnCl() {
      this.show = !this.show;
    },
    logout: function () {
      const exit1 = this.$dialog
        .confirm({
          message: "是否确认退出登陆！",
        })
        .then(() => {
          // on confirm
          const load1 = this.$toast.loading({
            message: "退出中...",
            forbidClick: true,
            loadingType: "spinner",
          });
          axios.get(`${this.apiUrl}/logout`).then((res) => {
            load1.clear();
            this.$router.replace({ path: "/login" });
          });
          // exit1.close();
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.me-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  // background: #fbbb5f;
  // background-clip: #f4f4f4;
  .me-top {
    padding-bottom: 0.6rem;
    // background-color: #fbbb5f;
    background: url("../assets/img/1.jpg");
    .me-header {
      padding: 0.24rem;
      overflow: hidden;
      .qwidt {
        display: flex;
        flex-direction: column;
        float: right;
        margin-top: 0.16rem;
        button {
          width: 1.8rem;
          padding: 0;
          height: 34px;
          margin-top: 0.3rem;
          border-radius: 5px;
          background: #fb932b;
          border: 0;
          color: #fff;
          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
    .me-header-left {
      float: left;
      width: 1rem;
      height: 1rem;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 0.1rem;
      & > img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .me-header-right {
      float: left;
      display: flex;
      align-content: center;
      flex-direction: column;
      margin-left: 0.24rem;
      text-align: left;
      height: 1rem;
      justify-content: center;
      p:nth-child(1) {
        color: #1d1207;
        font-size: 0.28rem;
      }
      p:nth-child(2) {
        color: #736352;
        font-size: 0.24rem;
      }
    }
    //21-6-16修改

    .control {
      position: absolute;
      left: 5%;
      width: 90%;
      // margin: 0 auto;
      padding: 0.2rem;
      font-size: 0.28rem;
      // background-color: #ffd6ae;
      // background-color: #fcfcfc;
      background-color: #fff;
      // border-radius: 8px 8px 0 0;
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      button {
        background-color: transparent;
      }
      & > button {
        // padding: 0 0.2rem;
      }
      & > div {
        // color: #fb932b;
        padding: 0 0.2rem;
        & > button {
          color: #646566;
        }
        & > p {
          font-size: 0.4rem;
          font-weight: bold;
          // color: #f41c05;
          color: #f04d3b;
        }
      }
    }
  }
  //我的订单
  .per-order {
    margin-top: 0.98rem;
    background: #fff;
    // background: #6b431c;
    // color: #fff;
    padding: 12px 12px 0 12px;
    .hed {
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        color: #999;
        font-size: 14px;
        display: flex;
        align-items: center;
      }
    }
    .van-grid-item__content {
      background-color: transparent;
      padding: 16px 0;
      // color: #9c9c9c;
      // color: #fff;
      color: #fb932b;
    }
    .van-grid-item__text {
      color: #000;
      // color: #9c9c9c;
      // color: #fff;
    }
  }
  //代金卷一栏
  .per-list {
    margin-top: 8px;
    background: #fff;
    // background: #6b431c;
    // color: #fff;
    .van-grid-item__content {
      padding: 16px 0;
      // color: rgba(250, 133, 70, 1);
      // color: #9c9c9c;
      // background: #6b431c;
      // color: #fff;
      color: #fb932b;
    }
    .van-grid-item__text {
      color: #58595b;
      color: #000;
      // color: #9c9c9c;
      // background: #6b431c;
      // color: #fff;
    }
  }
  .me-list {
    margin-top: 8px;
    .van-cell {
      // background: #6b431c;
      // color: #fff;
      padding: 0.24rem;
      i:nth-child(1) {
        // color: #7489ac;
        color: #fb932b;
      }
      i.van-icon-arrow {
        // color: #ff8c19;
        // color: #9c9c9c;
        color: #fb932b;
      }
    }
    .van-cell__title {
      text-align: left;
      font-size: 0.28rem;
    }
  }
  //推出登录
  .exit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.6rem;
    font-size: 0.28rem;
    width: 40%;
    background-color: #fb932b;
    color: #fff;
    border-radius: 5px;
    margin: 0.5rem auto;
    border: 0;
  }
  .navbar {
    background: #a55709;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-nav-bar__left {
      i {
        color: #fff;
      }
    }
  }
  .topay-list {
    margin: 0 0.2rem;
    li {
      background: rgba(44, 49, 98);
      border-radius: 5px;
      padding: 0.1rem;
      margin-bottom: 0.2rem;
      color: #7489ac;
      position: relative;
      p {
        height: 0.26rem;
        line-height: 0.26rem;
        text-align: left;
        span.payment-money {
          color: #35bffd;
        }
      }
      .topay-bt {
        position: absolute;
        right: 0.1rem;
        bottom: 0.1rem;
        background: #35bffd;
        padding: 5px 10px;
        border-radius: 5px;
        color: #fff;
        line-height: 1;
      }
    }
  }
  .van-tabs__nav--card {
    border: 1px solid #ff8c19;
    background: transparent;
  }
  .van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #ff8c19;
    color: #252d41;
  }
  .van-tabs__nav--card .van-tab {
    color: #7b4004;
    border: 0;
  }
  .plan-1-list {
    margin-top: 0.2rem;
    .bt-input {
      width: 82%;
      margin: 0 auto 0.1rem;
      background-color: #7d5227;
      border-radius: 5px;
      display: flex;
      padding: 0.1rem;

      justify-content: space-between;
      border: 0;
      .van-cell__title {
        color: #7489ac;
        text-align: left;
      }
      .van-field__control {
        color: #35bffd;
        font-size: 0.14rem;
      }
      input::-webkit-input-placeholder {
        color: #35bffd;
      }
      .right-sj {
        color: #35bffd;
      }
    }
    .lv-input {
      width: 82%;
      margin: 0 auto;
      background-color: #7d5227;
      border-radius: 5px;
      display: flex;
      padding: 0.1rem;
      justify-content: space-between;
      .van-cell__value {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .custom-title {
        color: #7489ac;
      }
      .content {
        color: #35bffd;
        display: flex;
        align-items: center;
        img {
          margin-left: 0.1rem;
        }
      }
      .van-field__control {
        color: #35bffd;
      }
      .right-sj {
        color: #35bffd;
      }
      .right-icon {
        width: 0.2rem;
      }
    }
  }
  .plan-3-list {
    overflow: hidden;
    > p {
      padding-left: 0.1rem;
      margin-top: 0.2rem;
      color: #020202;
      font-size: 0.14rem;
      text-align: left;
    }
    .list-box {
      margin: 0.1rem 10px;
      background-color: #7d5227;
      border-radius: 5px;
      padding: 0.1rem;
      color: #abbddb;
      .item {
        display: flex;
        align-items: center;
        font-size: 0.14rem;
        margin-bottom: 0.15rem;
        &:last-child {
          margin-bottom: 0;
        }
        .left {
          margin-right: 0.1rem;
        }
        .center {
          flex: 1;
          .van-progress {
            background: transparent;
            border: 1px solid #ff8c19;
            border-radius: 1px;
            .van-progress__portion {
              background: #ff8c19;
              border-radius: 1px;
            }
          }
        }
        .right {
          width: 1rem;
          text-align: left;
          padding-left: 0.1rem;
          color: #35bffd;
        }
      }
    }
  }
  .records {
    position: absolute;
    // bottom: 1rem;
    width: 100%;
    text-align: center;
    font-size: 0.24rem;
  }
}
</style>