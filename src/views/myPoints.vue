<template>
  <!-- <div class="mypoints-wrapper" v-if="pageshow"> -->
  <div class="mypoints-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="推广积分"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <div class="myearn-hed o2">
      <div class="bala">
        <p class="ba2"><van-icon name="points" />{{ points }}</p>
      </div>
      <div class="qwidt" v-if="pointz">
        <!-- v-if="point" -->
        <van-button color="#ed6a0c" plain type="primary" @click="goldFn"
          >兑换原始积分</van-button
        >
      </div>
    </div>
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
    <van-popup
      v-model="show"
      get-container="body"
      position="top"
      class="cellradiolist"
    >
      <van-cell title="兑换原始积分" size="large" />
      <van-field
        v-model="text"
        :placeholder="'请输入兑换积分，比例' + integral + ':' + pointz"
      />
      <van-button type="warning" block @click="exchangePoint">确定</van-button>
    </van-popup>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
import { debounce } from "lodash-es";
import qs from "qs";
export default {
  data() {
    return {
      income: [],
      outcome: [],
      points: 0, //推广积分
      pageshow: false,
      show: false,
      active: 0,
      text: "",
      apiUrl: this.$store.state.apiDomain,
      //比例
      integral: 0, //积分
      pointz: 0, //等比兑换的原始积分数量
    };
  },
  created() {
    //原始积分兑换比例获取
    axios.get(`${this.apiUrl}/subscriptionRatio`).then((val) => {
      let { data } = val;
      let { info, message, status } = data;
      this.integral = info.extent;
      this.pointz = info.point;
    });
  },
  components: {
    popup,
  },
  mounted() {
    this.onLoad();
  },
  methods: {
    exchangePoint: debounce(
      function () {
        let that = this;
        const toast1 = that.$toast.loading({
          forbidClick: true,
          duration: 0,
        });
        axios
          .post(
            `${this.apiUrl}/exchangePoint`,
            qs.stringify({
              type: 1,
              point: that.text,
            })
          )
          .then((res) => {
            toast1.clear();
            let { data } = res;
            let { message, info, status } = data;

            if (status === 1) {
              that.show = false;
              // that.points = that.pointz - that.text;
              // that.points = that.text / that.integral//这是修改后的，不过感觉不用，因为直接重新刷新当前页面了
              // that.text = '';
              that.$router.go(0);
            }
            that.$toast({
              message,
              duration: 3000,
              forbidClick: true,
            });
          })
          .catch(() => {
            toast1.clear();
            that.$toast("连接超时，请重试");
          });
      },
      2000,
      { leading: true, trailing: false }
    ),
    goldFn() {
      this.$toast("暂未开放");
      //12-1修改,关闭[兑换原始积分]
      // this.show = !this.show
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
        .get(`${this.apiUrl}/getPointLog`)
        .then((res) => {
          let { data } = res;
          if (data.status == 1) {
            that.pageshow = true;
            // income outcome point
            let { outcome, income, point } = data.info;
            that.points = point;
            that.income = income;
            that.outcome = outcome;
          } else {
            that.$toast(res.message);
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
.mypoints-wrapper {
  min-height: 100vh;
  background-color: #f4f4f4;

  // .myearn-con{
  .myearn-hed {
    padding: 0.4rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    &.o2 {
      justify-content: space-between;
    }
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
        i {
          font-size: 16px;
          margin-right: 0.1rem;
        }
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