
<template>
    <div class="myMessage-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="我的消息"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="myMessage-con">
            <van-empty description="暂无数据" />
        </div>
        <popup></popup>
    </div>
</template>
<script>
import qs from 'qs';
import popup from "@/components/popup.vue";
export default {
    data(){
        return {
            pageshow:false,
            list:[],
            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
      components: {
    popup
  },
    mounted(){
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        
    }
}
</script>
<style lang="scss">
    .myMessage-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fbbb5f;
        .myMessage-con{
            padding: .24rem;
        }
    }
</style>