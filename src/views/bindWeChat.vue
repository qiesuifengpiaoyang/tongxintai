<template>
  <div class="bindcard-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="绑定微信"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <div v-if="pageshow">
      <van-cell-group :border="false">
        <van-field
          class="mb10 br5"
          :border="false"
          v-model="username"
          label="用户名"
          clearable
          placeholder="请输入用户名"
        />

        <div class="mb10 br5 payment-form-upload">
          <van-uploader
            :preview-full-image="false"
            :after-read="afterRead1"
            :disabled="disabled"
          >
            <div class="paymentFormItem_1">
              <div class="paymentFormItem_1_img">
                <van-icon name="add" v-if="!card_img_front1" />
                <img
                  :src="card_img_front1"
                  alt=""
                  v-else
                  style="width: 100%; height: 3rem"
                />
              </div>
            </div>
            <div class="paymentFormItem_2">点击上传微信收款码</div>
            <div class="payment-form-upload-mask" v-if="uploadMask1">
              <van-loading>上传中...</van-loading>
            </div>
          </van-uploader>
        </div>
        <div class="btn" @click="btnCl">{{ sh }}</div>
      </van-cell-group>
    </div> -->
    <!-- 展示 -->
    <div v-if="ifShow" class="contentBox">
      <div class="content">
        <div>
          <span>用户名：</span>
          <span>{{ list.nickname }}</span>
        </div>
        <div>
          <span>用户头像：</span>
          <img :src="list.headimgurl" alt="" />
        </div>
      </div>
      <!-- 换绑 -->
      <button class="changes" @click="changes">换绑</button>
    </div>

    <van-popup v-model="showcanvasrq" get-container="body">
      <canvas id="canvasrq"></canvas>
      <span class="textsss">使用微信扫描二维码</span>
    </van-popup>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
