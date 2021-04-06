<template>
    <div class="wit-wrapper" v-if="pageshow">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="提现"
            left-arrow
            @click-left="onarrowLeftClick"
        />
        <div class="wit-hed">
            <p class="wi1">总金额（元）</p>
            <p class="wi2">{{available_amount}}</p>
        </div>
        <div class="wit-inp">
            <p class="inp1">请输入提现金额</p>
            <van-cell-group :border="false">
                <van-field v-model="money" label="¥" class="inp2" placeholder="输入金额须是100的倍数" />
            </van-cell-group>
            <p class="inp3">实际到账时间以您的发卡行处理时效为准</p>
        </div>
        <div class="wit-cad">
            <p class="wca1">提现至{{bank_name}}(xxxx{{bank_id_s}})</p>
            <p class="wca2">提现单笔无限额，单日无限额</p>
        </div>
        <div :class="[!btns ? '' : 'on', 'btn']" @click="btnCl">提 现</div>
        <popup></popup>
    </div>
</template>
<script>
import axios from '@/tool/axios.js'
import popup from "@/components/popup.vue";
import qs from 'qs'
export default {
    data(){
   
        return {
            pageshow:false,
            available_amount:0,
            money:'',
            bank_id:'',
            bank_name:'',
            bank_no:'',
            bank_id_s:'',
            dialogd:null,
            apiUrl: this.$store.state.apiDomain
        }
    },
    computed:{
        btns(){
            return !!this.money
        }
    },
      components: {
    popup
  },
    mounted(){
        this.onLoad();
    },
 beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$dialog.close();
    next();
  },
    methods:{
        btnCl(){
            let that = this;
            if(+that.money > +that.available_amount){
                return that.$toast('提现金额不足')
            }
            if(!that.money || that.money % 100 !==0){
               return that.$toast('请输入金融，须是100的倍数')
            }
            if(!that.bank_id){
               return that.$toast('您还没有绑定银行卡')
            }
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.post(`${that.apiUrl}/withdrawal`,qs.stringify({
                money:that.money,
                bank_id:that.bank_id
            })).then((res)=>{
                toast1.clear();
                if(res.data.status===1){
                    that.$dialog.alert({
                    message: res.data.message,
                    }).then(() => {
                    // on close
                        that.$router.push('/me')
                    });
                }else{
                    that.$toast(res.data.message)
                }
            }).catch((res)=>{
                toast1.clear();
            })
        },
        onarrowLeftClick(e){
                this.$router.go(-1)
        },
        onLoad(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            Promise.all([axios.get(`${that.apiUrl}/getRewardLog`),axios.get(`${that.apiUrl}/getBindBank`)])
            .then((res)=>{
                toast1.clear();
                let [getRewardLog,getBindBank] = res;
                let wdata = getRewardLog.data;
                let gdata = getBindBank.data;
                if(wdata.status !==1){
                    that.$dialog({ message: wdata.message });
                    return ;
                }
                if(gdata.status !==1){
                    that.$dialog.alert({
                    message: gdata.message,
                    }).then(() => {
                    // on close
                        that.$router.push('/bindCard')
                    });
                    return
                }
                if(wdata.status === 1){
                    that.available_amount = wdata.info.available_amount+'';
                }
                if(gdata.status === 1){
                    if(Object.prototype.toString.call(gdata.info) === "[object Object]"){
                        that.bank_name = gdata.info.bank_name;
                        that.bank_id  = gdata.info.bank_id;
                        that.bank_no  = gdata.info.bank_no;
                        that.bank_id_s = gdata.info.bank_no.substr(-4);
                    }
                }
                that.pageshow = true;
            })
            .catch((res)=>{
                toast1.clear();
            })
        }
    }
}
</script>
<style lang="scss">
.wit-wrapper{
    min-height: 100vh;
    background-color: #f4f4f4;
    .wit-inp{
        margin-top: .2rem;
        background: #fff;
        font-size: .22rem;
        padding: .2rem;
        text-align: left;
        .inp1{
            margin-bottom: .2rem;
            font-size: .26rem;
            
        }
        .inp3{
            margin-top: .2rem;
        }
        .inp2{
            .van-field__control{
                font-size: .3rem;
            }
            .van-field__label{
                font-size: .8rem;
                width: auto;
                margin-right: .2rem;
            }
        }
    }
    .wit-cad{
        padding: .2rem;
        margin-top: .2rem;
        background: #fff;
        font-size: .22rem;
        text-align: left;
        .wca1{
            font-weight: bold;
            font-size: .26rem;
        }
        .wca2{
            color: #bbb;
        }
    }
    .wit-hed{
        background: #fff;
        padding: .4rem .2rem;
        text-align: center;
        .wi1{
            font-size: .24rem;
            color: #bbb;
        }
        .wi2{
            color: #ed6a0c;
            font-size: 1rem;
        }
    }
    .btn{
        position: fixed;
        left: 0;
        bottom: 0;
        background: #ccc;
        color: #fff;
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .3rem;
        z-index: 10;
        &.on{
            background: #e48e0b;
        }
    }
}

</style>