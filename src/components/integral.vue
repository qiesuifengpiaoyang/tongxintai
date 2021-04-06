<template>
  <div @click="integral" class="integral">确定</div>
</template>
<script>
import axios from "@/tool/axios.js";
import qs from "qs";
export default {
  data() {
    return {};
  },
  props: ["money", "apiUrl", "upgrade_amount", "id", "smss"],
  methods: {
    integral() {
      let that = this;
      let money = Number(this.money);
      let types;
      if (this.id == 1) {
        types = 2;
      } else if (this.id == 2) {
        types = 3;
      }
      if (money > 0) {
        if (this.upgrade_amount >= money) {
          if (!this.smss) {
            that.$toast("验证码不能为空");
            return;
          }
          axios
            .post(
              `${this.apiUrl}/exchangePoint`,
              qs.stringify({
                type: types,
                point: money,
                smscode: this.smss,
              })
            )
            .then((res) => {
              let { data } = res;
              let { message, info, status } = data;
              if (status == -1) {
                that.$toast(`${message}`);
                // const toast5 = this.$toast.loading({
                //   message: `${message}`,
                //   forbidClick: true,
                //   duration: 1000,
                // });
              } else {
                that.$toast("兑换成功！");
                // const toast2 = this.$toast.loading({
                //   message: "兑换成功！",
                //   forbidClick: true,
                //   duration: 1000,
                // });

                if (status === 1) {
                  that.show = false;
                  that.point = that.point - that.text;
                  that.$router.go(0);
                }
              }
            });
        } else {
          that.$toast("您的积分不足！");
        }
      } else {
        that.$toast("请正确输入兑换积分");
      }
    },
  },
};
</script>

<style lang="scss">
.integral {
  width: 100%;
  color: #fff;
  background-color: #ff976a;
  border: 1px solid #ff976a;
  line-height: 1.2;
  height: 44px;
  border-radius: 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
  font-size: 14px;
}
</style>