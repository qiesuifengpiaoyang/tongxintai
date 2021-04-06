<template>
  <div class="myearn-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="加盟商复消款支付"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <div class="myearn-hed">
      <div class="bala">
        <p class="ba1">金额</p>
        <p class="ba2">
          {{ payment_money }} <small style="font-size: 0.24rem">元</small>
        </p>
      </div>
    </div>
    <type-pay :radio="radio" @onRadiocl="onRadiocl" />
    <!-- <van-radio-group v-model="radio" class="cellradiolist">
            <van-cell-group>
                <van-cell title="支付方式" size="large" />
                <van-cell title="支付宝" class="alipay" clickable @click="radio = '1'" icon="alipay">
                    
                <template #right-icon>
                    <van-radio name="1" />
                </template>
                </van-cell>
                <van-cell title="微信" class="wechat" icon="wechat" clickable @click="radio = '2'">
                <template #right-icon>
                    <van-radio name="2"/>
                </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group> -->
    <!-- 输入登录密码 -->
    <div class="passwordBox" v-if="passwordBoxState">
      <div class="password">
        <p>请验证登录密码</p>
        <input
          type="text"
          v-model="password"
          placeholder="请输入您的登录密码用来验证！"
        />
        <div class="passwordSelect">
          <input
            type="button"
            value="取消"
            @click="passwordBoxState = !passwordBoxState"
          />
          <input type="button" value="确定" @click="passwordBtn" />
        </div>
      </div>
    </div>
    <div class="btnpay" @click="btnpay">去支付</div>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import TypePay from "@/components/typepay.vue";
import popup from "@/components/popup.vue";
import qs from "qs";
export default {
  data() {
    return {
      toast1: "",
      passwordBoxState: false,//使用销售积分时的密码验证弹窗
      password:'',
      radio: "1",
      payment_money: this.$route.query.payment_money,
      apiUrl: this.$store.state.apiDomain,
    };
  },
  components: {
    TypePay,
    popup
  },
  methods: {
    passwordBtn() {
      if (!this.password) {
        this.$toast("请验证您的登陆密码！");
        return;
      }
      this.toast1 = this.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.postPayOnline();
    },
    onRadiocl(o) {
      this.radio = o;
    },
    postPayOnline() {
      let that = this;
      axios
        .post(
          `${this.apiUrl}/payOnline`,
          qs.stringify({
            payment_method: that.radio,
            password: that.password,
          })
        )
        .then((res) => {
          let { data } = res;
          let { status, message, info } = data;
          this.toast1.clear();
          if (status === 1) {
            location.href = info.direct_url;
            if (that.radio == 3) {
              that.$toast(`${message}`);
            }
          } else {
            that.$toast(`${message}`);
          }
        })
        .catch(() => {
          this.toast1.clear();
          that.$toast("连接超时，请重试");
        });
    },
    btnpay() {
      let that = this;
      //如果使用【销售积分】支付，则弹出【使用登陆密码验证】的弹窗
      // if (that.radio == 3) {
      //   that.passwordBoxState = !that.passwordBoxState;
      //   return;
      // }
      that.toast1 = that.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      this.postPayOnline();
    },
    onarrowLeftClick(e) {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.myearn-wrapper {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 2rem;

  .btnpay {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #e48e0b;
    color: #fff;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.3rem;
    z-index: 10;
  }
  // .myearn-con{
  .myearn-hed {
    padding: 0.4rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    .bala {
      text-align: left;
      font-size: 0.24rem;
      .ba1 {
        color: #bbb;
      }
      .ba2 {
        color: #ed6a0c;
        font-size: 0.7rem;
        line-height: 1.2;
      }
    }

    .qwidt {
      display: flex;
      flex-direction: column;
      button {
        width: 1.8rem;
        padding: 0;
        height: 34px;
        margin-top: 0.3rem;
        border-radius: 5px;
        &:first-child {
          margin-top: 0;
        }
      }
      // height: .6rem;
      // padding: 0 .3rem;
      // border: 1px solid #ed6a0c;
      // border-radius: 100px;
      // display: flex;
      // align-items: center;
      // font-size: .22rem;
      // color: #ed6a0c;
      // i{
      //     margin-right: .1rem;
      //     color: #ed6a0c;
      // }
    }
  }
  .myearn-bod {
    margin-top: 0.2rem;
    background: #fff;
    padding: 0.2rem;
    .item1 {
      border-top: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.3rem 0;
      .item1-1 {
        font-size: 0.26rem;
        font-size: #bbb;
        text-align: left;
        .date {
          font-size: 0.24rem;
          color: #ccc;
        }
      }
      .item1-2 {
        color: #ed6a0c;
        font-size: 0.3rem;
        font-weight: bold;
        &.o2 {
          color: #07c160;
        }
      }
    }
    .van-tabs__nav {
      .van-tabs__line {
        display: none;
      }
      .van-tab {
        font-weight: bold;
        font-size: 0.3rem;
      }
      .van-tab--active {
        color: #ed6a0c;
      }
    }
  }
  //验证登录密码
  .passwordBox {
    font-size: 0.24rem;
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: 0.3);
    .password {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vw;
      padding-top: 0.3rem;
      border-radius: 0.2rem;
      background-color: #fff;
      overflow: hidden;
      p {
        font-size: 0.3rem;
        font-weight: bold;
      }
      & > input {
        width: 85%;
        border: 1px solid #999;
        padding: 0.1rem 0.2rem;
        border-radius: 0.15rem;
        margin-top: 0.5rem;
      }
      .passwordSelect {
        width: 100%;
        margin-top: 0.7rem;
        border-top: 1px solid #eee;
        & input {
          width: 50%;
          padding: 0.2rem 0;
          background-color: transparent;
          &:nth-child(1) {
            border-right: 1px solid #eee;
          }
          &:nth-child(2) {
            color: red;
          }
        }
      }
    }
  }
  // }
}
</style>