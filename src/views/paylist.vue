<template>
    <div class="contactus-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="付款列表"
            left-arrow
            @click-left="onClickLeft"
        />
        <div v-if="pageshow">
            <ul class="topay-list" v-if="list.length > 0">
                <li v-for="(item, index) in list" :key="index">
                    <p>姓名：{{item.from_user_name}}</p>
                    <p>手机号：{{item.from_user}}</p>
                    <p>付款金额：<span class="payment-money">{{item.payment_money}}</span></p>
                    <p>付款时间：{{item.payment_time}}</p>
                    <div class="topay-bt">
                        <template v-if="!!item.prove_img">
                            <span @click="showImg(item)">查看</span>
                        </template>
                        <template >
                            <span v-if="item.status === 0">未确认</span>
                            <span v-if="item.status === 2">此订单被驳回</span>
                            <span v-if="item.status === 1">确认</span>
                        </template>
                    </div>
                </li>
            </ul>
            <van-empty v-else description="暂无数据" />
            
        </div>
<popup></popup>
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import axios from '@/tool/axios.js'
import { ImagePreview } from 'vant';
import qs from 'qs';
export default {
    data(){
        return {
            pageshow:false,
            list:[],
            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
    components:{
        Footer,
        popup
    },
    mounted(){
        this.firstAPi();
    },
    methods:{
        showImg(o){
            let that = this;
            ImagePreview({
                images:[`${that.staticUrl}/${o.prove_img}`],
                closeable: true,
                showIndex:false
            });
        },
       firstAPi(){
           let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${that.apiUrl}/payList`).then((res)=>{
                
                // axios.get(`https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/payList`).then((res)=>{
                toast1.clear();
                that.pageshow = true;
                let {data} = res;
                if(data.status === 1){
                    
                    that.list.push(...data.info)
                }else{
                    that.$toast(data.message);
                }
            }).catch((error) => {
                toast1.clear();
            })
       },
        onClickLeft(){
            this.$router.go(-1)
        },
        
    }
}
</script>
<style lang="scss">
    .contactus-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fbbb5f;
.topay-list{
            padding: .24rem;
            li{
                background: rgba(44,49,98);
                border-radius: 5px;
                padding: .24rem;
                font-size: .28rem;
                margin-bottom: .24rem;
                color: #7489ac;
                position: relative;
                p{
                    height: 0.28rem;
                    line-height: 1;
                    margin-bottom: .2rem;
                    text-align: left;
                    span.payment-money{
                        color: #35bffd;
                    }
                }
                .topay-bt{
                    position: absolute;
                    right: .2rem;
                    bottom: .2rem;
                    
                    color: #fff;
                    
                    span{
                        font-size: .22rem;
                        background: #35bffd;
                        padding: 2px 10px 1px;
                        border-radius: 2px;
                        line-height: 1;
                        & + span{
                            margin-left: .24rem;
                        }
                    }
                }

            }
        }
        .van-cell__title,.van-collapse-item__content{
            text-align: left;
        }
    }
</style>