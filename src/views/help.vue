<template>
  <div class="help-wrapper">
    <van-nav-bar class="navbar" :border="false" title="相互帮助" />
    <div v-if="pageshow">
      <ul class="topay-list" v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index" @click="helpFn(item)">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content1 }}</p>
          <p>{{ item.content2 }}</p>
          <div>详情</div>
        </li>
      </ul>
      <van-empty v-else description="暂无数据" />
    </div>
    <popup></popup>
    <Footer :isActive="isActive" />
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
      pageshow: false,
      list: [],
      isActive: 3,
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
    };
  },
  components: {
    Footer,
    popup,
  },
  mounted() {
    this.firstAPi();
  },
  methods: {
    helpFn(n) {
      // if(!this.list[n.id].disable){
      if (!n.disable) {
        this.$router.push(`/helpdetails/${n.id}`);
      } else {
        this.$toast("暂未开放！");
      }
      // this.$router.push(`/helpdetails/${n.id}`)
    },
    firstAPi() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${that.apiUrl}/ehelp`)
        .then((res) => {
          toast1.clear();
          that.pageshow = true;
          let { data } = res;
          if (data.status === 1) {
            that.list.push(...data.info);
          } else {
            that.$toast(data.message);
          }
        })
        .catch((error) => {
          toast1.clear();
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.help-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  .topay-list {
    padding: 0.24rem;
    li {
      // background: rgba(44, 49, 98);
      background-color: #fff3e5;
      border-radius: 5px;
      padding: 0.24rem;
      margin-bottom: 0.24rem;
      // color: #7489ac;
      position: relative;
      font-size: 0.24rem;
      // color: #fff;
      h3 {
        text-align: left;
        font-size: 0.3rem;
        margin-bottom: 0.1rem;
      }
      div {
        position: absolute;
        bottom: 0.1rem;
        right: 0.1rem;
        // background: #35bffd;
        // background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
        background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
        padding: 5px 10px 4px;
        color: #fff;
        border-radius: 5px;
        line-height: 1;
      }
      p {
        height: 0.24rem;
        line-height: 1;
        margin-bottom: 0.2rem;
        text-align: left;
        span.payment-money {
          color: #35bffd;
        }
      }
      .topay-bt {
        position: absolute;
        right: 0.1rem;
        bottom: 0.1rem;

        color: #fff;

        span {
          font-size: 0.22rem;
          background: #35bffd;
          padding: 2px 10px 1px;
          border-radius: 2px;
          line-height: 1;
          & + span {
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
  .van-cell__title,
  .van-collapse-item__content {
    text-align: left;
  }
}
</style>