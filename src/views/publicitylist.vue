<template>
  <div class="publist-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="互助公示"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <div class="publist-con">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          :offset="offset"
        >
          <div v-for="(item, index) in list" :key="index" class="publist-list">
            <div class="his-date">
              <h3>{{ item.SerialTitle }}</h3>
              <div class="gs-date">
                <span>发布日期：{{ item.PublicTime }}</span>
              </div>
            </div>
            <div class="plan-title">{{ item.PlanTitle }}</div>
            <div
              v-for="it in item.HelpDetailList"
              :key="it.HelpDetailID"
              class="publist-list-item"
            >
              <div class="publist-list-top">
                <div class="card-content-inner">
                  <div class="his_pho">
                    <van-image
                      width="100"
                      height="100"
                      lazy-load
                      :src="`${staticUrl}${it.TitlePic}`"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </div>
                  <div class="his_title">
                    <p>
                      会员姓名：<span>{{ it.RealName }}</span>
                    </p>
                    <p>
                      互助原因：<span>{{ it.Reason }}</span>
                    </p>
                    <p>
                      互助金额：<span>{{ it.ResultMoney }}元</span>
                    </p>
                    <p>
                      地址：<span>{{ it.permanent_address }}</span>
                    </p>
                    <p>
                      加入时间：<span>{{ it.create_time }}</span>
                    </p>
                  </div>
                  <i
                    :class="[it.Status === 6 ? 'notice_no' : 'notice_yes']"
                  ></i>
                </div>
                <div class="his_content" v-html="it.MemberInfo"></div>
              </div>
              <div class="publist-list-fot" @click="toDetailcl(it.id)">
                查看详情
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- <Footer :isActive="2"/> -->
    <popup></popup>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
import qs from "qs";
import wx from "weixin-js-sdk";
import {
  postConfig,
  onMenuShareTimeline,
  onMenuShareAppMessage,
  updateAppMessageShareData,
  updateTimelineShareData
} from "@/tool/weix.js";

