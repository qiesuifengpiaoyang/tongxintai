<template>
  <div class="myteam-wrapper" v-if="pageshow">
    <van-nav-bar
      class="navbar"
      :border="false"
      :title="title"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <div class="mytean-con">
      <div v-if="list.length > 0">
        <van-grid :column-num="2" class="myteam-grid">
          <van-grid-item key="0003" text="职务" />
          <van-grid-item key="0004" text="销售套数" />
        </van-grid>
        <div v-for="item in list" :key="item.name">
          <van-grid :column-num="2" class="myteam-grid">
            <van-grid-item :text="item.name" />
            <van-grid-item :text="`${item.num}`" />
          </van-grid>
        </div>
      </div>
      <div v-if="total">
        <!-- <ul class="leakList">
          <p>漏单信息</p>
          <li>
            <span>姓名</span>
            <span>手机</span>
            <span>时间</span>
            <span>备注</span>
          </li>
          <li v-for="item in leakList" :key="item">
            <span>{{ item.true_name }}</span>
            <span>{{ item.mobile }}</span>
            <span>{{ item.create_time }}</span>
            <span>{{ item.remark }}</span>
          </li>
        </ul> -->
        <!-- 漏单 -->
        <ul class="leak">
          <li>总计漏单金额：</li>
          <li>{{ total }}</li>
        </ul>
        <!-- <van-pagination
          v-model="currentPage"
          :total-items="total"
          :show-page-size="pageNum"
          :items-per-page="eachPageSize"
          force-ellipses
        /> -->
      </div>
      <div v-else-if="!list.length">
        <van-empty description="暂无数据" />
      </div>
      <!-- <van-grid :column-num="2" class="myteam-grid" v-if="!error"> -->
      <!-- <van-grid-item key="0001" text="星级加盟商" /> -->
      <!-- <van-grid-item key="0002" text="团队加盟商" /> -->
      <!-- <van-grid-item key="0003" text="职务" />
                <van-grid-item key="0004" text="销售套数" />
                <template v-for="item in list">
                    <div  :key="item.name">
                        <van-grid-item :text="item.name" />
                        <van-grid-item :text="item.value" />
                    </div>
                </template> -->
      <!-- <van-grid-item key="00031" text="销售加盟商" />
                <van-grid-item key="00041" :text="agent" />
                <van-grid-item key="00032" text="销售主管" />
                <van-grid-item key="00042" :text="executive" />
                <van-grid-item key="00033" text="销售经理" />
                <van-grid-item key="00043" :text="manager" /> -->
      <!-- <template v-for="(value, name, index) in list"> -->
      <!-- <van-grid-item :key="`0001${index}`" :text="`${toChinesNum(index)}`" /> -->
      <!-- <van-grid-item :key="`0002${index}`" :text="`${value.activeCount}`" />
                    <van-grid-item :key="`0003${index}`" :text="`${value.orderCount}`" />
                    <van-grid-item :key="`0004${index}`" :text="`${value.leaveCount}`" /> -->
      <!-- </template> -->
      <!-- </van-grid>

            <div @click="onLoad" v-show="error" class="error-box">请求失败，点击重新加载</div> -->
      <!-- <div class="mytips" >
                <div class="mytips-box">
                    <p>温馨提示</p>
                    <p>为了避免公司销售提成出现误差，建议当团队有销售业绩时快速升到8星代表，谁也无法预测你的市场销售情况到底怎样。</p>
                    <p>举例：当你团队有一个销售代表以上时，你可以申请8星代表，一般销售到4套软件以上，你就可以升到9星经理。</p>
                </div>
            </div> -->
    </div>
    <popup></popup>
  </div>
