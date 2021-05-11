<template>
  <div class="recharge-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="充值"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-if="pageshow">
      <div class="re-hed">
        <div class="re-hed-1" v-if="idshow">
          <span class="bm">{{ reqTitle }}</span>
        </div>
        <div class="re-hed-2" v-else>
          <van-dropdown-menu active-color="#ee0a24">
            <van-dropdown-item v-model="type" :options="option1" />
          </van-dropdown-menu>
        </div>
      </div>
      <van-cell-group class="re-con">
        <van-cell-group>
          <van-field
            v-model="sess_name"
            label="姓名"
            placeholder="请输入姓名"
            :readonly="readonly"
          />
          <van-field
            v-model="sess_carid"
            label="身份证号码"
            placeholder="请输入身份证号码"
            :readonly="readonly"
          />
          <!-- <van-field v-model="sess_moeny" label="余额" placeholder="请输入余额" :readonly="readonly" v-if="moenyshow">
                         <template #button>
                            元
                        </template>
          </van-field>-->
        </van-cell-group>
      </van-cell-group>
      <!-- <div class="re-txt">
        <p>充值金额?</p>
        <p>建议您充值120元以上，避免频繁充值。</p>
      </div> -->
      <!-- 公约 -->
      <div class="convention" v-if="treatyIf">
        <input type="checkbox" v-model="treatyCheckbox">
        <span @click="treatyBtn">{{ treatyTitle }}</span>
      </div>
      <van-notice-bar
        v-if="inform1"
        class="tipsd"
        :scrollable="false"
        :wrapable="true"
        left-icon="volume-o"
        text="康养帮和老互帮必须要一起充值才能够享受其中一项"
      />
      <!-- <p class="tipsd">康养帮和老互帮必须要一起充值才能够享受其中一项</p> -->
      <ul class="re-list">
        <li v-for="(val, key, index) in colyue[diji]" :key="key">
          <div
            @click="remoneyCl(key, index)"
            :class="[
              inde === index + 1 ? 'on' : '',
              're-in-0',
              `re-in-${index + 1}`,
            ]"
            v-if="key < '999999'"
          >
            <i v-if="val === '首充'">推荐</i>
            <!-- <i v-if="index === 1">推荐</i> -->
            <span>{{ key }}</span>
            <span>
              {{ val }}
              <!-- <span v-if="index === 0">每次</span>
              <span v-if="index === 1">首充</span>
              <span v-if="index === 2">每次</span> -->
            </span>
          </div>
          <div
            @click="remoneyCl(key, index)"
            :class="[
              inde === index + 1 ? 'on' : '',
              're-in-0',
              `re-in-${index + 1}`,
            ]"
            v-if="key === '999999'"
          >
            <van-field
              @input="inpCl"
              v-model="mangl"
              placeholder="更多金额"
              ref="moremoneyInp"
            />
          </div>
        </li>
      </ul>
      <type-pay :radio="paytype" @onRadiocl="onRadiocl" />
      <div class="btn" @click="btnCl">立即支付</div>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 输入登录密码 -->
    <div class="passwordBox" v-if="passwordBoxState">
      <div class="password">
        <p>请验证登录密码</p>
        <input
          type="text"
          v-model="password"
          placeholder="请输入您的登录密码用来验证！"
        />
        <div class="passwordSelect">
          <input
            type="button"
            value="取消"
            @click="passwordBoxState = !passwordBoxState"
          />
          <input type="button" value="确定" @click="passwordBtn" />
        </div>
      </div>
    </div>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import TypePay from "@/components/typepay.vue";
