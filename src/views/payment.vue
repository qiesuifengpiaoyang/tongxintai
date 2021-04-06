<template>
    <div class="payment-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="收款方式"
            left-arrow
            @click-left="onarrowLeftClick"
        />
        <div class="payment-form">
            <van-field class="mb10 br5" :border="false" label="收款渠道" value="微信或支付宝" readonly />
            <van-field class="mb10 br5" :border="false" v-model="accountNumber" label="账号" placeholder="请输入微信或支付宝收款账号"/>
            <div class="mb10 br5 payment-form-upload" >
                <van-uploader
                    :preview-full-image="false"
                    :after-read="afterRead"
                    :lazy-load = "true"
                >
                    <div class="paymentFormItem_1">
                        <div class="paymentFormItem_1_img">
                            <van-icon name="qr" v-if="!imgurl1"/>
                            <img :src="imgurl1" alt="" v-else style="width:100%;height:4rem">
                        </div>
                    </div>
                    <div class="paymentFormItem_2">点击上传收款二维码</div>
                    <div class="payment-form-upload-mask" v-if="uploadMask">
                        <van-loading>上传中...</van-loading>
                    </div>
                </van-uploader>
            </div>
            <div>
                <van-field
                label="验证码"
                class="mb10 br5" 
                :border="false"
                clickable
                v-model="value"
                
                >
                    <template #button>
                        <van-button class="postmess" size="small" type="primary" @click="postmess">{{phoneMess}}</van-button>
                    </template>
                </van-field>
            </div>
            <van-button type="primary" @click="paymentSaveBtn" class="payment-save-btn">保存</van-button>
        </div>
        <!-- <Footer :isActive="1" /> -->
        <popup></popup>
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import axios from '@/tool/axios.js'
import {debounce} from 'lodash-es';
import qs from 'qs';
export default {
    data(){
   
        return {
            // list: null,
            // skeletonloading:true,
            numArrowLeft:1,
            accountNumber:'',
            // error:false,
            // finished:false,
            show: false,
            value: '',
            imgurl:'',
            imgurl1:'',
            uploadMask:false,
            timeout:null,
            times:60,
            phoneMess:'获取验证码',
            isclick:false,
            apiUrl: this.$store.state.apiDomain,
            staUrl:this.$store.state.staticDomain
        }
    },
    components:{
        Header,
        Footer,
        popup
    },
    created: function() {
        
    },
    mounted(){
        // setTimeout(()=>{
        //     window.scrollTo(0,0);
        // },10)
           this.onLoad();
        
    },
    methods:{
        keyshow(){
            let top = document.body.scrollHeight || document.documentElement.scrollHeight;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
            // this.show=true
        },
        postmess: debounce(function() {
            var t = this;
            if(!t.accountNumber){
                return t.$toast('请输入账号');
            }
            if (!t.isclick) {
                axios.post(`${t.apiUrl}/smsSend`,qs.stringify({
                    mobile:t.accountNumber,
                    type:'register'
                }))
                .then((res) => {
                    t.setTimes();
                    let {data} = res;
                    if(data.status === 1){
                        // t.keyshow()
                        t.$toast("发送成功")
                    }else{
                        clearInterval(t.timeout)
                        t.$toast({
                            message:data.message,
                            forbidClick:true,
                            overlay:true
                        })
                    }
                })
                .catch((error)=>{
                    clearInterval(t.timeout)
                    
                })
            }
        },5000,{leading:true, trailing:false}),
        setTimes: function() {
            let t = this;
            t.timeout = setInterval(function() {
                t.times > 0 ? (t.times--,
                t.phoneMess = t.times + "s",
                t.isclick = !0) : (t.times = 60,
                clearInterval(t.timeout),
                t.isclick = !1,
                t.phoneMess = "获取验证码")
            }, 1e3)
        },
        paymentSaveBtn(){
            let that = this;
            
            if(!that.value){
                that.$toast('验证码为空');
                return ;
            }
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.post(`${this.apiUrl}/addPaymentType`,qs.stringify({
                prove_img:this.imgurl,
                account:this.accountNumber
            })).then((res) => {
                toast1.clear();
                let {data} = res
                if(data.status === 1){
                    that.$toast({
                        message: data.message,
                        onClose(){
                            that.$router.replace('/payment')
                        }
                    });
                }else{
                    that.$toast(data.message);
                }
            }).catch((error) => {
                toast1.clear();
            })
        },
        onarrowLeftClick(e){
            if(this.numArrowLeft === 1){
                this.$router.go(-1)
            }
        },
        afterRead(file) {
            this.uploadMask = true;
            this.uploadFile(file);
        },
        uploadFile: function(file) {
            let that = this;
            let formdata = new FormData();
            formdata.append("img",file.file);
            axios.post(`${this.apiUrl}/uploadImage`,formdata)
                .then((res)=>{
                    let {data} = res;
                    this.uploadMask = false;
                    if(data.status === 1){
                        that.imgurl = `${data.info.filename}`;
                        that.imgurl1 = file.content;
                    }else{
                        that.$toast({
                            forbidClick:true,
                            message:data.message
                        });
                    }
                })
        },
        onLoad(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${this.apiUrl}/getPaymentType`).then((res)=>{
                let {data} = res
                if(data.status === 1){
                    that.accountNumber = data.info.account || 0;
                    that.imgurl =`${data.info.payment_img || ''}`;
                    that.imgurl1 = `${that.staUrl}${data.info.payment_img || ''}`;
                
                }else{
                    const toast2 = that.$toast(data.message);
                    toast2.clear();
                }
                toast1.clear();
                
            }).catch((error) => {
                toast1.clear();
            })
        }
    }
}
</script>
<style lang="scss">
.payment-wrapper{
    padding-bottom: 3rem;
    .payment-save-btn{
        color: #fff;
        background-color: #51dafe;
        text-align: center;
        border-radius: 5px;
        width: 100%;
        border: 0;
        margin-top: 1rem;
    }
    .van-cell{
        background-color: #3b4576;
            align-items: center;
    }
    min-height: 100vh;
    background-color: #fbbb5f;
    .payment-form{
        padding: .24rem;
        .van-cell__title{
        
        }
        .van-field__label{
            color: #abbddb;
            text-align: left;
        }
        .van-field__value,.van-field__control{
            color:#7388ab
        }
        input::-webkit-input-placeholder{color:#7388ab}
        .postmess button{
            background: transparent;
        }
        .payment-form-upload{
            display: flex;
            flex-wrap: nowrap;
            background-color: #3b4375;
            align-items: center;
            padding: .25rem;
            margin-top: .1rem;
            border-radius: .1rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .paymentFormItem_1_img{
                background-color: #454d80;
                padding: 5px;
                border-radius: 5px;
                position: relative;
                display: flex;
                .van-icon{
                    font-size: 2rem;
                    color: #fbbb5f;
                }
                
            }
            .paymentFormItem_2{
                color: #7489ac;
                margin-top: .2rem;
                font-size: .14rem;
            }
            .payment-form-upload-mask{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 10;
                background: rgba(0,0,0,.5);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                .van-loading__spinner{
                    color: #fff;
                }
                .van-loading__text{
                    color: #fff;
                }
            }
        }
    }

}

</style>