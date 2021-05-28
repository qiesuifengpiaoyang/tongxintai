<template>
  <div class="me-wrapper">
    <div class="me-header">
      <div class="me-header-left logo"></div>
      <div class="me-header-right">
        <p>{{ username }}</p>
        <p>{{ title }}</p>
      </div>
      <div class="qwidt">
        <van-button color="#fff" plain type="primary" @click="goldFn"
          >原始积分</van-button
        >
      </div>
    </div>
    <div class="me-list">
      <van-cell icon="user-o" title="实名认证" is-link to="userInfo" />
      <van-cell icon="idcard" title="绑定银行卡" is-link to="bindCard" />
      <van-cell icon="alipay" title="绑定支付宝" is-link to="bindAlipay" />
      <van-cell icon="wechat" title="绑定微信" is-link to="bindWeChat" />
      <van-cell
        icon="cash-back-record"
        title="我的收益"
        is-link
        @click="myEarnCl"
      />
      <!-- <van-cell icon="gold-coin-o" title="收款方式" is-link  to="payment"/> -->
      <!-- <van-cell icon="orders-o" title="付款列表" is-link to="paylist"/>隐藏 -->
      <!-- <van-cell icon="orders-o" title="收款列表" is-link to="collist"/> -->
      <van-cell icon="friends-o" title="我的好友" is-link to="myfriend" />
      <van-cell icon="chat-o" title="互帮中心" is-link to="helpCenter" />
      <!--21-5-8修改，暂时取消销售加盟商-->
      <!-- <van-cell icon="friends-o" title="消费代理商" is-link to="myTeam" /> -->
      <van-cell icon="phone-circle-o" title="联系我们" is-link to="contactus" />
      <!-- <van-cell icon="phone-circle-o" title="客服聊天" is-link to="chat" /> --><!--废弃-->
      
      <van-cell
        icon="phone-circle-o"
        title="客服聊天"
        is-link
        @click="urlBtn"
      />
      <van-cell icon="phone-circle-o" title="收货地址" is-link to="addresses" />
    </div>
    <div class="exit-btn" @click="logout">退出登录</div>
    <Footer :isActive="isActive" @click="onhrefFn" />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <popup></popup>
    <p class="records" @click="referenceBtn">蜀ICP备20018437号-1</p>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
import qs from "qs";
export default {
  data() {
    return {
      isActive: 4,
      pageshow: false,
      show: false,
      actions: [
        { name: "销售提现", id: 1, url: "memWal" },
        { name: "互帮提现", id: 2, url: "memWal" },
      ],
      username: sessionStorage.getItem("name"),
      title: sessionStorage.getItem("title"),
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
    };
  },
  components: {
    Footer,
    popup,
  },
  mounted() {},
  created() {},
  computed: {},
  methods: {
    //备案号
    referenceBtn() {
      window.location.href = "https://beian.miit.gov.cn/#/home";
    },
    //跳转客服
    urlBtn() {
      // window.location.href = `http://8.136.118.229/#/chat/${sessionStorage.getItem(
      //   "user_id"
      // )}/${sessionStorage.getItem("name")}/${sessionStorage.getItem("mobile")}`;
      window.location.href = sessionStorage.getItem('chat_url')
    },
    //收货地址
    shdz() {
      console.log("收货地址");
    },
    goldFn() {
      this.$router.push({
        name: "myPointstwo",
      });
    },
    onhrefFn(n) {
      this.$router.push(n.url);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起

      this.$router.push({
        name: item.url,
        params: { id: item.id },
      });
      this.show = false;
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
  background: #fbbb5f;
  .exit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.8rem;
    font-size: 0.28rem;
    width: 80%;
    background-color: #fb932b;
    color: #fff;
    border-radius: 5px;
    margin: 0.5rem auto;
    border: 0;
  }
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
  .me-list {
    .van-cell {
      background: #6b431c;
      color: #fff;
      padding: 0.24rem;
      i:nth-child(1) {
        color: #7489ac;
      }
      i.van-icon-arrow {
        color: #ff8c19;
      }
    }
    .van-cell__title {
      text-align: left;
      font-size: 0.28rem;
    }
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