import popup from "@/components/popup.vue";
import qs from "qs";
export default {
  data() {
    return {
      passwordBoxState: false, //【登陆密码验证】弹窗
      password: "", //验证登录密码
      mangl: "", //自定义充值金额
      treatyIf: false, //条约
      diji: parseInt(this.$route.query.type) || 1,
      rtype: this.$route.query.type,
      inform1: false, //提示——这个提示是 康养帮和 老互帮才显示
      treatyTitle: "", //公约的题目——现在有两个公约
      routerPath: "", //不同的公约有不同的内容
      treatyCheckbox:false,//公约条款前面的选择框
      // jjb: false,//紧急帮
      jr: false,
      // cs: false,
      pageshow: false,
      list: [],
      moremoney: "",
      type: 0,
      option1: [{ text: "请选择互助类型", value: 0 }],
      id: 0,
      idshow: false,
      readonly: false,
      reqTitle: "",
      sess_name: "",
      sess_carid: "",
      sess_moeny: "",
      moenyshow: true,
      money: 0,
      inde: 2,
      user_id: "",
      // pickerTxt:'请选择互助类型',
      showPicker: false,
      columns: [],
      colyue: {},
      paytype: "1",
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      toast1: "",
    };
  },
  components: {
    TypePay,
    popup,
  },
  updated() {
    console.log(this.treatyCheckbox,'treatyCheckbox');
    //通知的显示
    this.$route.query.type ||
    this.type == 1 ||
    this.$route.query.type ||
    this.type == 2
      ? (this.inform1 = true)
      : (this.inform1 = false);
    //是否显示条约
    // this.type == 1 ? (this.treatyIf = true) : (this.treatyIf = false);
    if (this.type == 1) {
      this.treatyIf = true;
      this.treatyTitle = "《康养帮公约》参与者必读";
      this.routerPath = "convention";
    } else if (this.type == 3) {
      this.treatyIf = true;
      this.treatyTitle = "《终互帮公约》参与者必读";
      this.routerPath = "endHelp";
    } else {
      this.treatyIf = false;
    }
  },
  created() {
    console.log(this.$route.query);
  },
  mounted() {
    if (this.$route.query.fr === "applyhelp") {
      this.sess_carid = sessionStorage.getItem("card_id");
      this.sess_name = sessionStorage.getItem("name");
      this.sess_moeny = sessionStorage.getItem("available_amount");
      this.id = this.$route.query.id;
      this.idshow = true;
      this.readonly = true;
      this.type = this.$route.query.type;
      this.reqTitle = decodeURIComponent(this.$route.query.text);
    } else if (this.$route.query.fr === "dibu") {
      this.readonly = false;
      this.moenyshow = false;
    } else if (this.$route.query.fr === "topbu") {
      this.sess_carid = this.$route.query.card_id;
      this.sess_name = decodeURIComponent(this.$route.query.name);
      this.sess_moeny = this.$route.query.available_amount;
      this.id = this.$route.query.id;
      this.idshow = true;
      this.readonly = true;
      this.type = this.$route.query.type;
      this.reqTitle = decodeURIComponent(this.$route.query.text);
    }
    if (this.sess_carid) {
      this.jr = true;
    } else {
      this.jr = false;
    }

    this.firstApi();
  },

  methods: {
    //公约
    treatyBtn() {
      this.$router.push(`${this.routerPath}`);
    },
    onRadiocl(o) {
      this.paytype = o;
    },
    firstApi() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      Promise.all([
        axios.get(`${that.apiUrl}/ehelp`),
        axios.get(`${that.apiUrl}/getChargeMoney`),
      ]).then((res) => {
        let [ehelp, getChargeMoney] = res;
        that.pageshow = true;
        toast1.clear();
        if (ehelp.data.status === 1) {
          try {
            that.reqId = that.$route.query.reqId;
            if (that.reqId) {
              that.reqTitle = JSON.parse(sessionStorage.getItem("reobj")).text;
              that.type = JSON.parse(sessionStorage.getItem("reobj")).type;
            }
          } catch (e) {
            console.log(e);
          }
          if (Array.isArray(ehelp.data.info)) {
            ehelp.data.info.map((item, index) => {
              let obj = Object.create(null);
              obj.text = item.title;
              obj.value = item.id;
              that.option1.push(obj);
            });
          }
        } else {
          that.$toast(ehelp.data.message);
        }
        if (getChargeMoney.data.status === 1) {
          that.colyue = getChargeMoney.data.info;
          let diji = parseInt(this.$route.query.type);
          if (that.colyue.hasOwnProperty(diji)) {
            this.diji = diji;
          } else {
            this.diji = 1;
          }
          // let info = getChargeMoney.data.info;
          // let ids = parseInt(this.$route.query.type);// || that.type
          // console.log(ids,info);
          // if (info.hasOwnProperty(ids)) {
          //   that.colyue = info[ids];
          // } else {
          //   that.colyue = info[1];
          // }
          for (var item in that.colyue[this.diji]) {
            if (that.colyue[this.diji][item] == "首充") {
              that.money = item;
            }
          }

          // let info = getChargeMoney.data.info;
          // let ids = parseInt(this.$route.query.id);
          // console.log(ids);
          // if (ids) {
          //   // this.jjb = true;
          //   if (info.hasOwnProperty(ids)) {
          //     this.diji = ids;
          //   } else {
          //     this.diji = 1;
          //   }
          // }
          // for (var item in info[this.diji]) {
          //   if (info[this.diji][item] == "首充") {
          //     that.money = item;
          //   }
          // }
          // Object.keys(info[this.diji]).map((item, index) => {
          //   if (index === 1) {
          //     that.money = item;
          //   }
          // });

          // that.colyue = info;
        } else {
          that.$toast(getChargeMoney.data.message);
        }
      });
      // console.log(this.diji, "diji");
    },
    f1() {
      let that = this;
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${that.apiUrl}/recharge`,
            qs.stringify({
              money: that.money,
              id: that.id,
              type: that.type,
              username: that.sess_name,
              id_card: that.sess_carid,
            })
          )
          .then((res) => {
            let { data } = res;
            if (data.status === 1) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    f2(o) {
      // window.location.href="http://test.tongxintailm.com/api/alipayWeb?out_trade_no=EC2020072511082213394";
      // return ;
      // let that = this;
      // let info = o.info;
      // if(info.out_trade_no){
      //     let out_trade_no = info.out_trade_no;
      //     return axios.get(`${that.apiUrl}/alipayWeb`,{params:{out_trade_no}})
      // }else{
      //     that.$toast('支付异常，请重新支付')
      // }
    },
    async btnCl() {
      let that = this;
      if (!that.type) {
        that.$toast("请选择类型");
        return;
      }
      if (!that.sess_carid) {
        that.$toast("请输入互助人身份证");
        return;
      }
      if (!that.sess_name) {
        that.$toast("请输入互助人姓名");
        return;
      }
      if (!that.money) {
        that.$toast("请输入金额");
        return;
      }
      if (!that.paytype) {
        that.$toast("请选择支付方式");
        return;
      }
      if (that.paytype == 3) {
        // that.passwordBoxState = !that.passwordBoxState;
      } else {
        let title = "提示";
        let message = "是否确认本次操作";
        console.log(that.diji, "diji");
        console.log(that.type, "type");
        if (that.diji == 3 || that.type == 3) {
          title = "终互帮爱心安慰卡";
          message =
            "本卡是【同心台】平台终互帮服务专用卡，持有本卡，在后台一直保持有爱心值不低于5个余值。在亲人不幸逝世，平台按着“终互帮公约”，动员全平台“终互帮”所有余值的成员，向亲人逝世家庭贡献爱心值（平台给现金）进行集体安慰。详情见“终互帮公约”";
        }
        that.$dialog
          .confirm({
            title: `${title}`,
            message: `${message}`,
          })
          .then(() => {
            that.toast1 = that.$toast.loading({
              message: "提交中...",
              forbidClick: true,
              duration: 0,
            });
            that.postRecharge();
          })
          .catch(() => {});
      }
    },
    //登陆密码验证确认键
    passwordBtn() {
      if (!this.password) {
        this.$toast("请输入登陆密码！");
        return;
      }
      this.postRecharge();
    },
    postRecharge() {
      let that = this;
      that.toast1 = that.$toast.loading({
        message: "提交中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .post(
          `${that.apiUrl}/recharge`,
          qs.stringify({
            money: that.money,
            id: that.id,
            type: that.type,
            password: that.password,
            username: that.sess_name,
            id_card: that.sess_carid,
            paytype: that.paytype,
          })
        )
        .then((res) => {
          that.passwordBoxState = false;
          let { data } = res;
          that.toast1.clear();
          if (data.status === 1 && that.paytype != 3) {
            window.location.href = data.info.direct_url;
            that.$toast(`${data.message}`);
          } else {
            that.$toast(`${data.message}`);
          }
        })
        .catch((error) => {
          that.toast1.clear();
          that.$toast(JSON.stringify(error));
        });
      // try{
      // let a = await this.f1();
      // let b = await this.f2(a);
      // }catch(e){
      //     if(e.status === 0){
      //         that.$toast(e.message)
      //     }else{
      //         that.$toast(JSON.stringify(e));
      //     }

      // }
    },
    onConfirm(e) {
      this.showPicker = false;
      this.pickerTxt = e.text;
      this.type = e.type;
    },
    pickerCl() {
      this.showPicker = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    inpCl(val) {
      this.money = this.mangl;
    },
    remoneyCl(type, n) {
      console.log(type, n);
      let that = this;
      that.inde = n + 1;
      if (type !== "999999") {
        that.money = type;
        that.mangl = "";
      } else {
        that.money = "";
      }
    },
  },

  watch: {
    type: {
      handler(val) {
        // //是否显示条约
        // val == 1 ? (this.treatyIf = true) : (this.treatyIf = false);
        //类型不同，显示的充值额度不同
        if (this.colyue.hasOwnProperty(val)) {
          this.diji = val;
        } else {
          this.diji = 1;
        }
        //切换后的充值金额
        this.inde = 2;
        this.mangl = "";
        for (var item in this.colyue[this.diji]) {
          if (this.colyue[this.diji][item] == "首充") {
            this.money = item;
            console.log(item);
          }
        }
        // this.remoneyCl()
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
.recharge-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #f0f0f7;
  font-size: 0.26rem;
  .tipsd {
    position: relative;
    padding: 0.2rem;
    color: #ed6a0c;
    background-color: #fffbe8;
    font-size: 0.24rem;
    text-align: center;
    margin-bottom: 0.5rem;
    .van-icon {
      min-width: 0.2rem;
      font-size: 0.3rem;
      margin-right: 0.1rem;
    }
  }
  .cellradiolist {
    margin-top: 0.3rem;
    text-align: left;
    .alipay {
      color: #1989fa;
    }
    .wechat {
      color: #07c160;
    }
  }
  .re-hed {
    .re-hed-2 {
      text-align: left;
      padding: 0.2rem;
    }
    .re-hed-1 {
      padding: 0.2rem;
      font-size: 0.26rem;
      text-align: left;
      display: flex;
      align-items: center;
      span {
        line-height: 1;
      }
      span.mn {
        border-radius: 4px;
        background-image: -webkit-linear-gradient(
          0deg,
          #e48e0b 0,
          #f9ae3c 100%
        );
        color: #fff;
        font-size: 0.18rem;
        display: flex;
        align-items: center;
        padding: 0.1rem;
      }
    }
  }
  .re-con {
    input {
      text-align: right;
    }
    .van-cell__title {
      text-align: left;
    }
    .van-field__button {
      color: #323233;
    }
  }
  .re-txt {
    padding: 0 0.2rem;
    margin: 0.3rem 0;
    text-align: left;
    font-size: 0.24rem;
    color: #6d6d72;
  }
  //康养帮公约
  .convention {
    color: rgb(0, 174, 255);
    font-weight: bold;
    margin: 10px 0;
    text-align: left;
    & > span {
      display: inline-block;
      padding: 0 10px;
      font-size: 0.3rem;
    }
  }
  .re-list {
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    display: flex;
    flex-wrap: wrap;
    font-size: 0.24rem;
    li {
      flex-basis: 33.3%;
      padding: 0 0.2rem 0.2rem 0;
      &:nth-child(3n + 3) {
        padding-right: 0;
      }
    }
    .re-in-0 {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #fff;
      position: relative;
      border: 1px solid #eee;
      height: 1rem;
      &.on {
        border: 1px solid #e48e0b;
        color: #e48e0b;
      }
    }
    .re-in-2 {
      i {
        background: #e48e0b;
        color: #fff;
        font-size: 0.1rem;
        padding: 0.05rem;
        border-radius: 2px;
        line-height: 1;
        position: absolute;
        top: -0.05rem;
        left: -0.05rem;
        z-index: 2;
      }
    }
    .re-in-4 {
      .van-cell {
        padding: 0;
        font-size: 0.24rem;
        line-height: 1.2;
      }
      .van-field__control {
        text-align: center;
      }
    }
  }
  input::-webkit-input-placeholder {
    color: #2c3e50;
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.28rem;
    background: #e48e0b;
  }
  //验证登录密码
  .passwordBox {
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba($color: #000000, $alpha: 0.3);
    .password {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vw;
      padding-top: 0.3rem;
      border-radius: 0.2rem;
      background-color: #fff;
      overflow: hidden;
      p {
        font-size: 0.3rem;
        font-weight: bold;
      }
      & > input {
        width: 85%;
        border: 1px solid #999;
        padding: 0.1rem 0.2rem;
        border-radius: 0.15rem;
        margin-top: 0.5rem;
      }
      .passwordSelect {
        width: 100%;
        margin-top: 0.7rem;
        border-top: 1px solid #eee;
        & input {
          width: 50%;
          padding: 0.2rem 0;
          background-color: transparent;
          &:nth-child(1) {
            border-right: 1px solid #eee;
          }
          &:nth-child(2) {
            color: red;
          }
        }
      }
    }
  }
}
</style>