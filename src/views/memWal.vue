<template>
  <div class="myearn-wrapper" v-if="pageshow">
    <van-nav-bar
      class="navbar"
      :border="false"
      :title="title"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <div class="myearn-hed">
      <div class="bala">
        <p class="ba1">积分</p>
        <p class="ba2">{{ upgrade_amount }}</p>
      </div>
      <div class="qwidt">
        <van-button
          color="#ed6a0c"
          icon="points"
          plain
          type="primary"
          v-if="poinshow"
          @click="goldFn(1)"
          >推广积分</van-button
        >
        <!-- v-if="poinshow"【销售提现】中展示/【互帮提现】中隐藏【推广积分】和【兑换原始积分】 -->
        <!-- v-if="hbtx" 用来控制【互帮提现】中只展示一个【推广积分】还是都展示 -->
        <div @click.stop="dhysjfBtn" class="dhysjf">兑换原始积分</div>
        <!-- <van-button color="#ed6a0c" icon="gold-coin" plain type="primary" @click="chsycl">查看收益</van-button> -->
      </div>
      <!-- <div class="chsy" @click="chsycl">
                查看收益
      </div>-->
    </div>

    <van-popup
      v-model="show"
      get-container="body"
      round
      position="bottom"
      class="plugin-mem"
    >
      <div class="myearn-bod">
        <van-tabs v-model="active" :border="false">
          <van-tab title="收益">
            <div class="item1" v-for="(item, index) in income" :key="index">
              <div class="item1-1">
                <p class="desc">{{ item.desc }}</p>
                <p class="date">{{ item.date }}</p>
              </div>
              <div class="item1-2">+{{ item.money }}</div>
            </div>
          </van-tab>
          <van-tab title="支出">
            <div class="item1" v-for="(item, index) in outcome" :key="index">
              <div class="item1-1">
                <p class="desc">{{ item.desc }}</p>
                <p class="date">{{ item.date }}</p>
              </div>
              <div class="item1-2 o2">-{{ item.money }}</div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
    <!-- 去提现 -->
    <!-- <van-popup v-model="qtx" get-container="body" position="top"> -->
    <van-radio-group v-model="radio" class="cellradiolist">
      <van-cell-group>
        <van-cell title="输入提现积分" size="large" />
        <van-field v-model="money" placeholder="请输入提现积分" :key="'qtx'" />
        <van-field
          v-model="sms"
          :key="'去提现'"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              color="#ed6a0c"
              plain
              type="primary"
              @click="smscl"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <van-cell title="选择提现方式" size="large" />
        <van-cell
          title="银行卡"
          class="card"
          icon="card"
          clickable
          @click="radio = '1'"
        >
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell
          title="支付宝"
          icon="alipay"
          class="alipay"
          clickable
          @click="radio = '2'"
        >
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell
          title="微信"
          icon="wechat"
          class="wechat"
          clickable
          @click="radio = '3'"
        >
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
      <!-- <van-button type="warning" block @click="btnpay">确定</van-button> -->
    </van-radio-group>
    <!-- </van-popup> -->

    <!-- 兑换积分 -->
    <van-popup v-model="dhysjf" get-container="body" position="top">
      <van-radio-group v-model="radio" class="cellradiolist">
        <van-cell-group>
          <van-cell title="兑换积分" size="large" />
          <van-field
            v-model="moneys"
            :placeholder="'请输入兑换积分，比例' + integral + ':' + point"
            :key="'dhysjf'"
          />
        </van-cell-group>
        <van-field
          v-model="smss"
          :key="'兑换积分'"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              color="#ed6a0c"
              plain
              type="primary"
              @click="smscl"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <integral
          :apiUrl="apiUrl"
          :money="moneys"
          :upgrade_amount="upgrade_amount"
          :id="this.$route.params.id"
          :smss="smss"
        ></integral>
        <!-- <van-button type="warning" block @click="btnpay">确定</van-button> -->
      </van-radio-group>
    </van-popup>

    <div class="btnpay">
      <!-- <div @click.stop="dhysjf=!dhysjf">兑换原始积分</div>丨 -->
      <div>
        <van-button
          class="cksy"
          icon="gold-coin"
          plain
          type="primary"
          @click="chsycl"
          >查看收益</van-button
        >
      </div>
      丨
      <div @click="btnpay">去提现</div>
    </div>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
