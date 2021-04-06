<template>
  <div class="register-wrapper" v-cloak>
    <div class="logo"></div>
    <div class="login-form">
      <van-cell value="注册" :border="false" class="denglu" />
      <van-field
        v-model="mobile"
        label=""
        type="tel"
        placeholder="请输入您的手机号"
      />
      <!-- <van-field v-model="captcha_code" class="captcha-code" label="验证码" placeholder="验证码">
                <template #extra>
                    <img :src="captcha_code_img" alt="" v-if="!!captcha_code_img" class="captcha-code-img">
                </template>
            </van-field> -->
      <van-field
        v-model="phoneCode"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="postmess">{{
            phoneMess
          }}</van-button>
        </template>
      </van-field>
      <van-field v-model="pwd" label="" type="password" placeholder="密码" />
      <van-field v-model="yqcode" label="" placeholder="邀请码(必填)" />
      <!-- 12-1修改,增加注册收费功能 -->
      <!-- <div class="charge">
        <input type="button" value="前往注册缴费" @click="chongzhi"/>
      </div> -->
      <!-- <p class="agreement" @click="privacy">请仔细阅读《隐私协议》</p> -->
      <p class="agreement">
        <input type="checkbox"  v-model="abc" @click="abc = !abc" /><span @click="privacy"
          >我已阅读并同意《同心台服务协议及隐私协议》</span
        >
      </p>
      <div @click="registerFn" class="zhuce-btn">注册</div>
    </div>
    <div class="login-register" @click="loginRegister">登录</div>
    <popup></popup>
  </div>
</template>
<script>
import qs from "qs";
import axios from "@/tool/axios.js";
import { debounce } from "lodash-es";
import popup from "@/components/popup.vue";
export default {
  data() {
    return {
      abc:'',
      yqcode: this.$route.query.yqcode || "",
      mobile: "",
      phoneCode: "",
      pwd: "",
      times: 60,
      timeout: null,
      phoneMess: "获取验证码",
      isclick: false,
      apiUrl: this.$store.state.apiDomain,
      // pay:null,
    };
  },
  components: {
    popup
  },
  //获取接口的返回参数
  // created(){
  //   axios.post(`${this.apiUrl}/`).then((val)=>{
  //     let {data} = val;
  //     let {info,message,status} = data;
  //     //错误提示
  //     if(message != 1){
  //       this.$toast(`${message}`);
  //       return;
  //     }
  //     this.pay = info;
  //   })
  // },
  computed: {
    disabled() {
      return !(this.mobile && this.pwd && this.phoneCode && this.yqcode);
    },
  },
  // created() {
  //   var s = "djh.doiwe.esd.d.ddd0sdd.d.";
  //   var n = s.split("djh").length - 1;
  //   // document.write(n);
  // },
  mounted() {
    axios.get(`${this.apiUrl}/captchaSrc`).then((res) => {
      let { data } = res;
      if (data.status === 1) {
        this.captcha_code_img = data.info.src;
      } else {
        this.$toast(data.message);
      }
    });
  },
  methods: {
    privacy() {
      this.$router.push({
        name: "privacy",
      });
    },
    loginRegister() {
      this.$router.push("login");
    },
    registerFn() {
      let that = this;
      if (that.disabled) {
        return;
      }
      if(!that.abc){
        this.$toast('请先阅读并同意相关协议')
        return
      }
      const toast1 = that.$toast.loading({
        message: "注册中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .post(
          `${this.apiUrl}/register`,
          qs.stringify({
            mobile: this.mobile,
            pwd: this.pwd,
            yqcode: this.yqcode,
            phoneCode: this.phoneCode,
          })
        )
        .then((res) => {
          toast1.clear();
          let { data } = res;
          if (data.status === 1) {
            that.$router.replace("/");
          } else {
            that.$toast(data.message);
          }
        })
        .catch(() => {
          toast1.clear();
        });
    },
    postmess: debounce(
      function () {
        var t = this;
        if (!this.isclick) {
          axios
            .post(
              `${this.apiUrl}/smsSend`,
              qs.stringify({
                // axios.post(`https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/getCertification`,qs.stringify({
                mobile: t.mobile,
                type: "register",
              })
            )
            .then(function (e) {
              let { data } = e;
              if (data.status === 1) {
                t.$toast("发送成功");
              } else {
                clearInterval(t.timeout);
                t.$toast(data.message);
              }
            })
            .catch((error) => {
              clearInterval(t.timeout);
            });
          t.setTimes();
          // let top = document.body.scrollHeight || document.documentElement.scrollHeight;
          //     window.scrollTo({
          //         top,
          //         behavior: 'smooth'
          //     });
        }
      },
      5000,
      { leading: true, trailing: false }
    ),
    setTimes: function () {
      let t = this;
      t.timeout = setInterval(function () {
        t.times > 0
          ? (t.times--, (t.phoneMess = t.times + "s"), (t.isclick = !0))
          : ((t.times = 60),
            clearInterval(t.timeout),
            (t.isclick = !1),
            (t.phoneMess = "获取验证码"));
      }, 1e3);
    },
  },
  watch: {
    disabled() {},
  },
};
</script>
<style lang="scss">
.register-wrapper {
  background: #fbbb5f;
  min-height: 100vh;
  overflow: hidden;
  .logo {
    width: 2rem;
    height: 2rem;
    margin: 0.7rem auto;
  }
  //注册费用
  .charge {
    font-size: 0.234rem;
    margin-top: 0.2rem;
    padding-left: 16px;
    text-align: left;
    & input {
      padding: 0.05rem 0.2rem;
      border: 1px solid #999;
      border-radius: 0.1rem;
      background: #fbbb5f;
      color: #333;
    }
  }
  .agreement {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    padding-left: 16px;
    font-size: 0.28rem;
    text-align: left;
    // color: rgb(107, 110, 253);
    color: rgb(0, 4, 255);
    & > span {
      padding-left: 0.2rem;
      // text-decoration: underline;
    }
  }
  .zhuce-btn {
    color: #fff;

    background: #42cbfd;
    border-radius: 5px;
    /* padding: 0.1rem 0; */
    margin-top: 0.5rem;
    font-size: 0.3rem;
    height: 0.8rem;
    /* line-height: 1; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-form {
    background-color: #fff;
    margin: 0 0.24rem;
    padding: 0.24rem;
    border-radius: 5px;
    .van-cell__value--alone {
      font-size: 0.4rem;
    }
    .van-field__control {
      font-size: 0.28rem;
    }
    .captcha-code {
      padding-right: 0;
      .van-cell__title {
        text-align: left;
        width: 0.7rem;
      }
      .captcha-code-img {
        width: 1rem;
      }
      > div {
        align-self: center;
      }
    }
    .sign-in-btn {
      color: #fff;

      background: #42cbfd;
      border-radius: 5px;
      /* padding: 0.1rem 0; */
      margin-top: 0.5rem;
      font-size: 0.3rem;
      height: 0.8rem;
      /* line-height: 1; */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .login-register {
    border: 2px solid #7489ac;
    color: #7489ac;
    border-radius: 5px;
    margin: 0 0.24rem;
    /* padding: 0.1rem 0; */
    margin-top: 0.5rem;
    background: transparent;
    font-size: 0.3rem;
    height: 0.8rem;
    /* line-height: 1; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>