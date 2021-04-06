<template>
  <div class="topay-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="收款人"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="pageshow">
      <template v-if="list.length > 0 || detail.length > 0">
        <ul class="topay-list" v-if="list.length > 0">
          <li v-for="(item, index) in list" :key="index" @click="topayFn(item)">
            <p>姓名：{{ !item.user_info ? "" : item.user_info.true_name }}</p>
            <p>手机号：{{ item.mobile }}</p>
            <p>
              付款金额：<span class="payment-money">{{
                item.payment_money
              }}</span>
            </p>
            <span class="topay-bt" v-if="item.status === 0">审核中</span>
            <span class="topay-bt" v-else-if="item.status === -1">未打款</span>
            <span class="topay-bt" v-else-if="item.status === 1">确认</span>
            <span class="topay-bt" v-else-if="item.status === 2">驳回</span>
            <!-- <div class="topay-bt">
              <template>
                <span v-if="item.status === 0">审核中</span>
                <span v-else-if="item.status === -1">未打款</span>
                <span v-else-if="item.status === 1">确认</span>
                <span v-else-if="item.status === 2">驳回</span>
              </template>
              <span @click.stop="unfoldBtn">{{ unfold }}</span>
            </div> -->
          </li>
          <div id="control" @click="control"></div>
        </ul>

        <!-- 表格 -->
        <div class="minuteBox" v-show="showOrHide">
          <ul class="minute" v-if="detail.length > 0">
            <li>
              <span>姓名</span>
              <span>联系方式</span>
              <span>复消金额</span>
            </li>
            <li v-for="(item, index) in detail" :key="index">
              <span>{{ item.user_info.true_name }}</span>
              <span>{{ item.mobile }}</span>
              <span>{{ item.payment_money }}</span>
            </li>
          </ul>
        </div>
      </template>

      <van-empty v-else description="暂无数据" />
    </div>

    <popup></popup>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
import qs from "qs";
export default {
  data() {
    return {
      // unfold: "展开详情",
      showOrHide: false, //表格的显示与隐藏
      pageshow: true,
      list: [],
      detail: [], //新增的表格
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      count: 0,
    };
  },
  watch: {
    showOrHide: {
      handler(res) {
        if (res) {
          this.unfold = "隐藏详情";
        } else {
          this.unfold = "展开详情";
        }
      },
      deep: true,
    },
  },
  components: {
    Header,
    Footer,
    popup,
  },
  mounted() {
    this.firstAPi();
  },
  methods: {
    control() {
      this.count++;
      if (this.count === 1) {
        setTimeout(() => {
          if (this.count < 2) {
            this.count = 0;
          } else {
            this.count = 0;
            this.showOrHide = !this.showOrHide;
          }
        }, 300);
      }
    },
    //展开|隐藏详情
    unfoldBtn() {
      this.showOrHide = !this.showOrHide;
    },
    topayFn(item) {
      if (item.status === -1) {
        this.$router.push({
          path: "payOnline",
          query: {
            payment_money: item.payment_money,
          },
        });
      } else if (item.status === 2) {
        this.$router.push({
          path: "payInfod",
          query: {
            type: item.n_id,
            user_id: item.user_info.user_id,
            index: item.index,
          },
        });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    firstAPi() {
      const toas1 = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      axios
        .get(`${this.apiUrl}/getPayInfo`, {
          params: {},
        })
        .then((res) => {
          toas1.clear();
          let { data } = res;
          if (data.status === 1) {
            this.pageshow = true;
            this.list.push(...data.info.pay);
            this.detail.push(...data.info.detail); //新增的表格
          } else {
            this.$toast(data.message);
          }
        });
    },
  },
};
</script>
<style lang="scss">
.topay-wrapper {
  position: relative;
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  .topay-list {
    position: relative;
    padding: 0.24rem;
    li {
      font-size: 0.24rem;
      background: rgba(44, 49, 98);
      border-radius: 5px;
      padding: 0.24rem;
      margin-bottom: 0.24rem;
      color: #7489ac;
      position: relative;
      p {
        margin-bottom: 0.14rem;
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
    #control {
      position: absolute;
      right: 0;
      width: 100px;
      height: 100px;
      // background-color: red;
      z-index: 9999;
    }
  }
  //表格
  .minuteBox {
    padding: 0.24rem;
    font-size: 0.24rem;
    color: #35bffd;
    .minute {
      border-radius: 5px;
      padding: 0.24rem;
      background: rgba(44, 49, 98);
      & li {
        padding: 0.1rem;
        border-bottom: 1px solid #555;
        display: flex;
        justify-content: space-between;
        &:last-child {
          border: none;
        }
        span {
          &:nth-child(1) {
            width: 25%;
          }
          &:nth-child(2) {
            width: 50%;
          }
          &:nth-child(3) {
            width: 25%;
          }
        }
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
}
</style>