import qs from "qs";
import integral from "../components/integral.vue";
export default {
  data() {
    return {
      // hbtx:true,//用来控制【互帮提现】中只展示一个【推广积分】还是都展示
      poinshow: +this.$route.params.id === 1 ? true : false, //【销售提现】中展示/【互帮提现】中隐藏【推广积分】和【兑换原始积分】
      income: [],
      outcome: [],
      upgrade_amount: 0,
      money: "",
      moneys: "",
      pageshow: false,
      active: 0,
      sms: "",
      smss: "",
      show: false,
      qtx: false,
      dhysjf: false,
      radio: "",
      isclick: false,
      apiUrl: this.$store.state.apiDomain,
      //比例
      integral:0,//积分
      point: 0, //等比兑换的原始积分数量
    };
  },
  components: {
    integral,
    popup
  },
  created() {
    axios.get(`${this.apiUrl}/subscriptionRatio`).then((val) => {
      let { data } = val;
      let { info, message, status } = data;
      if (this.poinshow) {
        this.integral = info.upgrade;
      } else {
        this.integral = info.available;
      }
      this.point = info.point;
    });
  },
  mounted() {
    if (+this.$route.params.id === 1) {
      this.title = "销售提现";
    } else {
      this.title = "互帮提现";
      // this.hbtx = false;
    }
    this.onLoad();
  },
  methods: {
    dhysjfBtn(){
      if(!this.poinshow){
        this.$toast("暂未开放")
      }else{
        this.dhysjf = !this.dhysjf
      }
      
    },
    goldFn(n) {
      this.$router.push("/myPoints");
    },
    smscl() {
      let t = this;
      if (!t.isclick) {
        axios
          .post(
            `${this.apiUrl}/smsSend`,
            qs.stringify({
              mobile: sessionStorage.getItem("mobile"),
              type: "fund",
            })
          )
          .then(function (e) {
            t.setTimes();
            let { data } = e;
            if (data.status === 1) {
              // t.keyshow()
              t.$toast("发送成功");
            } else {
              clearInterval(t.timeout);
              t.$toast({
                message: data.message,
                forbidClick: true,
                overlay: true,
              });
            }
          })
          .catch(function (e) {
            clearInterval(t.timeout);
          });
      }
    },
    setTimes: function () {
      let t = this;
      t.timeout = setInterval(function () {
        t.times > 0
          ? (t.times--, (t.phoneMess = t.times + "s"), (t.isclick = !0))
          : ((t.times = 60),
            clearInterval(t.timeout),
            (t.isclick = !1),
            (t.phoneMess = "获取验证码"));
      }, 1e3);
    },
    chsycl() {
      this.show = !this.show;
    },
    btnpay() {
      let that = this;
      if (
        !that.upgrade_amount ||
        parseFloat(that.upgrade_amount) < parseFloat(that.money)
      ) {
        that.$toast("积分不足");
        return;
      }
      if (!that.sms) {
        that.$toast("验证码不能为空");
        return;
      }
      if (!that.radio) {
        that.$toast("请选择体现方式");
        return;
      }
      const toast1 = that.$toast.loading({
        message: "提现中...",
        forbidClick: true,
        duration: 0,
      });
      let url = "";
      if (+that.$route.params.id === 2) {
        url = `${this.apiUrl}/applyEhelpWithdrawal`;
      } else {
        url = `${this.apiUrl}/applySaleWithdrawal`;
      }
      axios
        .post(
          url,
          qs.stringify({
            money: that.money,
            type: that.radio,
            smscode: that.sms,
          })
        )
        .then((res) => {
          let { data } = res;
          let { status, message, info } = data;
          toast1.clear();
          that.$toast(`${message}`);
          if (status === 1) {
            setTimeout(() => {
              that.$router.replace({
                name: "me",
              });
            }, 100);
          }
        })
        .catch(() => {
          toast1.clear();
          that.$toast("连接超时，请重试");
        });
    },
    onarrowLeftClick(e) {
      this.$router.go(-1);
    },
    onLoad() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      let url = "";
      if (+that.$route.params.id === 2) {
        url = `${this.apiUrl}/getRewardLog`;
      } else {
        url = `${this.apiUrl}/getUpgradeLog`;
      }
      axios
        .get(url)
        .then((res) => {
          let { data } = res;
          toast1.clear();
          if (data.status === 1) {
            that.pageshow = true;
            let { outcome, income, upgrade_amount } = data.info;
            that.upgrade_amount =
              +that.$route.params.id === 1
                ? data.info.upgrade_amount
                : data.info.available_amount;
            that.income = data.info.income;
            that.outcome = data.info.outcome;
          } else {
            that.$toast(that.message);
          }
        })
        .catch(() => {
          toast1.clear();
          that.$toast("连接超时，请重试");
        });
    },
  },
};
</script>
<style lang="scss">
.myearn-wrapper {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding-bottom: 2rem;
  .cellradiolist {
    margin-top: 0.3rem;
    text-align: left;
    .alipay {
      color: #1989fa;
    }
    .wechat {
      color: #07c160;
    }
  }
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
    & > div {
      width: 50%;
    }
    .cksy {
      width: 100%;
      background-color: transparent;
      color: #fff;
      border: none;
    }
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
    .chsy {
      color: #ed6a0c;
      border: 1px solid #ed6a0c;
      font-size: 0.26rem;
      border-radius: 2px;
      /* padding: 5px 10px; */
      /* line-height: 1; */
      height: 0.6rem;
      display: flex;
      align-items: center;
      padding: 0 10px;
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
      & .dhysjf {
        font-size: 14px;
        color: rgb(237, 106, 12);
        border: 1px solid rgb(237, 106, 12);
        line-height: 31px;
        width: 2rem;
        padding: 0;
        height: 34px;
        margin-top: 0.3rem;
        border-radius: 5px;
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
  // }
}
</style>