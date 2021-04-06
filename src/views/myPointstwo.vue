<template>
  <!-- <div class="mypoints-wrapper" v-if="pageshow"> -->
  <div class="mypointst-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="原始积分"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <div class="myearn-hed o2">
      <div class="bala">
        <p class="ba2"><van-icon name="points" />{{ point }}</p>
      </div>
      <!-- <div class="qwidt" >
                <van-button color="#ed6a0c" plain type="primary" @click="goldFn">兑换原始积分</van-button>
            </div> -->
      <div class="recharge" @click="dhysjf = !dhysjf" v-if="intergralRecharge">
        <van-button color="#ed6a0c" plain type="primary">兑换</van-button>
      </div>
    </div>
    <!-- 兑换 -->
    <van-popup
      v-model="dhysjf"
      get-container="body"
      position="top"
      class="chongzhi"
    >
      <van-radio-group v-model="radio" class="cellradiolist">
        <van-cell-group>
          <van-cell title="兑换原始积分" size="large" />
          <van-field
            v-model="moneys"
            :placeholder="
              '请输入兑换金额,比例为' + ratioMoney + ':' + ratioIntergral
            "
            :key="'兑换原始积分'"
          />
          <van-cell title="选择兑换方式" size="large" />
          <!-- <van-cell
            title="银行卡"
            class="card"
            icon="card"
            clickable
            @click="radio = '1'"
          >
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell> -->
          <van-cell
            title="支付宝"
            icon="alipay"
            class="alipay"
            clickable
            @click="radio = '1'"
          >
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell
            title="微信"
            icon="wechat"
            class="wechat"
            clickable
            @click="radio = '2'"
          >
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <div @click="confirmBtn" class="confirmClass">确定</div>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <div class="myearn-bod">
      <van-tabs v-model="active" :border="false">
        <van-tab title="收益">
          <div class="item1" v-for="(item, index) in income" :key="index">
            <div class="item1-1">
              <p class="desc">{{ item.desc }}</p>
              <p class="date">{{ item.date }}</p>
            </div>
            <div class="item1-2">+{{ item.point }}</div>
          </div>
        </van-tab>
        <van-tab title="支出">
          <div class="item1" v-for="(item, index) in outcome" :key="index">
            <div class="item1-1">
              <p class="desc">{{ item.desc }}</p>
              <p class="date">{{ item.date }}</p>
            </div>
            <div class="item1-2 o2">-{{ item.point }}</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import qs from "qs";
import popup from "@/components/popup.vue";
import integral from "../components/integral.vue";
export default {
  data() {
    return {
      intergralRecharge:0,//【兑换】按钮显示与否
      intergralRechargeMax:0,//最大值
      dhysjf: false,
      radio: 0,
      moneys: "",//【兑换原始积分】金额
      upgrade_amount: 0,
      ratioMoney: null, //比例——支付金额
      ratioIntergral: null, //比例——积分数量
      income: [],
      outcome: [],
      point: 0,
      pageshow: false,
      show: true,
      active: 0,
      text: "",
      apiUrl: this.$store.state.apiDomain,
    };
  },
  components: {
    popup,
    integral,
  },
  created() {
    axios.get(`${this.apiUrl}/intergralRechargeRatio`).then((val) => {
      let { data } = val;
      this.ratioMoney = data.info.money;
      this.ratioIntergral = data.info.integral;
    });
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    //【确定】按钮
    confirmBtn() {
      if (parseInt(this.radio) == 0) {
        this.$toast("请选择兑换方式!");
        return;
      }
      if (!/^\d+$/.test(this.moneys) || !parseInt(this.moneys)) {
        this.$toast("请证确输入兑换金额！");
        return;
      }
      if(parseInt(this.moneys) > this.intergralRechargeMax){
        this.$toast(`单次兑换最大值：${this.intergralRechargeMax}`);
        return;
      }
      axios
        .post(
          `${this.apiUrl}/intergralRecharge`,
          qs.stringify({
            integral: parseInt(this.moneys),
            paytype: parseInt(this.radio),
          })
        )
        .then((val) => {
          let { data } = val;
          if (data.status != 1) {
            this.$toast(`${data.message}`);
            return;
          }
          window.location.href = data.info.direct_url;
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
      axios
        .get(`${this.apiUrl}/getOriginPointLog`)
        .then((res) => {
          let { data } = res;
          toast1.clear();
          if (data.status === 1) {
            that.pageshow = true;
            let { outcome, income, point, intergralRecharge, intergralRechargeMax } = data.info;
            that.intergralRecharge = intergralRecharge;
            that.intergralRechargeMax = intergralRechargeMax;
            that.point = point;
            that.income = income;
            that.outcome = outcome;
          } else {
            that.$toast(data.message);
          }
          toast1.clear();
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
.mypointst-wrapper {
  min-height: 100vh;
  background-color: #f4f4f4;

  // .myearn-con{
  .myearn-hed {
    position: relative;
    padding: 0.4rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    &.o2 {
      justify-content: center;
    }
    .bala {
      // text-align: left;
      font-size: 0.24rem;
      .ba1 {
        color: #bbb;
      }
      .ba2 {
        color: #ed6a0c;
        font-size: 0.7rem;
        line-height: 1.2;
        i {
          font-size: 16px;
          margin-right: 0.1rem;
        }
      }
    }

    //兑换
    .recharge {
      position: absolute;
      right: 0.2rem;
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
.confirmClass {
  width: 100%;
  text-align: center;
  background-color: #ff976a;
  font-size: 0.28rem;
  color: #fff;
  padding: 0.15rem 0;
}
</style>