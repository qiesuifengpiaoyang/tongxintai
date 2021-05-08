<template>
  <div class="plan-wrapper">
    <van-nav-bar class="navbar" :border="false" title="销售" />
    <van-tabs type="card">
      <van-tab title="销售业绩">
        <div v-show="!!pageshow">
          <div class="plan-1-list">
            <!-- 21-5-5修改，连同原接口信息一并舍弃 -->
            <!-- <van-field
              label="贷款金额:"
              v-if="parseInt(total_money) === 0"
              :border="false"
              placeholder="输入贷款金额"
              v-model="btvalue"
              class="bt-input mb10"
            >
              <template #button>
                <span class="right-sj" @click="dksjFn">提交</span>
              </template>
            </van-field> -->
            <van-cell class="lv-input" :border="false">
              <template>
                <div class="content">
                  <span @click="goNoticeBtn">《用户须知》必读</span>
                  <!-- <span class="custom-title">销售总计划：</span>
                                    <span>{{total_money}}</span>
                                    <img :src="icon" alt="" class="right-icon"> -->
                </div>
                <!-- 21-4-30修改-待定 -->
                <!-- 21-5-5修改，展示用户等级信息取login的title -->
                <div
                  class="right-sj"
                  @click="lvsjFn(1)"
                  v-if="levels[0] === title"
                >
                  <!-- 21-5-5修改，暂时去掉图标显示，后续再添加 -->
                  <!-- <img :src="icon" alt="" class="right-icon" /> -->
                  {{ title }}
                </div>
                <!-- 21-5-5修改，这是原判定方式：v-else-if="level !== 0 && level !== 10" -->
                <div
                  class="right-sj"
                  @click="lvsjFn(2)"
                  v-else-if="
                    levels[0] !== title && levels[levels.length - 1] !== title
                  "
                >
                  <!-- 21-5-5修改，暂时去掉图标显示，后续再添加 -->
                  <!-- <img :src="icon" alt="" class="right-icon" /> -->
                  {{ title }}
                </div>
                <div
                  class="right-sj"
                  v-else-if="levels[levels.length - 1] === title"
                >
                  <!-- 21-5-5修改，暂时去掉图标显示，后续再添加&&level === 10这是原判定方式 -->
                  <!-- <img :src="icon" alt="" class="right-icon" /> -->
                  {{ title }}
                </div>
                <!-- 加盟商 -->
              </template>
            </van-cell>
            <!-- <van-field  label="销售总业绩:" :border="false" :value="`${income} 积分`" class="bt-input mb10">
                        </van-field> -->
          </div>
          <div class="plan-3-list">
            <div class="it2b">
              <!-- <p class="it1">销售总业绩:<span>{{income}} <small>积分</small></span></p> -->
              <p>电消“销”互帮创富平台</p>
              <p>把“零售价”消费变成“批发价”消费，省钱即赚钱。</p>
              <p>把“现有资源”通过娱乐方式变成“万能直播”让人人可致富。</p>
              <p>
                你参与的各个消费区域或工作区域，当自己遇到困难或生病时，会组织力量全力帮你吗？【同心台】消费互帮，聚万众之力、解人人之忧。
              </p>
            </div>

            <!-- <div class="list-box">
                            <div class="item" v-for="(item, index) in listarr" :key="index">
                                <div class="left">{{item.le}}</div>
                                <div class="center">
                                    <van-progress :percentage="item.pe" stroke-width="8" :show-pivot="false"/>
                                </div>
                                <div class="right">{{item.tx}}</div>
                            </div>
                        </div> -->
          </div>
        </div>
      </van-tab>
      <van-tab title="当日业绩">
        <van-empty description="暂无数据" />
      </van-tab>
    </van-tabs>
    <popup></popup>
    <Footer :isActive="isActive" />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
