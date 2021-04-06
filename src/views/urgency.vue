<template>
  <div class="helpapply-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="紧急帮申请"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 推荐人信息 -->
    <div class="van-field__control">
      <p class="ce_tit">推荐人员信息：</p>
      <van-field
        :border="false"
        class="mb10 br5"
        label="推荐人姓名"
        :value="recommender_name"
        placeholder="推荐人姓名"
        readonly
      />
      <van-field
        :border="false"
        class="mb10 br5"
        label="推荐人电话"
        :value="recommender_phone"
        placeholder="联系电话"
        readonly
      />
      <p class="ce_tit">信息填写：</p>
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="money"
        label="借款金额"
        placeholder="请输入借款金额"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="diseasedesc"
        label="借款理由"
        rows="2"
        autosize
        maxlength="100"
        show-word-limit
        type="textarea"
        placeholder="请输入借款理由"
      />

      <p class="ce_tit">指定收款人：</p>
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_name"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_h_name"
        label="银行名称"
        placeholder="请输入银行名称"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_h_adress"
        label="开户行地址"
        placeholder="请输入开户行地址"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        :value="appoint_account"
        label="银行帐号"
        readonly
        clickable
        @touchstart.native.stop="appointkshow = true"
        placeholder="请输入银行帐号"
      />
      <van-field
        class="mb10 br5"
        :border="false"
        v-model="appoint_phone"
        label="联系电话"
        placeholder="请输入联系电话"
      />
      <div class="helpdbtn" @click="applyCl">正式申请</div>
    </div>
    <van-number-keyboard
      :show="appointkshow"
      :maxlength="30"
      v-model="appoint_account"
      @blur="appointkshow = false"
    />
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
import qs from "qs";
export default {
  data() {
    return {
        appoint_account: "",
        appointkshow: false,
      // 推荐人信息
      recommender_name: "", //推荐人——姓名
      recommender_phone: "", //推荐人——联系电话
      //指定收款人
      appoint_name: "", //收款人姓名
      appoint_h_name: "", //银行名称
      appoint_h_adress: "", //开户地址
      appoint_account: "", //银行帐号
      appoint_phone: "", //联系电话
      money: "", //需要费用
      diseasedesc: "", //病情描述
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
    };
  },
    components: {
    popup
  },
  created() {
    this.recommender_name=sessionStorage.getItem("recommender_name");
    this.recommender_phone=sessionStorage.getItem("recommender_phone");
  },
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    //正式申请
    applyCl() {
      if (!this.recommender_name) {
        this.$toast("推荐人姓名不能为空");
        return;
      }
      if (!this.recommender_phone) {
        this.$toast("推荐人联系电话不能为空");
        return;
      }
      if (!this.money) {
        this.$toast("请填写需要费用");
        return;
      }
      if (!this.diseasedesc) {
        this.$toast("请填写病情描述");
        return;
      }
      if (!this.appoint_name) {
        this.$toast("请填写收款人姓名");
        return;
      }
      if (!this.appoint_h_name) {
        this.$toast("请填写银行名称");
        return;
      }
      if (!this.appoint_h_adress) {
        this.$toast("请填写开户地址");
        return;
      }
      if (!this.appoint_account) {
        this.$toast("请填写银行帐号");
        return;
      }
      if (!this.appoint_phone) {
        this.$toast("请填写联系电话");
        return;
      }
      
      axios
        .post(
          `${this.apiUrl}/report`,
          qs.stringify({
            type: 5,
            user_city_name: this.recommender_name,
            user_city_id_phone: this.recommender_phone,
            money: this.money,
            diseasedesc: this.diseasedesc,
            appoint_name: this.appoint_name,//收款人姓名
            appoint_h_name: this.appoint_h_name,//	收款人银行名称
            appoint_h_adress: this.appoint_h_adress,//收款人开户行地址
            appoint_account: this.appoint_account,//收款人银行账号
            appoint_phone: this.appoint_phone,//收款人联系电话
            name: "",
            user_id: "",
            diseasename: "",
            permanent_address: "",
            diseaseimg: "",
            appointj_name: "",
            appointj_h_name: "",
            appointj_adress: "",
            appointj_account: "",
            appointj_phone: "",
            user_city_name_2: "",
            user_city_id_phone_2: "",
          })
        )
        .then((res) => {
          let { data } = res;
          if (data.status === 1) {
            this.$dialog
              .alert({
                message: "提交成功",
              })
              .then(() => {
                // on close
                this.$router.push("/helpCenter");
              });
          } else {
            this.$dialog
              .alert({
                message: `提交失败-${data.message}`,
              })
              .then(() => {
                // on close
              });
          }
        });
    },
  },
};
</script>
<style lang="scss">
.helpapply-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  font-size: 14px;

  .ce_tit {
    font-size: 0.3rem;
    text-align: left;
    margin: 0.3rem 0;
    small {
      font-size: 0.22rem;
    }
  }
  .van-field__control {
    color: #7388ab;
    & .mb10 {
      background-color: #3b4576;
    }
  }
  .van-cell__title,
  .van-field__label {
    color: #abbddb;
  }
  .helpdbtn {
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    margin-top: 0.5rem;
    background: #1989fa;
    border-radius: 10px;
    margin: 0.6rem 0.2rem;
    padding: 0.26rem 0;
    line-height: 1;
  }
}
</style>