import qs from "qs";
import qrcode from "qrcode";
// import { apiHost, specfield } from "@/tool/path";
export default {
  data() {
    return {
      ifShow: false,
      showcanvasrq: false, //二维码
      list: [],
      // sh: "绑定微信",
      // uploadMask1: false,
      // disabled: false, //是否允许上传
      // fileList: [],
      // filelista: "",
      // card_img_front1: "",
      // pageshow: true,
      // username: "",
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
    };
  },
  components: {
    popup,
  },
  created() {
    // const toast1 = that.$toast.loading({
    //   message: "加载中...",
    //   forbidClick: true,
    //   duration: 0,
    // });

    this.firstApi();
  },
  methods: {
    firstApi() {
      let url = window.location.href;

      if (url.includes("?")) {
        let arrArg = url.match(/\?(\S*)#\//)[1];

        let _value = arrArg.split("&"); //拆分每组参数
        let code = _value[0].split("=")[1];
        let user_id = _value[1].split("=")[1];
        sessionStorage.setItem("user_id", user_id);
        //用code访问接口
        axios
          .get(`${this.apiUrl}/wechatShare/openid/${user_id}/${code}`)
          .then((val) => {
            let { data } = val;
            if (data.status == 1) {
              this.$toast(`${data.message}`);
              window.location.href = `${url.match(/(\S*)\?/)[1]}#/bindWeChat`;
            } else {
              // window.location.href = `${url.match(/(\S*)\?/)[1]}#/me`;
            }
          });
      } else {
        if (!sessionStorage.getItem("user_id")) {
          this.$dialog
            .alert({
              title: "警告",
              message: '此操作期间请勿清理本地缓存！',
            })
            .then((res) => {
              this.$router.push(`/me`)
            })
            return;
        }
        axios
          .get(
            `${this.apiUrl}/getBindWechat/${sessionStorage.getItem("user_id")}`
          )
          .then((res) => {
            let { data } = res;
            if (data.status == 1) {
              this.ifShow = true;
              this.list = data.info;
            } else {
              this.$toast(`${data.message}`);
              this.QRCode(url); //生成二维码
            }
          });
      }
    },
    //生成二维码
    QRCode(url) {
      this.showcanvasrq = true;
      this.$nextTick(() => {
        var canvas = document.getElementById("canvasrq");
        qrcode.toCanvas(
          canvas,
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6422171c82896e15&redirect_uri=${encodeURIComponent(
            url
          )}&response_type=code&scope=snsapi_userinfo&state=${sessionStorage.getItem(
            "user_id"
          )}#wechat_redirect`,
          { width: 200, margin: 2 },
          function (error) {
            if (error) console.error(error);
          }
        );
      });
    },
    //换绑
    changes() {
      let url = window.location.href;
      this.QRCode(url);
    },
    // afterRead1(file) {
    //   this.uploadMask1 = true;
    //   this.uploadFile(file, 1, "card_img_front");
    // },
    // uploadFile: function (file, n, s) {
    //   let that = this;
    //   let formdata = new FormData();
    //   formdata.append("img", file.file);
    //   axios.post(`${this.apiUrl}/uploadImage`, formdata).then((res) => {
    //     let { data } = res;
    //     this.filelista = data.info.filename;
    //     that["uploadMask" + n] = false;
    //     if (data.status === 1) {
    //       that[s] = `${data.info.filename}`;
    //       that[s + "1"] = file.content;
    //     } else {
    //       that.$toast({
    //         forbidClick: true,
    //         message: data.message,
    //       });
    //     }
    //   });
    // },
    // //提交信息
    // btnCl() {
    //   let that = this;
    //   if (!that.username) {
    //     this.$toast("用户名不能为空");
    //     return;
    //   }
    //   if (!that.filelista) {
    //     this.$toast("微信收款码不能为空");
    //     return;
    //   }


    //   const toast1 = that.$toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 0,
    //   });
    //   axios
    //     .post(
    //       `${that.apiUrl}/bindWechat`,
    //       qs.stringify({
    //         username: that.username,
    //         paycode: that.filelista,
    //       })
    //     )
    //     .then((res) => {
    //       toast1.clear();
    //       that.pageshow = true;
    //       let { data } = res;
    //       if (data.status === 1) {
    //         that.$dialog
    //           .alert({
    //             message: "绑定成功",
    //           })
    //           .then(() => {
    //             // on close
    //             that.$router.push("/me");
    //           });
    //       } else {
    //         that.$dialog
    //           .alert({
    //             message: `绑定失败-${data.message}`,
    //           })
    //           .then(() => {
    //             // on close
    //           });
    //       }
    //     })
    //     .catch((error) => {
    //       toast1.clear();
    //     });
    // },
    onClickLeft() {
      // this.$router.go(-1);
      // this.$router.push(`/me`)

      let url = window.location.href;
      if (url.includes("?")) {
        window.location.href = `${url.match(/(\S*)\?/)[1]}#/me`;
      } else {
        this.$router.push(`/me`);
      }
    },
  },
};
</script>
<style lang="scss">
.van-popup,
.van-popup--center {
  font-size: 0.24rem;
  text-align: center;
  padding-bottom: 0.1rem;
}
.bindcard-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  font-size: 0.3rem;
  text-align: left;
  .contentBox {
    margin-top: 0.1rem;
    padding: 0.24rem;
    color: #7489ac;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content {
      width: 100%;
      padding: 0.24rem;
      border-radius: 5px;
      background-color: rgba(44, 49, 98);
      img {
        border-radius: 5px;
      }
      div {
        &:nth-child(1) {
          margin-bottom: 0.15rem;
        }
      }
    }
    .changes {
      margin-top: 0.5rem;
      padding: 0.1rem;
      width: 100%;
      background-color: #35bffd;
      color: #fff;
      border-radius: 5px;
    }
  }
  // .payment-form-upload {
  //   display: flex;
  //   flex-wrap: nowrap;
  //   background-color: #3b4375;
  //   align-items: center;
  //   padding: 0.25rem;
  //   margin-top: 0.1rem;
  //   border-radius: 0.1rem;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   .paymentFormItem_1_img {
  //     width: 200px;
  //     height: 200px;
  //     background-color: #454d80;
  //     padding: 0.24rem;
  //     border-radius: 5px;
  //     position: relative;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     .van-icon {
  //       font-size: 1rem;
  //       color: #fbbb5f;
  //     }
  //   }
  //   .paymentFormItem_2 {
  //     color: #abbddb;
  //     margin-top: 0.2rem;
  //     font-size: 14px;
  //   }
  //   .payment-form-upload-mask {
  //     width: 100%;
  //     height: 100%;
  //     position: absolute;
  //     left: 0;
  //     top: 0;
  //     z-index: 10;
  //     background: rgba(0, 0, 0, 0.5);
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     border-radius: 5px;
  //     .van-loading__spinner {
  //       color: #fff;
  //     }
  //     .van-loading__text {
  //       color: #fff;
  //     }
  //   }
  // }
  // .van-cell-group {
  //   background: transparent;
  //   padding: 0.24rem;
  //   .van-cell__title {
  //     color: #abbddb;
  //     text-align: left;
  //   }
  //   .van-field__label {
  //     width: 2.2rem;
  //   }
  //   .van-cell {
  //     background-color: #3b4576;
  //   }
  //   .van-field__value,
  //   .van-field__control {
  //     color: #7388ab;
  //   }
  //   input::-webkit-input-placeholder {
  //     color: #7388ab;
  //   }
  // }

  // .btn {
  //   width: 100%;
  //   height: 0.9rem;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   color: #fff;
  //   font-size: 0.28rem;
  //   background: #e48e0b;
  //   border-radius: 5px;
  // }
}
</style>