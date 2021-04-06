<template>
    <div class="bindcard-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="绑定支付宝"
            left-arrow
            @click-left="onClickLeft"
        />
        <div v-if="pageshow">
            <van-cell-group
            :border="false"
        >
            <van-field 
                class="mb10 br5" 
                :border="false"
                v-model="username" 
                label="用户名" 
                clearable
                placeholder="请输入用户名" />
            <van-field :border="false" 
                label="支付宝手机号"  
                class="mb10 br5" 
                v-model="tel" 
                type="tel" 
                clearable
                placeholder="请输入手机号" />
            <div class="btn" @click="btnCl">绑定支付宝</div>
            </van-cell-group>
        </div> 
        <popup></popup>   
    </div>
</template>
<script>
import axios from '@/tool/axios.js'
import popup from "@/components/popup.vue";
import qs from 'qs';
export default {
    data(){
        return {
            pageshow:true,
            username:'',
            tel:'',

            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
      components: {
    popup,
  },
    mounted(){
        this.firstApi();
    },
    methods:{
        firstApi(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${that.apiUrl}/getBindAlipay`).then((res)=>{
                toast1.clear();
                let {data} = res;
                if(data.status === 1){
                    that.username = data.info.username;
                    that.tel = data.info.mobile;
                }else{
                    that.$toast(data.message)
                }
                that.pageshow = true;
            }).catch((error) => {
                toast1.clear();
            })           
        },
        btnCl(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '提交中...',
                forbidClick: true,
                duration:0
                });
            axios.post(`${that.apiUrl}/bindAlipay`,qs.stringify({
                username:that.username,
                mobile:that.tel
            })).then((res)=>{
                toast1.clear();
                that.pageshow = true;
                let {data} = res;
                if(data.status === 1){
                    that.$dialog.alert({
                    message: '绑定成功',
                    }).then(() => {
                    // on close
                    that.$router.push('/me')
                    });
                }else{
                    that.$dialog.alert({
                    message: `绑定失败-${data.message}`,
                    }).then(() => {
                    // on close

                    });
                }
            }).catch((error) => {
                toast1.clear();
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss">
    .bindcard-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fbbb5f;
        font-size: .26rem;
        .van-cell-group{
            background: transparent;
            padding: .24rem;
            .van-cell__title{
                color: #abbddb;
                text-align: left;
            }
            .van-field__label{
                width: 2.2rem;
            }
            .van-cell{
                background-color: #3b4576;
            }
            .van-field__value,.van-field__control{
                color:#7388ab
            }
            input::-webkit-input-placeholder{color:#7388ab}
        }
            
        .btn{
            width: 100%;
            height: .9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: .28rem;
            background: #e48e0b;
            border-radius: 5px;
        }
    }
</style>