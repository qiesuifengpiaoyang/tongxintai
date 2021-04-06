<template>
  <div class="helpdetail-wrapper">
    <van-nav-bar class="navbar" :border="false" title="医互帮详情" left-arrow @click-left="onClickLeft" />
    <div class="helpdetail-con">
      <p>同心台星级会员或普通会员，都要心存善念，助人自助的思想。医互帮是一人生病，众人相帮，今天我生病，大家来帮我；明天他生病，我们去帮他；感谢同心台的所有成员，感恩大家的善心助力。</p>
      <p>医互帮的进行原则是，每一次有会员生病，申请互帮后，我们的监督管理员到生病会员指定的医院陪同检查，并证实生病属实。上传医院需要治疗的费用，系统收到证明材料后，三分钟之内负责把需要的钱打到生病会员的指定卡上（晚上五点半至早上九点前，礼拜六、礼拜天可能会出现稍微慢点，最长时间不会超过半小时，医互帮设定24小时专线服务，确保同心台会员生病无忧。如重大疑难重病，同心台将会启动直升机俱乐部救助会员紧急就医，同心台将和国家部队医院紧密合作）。</p>
      <p>互帮款来历：比如我们所有会员，在医互帮系统每人预存30元互助款，假如我们有100万会员。如果某一位会员生病需要3万元医疗款，那么系统将会在每个会员的帐户里自动扣除3分钱，系统为了便于好计算（每次最低扣0.1元），大家轮流依次扣。</p>
      <van-checkbox class="lind" v-model="checkedStatus">我已经明白互助的方法，我同意并支持这种方式进行互帮</van-checkbox>
      <div class="helpdbtn" @click="sureCl">确定申请互帮</div>
    </div>
    <popup></popup>
  </div>
</template>
<script>
import qs from "qs";
import popup from "@/components/popup.vue";
export default {
  data() {
    return {
      id: null,
      pageshow: false,
      list: [],
      checkedStatus: false,
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain
    };
  },
    components: {
    popup
  },
  mounted() {},
  created() {
    var url = window.location.href; //获取网站的hash值
    var _page = url.split("?")[1]; //获取hash后面的数字
    //将获取的值转为数字,如果不能转换为数字，就将其默认为1
    if (_page) {
      this.id = parseInt(_page); //转为数字
    }
  },
  methods: {
    sureCl() {
      // this.$dialog({ message: '等待启动' });
      if (this.checkedStatus) {
        if (this.id) {
          this.$router.push(`/helpApply?${this.id}`);
        } else {
          this.$router.push(`/helpApply`);
        }
      } else {
        this.$toast("请勾选同意并支持进行互帮");
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.helpdetail-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  .helpdetail-con {
    text-align: left;
    font-size: 0.28rem;
    padding: 0.24rem;
    .lind {
      .van-checkbox__label {
        line-height: 1.1;
      }
    }
    p {
      line-height: 1.4;
      color: #000;
      margin-bottom: 0.5rem;
      text-align: justify;
    }
    .van-checkbox {
      .van-checkbox__icon {
        font-size: 0.2rem;
      }
      .van-checkbox__icon .van-icon {
        border: 1px solid #000;
      }
      .van-checkbox__label {
        font-size: 0.26rem;
      }
    }

    .helpdbtn {
      text-align: center;
      color: #fff;
      font-size: 0.3rem;
      margin-top: 0.5rem;
      background: #1989fa;
      border-radius: 10px;
      margin: 0.6rem 0;
      padding: 0.2rem 0;
    }
  }
}
</style>