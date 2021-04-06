<template>
    <div class="helpcenter-wrapper">
        <!-- <van-nav-bar
            class="navbar"
            :border="false"
            title="互帮中心"
            left-arrow
            @click-left="onClickLeft"
        /> -->
        <div class="helpcen-head">
            <img class="headpho" v-if="icon_url"  :src="icon_url" alt="">
            <div v-else class="headpho-em"></div>
            <div class="headtxt">
                <span>{{name}}</span>
                <span>编号：{{user_id}}</span>
            </div>
        </div>
        <ul class="navmenu">
            <li @click="jumpUrl(1)">
                <van-icon name="balance-o" />
                <p>余额</p>
            </li>
            <li @click="jumpUrl(2)">
                <van-icon name="records" />
                <p>申请互帮</p>
            </li>
            <li @click="jumpUrl(3)">
                <van-icon name="gold-coin-o" />
                <p>充值</p>
            </li>
            <li @click="jumpUrl(4)">
                <van-icon name="contact" />
                <p>城市监督员</p>
            </li>
            <!-- <li @click="jumpUrl(5)">
                <van-icon name="idcard" />
                <p>绑定银行卡</p>
            </li> -->
            <li @click="jumpUrl(6)">
                <!-- <van-icon name="idcard" /> -->
                <van-icon name="newspaper-o" />
                <p>互助公示</p>
            </li>
            <li @click="jumpUrl(7)">
                <!-- <van-icon name="idcard" /> -->
                <van-icon name="description" />
                <p>明细</p>
            </li>

        </ul>  

        <div class="helpcen-txt">
            <p>同心台加盟商或普通会员，都要心存善念，助人自助的思想。医互帮是一人生病，众人相帮，今天我生病，大家来帮我；明天他生病，我们去帮他；感谢同心台的所有成员，感恩大家的善心助力。</p>
           <p>医互帮的进行原则是，每一次有会员生病，申请互帮后，我们的监督管理员到生病会员指定的医院陪同检查，并证实生病属实。上传医院需要治疗的费用，公司在收到上报材料后，审核部门开始审核，审核通过后，公司会先通知，并核实申请互帮人员的收款帐户的误差性，然后快速给对方快速转款，帮助对方快速治病。</p>
           <p>互帮款来历：比如我们所有会员，在医互帮系统每人预存60元互助款，假如我们有100万会员。如果某一位会员生病需要3万元医疗款，那么系统将会在每个会员的帐户里自动扣除3分钱，系统为了便于好计算（每次最低扣0.1元），大家轮流依次扣。</p>
               
        </div>    
        <popup></popup>
        <Footer :isActive="4" />  
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import qs from 'qs';
export default {
    data(){
        return {
            pageshow:false,
            name:'',
            user_id:'',
            icon_url:'',

            apiUrl: this.$store.state.apiDomain,
            staticUrl: this.$store.state.staticDomain
        }
    },
    components:{
        Footer,
        popup
    },
    mounted(){
        this.name = sessionStorage.getItem('name');
        this.user_id = sessionStorage.getItem('id');
        this.icon_url = !!sessionStorage.getItem('icon_url') ? `${this.staticUrl}${sessionStorage.getItem('icon_url')}` : '';
    },
    methods:{
        jumpUrl(n){
            if(n===1){
                this.$router.push('/myplanlist')
            }else if(n===2){
                this.$router.push('/helpApply')
            }else if(n===3){
                this.$router.push('/applyhelp')
            }else if(n===4){
                this.$router.push('/citySuper')
            }else if(n===5){
                this.$router.push('/bindCard')
            }else if(n===6){
                this.$router.push('/publicitylist')
            }else if(n===7){
                this.$router.push('/detail')
            }
        }
        
    }
}
</script>
<style lang="scss">
    .helpcenter-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #f4f4f4;//#fbbb5f;
        font-size: .26rem;
        .helpcen-head{
            padding: .2rem;
            display: flex;
            align-items: center;
            background: #fff;
            color: #151516;
            .headpho{
                width: 1.3rem;
                height: 1.3rem;
                border-radius: 100%;
                border: 1px solid #eee;
            }
            .headpho-em{
                width: 1.3rem;
                height: 1.3rem;
                border-radius: 100%;
                border: 1px solid #eee;
                background: #eee;
            }
            .headtxt{
                display: flex;
                flex-direction: column;
                text-align: left;
                padding-left: .3rem;
                span{
                    &:first-child{
                        font-weight: bold;
                    }
                    line-height: 1.6;
                }
            }
        }
        .helpcen-txt{
            padding: .2rem;
            font-size: .28rem;
            text-align: left;
            background: #fff;
            color: rgba(70,71,73,1);
            p{
                text-align: justify;
                margin-bottom: .2rem;
            }
        }
        .navmenu{
            display: flex;
            align-items: center;
            padding-bottom: .3rem;
            background: #fff;
            color: rgba(79,80,81,1);;
            margin: .2rem 0;
            flex-flow: wrap;
            li{
                text-align: center;
                flex-basis: 25%;
                margin-top: .3rem;
            }
            i{
                font-size: .6rem;
                color: rgba(138,138,138,1);
            }
        }
        .ce_tit_1{
            font-size: .2rem;
            text-align: left;
            margin: .3rem 0;
        }
        .ce_tit{
            font-size: .3rem;
            text-align: left;
            margin: .3rem 0;
        }
        .helpdbtn{
            text-align: center;
            color: #fff;
            font-size: .34rem;
            margin-top: .5rem;
            background: #1989fa;
            border-radius: 10px;
            margin: .6rem .2rem;
            padding: .2rem 0;
        }
    }
</style>