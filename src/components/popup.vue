<template>
  <div class="popUpBox" v-if="msgs">
    <div class="popUp-content">
      <span v-show="msg" class="iconfont icon-tongzhi"></span>
      <div class="text" v-html="msg"></div>
      <span v-show="msg" @click="msgs = !msgs">×</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msgs: false,
      msg: "",
    };
  },
  created() {},
  mounted() {
    if (sessionStorage.getItem("msg")) {
      this.msgs = true;
      setTimeout(() => {
        this.msg = sessionStorage.getItem("msg");
      }, 1000);
    }else{
      this.msgs = false;
    }
  },
  methods: {},
};
</script>
<style lang="scss">
.popUpBox {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  font-size: 0.24rem;
  text-align: left;
  background-color: rgba($color: #000000, $alpha: 0.2);
  .popUp-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 500px;
    background-color: #fffbe8;
    color: #ed6a0c;
    overflow: hidden;
    padding: 0.3rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation-name: animLoad;
    animation-duration: 1s;
    @keyframes animLoad {
      0% {
        opacity: 0;
        transform: scale3d(0, 0.3, 1);
      }
      65% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
      }
    }
    & span {
      padding: 0.3rem;
      &:nth-child(3) {
        font-size: 0.35rem;
      }
    }
    & .icon-tongzhi {
      font-size: 0.5rem;
    }
    .text{
      width: 100%;
    }
  }
}
</style>