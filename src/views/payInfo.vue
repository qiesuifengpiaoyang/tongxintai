<template>
    <div class="payinfo-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="付款信息"
            left-arrow
            @click-left="onarrowLeftClick"
        />
        <div class="payinfo-form">
            <van-field class="mb10 br5" :border="false" label="收款渠道" value="微信或支付宝" readonly />
            <van-field class="mb10 br5" :border="false" v-model="accountNumber" label="账号" placeholder="请输入微信或支付宝收款账号"/>
            <div class="mb10 br5 payinfo-form-upload" >
                <van-uploader
                    :preview-full-image="false"
                    :after-read="afterRead"
                >
                    <div class="payinfoFormItem_1">
                        <div class="payinfoFormItem_1_img">
                            <van-icon name="qr" v-if="!imgurl1"/>
                            <img :src="imgurl1" alt="" v-else style="width:100%;height:4rem">
                        </div>
                    </div>
                    <div class="payinfoFormItem_2">点击上传收款二维码</div>
                    <div class="payinfo-form-upload-mask" v-if="uploadMask">
                        <van-loading>上传中...</van-loading>
                    </div>
                </van-uploader>
            </div>
            <div>
                <van-field
                label="验证码"
                class="mb10 br5" 
                :border="false"
                readonly
                clickable
                v-model="value"
                >
                    <template #button>
                        <van-button class="postmess" size="small" type="primary" @click="postmess">{{phoneMess}}</van-button>
                    </template>
                </van-field>
            </div>
            <van-button type="primary" @click="payinfoSaveBtn" class="payinfo-save-btn">保存</van-button>
        </div>
        <popup></popup>
        <Footer :isActive="1" />
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
        },
        postmess: function() {
            var t = this;

            if (!this.isclick) {
                axios.post(`${this.apiUrl}/smsSend`,qs.stringify({
                    mobile:t.accountNumber,
                    type:'register'
                })).then(function(e) {
                    t.setTimes();
                    let {data} = e;
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
                }).catch(function(e) {
                    clearInterval(t.timeout)
    
                })
            }
        },
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
        payinfoSaveBtn(){

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

                    that.accountNumber = data.info.account;
                    that.imgurl = `${data.info.payment_img}`;
                    that.imgurl1 = `${that.staUrl}${data.info.payment_img}`;
                }else{
                    that.$toast(data.message);
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
.payinfo-wrapper{
    padding-bottom: 3rem;
    .payinfo-save-btn{
        color: #fff;
        background-color: #51dafe;
        text-align: center;
        border-radius: 5px;
        padding: 10px 0;
        width: 100%;
        border: 0;
    }
    .van-cell{
        background-color: #3b4576;
            align-items: center;
    }
    min-height: 100vh;
    background-color: #fbbb5f;
    .payinfo-form{
        padding: .1rem;
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
        .payinfo-form-upload{
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
            .payinfoFormItem_1_img{
                background-color: #454d80;
                padding: 5px;
                border-radius: 5px;
                position: relative;
                .van-icon{
                    font-size: 1rem;
                    color: #fbbb5f;
                }
                
            }
            .payinfoFormItem_2{
                color: #7489ac;
                margin-top: .2rem;
                font-size: .14rem;
            }
            .payinfo-form-upload-mask{
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