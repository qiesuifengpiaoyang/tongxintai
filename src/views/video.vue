<template>
  <div class="box">
    <van-nav-bar
      class="navbar"
      :border="false"
      :title="list.title + '详情'"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="videoBox">
      <video
        v-if="list.video"
        :poster="list.image"
        :src="list.video"
        controls="controls"
        width="100%"
        height="100%"
        controlslist="nodownload"
        disablePictureInPicture
        noremoteplayback
      >
        您的浏览器不支持 video 标签
      </video>
      <div class="kongjianBox">
        <span class="biaoti">{{ list.title }}</span>
        <span class="fenxiang" @click="ShareBtn">分享</span>
      </div>
    </div>
    <div class="textBox" v-html="list.detail"></div>
    <van-share-sheet
      v-model="ShowShare"
      title="立即分享给好友"
      :options="Options"
      @select="OnSelectShare"
    />
    <!-- 二维码生成 -->
    <van-popup v-model="Showcanvasrq" get-container="html">
      <canvas id="Canvasrq"></canvas>
    </van-popup>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
import qs from "qs";
import ClipboardJS from "clipboard";
import qrcode from "qrcode";
export default {
  data() {
    return {
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      id: parseInt(this.$route.params.id),
      list: {},
      Showcanvasrq: false, //二维码生成
      ShowShare: false, //分享控件
      Options: [
        [
          { name: "复制链接", icon: "link", id: 1, className: "clipboardUrl" },
          { name: "二维码", icon: "qrcode", id: 2, className: "rqUrl" },
        ],
      ],
    };
  },
    components: {
    popup
  },
  created() {},
  mounted() {
    this.onLoad();
  },
  methods: {
    isIntNum(val) {
      var regPos = /(^[1-9]\d*$)/; // 非负整数
      if (regPos.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    onLoad() {
      if (!this.isIntNum(this.id)) {
        this.$toast(`访问不合法`);
        return;
      }
      axios
        .post(
          `${this.apiUrl}/academy/detail`,
          qs.stringify({
            id: this.id,
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, message, status } = data;
          this.list = info;
        });
    },
    ShareBtn() {
      this.ShowShare = !this.ShowShare;
    },
    //视频板块儿——分享控件
    OnSelectShare(option) {
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
        that.Showcanvasrq = true;
        that.$nextTick(() => {
          var canvas = document.getElementById("Canvasrq");
          qrcode.toCanvas(
            canvas,
            `${window.location.href}`,
            { width: 200, margin: 2 },
            function (error) {
              if (error) console.error(error);
            }
          );
        });
      }
      that.ShowShare = false;
    },
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
  background: #fbbb5f;
  .videoBox {
    width: 100vw;
    .kongjianBox {
      padding: 12px 16px;
      border-bottom: 1px solid #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .biaoti {
        text-align: left;
        width: 80%;
        //   font-weight: bold;
        font-size: 0.3rem;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .fenxiang {
        color: red;
        padding: 0.05rem 0.15rem;
        border-radius: 0.1rem;
        background-image: linear-gradient(
          to right,
          rgb(255, 255, 112) 40%,
          rgb(212, 163, 2)
        );
      }
    }
  }

  //文字介绍
  .textBox {
    width: 100vw;
    padding: 0.24rem;
    margin-top: 0.2rem;
    text-align: left;
  }
}
</style>