import qs from "qs";
export default {
  data() {
    return {
      isActive: 2,
      active: 0, //21-5-5修改，舍弃
      pageshow: false,
      btvalue: "",
      total_money: 0,
      icon: null,
      each_level_progress: null,
      income: 0,
      level: null,
      tips: null,
      listarr: null,
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      //21-5-5修改
      title: sessionStorage.getItem("title"), //用户等级
      levels: [], //等级体系表
    };
  },
  components: {
    Header,
    Footer,
    popup,
  },
  mounted() {
    // this.firstAPi();//21-5-5修改，废弃，说的是这接口没什么有用的东西
    this.firstAPi2();
  },
  methods: {
    //《合伙人告知》必读
    goNoticeBtn() {
      // this.$router.push({
      //     name:'notice'
      // })
    },
    dksjFn() {
      axios
        .post(
          `${this.apiUrl}/addCrowdFundingPlan`,
          qs.stringify({ money: this.btvalue })
        )
        .then((res) => {
          let { data } = res;
          if (data.status === 1) {
            this.total_money = this.btvalue;
            this.$toast("贷款金额，提交成功");
          } else {
            this.$toast(data.message);
          }
        });
    },
    lvsjFn(n) {
      if (!!this.tips) {
        this.$toast(this.tips);
        return;
      }
      if (n === 1) {
        this.$dialog
          .confirm({
            title: "提示",
            message: `是否确认激活成为${this.levels[1]}？`,
          })
          .then((res) => {
            //21-5-5修改，舍弃
            // if (this.active === 1) {
            this.$router.push("/toPay");
            // }
          })
          .catch(() => {});
      } else if (n === 2) {
        this.$dialog
          .confirm({
            title: "提示",
            // message: `是否从${this.level <= 1 ? '加盟商' : '复消' + this.level}提升到复消${this.level+1}？`,
            // message: `是否从复消${this.level}到复消${this.level + 1}？`,//21-5-5修改，等级体系变化
            message: `是否从${this.title}到${
              this.levels[this.levels.indexOf(this.title) + 1]
            }？`,
          })
          .then((res) => {
            this.$router.push("/toPay");
          })
          .catch(() => {});
      }
    },
    // firstAPi(){
    //     axios.get(`${this.apiUrl}/getCrowdFundingPlan`)
    //     .then((res) => {
    //         let {data} = res;
    //         if(data.status === 1){
    //             this.pageshow = true;
    //             this.active = data.info.active;//标识？
    //             this.level = data.info.level;//等级
    //             this.tips = data.info.tips;
    //             this.total_money = data.info.total_money;//贷款
    //             this.icon = `${this.staticUrl}${data.info.icon}`;
    //             this.each_level_progress = data.info.each_level_progress;
    //             this.income = data.info.income;
    //             this.max_level  = data.info.process.max_level;
    //             this.eachLevelMoney = data.info.process.eachLevelMoney
    //             this.listarr = this.listarrFn(this.eachLevelMoney, data.info.each_level_progress);
    //         }else{
    //             this.$toast(data.message)
    //         }
    //     })
    // },
    firstAPi2() {
      axios.get(`${this.apiUrl}/constInfo`).then((res) => {
        let { data } = res;
        if (data.status === 1) {
          this.pageshow = true;
          this.levels = data.info.level;
        }
        console.log(this.levels, data.info.level);
      });
    },
    listarrFn(arrlevel, objlevel) {
      let arr = [];

      for (let prop in arrlevel) {
        let obj = Object.create(null);
        obj.max = arrlevel[prop];
        obj.le = `第${this.toChinesNum([prop])}关`;
        obj.min = objlevel[+prop + 1] || 0;
        obj.tx = `${obj.min}/${obj.max}`;
        obj.pe = (obj.min / obj.max).toFixed(2) * 100;
        arr.push(obj);
      }
      return arr;
    },
    toChinesNum(A) {
      return ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"][A];
    },
  },
  // filters:{
  //     changess(res){
  //         if(res == 1){
  //             return '加盟商';
  //         }
  //         if(res == 2){
  //             return '复消' + res
  //         }
  //     }
  // }
};
</script>
<style lang="scss">
.plan-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  .van-tabs__content {
    padding: 0.2rem;
  }
  .van-tabs {
    margin-top: 0.24rem;
  }
  .van-tabs__wrap {
    .van-tabs__nav--card {
      margin: 0 10px;
    }
  }
  .van-tabs__nav--card {
    border: 1px solid #ff8c19;
    background: transparent;
  }
  .van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #ff8c19;
    color: #252d41;
  }
  .van-tabs__nav--card .van-tab {
    color: #7b4004;
    border: 0;
  }
  .plan-1-list {
    margin-top: 0.3rem;
    .bt-input {
      // width: 82%;
      margin: 0 auto 0.24rem;
      background-color: #7d5227;
      border-radius: 5px;
      display: flex;
      padding: 0.1rem 0.24rem;

      justify-content: space-between;
      border: 0;
      .van-field__label {
        width: auto;
        padding-right: 0.24rem;
      }
      .van-cell__title {
        color: #7489ac;
        text-align: left;
      }
      .van-field__control {
        color: #35bffd;
        font-size: 0.24rem;
      }
      input::-webkit-input-placeholder {
        color: #35bffd;
      }
      .right-sj {
        // height: 200px;
        display: flex;
        align-items: center;
        color: #35bffd;
      }
    }
    .lv-input {
      // width: 82%;
      margin-bottom: 0.2rem;
      background-color: #7d5227;
      border-radius: 5px;
      display: flex;
      padding: 0.1rem 0.24rem;
      justify-content: space-between;
      .van-cell__value {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .custom-title {
        color: #7489ac;
      }
      .content {
        color: #35bffd;
        display: flex;
        align-items: center;
        img {
          margin-left: 0.1rem;
        }
      }
      .van-field__control {
        color: #35bffd;
      }
      .right-sj {
        color: #35bffd;
      }
      .right-icon {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
  .plan-3-list {
    overflow: hidden;
    margin-top: 0.3rem;

    .it1 {
      font-size: 0.24rem;
      margin-bottom: 0.24rem;
      span {
        color: #ee0a24;
        font-weight: 500;
        margin-left: 0.2rem;
        font-size: 0.4rem;
      }
      small {
        font-size: 0.2rem;
      }
    }
    .it2b {
      background: #fff;
      border-radius: 5px;
      padding: 0.2rem;
      p {
        color: #020202;
        font-size: 0.24rem;
        text-align: left;
        line-height: 1.6;
      }
    }
    .list-box {
      margin: 0.24rem 10px;
      background-color: #7d5227;
      border-radius: 5px;
      padding: 0.24rem;
      color: #abbddb;
      .item {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        margin-bottom: 0.25rem;
        &:last-child {
          margin-bottom: 0;
        }
        .left {
          margin-right: 0.2rem;
        }
        .center {
          flex: 1;
          .van-progress {
            background: transparent;
            border: 1px solid #ff8c19;
            border-radius: 1px;
            .van-progress__portion {
              background: #ff8c19;
              border-radius: 1px;
            }
          }
        }
        .right {
          width: 2rem;
          text-align: left;
          padding-left: 0.1rem;
          color: #35bffd;
        }
      }
    }
  }
}
</style>