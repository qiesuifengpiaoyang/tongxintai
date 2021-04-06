<template>
  <div class="myfriendlist-wrapper">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="好友列表"
      left-arrow
      @click-left="onarrowLeftClick"
    />
    <ul class="navigation">
      <li :class="{ bac: num == 1 }" @click="navBtn(1)">已激活</li>
      <li :class="{ bac: num == 2 }" @click="navBtn(2)">待激活</li>
    </ul>
    <div class="myfriendlist-con">
      <van-cell v-for="(item, index) in list" :key="index">
        <template>
          <div class="myfriendlist-list-item">
            <span class="item2">{{ item.true_name }}</span>
            <!-- <span class="item3">{{ item.mobile | transformationName }}</span> -->
            <span class="item3">{{ item.mobile}}</span>
            <span class="item4">{{ item.create_time }}</span>
            <span class="item5">{{
              item.level === 0 ? "待激活" : `复消${item.level}`
            }}</span>
          </div>
        </template>
      </van-cell>
      <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          :offset="offset"
        >
          <van-cell v-for="(item, index) in list" :key="index">
            <template>
              <div class="myfriendlist-list-item">
                <span class="item2">{{ item.true_name }}</span>
                <span class="item3">{{ item.mobile | transformationName }}</span>
                <span class="item4">{{ item.create_time }}</span>
                <span class="item5">{{
                  item.level === 0 ? "待激活" : `复消${item.level}`
                }}</span>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh> -->
    </div>
    <popup></popup>
    <Footer :isActive="2" />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
import axios from "@/tool/axios.js";
export default {
  data() {
    return {
      list: [],
      total: 0,
      offset: 50,
      // error: false,
      // loading: false,
      // finished: false,
      // refreshing: false,
      // page: 1,
      num: 1, //1已激活|2未激活
      // pageSize: 20,
      apiUrl: this.$store.state.apiDomain,
    };
  },
  components: {
    Footer,
    popup,
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    navBtn(item) {
      this.num = item;
      this.list = new Array();
      // this.page = 1;
      this.onRefresh();
    },
    onarrowLeftClick(e) {
      this.$router.go(-1);
    },
    onarrowRightClick(e) {
      this.$router.push("/myTeam");
    },
    onRefresh() {
      // 清空列表数据
      // this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true;
      // this.onLoad();
      // //这是下拉加载的，业务修改，已被替换

      axios
        .get(`${this.apiUrl}/myFriend/${this.num}`
        // , {
        //   params: {
        //     page: this.page,
        //   },
        // }
        )
        .then((res) => {
          let { data } = res;
          if (data.status === 1) {
            this.list = data.info.data;
          }else{
            this.$toast(`${data.info.message}`)
          }
        });
    },
    //这是下拉加载的，业务修改，已被替换
    // onLoad() {
    //   let that = this;
    //   axios
    //     .get(`${this.apiUrl}/myFriend/${that.num}`, {
    //       params: {
    //         page: that.page,
    //       },
    //     })
    //     .then((res) => {
    //       let { data } = res;
    //       if (data.status === 1) {
    //         that.page++;
    //         if (this.refreshing) {
    //           this.refreshing = false;
    //           that.list = [].concat(data.info.data, that.list);
    //         } else {
    //           that.list.push(...data.info.data);
    //         }

    //         // 加载状态结束
    //         that.loading = false;
    //         // 数据全部加载完成
    //         if (that.list.length >= data.info.total) {
    //           that.finished = true;
    //         }
    //       } else {
    //         that.loading = false;
    //         that.error = true;
    //       }
    //     });
    // },
  },
  filters: {
    transformationName(res) {
      let reg = /(\d{3})\d{4}(\d{4})/;
      return res.replace(reg, "$1****$2");
    },
  },
};
</script>
<style lang="scss">
.myfriendlist-wrapper {
  .navigation {
    font-size: 0.3rem;
    width: 100vw;
    color: #fff;
    font-weight: bold;
    border: 1px solid #f5f5f5;
    margin-top: 0.1rem;
    display: flex;
    & > li {
      width: 50%;
      padding: 0.1rem 0;
      height: 100%;
    }
    .bac {
      background-color: #e48e0b;
    }
  }
  .van-cell {
    background-color: #3b4576;
  }
  min-height: 100vh;
  background-color: #3b4576;
  padding-bottom: 1.4rem;
  .myfriendlist-list-item {
    display: flex;
    align-content: center;
    position: relative;
    min-height: 0.5rem;
    font-size: 0.24rem;
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

    // .i-icon-myfriendlist{
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     display: inline-block;
    //     margin-right: .24rem;
    //    width: .4rem;
    //     height: .4rem;}
  }
}
</style>