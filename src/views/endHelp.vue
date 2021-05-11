<template>
  <div class="endHelpBox">
    <van-nav-bar
      class="navbar"
      :border="false"
      title="联系我们"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>123</div>
    <popup></popup>
  </div>
</template>
<script>
import popup from "@/components/popup.vue";
export default {
  data() {
    return {};
  },
  components: {
    popup,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='scss' scoped>
.endHelpBox {
  font-size: 0.28rem;
  text-align: left;
}
</style>