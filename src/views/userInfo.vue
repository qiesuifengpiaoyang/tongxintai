<template>
    <div class="userinfo-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="实名认证"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-cell-group
            :border="false"

        >
            <van-field 
            :border="false"
            class="mb10 br5" 
            label="状态" 
            :value="statustxt" 
            readonly />
            <van-field
            v-if="status===2"
            v-model="refuse_msg"
            class="mb10 br5" 
            rows="2"
            autosize
            label="原因"
            type="textarea"
            :disabled="true"
            placeholder="未知原因"
            show-word-limit
            />
            <van-field 
            :border="false"
            class="mb10 br5" 
            v-model="true_name" 
            label="姓名" 
            :readonly="disabled"
            placeholder="请输入姓名" />
            <van-field 
            class="mb10 br5" 
            :border="false"
            :readonly ="disabled"
            v-model="card_id" 
            label="身份证" 
            placeholder="请输入身份证"  
            @touchstart.native.stop="show = true"/>
            <van-number-keyboard
            v-model="card_id" 
            :show="show"
            extra-key="X"
            close-button-text="完成"
            @blur="show = false"
            />
            <div class="mb10 br5 payment-form-upload" >
                <van-uploader
                    :preview-full-image="false"
                    :after-read="afterRead1"
                    :disabled = "disabled"
                >
                    <div class="paymentFormItem_1">
                        <div class="paymentFormItem_1_img">
                            <van-icon name="add" v-if="!card_img_front1"/>
                            <img :src="card_img_front1" alt="" v-else style="width:100%;height:3rem">
                        </div>
                    </div>
                    <div class="paymentFormItem_2">点击上传身份证正面</div>
                    <div class="payment-form-upload-mask" v-if="uploadMask1">
                        <van-loading>上传中...</van-loading>
                    </div>
                </van-uploader>
            </div>
            <div class="mb10 br5 payment-form-upload" >
                <van-uploader
                    :preview-full-image="false"
                    :after-read="afterRead2"
                    :disabled = "disabled"
                >
                    <div class="paymentFormItem_1">
                        <div class="paymentFormItem_1_img">
                            <van-icon name="add" v-if="!card_img_back1"/>
                            <img :src="card_img_back1" alt="" v-else style="width:100%;height:3rem">
                        </div>
                    </div>
                    <div class="paymentFormItem_2">点击上传身份证反面</div>
                    <div class="payment-form-upload-mask" v-if="uploadMask2">
                        <van-loading>上传中...</van-loading>
                    </div>
                </van-uploader>
            </div>
            <van-button type="primary" @click="certification" class="payment-save-btn" v-if="!disabled">提交</van-button>
        </van-cell-group>
        <popup></popup>
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import axios from '@/tool/axios.js'
import qs from 'qs';
export default {
    data(){
        return {
            pageshow:false,
            show:false,
            disabled:false,
            uploadMask1:false,
            uploadMask2:false,
            status:9999,
            // 实名认证 审核中 已认证 认证未通过
            true_name:'',
            statustxt:'',
            refuse_msg:'',
            card_id:'',
            card_img_front:'',
            card_img_front1:'',
            card_img_back:'',
            card_img_back1:'',
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
        // beforeRead(file){
        //     // if (file.type !== 'image/jpeg') {
        //     //     this.$toast('请上传 jpg 格式图片');
        //     //     return false;
        //     // }
        //     return true;
        // },
        firstAPi(){
           let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${this.apiUrl}/getCertification`).then((res)=>{
                // axios.get(`https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/getCertification`).then((res)=>{
                // https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/getCertification
                let {data} = res;
                if(data.status === 1){
                    // that.list = res.data.info
                    if(!Array.isArray(data.info)){

                   
                        let httpd = /^http[s]?:\/\/*/.test(data.info.card_img_front)
                        let httpds = /^http[s]?:\/\/*/.test(data.info.card_img_back)
                        that.true_name =data.info.true_name || '';
                        that.card_id=data.info.card_id || '';
                        that.card_img_front=`${data.info.card_img_front || ''}`;
                        that.card_img_front1 = httpd ? `${data.info.card_img_front || ''}`: `${that.staticUrl}/${data.info.card_img_front || ''}`;
                        that.card_img_back=`${data.info.card_img_back || ''}`;
                        that.card_img_back1= httpds ? `${data.info.card_img_back || ''}`: `${that.staticUrl}/${data.info.card_img_back || ''}`;
                        that.status = data.info.status || '';
                        that.refuse_msg = data.info.refuse_msg || '';
                        if(data.info.status === 0){
                            that.statustxt = '审核中';
                            that.disabled = true
                        }else if(data.info.status === 1){
                            that.statustxt ='审核通过'
                            that.disabled = true
                        }else if(data.info.status === 2){
                            that.statustxt ='审核不通过'
                            that.disabled = false
                        }
                    }
                }else{
                    that.$toast(data.message);
                }
                toast1.clear();
            }).catch((error) => {
                toast1.clear();
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        certification(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.post(`${that.apiUrl}/certification`,qs.stringify({
                true_name:this.true_name,
                card_id:this.card_id,
                card_img_front:this.card_img_front,
                card_img_back:this.card_img_back,
            })).then((res)=>{
                toast1.clear();
                let {data} = res;
                if(data.status === 1){
                    that.$toast({
                        message:'上传成功',
                        onClose(){
                            that.$router.replace('/me')
                        }
                    });
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
        afterRead1(file) {
            this.uploadMask1 = true;
            this.uploadFile(file, 1, 'card_img_front');
        },
        afterRead2(file) {
            this.uploadMask2 = true;
            this.uploadFile(file, 2, 'card_img_back');
        },
        uploadFile: function(file, n, s) {
            let that = this;
            let formdata = new FormData();
            formdata.append("img",file.file);
            axios.post(`${this.apiUrl}/uploadImage`,formdata)
                .then((res)=>{
                    let {data} = res;
                    that['uploadMask'+n] = false;
                    if(data.status === 1){
                        that[s] = `${data.info.filename}`;
                        that[s+'1'] = file.content
                    }else{
                        that.$toast({
                            forbidClick:true,
                            message:data.message
                        });
                    }
                })
        },
    }
}
</script>
<style lang="scss">
    .userinfo-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fbbb5f;
        .payment-save-btn{
            color: #fff;
            background-color: #51dafe;
            text-align: center;
            border-radius: 5px;
            width: 100%;
            border: 0;
            margin-top: .2rem;
        }
        .van-cell-group{
            background: transparent;
            padding: .24rem;
            .van-cell__title{
                color: #abbddb;
                text-align: left;
            }
            .van-cell{
                background-color: #3b4576;
            }
            .van-field__value,.van-field__control{
                color:#7388ab
            }
            input::-webkit-input-placeholder{color:#7388ab}
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
                padding: .24rem;
                border-radius: 5px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                .van-icon{
                    font-size: 1rem;
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