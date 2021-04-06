<template>
  <ul class="box">
    <!-- <p>
      <span @click="toReturnBtn">《</span>
      <span>历史记录</span>
    </p> -->
    <van-nav-bar
      class="navbar"
      :border="false"
      title="历史记录"
      left-arrow
      @click-left="onClickLeft"
    />
    <ul class="chatBox">
      <p class="none" v-if="noneSH">没有更多信息啦^_^</p>
      <li
        v-for="(item, index) in historyList"
        :key="'history' + index"
        :class="[item.sign == 2 ? 'user' : 'service']"
      >
        <!-- sign为1表示客服；2表示用户 -->
        <template v-if="item.sign === 1">
          <!-- 头像 -->
          <img class="portrait" src="../../public/static/img/4.png" alt="" />
          <!-- 聊天信息 -->
          <div class="service-content contentBox">
            <p class="urseName">{{ item.name }}</p>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </template>
        <template v-if="item.sign === 2">
          <!-- 头像 -->
          <img class="portrait" src="../../public/static/img/4.png" alt="" />
          <!-- <img :src="item.img" alt="" /> -->
          <!-- 聊天信息 -->
          <div class="user-content contentBox">
            <p>{{ item.name }}</p>
            <div class="content">
              {{ item.content }}
            </div>
          </div>
        </template>
      </li>
    </ul>
  </ul>
