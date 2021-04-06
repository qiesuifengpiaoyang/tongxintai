<template>
  <div class="helpdetails-wrapper">
    <van-nav-bar class="navbar" :border="false" title="互帮系统" left-arrow @click-left="onClickLeft" />
    <div class="helpdetails-con">
      <p>互帮系统：是四川省圆又缘网络科技有限公司，经市场监督管理局批准，允许一个单位内部使用本软件的公司成员，在双方自愿遵守“单位”制定的互助协议而开展的内部互助方式。互助系统的目的，旨在解决公司员工及家人在遇到困难时，公司通过组织全体员工及家人共同出力，去帮助遇到困难的员工；通过人人出资金的方式，帮助困境方渡过危机。而所有互助的资金都是公司员工根据公司规定自愿预存在公司互帮系统的资金。公司根据系统设计，一人有难，万人帮忙的形式，在每个员工预存资金上平均扣除，然后去帮助困难员工及会员。</p>
      <div v-if="id == 5">
        <p>紧急帮说明：</p>
        <span>可借款细则说明：</span>
        <br />
        <span>借款条件：</span>
        <ul class="jktj">
          <li v-for="(item, index) in jktj" :key="item + index">
            <div>
              <span v-if="item.ds == '代数'">管理</span>
              <span v-else-if="index === 1">1</span>
              <span v-else-if="index === 2">2</span>
              <span v-else-if="index === 3">3</span>
              <!-- {{item[index].ds}} -->
            </div>
            <div>{{ item.rs }}</div>
          </li>
        </ul>
        <span>注：以上以【充值为准】</span>
        <br />
        <br />
        <span>借款金额：</span>
        <ul class="jktj">
          <li v-for="(item, index) in jkje" :key="item + index">
            <div>{{ item.dj }}</div>
            <div>{{ item.je }}</div>
          </li>
        </ul>
        <span>注：第三层：每加200人为单位进行借款递增1000</span>
      </div>
      <p class="helpdbtn" @click="helpdbtn">开始申报</p>
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
      pageshow: false,
      list: [],
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      id: null,
      jktj: [
        {
          ds: "代数",
          rs: "人数"
        },
        {
          ds: "直推第一代",
          rs: "10人以上"
        },
        {
          ds: "第二代",
          rs: "30人以上"
        },
        {
          ds: "第三代",
          rs: "200人以上"
        }
      ],
      jkje: [
        {
          dj: "复消",
          je: "金额"
        },
        {
          dj: "会员",
          je: "2000元"
        },
        {
          dj: "区县加盟商",
          je: "3000元"
        },
        {
          dj: "市级加盟商",
          je: "4000元"
        },
        {
          dj: "省级加盟商",
          je: "5000元"
        },
        {
          dj: "公司分管总监",
          je: "6000元"
        }
      ]
    };
  },
    components: {
    popup
  },
  mounted() {},
  watch: {
    $route: {
      handler: function(route) {
        this.id = route.params.id;
      },
      immediate: true
    }
  },
  methods: {
    helpdbtn() {
      if (this.id == 5) {
        this.$router.push(`/urgency`);
      } else {
        this.$router.push(`/helpDetail?${this.id}`);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
.helpdetails-wrapper {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  color: #000;
  .helpdetails-con {
    text-align: left;
    font-size: 0.28rem;
    padding: 0.24rem;
    p {
      line-height: 1.4;
      color: #000;
      margin-bottom: 0.5rem;
    }
    .helpdbtn {
      text-align: center;
      color: red;
      font-size: 0.34rem;
      margin-top: 0.5rem;
    }
  }
  .jktj {
    color: #333;
    margin: 0 auto;
    width: 80%;
    border: 1px solid #333;
    & > li {
      display: flex;
      width: 100%;
      border-bottom: 1px solid #333;
      &:last-child {
        border: none;
      }
      & > div {
        width: 50%;
        line-height: 2em;
        text-align: center;
        &:nth-child(1) {
          border-right: 1px solid #333;
        }
      }
    }
  }
}
</style>