</template>
<script>
import axios from "@/tool/axios.js";
import popup from "@/components/popup.vue";
export default {
  data() {
    return {
      currentPage: 1, //当前页码
      pageNum: 3, //显示的页码个数
      eachPageSize: 10, //每页显示数量
      list: [],
      leakList: [], //漏单列表
      total: 0, //漏单数量
      title: null,
      pageshow: true,
      skeletonloading: true,
      numArrowLeft: 1,
      error: false,
      finished: false,
      apiUrl: this.$store.state.apiDomain,
    };
  },
    components: {
    popup
  },
  mounted() {
    this.onLoad();
  },
  watch: {
    currentPage: {
      handler(val) {
        this.leakApi();
      },
      deep: true,
    },
  },
  methods: {
    toChinesNum: function (t) {
      return [
        "一星代表",
        "二星代表",
        "三星代表",
        "四星代表",
        "五星代表",
        "六星代表",
        "七星代表",
        "八星代表",
        "九星经理",
        "十星总监",
      ][t];
    },
    onarrowLeftClick(e) {
      this.$router.go(-1);
    },
    onLoad() {
      let that = this;
      const toast1 = that.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .get(`${this.apiUrl}/myTeam`)
        .then((res) => {
          let { data } = res;
          if (data.status === 1) {
            that.pageshow = true;
            let { list, leave_out_money, title } = data.info;
            that.title = title;
            that.total = leave_out_money;
            that.list = list;
          } else {
            that.error = true;
            const toast2 = that.$toast(that.message);
            toast2.clear();
          }
          toast1.clear();
          that.finished = true;
        })
        .catch(() => {
          toast1.clear();
          that.$toast("连接超时，请重试");
        });
      // this.leakApi();
    },
    // leakApi() {
    //   axios
    //     .get(`${this.apiUrl}/leaveOutList`, {
    //       params: {
    //         page: this.currentPage,
    //       },
    //     })
    //     .then((val) => {
    //       let { data } = val;
    //       let { info, message, status } = data;
    //       this.leakList = info.data; //当前页的数据
    //     });
    // },
  },
};
</script>
<style lang="scss">
.myteam-wrapper {
  .mytean-con {
    & > div {
      margin-bottom: 0.2rem;
    }
    & > ul {
      margin-bottom: 0.2rem;
    }
    .leak {
      font-size: 0.26rem;
      display: flex;
      background-color: #fff;
      border: 2px solid #ebedf0;
      margin-bottom: 0.2rem;
      & > li {
        padding: 0.1rem 0;
        width: 50%;
        &:nth-child(1) {
          border-right: 2px solid #ebedf0;
        }
      }
    }
    //漏单信息
    .leakList {
      width: 100vw;
      font-size: 0.24rem;
      background-color: #fff;
      border-bottom: 1px solid #999;
      margin-bottom: 0.2rem;
      & > p {
        text-align: left;
        padding: 0.2rem;
        font-size: 0.28rem;
        font-weight: bold;
      }
      & > li {
        display: flex;
        border: 1px solid #999;
        border-bottom: none;
        text-align: center;
        & > span {
          width: 25%;
          padding: 0.1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-right: 1px solid #999;
          &:last-child {
            border: none;
          }
        }
      }
    }
  }
  .van-cell {
    background-color: #3b4576;
  }
  min-height: 100vh;
  background-color: #3b4576;
  .myteam-grid {
    .van-grid-item__content {
      padding: 0.24rem;
    }
    // .van-grid-item:nth-child(2n+2){
    //     flex-basis:30% !important;
    // }
    // .van-grid-item:nth-child(4n+4){
    //     flex-basis:20% !important;
    // }
    .van-grid-item__text {
      font-size: 0.22rem;
      line-height: 1.2;
    }
  }
  .error-box {
    margin: 0.24rem 0;
    text-align: center;
    color: #fff;
    font-size: 0.24rem;
  }
  .mytips {
    background-color: #fbbb5f;
    overflow: hidden;
    padding: 0.2rem;
    .mytips-box {
      background-color: #d35a57;
      border-radius: 5px;
      padding: 0.24rem;
      text-align: left;
      p {
        color: #fff;
        font-size: 0.24rem;
        font-weight: 700;
        margin-top: 0.24rem;
        line-height: 1.4;
        text-align: justify;
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
  .myfriendlist-list-item {
    display: flex;
    align-content: center;
    position: relative;
    padding-left: 0.5rem;
    min-height: 0.4rem;
    font-size: 0.12rem;
    line-height: 1.2;
    color: #becaf4;

    > * {
      align-self: center;
    }
    .item2 {
      width: 18%;
    }
    .item3 {
      width: 32%;
      text-align: center;
    }
    .item4 {
      width: 35%;
      text-align: center;
    }
    .item5 {
      width: 15%;
    }

    .i-icon-myfriendlist {
      position: absolute;
      left: 0;
      top: 0;
      display: inline-block;
      margin-right: 0.1rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}
</style>