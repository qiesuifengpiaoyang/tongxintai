<template>
    <div class="paystatus-wrapper">
        <div class="paystatus-box">
            <van-icon name="passed" v-if="status === '1'" class="sus"/>
            <van-icon name="close" v-else-if="status === '2'" class="err"/>
            <p v-if="status === '1'" class="sus-txt">支付成功</p>
            <p v-else-if="status === '2'" class="sus-txt">支付失败</p>
            <router-link :to="{path:'helpCenter'}" v-if="!!status" class="btn">确定</router-link>
        </div>
        <popup></popup>
    </div>
</template>
<script>
import axios from '@/tool/axios.js'
import popup from "@/components/popup.vue";
export default {
    data(){
        return {
            pageshow:false,
            list:[],
            status:0,
            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
    components:{
        popup
    },
    mounted(){
        this.status = this.$route.query.status;
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        firstApi(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${that.apiUrl}/ehelp`).then((res)=>{
                toast1.clear();
                
                let {data} = res;
                if(data.status === 1){
                    that.list.push(...data.info)
                }else{
                    that.$toast(data.message);
                }
                that.pageshow = true;
            }).catch((error) => {
                toast1.clear();
            })
        },
        
    }
}
</script>
<style lang="scss">
    .paystatus-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fff;//#fbbb5f;
        font-size: .26rem;
        .paystatus-box{
            padding-top: 1.4rem;
        }
        .sus,.err{
            font-size: 1.6rem;
        }
        .sus{
            color: #07c160;
        }
        .err{
            color: #ee0a24;
        }
        .sus-txt{
            font-size: .4rem;
        }
        .btn{
            width: 50%;
            height: .8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: .9rem auto;
            border: 1px solid #1989fa;
            color: #1989fa;
            border-radius: 5px;
            font-size: .32rem;
        }
    }
</style>