<template>
    <div class="bindcard-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="绑定银行卡"
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
                placeholder="请输入用户名" />
            <van-field 
                class="mb10 br5" 
                :border="false"
                :value="bank_no" 
                readonly
                clickable
                @touchstart.native.stop="akeyshow = true"
                label="银行卡号" 
                placeholder="请输入银行卡号" />
            <van-field 
                class="mb10 br5" 
                :border="false"
                v-model="bank_name" 
                label="开户行" 
                placeholder="请输入银行卡开户行" />
            <van-field 
                class="mb10 br5" 
                :border="false"
                v-model="branch_name" 
                label="开户行地址" 
                placeholder="请输入开户行地址" />
            <div class="btn" @click="btnCl">绑定银行卡</div>
            </van-cell-group>
        <van-number-keyboard
            :show="akeyshow"
            :maxlength="30"
            v-model="bank_no"
            @blur="akeyshow = false"
            />
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
            akeyshow:false,
            username:'',
            bank_no:'',
            bank_name:'',
            branch_name:'',

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
            axios.get(`${that.apiUrl}/getBindBank`).then((res)=>{
                toast1.clear();
                let {data} = res;
                if(data.status === 1){
                    that.username = data.info.username;
                    that.bank_no = data.info.bank_no;
                    that.bank_name = data.info.bank_name;
                    that.branch_name = data.info.branch_name;
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
            axios.post(`${that.apiUrl}/bindBank`,qs.stringify({
                username:that.username,
                bank_no:that.bank_no,
                bank_name:that.bank_name,
                branch_name:that.branch_name
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
        },
        inpCl(val){
            this.money = val;
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