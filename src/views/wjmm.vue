<template>
    <div class="login-wrapper">
        <!-- <div  @click="ceshi" class="ceshihm"></div> -->
        <div class="logo"></div>
        <div class="login-form">
            <van-cell value="找回密码" :border="false" class="denglu"/>
            <van-field v-model="mobile" label="" type="tel" placeholder="请输入您的手机号" />
            <van-field
            v-model="phoneCode"
            center
            clearable
            placeholder="请输入短信验证码"
            >
            <template #button>
                <van-button size="small" type="primary" @click="postmess">{{phoneMess}}</van-button>
            </template>
            </van-field>
            <van-field v-model="pwd" label="" type="password" placeholder="请输入新密码" />
            <div @click="signInFn" class="sign-in-btn">
            确定
            </div>
        </div>
        <div class="login-register" @click="loginRegister">
            登录
        </div>
        <popup></popup>
    </div>
</template>
<script>
import axios from '@/tool/axios.js'
import popup from "@/components/popup.vue";
import {debounce} from 'lodash-es';
import qs from 'qs';
export default {
    data(){
        return {
            mobile:'',
            pwd:'',
            phoneCode:'',
            times:60,
            timeout:null,
            phoneMess:'获取验证码',
            isclick:false,
            apiUrl: this.$store.state.apiDomain
        }
    },
      components: {
    popup
  },
    computed:{
        disabled(){
            return !(this.mobile && this.pwd && this.phoneCode)
        }
    },
    mounted(){
    },
    methods:{
        ceshi(){
            window.location.href="//192.168.0.9:8080/#/userInfo"
        },
                postmess: debounce(function() {
            var t = this;

            if (!this.isclick) {
                
                axios.post(`${this.apiUrl}/smsSend`,qs.stringify({
                    // axios.post(`https://www.fastmock.site/mock/ffb6c7bbbc1d29d2680b4ced9be90d58/58/getCertification`,qs.stringify({
                    mobile:t.mobile,
                    type:'forgetPassword'
                })).then(function(e) {
                    let {data} = e;
                    
                    if(data.status === 1){
                        
                        t.$toast("验证码发送成功")
                    }else{
                        clearInterval(t.timeout)
                        t.$toast(data.message)
                    }
                }).catch((error)=>{
                    clearInterval(t.timeout)
                    
                })
                // let top = document.body.scrollHeight || document.documentElement.scrollHeight;
                //     window.scrollTo({
                //         top,
                //         behavior: 'smooth'
                //     });
                t.setTimes();
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
        loginRegister(){
            this.$router.push('login')
        },
        signInFn(){
            let that = this;
            if(that.disabled){
                return ;
            }
            const toast1 = that.$toast.loading({
                message: '密码设置中...',
                forbidClick: true,
                duration:0
                });
           axios.post(`${this.apiUrl}/forgetPassword`,qs.stringify({
            mobile:this.mobile,
            pwd:this.pwd,
            phoneCode:this.phoneCode
        })
        ).then((res)=>{
                toast1.clear();
            let {data} = res;
            if(data.status === 1){
                that.$dialog.alert({
                title: '提示',
                message: '新密码设置成功',
                }).then(() => {
                that.$router.replace('/login')
                });
                     
            }else{
                this.$toast(data.message)
            }
            
        }).catch(()=>{
            toast1.clear()
        })
        }
    },
    watch:{
        disabled(){

        }
    }
}
</script>
<style lang="scss">
    .login-wrapper{
       background: #fbbb5f; 
       min-height: 100vh;
       overflow: hidden;
       .ceshihm{
            width: .1rem;
            height: .1rem;
            position: absolute;
            left: 40%;
            top: 0.1rem;
       }
        .logo{
            width: 2rem;
            height: 2rem;
            margin: .7rem auto
        }
        .login-form{
            background-color: #fff;
            margin: 0 .24rem;
            padding: .2rem;
            border-radius: 5px;
            .wjmm{
                padding-top: .24rem;;
                text-align: right;
                font-size: .24rem;
            }
            .van-cell__value--alone{
                font-size: .4rem;
            }
            .van-field__control{
                font-size: .28rem;
            }
            // font-size: .4rem;
            // .denglu{
            //     font-size: .2rem;
            // }
            .captcha-code{
                padding-right: 0;
                font-size: .28rem;
                .van-cell__title{
                    text-align: left;
                    width: 1.4rem;
                }
                .captcha-code-img{
                    width: 2.4rem;
                }
                > div{
                        align-self: center;
                }
            }
            .sign-in-btn{
                color: #fff;

                background: #42cbfd;
                border-radius: 5px;
                /* padding: 0.1rem 0; */
                margin-top: 0.5rem;
                font-size: 0.3rem;
                height: .8rem;
                /* line-height: 1; */
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .login-register{
            border: 2px solid #7489ac;
            color: #7489ac;
            border-radius: 5px;
            margin: 0 0.24rem;
            /* padding: 0.1rem 0; */
            margin-top: 0.5rem;
            background: transparent;
            font-size: 0.3rem;
            height: .8rem;
            /* line-height: 1; */
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .save-pic-box{
 
    }
</style>