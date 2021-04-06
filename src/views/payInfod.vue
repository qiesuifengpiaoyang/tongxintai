<template>
    <div class="payinfod-wrapper" v-cloak>
        <van-nav-bar
            class="navbar"
            :border="false"
            title="付款信息"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="payinfod-con">
            <p class="payinfod-sp">借款人信息</p>
            <div class="payinfod-sp1">
                <p>姓名：{{true_name}}</p>
                <p>身份证：{{card_id}}</p>
            </div>
            <div class="payinfod-sp2">
                <img :src="payment_img" alt="">
                <p>付款二维码</p>
                <p>微信账号 <span>{{account}}</span></p>
                <p>付款金额<span>{{payment_money}}</span>元</p>
            </div>
            <p class="payinfod-sp3">请使用微信App,扫描以上二维码付款{{payment_money || 0}}元，付款时在微信或支付宝订单备注您平台认证的姓名</p>
            <div class="mb10 br5 payment-form-upload" >
                <van-uploader
                    :preview-full-image="false"
                    :after-read="afterRead"
                >
                    <div class="paymentFormItem_1">
                        <div class="paymentFormItem_1_img">
                            <van-icon name="qr" v-if="!icon_photo1"/>
                            <img :src="icon_photo1" alt="" v-else style="width:100%;height:4rem">
                        </div>
                    </div>
                    <div class="paymentFormItem_2">点击上传付款截图</div>
                    <div class="payment-form-upload-mask" v-if="uploadMask">
                        <van-loading>上传中...</van-loading>
                    </div>
                </van-uploader>
            </div>
            <div class="payinfod-sp4" @click="submitPay">
                我已付款
            </div>
        </div>
        <van-dialog v-model="submitPayshow" title="备注" show-cancel-button @confirm="confirmc">
            <van-field v-model="beizhuv" placeholder="请输入付款人姓名" class="beizhuv"/>
        </van-dialog>
        <popup></popup>
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import axios from '@/tool/axios.js'
import qs from 'qs';
export default {
    data(){
        return {
            submitPayshow:false,
            index:0,
            true_name :'',
            payment_img:'',
            card_id: '',
            account:'',
            payment_money: '',
            icon_photo1:'',
            icon_photo:'',
            uploadMask:false,
            beizhuv:'',
            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
    components:{
        Footer,
        popup
    },
    created(){
        this.index = this.$route.query.index;
        this.type = this.$route.query.type;
        this.to_user_id = this.$route.query.user_id;
    },
    mounted(){
        this.firstAPi();

    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        confirmc(){
           var t = this;
        //    if(!t.beizhuv){
        //        t.$toast("付款人姓名")
        //        return
        //    }
           
            const toas1 = this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            axios.post(`${this.apiUrl}/uploadPayInfo`,qs.stringify({
               to_user_id:t.to_user_id,
                    prove_img:t.icon_photo ,
                    remark:t.beizhuv
            })).then(function(i) {
                let {data} = i;

                if(data.status === 1){
                    history.back(0)
                }else{
                    t.$toast(data.message)
                }
                toas1.clear()
            })
        },
        // getData: function() {
 
        // },
        submitPay(){
            if(!!this.icon_photo){
                this.submitPayshow = true;
            }else{
                this.$toast('请上传付款截图');
            }
            
        },
        firstAPi(){
            const toas1 = this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            axios.get(`${this.apiUrl}/payInfo`,{
                params:{
                    to_user_id:this.$route.query.user_id
                }
            })
            .then((res) => {
                toas1.clear();
                let {data} = res;
                if(data.status === 1){
                    
                    this.true_name = data.info.true_name;
                    this.payment_img = `${this.staticUrl}/${data.info.payment_img}`;
                    this.card_id = data.info.card_id;
                    this.account = data.info.account;
                    this.payment_money = data.info.payment_money;
                }else{
                    this.$toast(data.message)
                }
            })
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
                        that.icon_photo = `${data.info.filename}`;
                        that.icon_photo1 = file.content;
                    }else{
                        that.$toast({
                            forbidClick:true,
                            message:data.message
                        });
                    }
                })
        }
    }
}
</script>
<style lang="scss">
    .payinfod-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fbbb5f;
        .beizhuv{
                input{
                    text-align: center;
                }
            }
        .payinfod-con{
            padding:.24rem;
            .payinfod-sp{
                color: #c0c7f5;
                text-align: left;
                font-size: .24rem;
            }
            .payinfod-sp1{
                background: #3b4375;
                border-radius: 5px;
                padding: .1rem;
                line-height:2;
                margin-top: .1rem;
                color: #7489ac;
                text-align: left;
                font-size: .24rem;
            }
            .payinfod-sp2{
                padding: .1rem;
                background: #3b4375;
                margin-top: .1rem;
                border-radius: 5px;
                color: #838ebc;
                font-size: .24rem;
                p{
                    line-height:1.8;
                    span{
                        color: #56baeb;
                    }
                }
                img{
                    width: 100%;
                    margin-bottom: .1rem;
                }
            }
            .payinfod-sp3{
                font-size: .24rem;
                margin-top: .1rem;
                text-align: left;
                line-height:1.6;
            }
            .payinfod-sp4{
                color: #fff;
                text-align: center;
                background-color: #46cffe;
                padding: .24rem;
                font-size: .24rem;
                margin-top: 1rem;
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
                    font-size: .24rem;
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