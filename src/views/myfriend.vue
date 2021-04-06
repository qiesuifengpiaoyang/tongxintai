<template>
    <div class="myfriend-wrapper" v-cloak>
        <van-nav-bar
            class="navbar"
            :border="false"
            title="我的好友"
            right-text="好友列表"
            left-arrow
            @click-left="onarrowLeftClick"
            @click-right="onarrowRightClick"
        />
        <div class="save-pic-box">
            <h2 class="title">《同心台》让赚钱变得比呼吸还轻松</h2>
            <div class="imgpic">
                <div class="imgpic-canvas">
                    <!-- <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue> -->
                    <img :src="`${imgcode}`" alt="">
                </div>
                
                <!-- <img src="http://www.jiaoyiker.com/public/wap/codeimages/67Inviteqrcode.png" alt=""> -->
                <p>邀请码<span>{{yqcode}}</span></p>
            </div>
            <div class="but">
                <van-button color="#53dcfe" @click="clipboardFn" class="clipboardUrl">复制邀请链接</van-button>
                <!-- <van-button color="#7489ac">保存为图片</van-button> -->
            </div>
            <p class="text">
                只要想赚钱，我们就有缘。<br/>
                【同心台】电商互帮软件，是帮助所有想快速赚钱的加盟商，制定了消费省钱的厂商直通车。<br/>
                同时帮助良心企业降低销售成本，快速清货的目的。<br/>
                同时帮助加盟商利用手上的闲置资源进行加盟商共消式快速变现，帮助所有加盟商解决资金需求。
            </p>
        </div>
<popup></popup>
    </div>
</template>
<script>
import ClipboardJS from 'clipboard';
import popup from "@/components/popup.vue";
import axios from '@/tool/axios.js'
export default {
    data(){
        return {
            //  value: 'https://example.com',
            // size: 150,
            // numArrowLeft:1,
            clipboardUrl:'',
            imgcode:'',
            yqcode: '',
            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
    mounted(){
        this.firstApi()
    },
      components: {
    popup
  },
    methods:{
        firstApi(){
            const toast1 = this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${this.apiUrl}/generateQRcode`)
            .then((res) => {
                toast1.clear();
                let {data} = res;
                if(data.status === 1){
                    this.imgcode = `${this.staticUrl}/${data.info.code_img}`;
                    this.clipboardUrl =  `${data.info.url}`
                    this.yqcode = data.info.yqcode
                }else{
                    this.$toast(data.message)
                }
            }).catch((error) => {
                toast1.clear();
            })
        },
        onarrowLeftClick(e){
                this.$router.go(-1)
        },
        onarrowRightClick(e){
            // this.$toast(`暂未开放`);
            this.$router.push('/myFriendList')
        },
        clipboardFn(){
            let that = this;
            let clipboardUrl = new ClipboardJS('.clipboardUrl',{
                text:function(){
                    return that.clipboardUrl
                }
            });
            clipboardUrl.on('success', function(e){
                that.$toast({
                    message:'复制成功',
                    forbidClick:true
                });
                e.clearSelection();
                clipboardUrl.destroy();
            });
            clipboardUrl.on('error', function(e){
                that.$toast({
                    message:'该浏览器不支持自动复制',
                    forbidClick:true
                });
                clipboardUrl.destroy();
            });
        }
    }
}
</script>
<style lang="scss">
    .myfriend-wrapper{
       background: #2d3464; 
       min-height: 100vh;
    }
    .save-pic-box{
        padding: .24rem;
        .title{
            // width: 2.2rem;
            margin: .5rem;
            color: #fff;
            /* padding: 0.1rem 0; */
            font-size: 0.28rem;
            border-radius: 5px;
            background-color: #d6aa4f;
            text-align: center;
            height: .8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            
        }
        .imgpic{
            margin-top: .5rem;
            .imgpic-canvas{
                width: 2rem;
                height: 2rem;
                background: #fff;
                margin: 0 auto;
                display: flex;
                align-items: center;
                canvas{
                    width: 1.8rem !important;
                    height: 1.8rem !important;
                }
            }
            img{
                width: 1.85rem;
                height: 1.85rem;
                display: block;
                margin: 0 auto;
            }
            p{
                display: flex;
                margin-top: .24rem;
                justify-content: center;
                align-items: center;
                color: #7489ac;
                 font-size: .28rem;
                span{
                    color: #35bffd;
                    font-size: .3rem;
                    margin-left: .24rem;
                }
            }
        }
        .but{
            display: flex;
            justify-content: space-around;
            margin-top: .5rem;
            button{
                width: 2rem;
                font-size: .24rem;
                padding: 0;
                height: .5rem;
                border-radius: 5px;
                display: flex;
                justify-content: center;
            }
        }
        .text{
            margin: .5rem;
            background-color: #d35a57;
            border-radius: 5px;
            padding: .24rem;
            font-size: .24rem;
            display: flex;
            justify-content: center;
            color: #fff;
            flex-direction: column;
            text-align: justify;
            text-justify:inter-word;
        }
    }
</style>