</template>
<script>
// import { apiDomain } from "@/tool/path.js";
// import qs from "qs";
// import axios from "@/tool/axios.js";
// import { _debounce } from "../plugins/public";
export default {
  data() {
    return {
      scrollBottom: 0, //文档高度-滚动条距离顶部高度
      noneSH: false,
      num: 0, //防抖
      residue: true, //是否还继续
      page: 0, //页码
      historyList: [], //
      toast1: null,
      websock: null, //创建连接
      uid: sessionStorage.getItem('user_id'),
      type_id:this.$route.params.type_id,
    };
  },
  // created() {
  //   this.toLoad();//原计划的加载数据
  // },
  mounted() {
    this.toast1 = this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    this.initWebSocket();
    setTimeout(function () {
      window.scrollTo({
        top: document.body.scrollHeight,
        // behavior: "smooth",
      });
    }, 500);
    // window.addEventListener("scroll", this.handleScroll, true); //侦听滚动条事件
  },
  methods: {
    // handleScroll(e) {
    //   let scrollTop =
    //     e.target.documentElement.scrollTop || e.target.body.scrollTop; // 执行代码
    //   if (scrollTop <= 200) {
    //     this.toLoad(); //加载
    //   }
    // },

    //加载
    // toLoad: _debounce(function () {
    //   const toast1 = this.$toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 0,
    //   });
    //   if (!this.residue) {
    //     return;
    //   }
    //   this.page++;
    //   axios
    //     .post(
    //       `${apiDomain}/lsjl`,
    //       qs.stringify({
    //         id: this.$route.params.id,
    //         page: this.page,
    //       })
    //     )
    //     .then((res) => {
    //       console.log(red);
    //       if (res.data.status != 1) {
    //         this.$toast(`${res.data.message}`);
    //         return;
    //       }
    //       if (res.data.data.info < 10) {
    //         this.noneSH = true;
    //         this.residue = false;
    //       }

    //       //滚动条距离底部=文档高度-滚动条距离顶部高度(-滚动条高度)
    //       this.scrollBottom =
    //         document.documentElement.scrollHeight -
    //         document.documentElement.scrollTop;
    //       // document.documentElement.clientHeight;

    //       //加载数据
    //       this.historyList = res.data.data.concat(this.historyList);
    //       setTimeout(() => {
    //         window.scrollTo({
    //           top: document.documentElement.scrollHeight - this.scrollBottom,
    //           // document.documentElement.clientHeight,
    //           // behavior: "smooth",
    //         });
    //         toast1.clear();
    //       }, 200);
    //     })
    //     .catch((res) => {
    //       toast1.clear();
    //       console.log("错误:", res);
    //     });
    // }, 500),
    //返回
    onClickLeft() {
      this.$router.go(-1);
      // this.$router.push({
      //   name: "chatRoom",
      //   params: this.$route.params.id,
      // });
    },
    //定义长连接
    initWebSocket() {
      //初始化weosocket
      const that = this;
      //   const wsuri = "ws://123.207.136.134:9010/ajaxchattest";//测试
      const wsuri = "ws://192.168.1.2:8181";
      //建立连接
      that.websock = new WebSocket(wsuri);
      //连接成功
      that.websock.onopen = that.websocketonopen;
      //连接错误
      that.websock.onerror = that.websocketonerror;
      //接收信息
      that.websock.onmessage = that.websocketonmessage;
      //连接关闭
      that.websock.onclose = that.websocketclose;
    },
    //断线重连
    reconnect() {
      //重新连接
      var that = this;
      if (that.lockReconnect) {
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function () {
        //新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    //其他连接方式
    websocketonopen() {
      //连接成功事件
      console.log("WebSocket连接成功");
      this.toast1.clear();
      let data = {
        type: "read_record",
        type_id: this.type_id,
        uid: this.uid,
      };
      this.websock.send(JSON.stringify(data));
      // this.websock.send(JSON.stringify(data));
      //开启心跳
      this.start();
    },
    //连接失败事件
    websocketonerror(e) {
      //错误
      this.$toast("连接错误");
      console.log("WebSocket连接发生错误", e);
      //重连
      this.reconnect();
    },
    //连接关闭事件
    websocketclose(e) {
      //关闭
      console.log("连接关闭事件", e);
      // console.log("connection closed (" + e.code + ")");
      //重连
      this.reconnect();
    },
    //打开连接
    websockOpen() {
      console.log("WebSocket连接成功");
      this.start();
    },
    //数据接收
    websocketonmessage(e) {
      console.log(e.data);
      let { status, data } = JSON.parse(e.data);
      if (status != 1) {
        this.$toast(`数据返回错误，请稍后重试`);
        return;
      }
      // this.chatList.push(data.data);
      if(!data.length){
        this.noneSH = true;
        return;
      }
      this.chatList = [].concat(data.data)
      //收到服务器信息，心跳重置
      this.reset();
      // let user = {
      //   name: "用户",
      //   sign: 2,
      //   content: e.data,
      // };
    },
    //开启心跳
    start() {
      // console.log('开启心跳');
      const self = this;
      let _num = 3;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState === 1) {
          //如果连接正常
          // console.log(self.websock);
          self.websock.send("heartCheck");
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function () {
          //超时关闭
          _num--;
          //计算答复的超时次数
          if (_num === 0) {
            self.websocketclose();
          }
        }, self.timeout);
      }, self.timeout);
    },
    //重置心跳
    reset() {
      // console.log('重置心跳');
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
  },
};
</script>
<style lang='scss' scoped>
$gauge: 55px; //聊天信息盒子向左（右）的margin
$headGauge: 15px; //聊天信息盒子与头像的距离
$headImg: 40px; //头像的宽高
.box {
  min-height: 100vh;
  // min-height: calc(100vh - 50px);
  // height: 100vh;
  background-color: #f4f4f4;
  font-size: 0.24rem;
  text-align: left;
  position: relative;
  & > p {
    position: fixed;
    top: 0;
    width: 100vw;
    font-size: 0.3rem;
    background-color: #e48e0b;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    & > span:nth-child(1) {
      position: absolute;
      left: 5px;
    }
  }
  .chatBox {
    padding: 0.2rem;
    width: 100%;
    padding-top: 80px;
    & > .none {
      text-align: center;
    }
    & > li {
      display: flex;
      margin-top: 0.3rem;
      word-break: break-word;
      &:last-child {
        margin-bottom: 55px;
      }
    }
    //头像.img
    .portrait {
      width: $headImg;
      height: $headImg;
      border: 1px solid yellowgreen;
      border-radius: 5px;
    }
    //聊天信息-公共
    .contentBox {
      //   flex-grow: 1;
      .content {
        background-color: #fff;
        padding: 8px;
        margin-top: 5px;
        border-radius: 5px;
      }
    }
    //客服
    .service {
      flex-direction: row;
      margin-right: $gauge;
      //聊天
      .service-content {
        margin-left: $headGauge;
      }
    }
    //用户
    .user {
      flex-direction: row-reverse;
      margin-left: $gauge;
      text-align: right;
      //聊天
      .user-content {
        margin-right: $headGauge;
        .content {
          text-align: left;
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .box {
    width: 1200px;
    // min-height: 100;
    margin: 0 auto;
    & > p {
      position: fixed;
      font-size: 0.2rem;
      width: 1200px;
      background-color: #fff;
      color: #000;
      box-shadow: 0 2px 8px #ccc;
      & > span:nth-child(1):hover {
        cursor: pointer;
        color: #666;
      }
    }
  }
}
</style>