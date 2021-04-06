<template>
  <div class="box">
      <van-nav-bar
      class="navbar"
      :border="false"
      title="合伙人告知"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="vessel">
        13撒旦
    </div>
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
  created() {},
  methods: {
      onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.box {
  min-height: 100vh;
  font-size: 0.24rem;
  background: #fbbb5f;
  text-align: left;
  padding-bottom: 0.5rem;
  .vessel{
      padding: 0.25rem;
  }
}
</style>