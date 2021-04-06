<template>
  <div class="helpdetaild-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="详情"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="helpdetaild-con">
      <p class="username" v-if="list.name">姓名：{{ list.name }}</p>
      <div class="d-0" v-if="list.diseasedesc">
        <p>病情详情</p>
        <div v-html="list.diseasedesc"></div>
      </div>
      <div class="video" v-if="list.video">
        <video
          controls
          :src="`${staticUrl}${list.video}`"
          webkit-playsinline=""
          playsinline=""
          x5-playsinline=""
          x-webkit-airplay="allow"
        ></video>
      </div>

      <div class="image" v-if="list.image">
        <img
          v-for="item in list.image"
          :key="item"
          v-lazy="`${staticUrl}${item}`"
        />
      </div>
    </div>
    <!-- 分享控件 -->
    <van-goods-action-icon
      class="share"
      icon="share"
      text="分享"
      @click="onShare"
    />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelectShare"
    />
    <van-popup v-model="showcanvasrq" get-container="body">
      <canvas id="canvasrq"></canvas>
    </van-popup>
    <popup></popup>
  </div>
</template>
<script>
import qs from "qs";
import axios from "@/tool/axios.js";
import ClipboardJS from "clipboard";
import popup from "@/components/popup.vue";
import qrcode from "qrcode";
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
      showcanvasrq: false, //二维码
      showShare: false,
      options: [
        [
          { name: "复制链接", icon: "link", id: 1, className: "clipboardUrl" },
          { name: "二维码", icon: "qrcode", id: 2, className: "rqUrl" },
          // { name: "微信", icon: "wechat", id: 3, className: "rqUrl" },
        ],
      ],
      pageshow: false,
      list: {},
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      url: "",
      weixTitle:'',//分享到微信上面的标题
      weixContent:'',//分享到微信上面的内容
    };
  },
  components: {
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
            title: `互助公示-${this.weixTitle}`,//分享标题
            desc: `${this.weixContent}`, // 分享描述
            link: `${urls}`,
            imgUrl: `${info.icon}`,
          };
          // onMenuShareTimeline(friend);
          updateAppMessageShareData(friend)

          //分享朋友圈
          let CircleOfFriends = {
            title: `互助公示-${this.weixTitle}`,
            desc: `${this.weixContent}`, // 分享描述
            link: `${urls}`,
            imgUrl: `${info.icon}`, //分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
          };
          // onMenuShareAppMessage(CircleOfFriends);
          updateTimelineShareData(CircleOfFriends)
        });
        wx.error( (res)=> {
        });
      });
  },
  mounted() {
    this.firtsAPI();
  },
  methods: {
    //分享按钮
    onShare() {
      this.showShare = !this.showShare;
    },
    //复制链接
    onSelectShare(option) {
      let that = this;
      if (option.id === 1) {
        that.$nextTick(() => {
          let clipboardUrl = new ClipboardJS(".clipboardUrl", {
            text: function () {
              return window.location.href;
            },
          });
          clipboardUrl.on("success", function (e) {
            that.$toast({
              message: "复制成功",
              forbidClick: true,
            });
            e.clearSelection();
            clipboardUrl.destroy();
          });
          clipboardUrl.on("error", function (e) {
            that.$toast({
              message: "该浏览器不支持自动复制",
              forbidClick: true,
            });
            clipboardUrl.destroy();
          });
        });
      } else if (option.id === 2) {
        that.showcanvasrq = true;
        that.$nextTick(() => {
          var canvas = document.getElementById("canvasrq");
          qrcode.toCanvas(
            canvas,
            `${window.location.href}`,
            { width: 200, margin: 2 },
            function (error) {
              if (error) console.error(error);
              // console.log("success!");
            }
          );
        });
      }
      that.showShare = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    firtsAPI() {
      let that = this;
      const toast1 = that.$toast.loading({
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${that.apiUrl}/helpDetail`, {
          params: {
            id: that.$route.params.id,
          },
        })
        .then((res) => {
          let { data } = res;
          toast1.clear();
          let { info, status, message } = data;
          if (status === 1) {
            that.list = info;
            that.weixTitle = info.name;
            that.weixContent = info.diseasedesc;
          } else {
            that.$toast(message);
          }
        })
        .catch((error) => {
          toast1.clear();
          that.$toast(JSON.stringify(error));
        });
    },
  },
};
</script>
<style lang="scss">
.helpdetaild-wrapper {
  position: relative;
  padding-bottom: 0.24rem;
  min-height: 100vh;
  background: #fbbb5f;
  .helpdetaild-con {
    text-align: left;
    font-size: 0.28rem;
    .username {
      background: #fff;
      padding: 0.24rem;
      margin-bottom: 0.24rem;
    }
    .d-0 {
      background: #fff;
      padding: 0.24rem;
      margin-bottom: 0.24rem;
      > p {
        font-size: 0.3rem;
      }
      > div {
        margin-top: 0.24rem;
      }
    }
    p {
      line-height: 1.4;
      color: #000;
    }
    .image {
      img {
        display: block;
        width: 100%;
        margin-bottom: 0.24rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .video {
      background: #fff;
      margin-bottom: 0.24rem;
      p {
        padding: 0.24rem;
        background: #fff;
      }
      video {
        width: 100%;
        height: 4rem;
      }
    }
    .helpdbtn {
      text-align: center;
      color: red;
      font-size: 0.34rem;
      margin-top: 0.5rem;
    }
  }

  //分享控件
  .share {
    position: absolute;
    right: 50px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 2px 2px 5px #f5f5f5;
  }
}
</style>