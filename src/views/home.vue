<template>
  <div class="home-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="同心台"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="service-o" />
      </template>
      <template #left>
        <van-icon name="bell" />
      </template>
    </van-nav-bar>
    <div class="home-con" v-if="!!pageshow">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        v-if="imglist.length > 0"
      >
        <van-swipe-item v-for="(item, index) in imglist" :key="index">
          <img :src="`${staticUrl}/${item.plug_ad_pic}`" alt="" />
        </van-swipe-item>
      </van-swipe>
      <div class="plan-con">
        <!-- <div class="plan-list">
          <div class="plan-tit"></div>
          <div class="plan-tit-1">收入展示</div>
          <van-swipe
            vertical
            :show-indicators="false"
            :autoplay="3000"
            v-if="planList.length > 0"
          >
            <van-swipe-item v-for="(item, index) in planList" :key="index">
              {{ item.from_user }} 付款 {{ item.payment_money }} 元
            </van-swipe-item>
          </van-swipe>
          <span @click="hrefmore" class="plan-more">查看更多</span>
        </div> -->
      </div>

      <div v-if="featurelist.length > 0" class="feature-con">
        <p class="feature-tit">特色产品</p>
        <div
          class="feature-list"
          v-for="(item, index) in featurelist"
          :key="index"
        >
          <div :class="`fcl${index} feature-left`">{{ item.left }}</div>
          <div class="feature-right">
            <p>{{ item.right_top }}</p>
          </div>
        </div>
      </div>
      <div v-if="getArticleList.length > 0" class="getArticle-con">
        <p class="getArticle-tit">
          同心台学院<span>系统学习平台的4大版块</span>
        </p>
        <ul class="getArticle-list">
          <li
            v-for="(item, index) in getArticleList"
            :key="index"
            @click="clickimg(item)"
          >
            <div class="getArticle-1">
              <div
                class="getArticle-1-bg"
                :style="{
                  backgroundImage:
                    'url(' + `${staticUrl}/${item.news_img}` + ')',
                }"
              ></div>

              <p>{{ item.news_title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="popUpBox" v-if="msgs">
      <div class="popUp-content">
        <span v-show="msg" class="iconfont icon-tongzhi"></span>
        <div class="text" v-html="msg"></div>
        <span v-show="msg" @click="msgs = !msgs">×</span>
      </div>
    </div> -->
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
      // msgs: false,
      // msg: "",
      advertisingList: ["1", "2", "3", "4", "5"], //广告列表
      pageshow: false,
      list: [],
      imglist: [],
      featurelist: [],
      getArticleList: [],
      planList: [],
      isActive: 1,
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      sun: 0,
      suns: 0,
    };
  },
  components: {
    Footer,
    popup
  },
  filters: {
    conversion: (item) => {
      if (item >= 1000) {
        return Math.ceil(item / 100) / 10 + "K";
      } else {
        return item;
      }
    },
  },
  mounted() {
    this.firstAPi();
    // if (sessionStorage.getItem("msg")) {
    //   this.msgs = true;
    //   setTimeout(() => {
    //     this.msg = sessionStorage.getItem("msg");
    //   }, 1000);
    // }
  },
  methods: {
    clickimg(item) {
      this.$router.push({ path: "too", query: { id: item.n_id } });
    },
    // hrefmore() {
    //   this.$router.push("/plan");
    // },
    onClickRight() {
      this.$router.push("/contactus");
    },
    helpFn(n) {
      this.$router.push(`/helpdetails/${n.id}`);
    },
    async firstAPi() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${this.apiUrl}/index`)
        .then((res) => {
          let { data } = res;
          that.pageshow = true;
          if (data.status === 1) {
            that.imglist = data.info.bannerList;
            that.featurelist = data.info.feature;
            that.getArticleList = data.info.newList;
          } else {
            that.$toast(data.message);
          }
          axios
            .get(`${this.apiUrl}/incomeList`)
            .then((res2) => {
              toast1.clear();
              let { data } = res2;
              if (data.status === 1) {
                that.planList = data.info;
              } else {
                that.$toast(data.message);
              }
            })
            .catch((error2) => {
              toast1.clear();
            });
        })
        .catch((error) => {
          toast1.clear();
        });
    },
    onClickLeft() {
      this.$router.push("/myMessage");
    },
  },
};
</script>
<style lang="scss">
.home-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  .navbar {
    .van-nav-bar__right,
    .van-nav-bar__left {
      font-size: 0.14rem;
    }
  }
  .home-con {
    padding: 0.28rem;
    .plan-con {
      margin-top: 0.2rem;
      .plan-list {
        overflow: hidden;
        width: 100%;
        height: 1.8rem;
        background: #0255b1;
        border-radius: 10px;
        position: relative;
      }
      .van-swipe {
        margin-top: 0.75rem;
        height: 0.4rem;
        font-size: 0.24rem;
        padding: 0 0.2rem;
        color: #a7b9d7;
        .van-swipe__track {
          height: 0.4rem !important;
        }
        .van-swipe-item {
          height: 0.4rem !important;
          text-align: left;
        }
      }
      .plan-tit {
        width: 2rem;
        height: 0;
        border-top: 0.5rem solid #fbbb5f;
        border-right: 0.1rem solid transparent;
        border-left: 0.1rem solid transparent;
        position: absolute;
        left: 50%;
        top: -0.025rem;
        transform: translate3d(-50%, 0, 0);
        border-radius: 0 0 10px 10px;
        z-index: 2;
      }
      .plan-tit-1 {
        position: absolute;
        left: 50%;
        top: 0.05rem;
        transform: translate3d(-50%, 0, 0);
        border-radius: 0 0 10px 10px;
        z-index: 2;
        font-size: 0.24rem;
      }
      .plan-more {
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        color: #35bffd;
        font-size: 0.24rem;
      }
    }

    .getArticle-con {
      margin-top: 0.4rem;
      .getArticle-tit {
        color: #a7b9d7;
        font-size: 0.3rem;
        text-align: left;
        margin-bottom: 0.3rem;
        span {
          margin-left: 0.2rem;
          color: #6d82a5;
        }
      }
      .getArticle-list {
        display: flex;
        flex-wrap: wrap;
        li {
          font-size: 0.24rem;
          > div {
            background: #fff;
            border-radius: 0 0 10px 10px;
          }
          flex-basis: 50%;
          margin-bottom: 0.2rem;
          &:nth-child(2n + 2) {
            padding-left: 0.1rem;
          }
          &:nth-child(2n + 1) {
            padding-right: 0.1rem;
          }
          p {
            padding: 0.2rem 0;
          }
          .getArticle-1-bg {
            width: 100%;
            height: 3rem;
            background-size: cover;
            background-position: center;
          }
        }
      }
    }

    .feature-con {
      margin-top: 0.2rem;
      .feature-tit {
        color: #a7b9d7;
        font-size: 0.3rem;
        text-align: left;
      }
      .feature-list {
        height: 1.5rem;
        background: #fff;
        color: #fff;
        margin-top: 0.24rem;
        display: flex;
        border-radius: 5px;
        .fcl0 {
          background: #35bffd;
        }
        .fcl1 {
          background: #ffc370;
        }
        .fcl2 {
          background: #a7bbf8;
        }
        .feature-left {
          height: 100%;
          width: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.26rem;
        }
        .feature-right {
          flex: 1;
          height: 100%;
          min-width: 0;
          color: #3b4375;
          font-size: 0.23rem;
          display: flex;
          flex-direction: column;

          text-align: left;
          justify-content: space-around;
          padding: 0.2rem;
          p {
            line-height: 1.4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }
  }
  .van-swipe {
    height: 3rem;
    width: 100%;
    margin: 0 auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
  // .popUpBox {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100%;
  //   font-size: 0.24rem;
  //   background-color: rgba($color: #000000, $alpha: 0.3);
  //   .popUp-content {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100vw;
  //     max-height: 500px;
  //     margin-top: 45px;
  //     background-color: #fff;
  //     overflow: hidden;
  //     text-align: left;
  //     padding: 0.3rem 0;
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     animation-name: animLoad;
  //     animation-duration: 1s;
  //     @keyframes animLoad {
  //       0% {
  //         opacity: 0;
  //         transform: scale3d(0, 0.3, 1);
  //       }
  //       65% {
  //         opacity: 1;
  //         transform: scale3d(1, 1, 1);
  //       }
  //     }
  //     & span {
  //       padding: 0.3rem;
  //       &:nth-child(3) {
  //         font-size: 0.35rem;
  //       }
  //     }
  //     & .icon-tongzhi {
  //       font-size: 0.5rem;
  //     }
  //   }
  // }
}
</style>