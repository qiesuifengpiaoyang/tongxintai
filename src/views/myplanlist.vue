<template>
  <div class="contactus-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="我的互助计划"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="pageshow">
      <dl class="contactus-dl">
        <!-- <dt>康养帮互助计划</dt> -->
        <dd v-for="(item, index) in list" :key="index">
          <div class="dl-left-img">
            <!-- <img src="../assets/img/cardicon-gray.png" alt=""> -->
            <img :src="`${staticUrl}/upload/ehelp/huzhu.jpeg`" alt="" />
            <!-- <img src="http://test.tongxintailm.com/upload/ehelp/huzhu.jpeg" alt=""> -->
            <div class="img-po"></div>
          </div>
          <div class="dl-right-con">
            <div class="xian"></div>
            <div class="hed">
              {{ item.user_name }} <small>{{ item.help_amount }}</small>
            </div>
            <div class="yue">加入时间：{{ item.create_time }}</div>
            <!-- <div class="yue">
                            可用时间：{{item.expire_time}}
                        </div> -->
            <!-- <div class="yue" v-if="item.status===1">
                            等待天数：{{item.day}}天
                        </div> -->
            <div class="mo">
              <div class="yue">
                类型：<span>{{ item.type_value }}</span>
              </div>
              <div v-if="item.status !== 3">
                可用贡献值
                <span>： {{ item.available_amount }}</span>
                <!-- <span></span> -->
              </div>
              <div v-else>余额不足</div>
            </div>
          </div>
          <router-link
            class="fot-change"
            :to="{
              path: 'recharge',
              query: {
                id: item.id,
                card_id: item.id_card,
                name: encodeURIComponent(item.user_name),
                available_amount: item.available_amount,
                type: !!item.type_config ? item.type_config.id : '',
                text: !!item.type_config
                  ? encodeURIComponent(item.type_config.title)
                  : '',
                fr: 'topbu',
              },
            }"
            >充值<van-icon name="arrow"
          /></router-link>
        </dd>
      </dl>

      <router-link
        class="footer-button"
        :to="{ path: 'recharge', query: { fr: 'dibu' } }"
        >充值</router-link
      >
    </div>
    <popup></popup>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
// import axios from 'axios';
// import { ImagePreview } from 'vant';
import qs from "qs";
export default {
  data() {
    return {
      pageshow: true,
      list: [],
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
    firstAPi() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${that.apiUrl}/getCharge`)
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
.contactus-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fff;
  .contactus-dl {
    font-size: 0.28rem;
    color: #333;
    dt {
      position: relative;
      font-size: 0.28rem;
      font-weight: 700;
      line-height: 1;
      padding: 0.4rem 0.2rem 0;
      text-align: left;
    }
    dd {
      background: #fff;
      // width: auto;
      padding: 0.2rem;
      display: flex;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);

      img {
        border: 0;
        max-width: 100%;
        width: auto;
        height: auto;
        vertical-align: top;
        min-width: 1px;
        min-height: 1px;
      }
      .dl-left-img {
        width: 2.2rem;
        display: inline-block;
        flex-shrink: 0;
        margin-right: 0.2rem;
        overflow: hidden;
        position: relative;
      }
      .img-po {
        position: absolute;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.04);
      }
      .dl-right-con {
        flex: 1;
        .hed {
          color: #151516;
          font-size: 0.32rem;
          margin-bottom: 0.1rem;
          overflow: hidden;
          line-height: 1.2;
          display: flex;
          align-items: center;
          text-align: left;
          small {
            line-height: 1.1;
            background: #e48e0b;
            color: #fff;
            border-radius: 4px;
            font-size: 0.2rem;
            padding: 0.05rem 0.1rem;
            margin-left: 0.2rem;
          }
        }
        .yue {
          font-size: 0.22rem;
          color: #9c9c9c;
          text-align: left;
        }
        .mo {
          color: #e02e24;
          font-size: 0.22rem;
          font-weight: 400;
          text-align: left;
          line-height: 1.4;
          span {
            // font-weight: bold;
            padding: 0 0.02rem;
          }
          span:last-child {
            // font-size: .28rem;
          }
        }
      }
      .fot-change {
        position: absolute;
        bottom: 0.2rem;
        right: 0.2rem;
        color: #fff;
        font-size: 0.22rem;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.2rem 0 0.32rem;
        background: #e48e0b;
        border-radius: 5px;
      }
    }
  }
  .footer-button {
    text-align: center;
    color: #fff;
    font-size: 0.34rem;
    background: #e48e0b;
    padding: 0.3rem 0;
    line-height: 1;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>