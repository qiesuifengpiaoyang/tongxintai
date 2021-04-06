<template>
    <van-radio-group v-model="radio1" class="cellradiolist">
        <van-cell-group>
            <van-cell title="支付方式" size="large" />
            <van-cell title="支付宝" class="alipay" icon="alipay" clickable @click="radiocl('1')">
            <template #right-icon>
                <van-radio name="1" />
            </template>
            </van-cell>
            <van-cell title="微信" class="wechat" icon="wechat" clickable @click="radiocl('2')">
            <template #right-icon>
                <van-radio name="2"/>
            </template>
            </van-cell>
            <!-- <van-cell title="销售积分" class="debit-pay" icon="debit-pay" clickable @click="radiocl('3')">
            <template #right-icon>
                <van-radio name="3"/>
            </template>
            </van-cell> -->
        </van-cell-group>
    </van-radio-group>
</template>
<script>
export default {
    name:"typepay",
    data(){
        return {
            radio1:this.radio
        }
    },
    props:{
        radio:{
            default:"1"
        }
    },
    methods:{
        radiocl(o){
            this.$emit("onRadiocl",o)
        }
    }
}
</script>
<style lang="scss" scoped>
    .cellradiolist{
        margin-top: .3rem;
        text-align: left;
        .alipay{
            color: #1989fa;
        }
        .wechat{
            color: #07c160;
        }
        .debit-pay{
            color: #ed6a0c;
        }
    }
</style>