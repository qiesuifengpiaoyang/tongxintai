<template>
  <div class="box">
    <van-nav-bar
      class="navbar"
      :border="false"
      :title="list.title + '详情'"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="contentBox">
      <p class="subtitle">{{ list.title }}详情</p>
      <div class="shareBtnBox">
        <span class="shareBtn" @click="ShareBtn">分享</span>
      </div>
      <!-- <div class="SSBox">
        
        
      </div> -->
      <div class="text" v-html="list.content"></div>
    </div>
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
import qs from "qs";
import popup from "@/components/popup.vue";
import ClipboardJS from "clipboard";
import qrcode from "qrcode";
export default {
  data() {
    return {
      some: "", //名字
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
          `${this.apiUrl}/academy/content`,
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
  //   padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  color: #000;
  font-size: 0.24rem;
  .contentBox {
    margin-top: 0.2rem;
    text-align: left;
    padding: 0.24rem;
    .SSBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .subtitle {
      text-align: center;
      font-size: 0.35rem;
      // font-weight: bold;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .shareBtnBox {
      &::after {
        content: "";
        display: block;
        clear: both;
      }
      .shareBtn {
        float: right;
        padding: 0.05rem 0.2rem;
        border-radius: 0.1rem;
        color: #fff;
        box-shadow: 2px 2px 5px #999;
        background-image: linear-gradient(
          to right,
          rgb(255, 255, 112),
          rgb(212, 163, 2)
        );
      }
    }

    .text {
      margin-top: 0.2rem;
      text-indent: 2em;
    }
  }
}
</style>