export default {
  data() {
    return {
      list: [],
      total: 0,
      offset: 50,
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      pageSize: 20,
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      icon: "",
    };
  },
  components: {
    Footer,
    popup,
  },
  created() {
    let url = window.location.href.split("#")[0];

    axios
      .post(
        `${this.apiUrl}/wechatShare/config`,
        qs.stringify({
          url: url,
        })
      )
      .then((val) => {
        let { data } = val;
        let { info } = data;
        this.icon = info.icon;
        wx.config({
          debug: false, // 开启调试模式,
          appId: "wx6422171c82896e15", // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: info.timestamp, // 必填，生成签名的时间戳
          nonceStr: info.noncestr, // 必填，生成签名的随机串
          signature: info.sign, // 必填，签名，见附录1
          jsApiList: [
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "",
          ],
        });

        wx.ready( ()=> {
          let urls = window.location.href;
          
          //分享朋友
          let friend = {
            title: "互助公示",//分享标题
            desc: '同心台-互助公示', // 分享描述
            link: `${urls}`,
            imgUrl: `${info.icon}`,
          };
          // onMenuShareTimeline(friend);
          updateAppMessageShareData(friend)

          //分享朋友圈
          let CircleOfFriends = {
            title: "互助公示",
            desc: "同心台-互助公示", // 分享描述
            link: `${urls}`,
            imgUrl: `${info.icon}`, //分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          };
          // onMenuShareAppMessage(CircleOfFriends);
          updateTimelineShareData(CircleOfFriends)
        });
        wx.error( (res)=> {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      });
  },
  mounted() {
    // let url = window.location.href;
    // // // onMenuShareTimeline(onMenuShareTimelineData)
    // wx.onMenuShareTimeline({
    //   title: "互助公示的标题", // 分享标题
    //   link: `${url}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: "../assets/img/4.png", // 分享图标
    //   success: function () {
    //     // 用户点击了分享后执行的回调函数
    //     this.$toast("分享成功！");
    //   },
    //   cancel: function () {
    //     this.$toast("已取消分享！");
    //   },
    // });
    // wx.onMenuShareAppMessage({
    //   title: "互助公示的标题", // 分享标题
    //   desc: "同心台互助公示的分享描述", // 分享描述
    //   link: `${url}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: "../assets/img/4.png", // 分享图标
    //   type: "", // 分享类型,music、video或link，不填默认为link
    //   dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    //   success: function () {
    //     // 用户点击了分享后执行的回调函数
    //     this.$toast("分享成功！");
    //   },
    //   cancel: function () {
    //     this.$toast("已取消分享！");
    //   },
    // });
  },
  methods: {
    toDetailcl(id) {
      this.$router.push({
        name: "helpdetaild",
        params: { id },
      });
    },
    onarrowLeftClick(e) {
      this.$router.go(-1);
    },
    onarrowRightClick(e) {
      this.$router.push("/myTeam");
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      let that = this;
      axios
        .get(`${this.apiUrl}/helpList`, {
          params: {
            page: that.page,
          },
        })
        .then((res) => {
          let { data } = res;
          if (data.status === 1) {
            that.page++;
            if (this.refreshing) {
              this.refreshing = false;
              let len = that.list.length;
              if (len < 20) {
                that.finished = true;
              }
              that.list = [].concat(data.info, that.list);
            } else {
              that.list.push(...data.info);
            }

            // 加载状态结束
            that.loading = false;
            // 数据全部加载完成
            if (data.info.length === 0) {
              that.finished = true;
            }
          } else {
            that.loading = false;
            that.error = true;
          }
        });
    },
  },
};
</script>
<style lang="scss">
.publist-wrapper {
  min-height: 100vh;
  background-color: #f0f0f7;
  padding-bottom: 1.4rem;
  .his-date {
    background: #fff;
    text-align: center;
    padding: 0.2rem 0;
    margin: 0.2rem 0;
    position: relative;
    h3 {
      font-size: 0.26rem;
      color: #333;
    }
    .gs-date {
      font-size: 0.24rem;
      color: #999;
      margin-top: 0.1rem;
    }
    &::after {
      width: 100%;
      position: absolute;
      content: "";
      height: 1px;
      background: #e3e3e3;
      left: 0;
      bottom: 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      z-index: 9;
    }
  }
  .plan-title {
    margin: 0.2rem;
    position: relative;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    text-align: left;
    &::before {
      width: 2px;
      height: 0.3rem;
      content: "";
      background-image: -webkit-linear-gradient(90deg, #d80c18 0, #ff3440 100%);
      position: absolute;
      left: 0;
      top: 0.05rem;
    }
  }
  .publist-list {
    background: #fff;
    padding-bottom: 0.2rem;
    margin: 0.2rem 0;
  }
  .publist-list-item {
    margin: 0.2rem;
    position: relative;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border: 1px solid #eee;
    font-size: 0.24rem;

    .publist-list-top {
      padding: 0.2rem;
      // font-size: .26rem;
      .card-content-inner {
        display: flex;
        // height:1rem;
        margin-bottom: 0.2rem;
        .notice_no,
        .notice_yes {
          width: 80px;
          height: 80px;
          background: url(../assets/img/as.png) 0 0 / cover no-repeat;
          position: absolute;
          right: 10px;
          top: 46px;
        }
        .notice_yes {
          background-position: 0 0;
        }
        .notice_no {
          background-position: 0 -88px;
        }
        .his_pho {
          float: left;
          width: 1.1rem;
          height: 1.1rem;
          img,
          .van-image {
            width: 100% !important;
            height: 100% !important;
          }
        }
        .his_title {
          flex: 1;
          margin-left: 0.2rem;
          float: left;
          line-height: 1.2;
          color: #333;
          text-align: left;
          p {
            margin-bottom: 0.14rem;
            & span {
              word-break: break-all; /*支持IE，chrome，FF不支持*/
            }
          }
        }
      }
    }
    .his_content {
      color: #999;
      text-align: justify;
    }
    .publist-list-fot {
      height: 0.9rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        height: 1px;
        background: #e3e3e3;
        left: 0;
        top: 0;
        transform: scaleY(0.5);
        z-index: 9;
        width: 100%;
      }
    }
  }
}
</style>