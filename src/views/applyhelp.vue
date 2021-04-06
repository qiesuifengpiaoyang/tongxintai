<template>
  <div class="applyhelp-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="互助计划"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="pageshow">
      <ul class="applyhelp-list" v-if="list.length > 0">
        <li v-for="item in list" :key="item.id">
          <div class="applyhelp-hed">
            {{ item.title }}
            <i>存</i>
          </div>
          <div class="applyhelp-fot">
            <div class="planimg">
              <img :src="`${staticUrl}${item.img_url}`" alt="" />
            </div>
            <div class="plantxt">
              <p class="item1">
                最高<span>{{ item.help_amount }}</span
                >互助金
              </p>
              <p class="item2">{{ item.content1 }}</p>
              <p class="item2">{{ item.content2 }}</p>
              <p class="item3">{{ item.age }}</p>
              <!-- <div class="btn" @click="btnCl(item)">立即加入</div> -->
              <router-link
                class="btn"
                :to="{
                  path: 'recharge',
                  query: {
                    id: item.id,
                    text: encodeURIComponent(item.title),
                    type: item.id,
                    fr: 'applyhelp',
                  },
                }"
                >立即加入</router-link
              >
            </div>
          </div>
        </li>
      </ul>
      <van-empty description="暂无数据" v-else />
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
      pageshow: false,
      list: [],
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
    };
  },
  components: {
    popup,
  },
  mounted() {
    this.firstApi();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    firstApi() {
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

          let { data } = res;
          if (data.status === 1) {
            that.list.push(...data.info);
          } else {
            that.$toast(data.message);
          }
          that.pageshow = true;
        })
        .catch((error) => {
          toast1.clear();
        });
    },
  },
};
</script>
<style lang="scss">
.applyhelp-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fff; //#fbbb5f;
  font-size: 0.26rem;
  .applyhelp-list {
    font-size: 0.26rem;
    margin: 0.2rem;
    .applyhelp-hed {
      border-bottom: 1px solid #eee;
      padding: 0.3rem 0.2rem;
      text-align: left;
      position: relative;
      overflow: hidden;
      i {
        position: absolute;
        right: 0;
        top: 0;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 0 0 0 100%;
        background-color: #ff6600;
        font-size: 0.2rem;
        text-align: right;
        line-height: 1.8;
        color: #fff;
        padding-right: 0.04rem;
      }
    }
    .applyhelp-fot {
      padding: 0.2rem;
      display: flex;
      text-align: left;
      p {
        font-size: 0.24rem;
        line-height: 1.8;
        text-align: left;
        &.item1 {
          font-weight: bold;
          font-size: 0.26rem;
          color: #000;
          span {
            color: #e36559;
          }
        }
      }
      .btn {
        background: #e48e0b;
        padding: 0.16rem 0.2rem;
        line-height: 1;
        color: #fff;
        text-align: center;
        margin-top: 0.1rem;
        width: 2rem;
        border-radius: 5px;
        display: inline-block;
      }
    }
    .planimg {
      flex-basis: 40%;
      margin-right: 0.2rem;
      img {
        width: 100%;
      }
    }
    li {
      border-radius: 5px;
      margin-bottom: 0.3rem;
      box-shadow: 0 0 1.2rem 0 rgba(221, 220, 220, 0.6);
      overflow: hidden;
    }
  }
}
</style>