<template>
    <div class="contactus-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="联系我们"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="contactus-con">
            <van-collapse v-model="activeNames">
                    <van-collapse-item title="【同心台】软件是合法的吗？" name="1">
                        答：软件是四川省圆又缘网络科技有限公司开发的。
                    </van-collapse-item>
                    <van-collapse-item title="这个软件的作用是什么？" name="2">
                        答：主要作用之一、线上销售一些家庭的最常规生活用品，通过大家拼团降低成本，为一些优质的产品企业打通销售瓶颈，为企业清尾货或库存。是厂家直接面对消费者的垂直销售。<br>
                        作用二、通过使用者对软件服务的实际价值，可以转化为公司的专（或兼）职销售经理，达到意想不到的收入。<br>
                        作用三、通过公司内部成员的一致认可，自愿参与公司互帮互助，达到一人有难，全员帮忙的目的。弘扬中国传统美德。
                    </van-collapse-item>
                    
                    <van-collapse-item title="问：软件下载和使用要钱吗？" name="2">
                        答：要的，软件下载需要付费1.5元。（因为软件开发和维护需要巨大成本），为了软件能够健康长久的为大家提供有价值的服务。使用者每个月要交会员使用费9.19元。
                    </van-collapse-item>
                    <van-collapse-item title="问：软件内容会不会不符合大家所讲的内容？" name="3">
                        答：不会的，软件的内容是一步步完善的，我们会通过一年时间全部完成。请大家见证和监督，软件拿照时间是2020年5月20日。我们会在一年内让大家看清这个良心企业为国家和整个社会做了一件什么样的事。
                    </van-collapse-item>

                     <van-collapse-item title="问：互帮板块，真的能实现吗？" name="3">
                        答：能的，每一件事物的产生都是需求决定成败。请问自己，你想在遇到困难时，有一群人来帮你吗？如果你想，说明大家都想，所以能轻松运作成功。
                    </van-collapse-item>
                     <van-collapse-item title="问：软件推广会违法吗？" name="3">
                        答：我们是正规销售，每一个在推广的人员，都是公司与个人签定了销售合同。公司是正规上税企业，包括每个地方都会快速建分公司，并完善地方税务。
                    </van-collapse-item>

                     <van-collapse-item title="问：公司销售带着模式，会不会违规？" name="3">
                        答：公司没有模式，是公司收到使用者购买软件后，钱会打到公司指定帐户，大家看到的模式是公司给大家讲这笔钱的奖励分配，任何销售都有一个利润分配。
                    </van-collapse-item>
                     <van-collapse-item title="问：软件需要实名注册吗？" name="3">
                        答：必须实名，如果不实名，到时候绑定银行卡，绑定不了，公司在发工资时，就无法发放。
                    </van-collapse-item>
                     <van-collapse-item title="问：注册审核要多久时间？" name="3">
                        答：一般是一分之内，请大家一定要认真对待。
                    </van-collapse-item>
                </van-collapse>
                <div class="contactus-foo">
                    <p>客服微信：19160572276</p>
                </div>
        </div>

<popup></popup>
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import qs from 'qs';
export default {
    data(){
        return {
            activeNames: ['1','2','3','4','5'],
        }
    },
    components:{
        Footer,
        popup,
    },
    mounted(){
    },
    methods:{
       
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
        .contactus-con{
            padding: .24rem;
            .van-collapse-item{
                &:first-child .van-cell{
                        border-radius: 5px 5px 0 0;
                }
                .van-cell{
                    padding: .24rem;
                }
                &:last-child .van-collapse-item__content{
                        border-radius: 0 0 5px 5px ;
                }
            }
            .van-cell__title,.van-collapse-item__content{
                    text-align: left;
                    font-size: .28rem;
                    span{
                        font-size: .28rem;
                    }

                }
                .van-collapse-item__content{
                        text-align: justify;
                        padding: .28rem;
                }
                .contactus-foo{
                    margin-top: .24rem;
                    background: #fff;
                    text-align: left;
                    padding: .24rem;
                    border-radius: 5px;
                    font-size: .28rem;
                }

        }
        
    }
</style>