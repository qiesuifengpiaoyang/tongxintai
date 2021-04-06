<template>
  <div class="box">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="明细"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="cut">
      <span :class="{ xz: opt }" @click="opt = true">收入</span>
      <span :class="{ xz: !opt }" @click="opt = false">支出</span>
    </div>

    <!-- 收入 -->
    <ul class="vessel" v-show="opt">
      <li v-for="(item, index) in list.income" :key="'income' + index">
        <div class="describe">
          {{ item.desc }}
        </div>
        <div class="xx">
          <span>+￥{{ item.money }}</span>
          <span>{{ item.date }}</span>
        </div>
      </li>
      <li v-if="income">暂无记录</li>
    </ul>

    <!-- 支出 -->
    <ul class="vessel" v-show="!opt">
      <li v-for="(item, index) in list.outcome" :key="'outcome' + index">
        <div class="describe">
          {{ item.desc }}
        </div>
        <div class="xx">
          <span>-￥{{ item.money }}</span>
          <span>{{ item.date }}</span>
        </div>
      </li>
      <li v-if="outcome">暂无记录</li>
    </ul>
    <div class="mistake" v-if="mistake">
      <p>数据错误，请重新刷新</p>
      <p>若一直无响应，请联系管理员</p>
    </div>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
export default {
  data() {
    return {
      income: false,//【收入】的【暂无记录】
      outcome: false,//【支出】的【暂无记录】
      mistake:false,//接口请求出错的提示
      opt: true,//切换【收入】和【支出】
      list: {},//数据
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
    };
  },
  components: {
    popup,
  },
  created() {
    const toast1 = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    axios.get(`${this.apiUrl}/getEhelpConsumeLog`).then((val) => {
      toast1.clear();
      let { data } = val;
      let { info, message, status } = data;
      if (status != 1) {
          this.mistake = true;
        this.$toast(`${message}`);
        return;
      }
      this.mistake = false;
      //是否有收入记录
      if (!info.income.length) {
        this.income = true;
      }
      //是否有支出记录
      if (!info.outcome.length) {
        this.outcome = true;
      }
      this.list = info;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.box {
  min-height: 100vh;
  font-size: 0.24rem;
  //   background: #fbbb5f;
  text-align: left;
  padding-bottom: 0.5rem;
  .cut {
    width: 100vw;
    margin-top: 0.24rem;
    font-size: 0.26rem;
    font-weight: bold;
    border: 1px solid #ffa51e;
    background-color: #fff;
    & > span {
      display: inline-block;
      width: 50%;
      padding: 0.2rem 0;
      text-align: center;
    }
    .xz {
      background-color: #ffa51e;
    }
  }
  .vessel {
    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.24rem;
      background-color: #fff;
      //   border-bottom: 1px solid #ff8c19;
      padding: 0.2rem;
      .describe {
        width: 48%;
      }
      .xx {
        width: 48%;
        display: flex;
        flex-direction: column;
        text-align: right;
      }
    }
  }
  .mistake {
    text-align: center;
  }
}
</style>