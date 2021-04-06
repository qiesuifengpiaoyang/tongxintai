<template>
  <div class="box">
    <van-nav-bar class="navbar" :border="false" title="商学院" />

    <!-- 视频/图文 切换 -->
    <div class="selectsBox">
      <ul class="selects">
        <li
          v-for="(item, index) in selects"
          :key="item.title + index"
          :class="{ borders: index == num }"
          @click="qiehuan(item.id)"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>

    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="videos">
        <li
          v-for="(item,index) in list"
          :key="item.title + index"
          @click="videoDetailsBtn(item.id)"
        >
          <div class="videoImg">
            <img class="imgs" :src="item.cover_img" alt="" />
            <!-- <div class="shade"></div>
            <div class="playClacc"></div> -->
          </div>
          <span class="subtitle">{{ item.title }}</span>
        </li>
      </ul>
      <van-empty description="暂无记录" v-if="emptyshow" />
    </van-list>
    <popup></popup>
    <Footer :isActive="isActive" />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import popup from "@/components/popup.vue";
// import { apiDomain, specfield } from "@/tool/path";
import axios from "@/tool/axios.js";
// import ClipboardJS from "clipboard";
// import qrcode from "qrcode";
import qs from "qs";
export default {
  data() {
    return {
      apiUrl: this.$store.state.apiDomain,
      staticUrl: this.$store.state.staticDomain,
      selects: [], //分类
      isActive: 6,
      num: parseInt(this.$route.params.id),
      emptyshow: false, //视频版——暂无更多
      loading: false,
      finished: false,
      page: 0,
      list: [],
    };
  },
  components: {
    Footer,
    popup
  },
  methods: {
    //切换
    qiehuan(index) {
      this.$router.push({
        name: "teaching",
        params: { id: index },
      });
    },
    //内容
    onLoad() {
      let that = this;
      axios.post(`${that.apiUrl}/academy/type`).then((val) => {
        let { data } = val;
        let { info, message, status } = data;
        if (status != 1) {
          this.$toast(`${message}`);
          return;
        }
        this.selects = info;
        let one = info[this.num].id;
        that.page = that.page + 1;
        axios
          .post(
            `${that.apiUrl}/academy/list`,
            qs.stringify({
              page: that.page,
              type: one,
            })
          )
          .then((val) => {
            let { data } = val;
            let { info, message, status } = data;
            if (status === 1) {
              if (info.length < 8) {
                that.finished = true;
              }
              if (info.length === 0 && that.page === 1) {
                that.emptyshow = true;
              }
              if (info.length > 0) {
                that.list = that.list.concat(...info);
              }
            } else {
              that.$toast(`${message}`);
              that.finished = true;
            }
            that.loading = false;
          });
      });
    },

    //视频详情跳转
    videoDetailsBtn(id) {
      this.$router.push({
        name: "video",
        params: { id: id },
      });
    },
  },
};
</script>
<style lang="scss">
.box {
  padding-bottom: 1.5rem;
  min-height: 100vh;
  background: #fbbb5f;
  //分类
  .selectsBox {
    width: 100vw;
    overflow: auto;
    .selects {
      font-size: 0.3rem;
      font-weight: bold;
      display: flex;
      & > li {
        padding: 0.3rem 0.2rem;
        flex-shrink: 0;
      }
      .borders{
        border-bottom: 2px solid red;
      }
    }
  }

  //视频板块儿
  .videos {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.24rem;
    font-size: 0.24rem;
    & > li {
      // width: 48.5%;
      width: 44.8vw;
      // height: 25.2vw;
      margin-bottom: 0.25rem;
      // border: 1px solid red;
      display: flex;
      flex-direction: column;
      text-align: left;
      .videoImg {
        position: relative;
        width: 100%;
        height: 25.2vw;
        box-shadow: 2px 2px 2px #d5d5d5;
        border-radius: 0.2rem;
        overflow: hidden;
        .imgs {
          width: 100%;
          height: 100%;
        }
        // //半透明遮罩
        // .shade {
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        //   background: rgba(0, 0, 0, 0.3);
        // }
        // .playClacc {
        //   position: absolute;
        //   width: 0;
        //   height: 0;
        //   border-top: 3vw solid transparent;
        //   border-left: 6vw solid #fff;
        //   border-bottom: 3vw solid transparent;
        //   top: 50%;
        //   left: 50%;
        //   transform: translate(-50%, -50%);
        // }
      }
      .subtitle {
        margin-top: 0.2rem;
        // border: 1px solid red;
        text-align: center;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        color: #444;
        // text-shadow: 1px 1px 2px #aaa;
        font-weight: bold;
      }
    }
  }

  //图文板块儿
  .imageText {
    padding: 0.24rem;
    font-size: 0.24rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > li {
      width: 48.5%;
      margin-bottom: 0.25rem;
      display: flex;
      flex-direction: column;
      text-align: left;
      border-radius: 0.1rem;
      color: #fff;
      .imgsbox {
        width: 100%;
        & > img {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
          box-shadow: 2px 2px 5px #999;
        }
      }
      .ITsubtitle {
        margin-top: 0.1rem;
        text-align: center;
        color: #fff;
        text-shadow: 1px 1px 2px rebeccapurple;
        // font-size: 0.35rem;
        // text-shadow: 1px 1px 1px red;
        font-weight: bold;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
