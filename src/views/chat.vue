<template>
  <div class="box home-wrapper" ref="content">
    <!-- <van-nav-bar
      class="navbar"
      :border="false"
      title="聊天"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /> -->
    <van-nav-bar
      class="navbar"
      :border="false"
      title="客服"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="service-o" />
      </template>
    </van-nav-bar>
    <div v-if="!type" class="choose">
      <div>
        <p>请选择咨询类型</p>
        <button @click="type = 1">互帮类</button>
        <button @click="type = 2">市场类</button>
        <button @click="type = 3">电销类</button>
      </div>
    </div>
    <!-- <div class="re-hed-2">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="type" :options="option1" />
      </van-dropdown-menu>
    </div> -->

    <div v-else>
      <ul class="chatBox">
        <li
          v-for="(item, index) in chatList"
          :key="index"
          :class="[item.type == 'send_msg' ? 'user' : 'service']"
        >
          <!-- type为'send_msg'表示用户,否则为客服 -->
          <template v-if="item.type !== 'send_msg'">
            <!-- 头像 -->
            <img class="portrait" src="../../public/static/img/4.png" alt="" />
            <!-- 聊天信息 -->
            <div class="service-content contentBox">
              <!-- <p class="urseName">{{ item.name }}</p> -->
              <p class="urseName">客服</p>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </template>
          <template v-else>
            <!-- 头像 -->
            <img class="portrait" src="../../public/static/img/4.png" alt="" />
            <!-- <img :src="item.img" alt="" /> -->
            <!-- 聊天信息 -->
            <div class="user-content contentBox">
              <p>{{ username }}</p>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </template>
        </li>
      </ul>
      <div class="inpBox">
        <div class="inp">
          <van-field class="asd" v-model="text" />
        </div>
        <button @click="sendBtn">发送</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelList: null,
      adminIds: "",
      tokens: "",
      merIds: "",
      webSocket: null,
      lockReconnect: false, //是否真正建立连接
      timeout: 28 * 1000, //30秒一次心跳
      timeoutObj: null, //心跳心跳倒计时
      serverTimeoutObj: null, //心跳倒计时
      timeoutnum: null, //断开 重连倒计时
      apiUrl: this.$store.state.apiDomain,
      type: 0,
      // option1: [
      //   { text: "请选择咨询类型", value: 0 },
      //   { text: "互帮类", value: 1 },
      //   { text: "市场类", value: 2 },
      //   { text: "电销类", value: 3 },
      // ],
      chatList: [], //聊天信息数组
      text: "", //输入框编辑的消息
      toast1: null,
      websock: null, //创建连接
      uid: sessionStorage.getItem("user_id"),
      username: sessionStorage.getItem("name"),
      mobile: sessionStorage.getItem("mobile"),
    };
  },
  watch: {
    chatList: {
      handler(n) {
        //   window.scrollTo(1,document.body.scrollHeight)
        setTimeout(function () {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 150);
      },
      deep: true,
    },
    type: {
      handler() {
        this.toast1 = this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          duration: 0,
        });
        this.initWebSocket();
      },
      deep: true,
    },
  },
  mounted() {
    setTimeout(function () {
      if (
        document.body.scrollHeight >
        document.documentElement.clientHeight - 55
      ) {
        window.scrollTo({
          top: document.body.scrollHeight,
          // behavior: "smooth",//平滑滚动，默认是瞬时滚动
        });
      }
    }, 100);
  },
  methods: {
    //发送消息
    sendBtn() {
      if (!this.text) {
        this.$toast("发送内容不能为空");
        return;
      }
      if (!this.type) {
        this.$toast("请选择需要咨询的类型");
        return;
      }
      let data = {
        type: "send_msg",
        uid: this.uid,
        content: this.text,
      };
      this.text = "";
      this.chatList.push(data);
      this.websock.send(data);
      // let user = {
      //   name: "用户",
      //   sign: 2,
      //   type: this.type,
      //   content: this.text,
      // };
    },
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (!this.type) {
        return;
      }
      this.$router.push({
        name: "history",
        params: { type_id: this.type },
      });
    },

    //定义长连接
    initWebSocket() {
      //初始化weosocket
      const that = this;
      // const wsuri = "ws://123.207.136.134:9010/ajaxchattest";
      const wsuri = "ws://192.168.1.2:8181";
      //建立连接
      this.websock = new WebSocket(wsuri);
      //连接成功
      this.websock.onopen = this.websocketonopen;
      //连接错误
      this.websock.onerror = this.websocketonerror;
      //接收信息
      this.websock.onmessage = this.websocketonmessage;
      //连接关闭
      this.websock.onclose = this.websocketclose;
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
      this.toast1.clear();
      let login_msg = {
        type: "user_login",
        uid: this.uid,
        content: this.text,
        type_id: this.type,
        username: this.username,
        mobile: this.mobile,
      };
      console.log("type:", "user_login");
      console.log("uid:", this.uid);
      console.log("content:", this.text);
      console.log("type_id:", this.type);
      console.log("username:", this.username);
      console.log("mobile:", this.mobile);
      this.websock.send(JSON.stringify(login_msg));
      console.log("WebSocket连接成功");
      //开启心跳
      this.start();
    },
    //连接失败事件
    websocketonerror(e) {
      //错误

      console.log("WebSocket连接发生错误", e);
      this.$toast("连接错误");
      //重连
      this.reconnect();
    },
    //连接关闭事件
    websocketclose(e) {
      //关闭
      console.log("WebSocket关闭");
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
      console.log(JSON.parse(e.data),'接收');
      let { status, data } = JSON.parse(e.data);
      if (status != 1) {
        this.$toast(`当前无客服在线，请稍后重试`);
        return;
      }
      this.chatList.push(data);
      // let user = {
      //   name: "客服",
      //   sign: 1,
      //   content: e.data,
      // };
      //收到服务器信息，心跳重置
      this.reset();
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
  //面销毁、关闭长连接
  destroyed: function () {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
};
</script>
<style lang='scss'>
$gauge: 55px; //聊天信息盒子向左（右）的margin
$headGauge: 15px; //聊天信息盒子与头像的距离
$headImg: 40px; //头像的宽高

.box {
  min-height: 100vh;
  background-color: #f4f4f4;
  //   background-color: #fbbb5f;
  font-size: 0.24rem;
  text-align: left;
  .choose {
    position: fixed;
    width: 100vw;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.1);
    & > div {
      width: 80%;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: #fff;
      border-radius: 15px;
      p {
        text-align: center;
        font-size: 0.3rem;
      }
      & > button {
        margin-top: 10px;
        padding: 5px 0;
        border-radius: 8px;
      }
    }
  }
  .chatBox {
    padding: 0.2rem;
    width: 100%;
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
  //输入框盒子
  .inpBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 10px;
    justify-content: space-between;
    background-color: #fff;
    display: flex;
    .inp {
      width: 80vw;
    }
    .van-cell {
      padding: 5px 10px;
      background-color: #f7f7f7f7;
    }
    & > button {
      margin-left: 5px;
      flex-grow: 1;
      background-color: #fbbb5f;
    }
  }
}
</style>