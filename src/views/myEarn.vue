<template>
    <div class="myearn-wrapper" v-if="pageshow">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="我的收益"
            left-arrow
            @click-left="onarrowLeftClick"
        />
        <div class="myearn-hed">
            <div class="bala">
                <p class="ba1">余额</p>
                <p class="ba2">{{available_amount}}</p>
            </div>
            <div class="qwidt">
                <!-- <van-button color="#ed6a0c" icon="points" plain type="primary" @click="goldFn(1)">推广积分</van-button> -->
                <van-button color="#ed6a0c" icon="gold-coin" plain type="primary" @click="goldFn(2)">去提现</van-button>
            </div>
        </div>
        <div class="myearn-bod">
            <van-tabs v-model="active" :border="false">
                <van-tab title="收益">
                    <div class="item1" v-for="(item, index) in income" :key="index">
                        <div class="item1-1">
                            <p class="desc">{{item.desc}}</p>
                            <p class="date">{{item.date}}</p>
                        </div>
                        <div class="item1-2">+{{item.money}}</div>
                    </div>
                </van-tab>
                <van-tab title="支出">
                    <div class="item1" v-for="(item, index) in outcome" :key="index">
                        <div class="item1-1">
                            <p class="desc">{{item.desc}}</p>
                            <p class="date">{{item.date}}</p>
                        </div>
                        <div class="item1-2 o2">-{{item.money}}</div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <popup></popup>
    </div>
</template>
<script>
import axios from '@/tool/axios.js'
import popup from "@/components/popup.vue";
export default {
    data(){
   
        return {
            income: [],
            outcome:[],
            available_amount:0,
            pageshow:false,
            active:0,
            apiUrl: this.$store.state.apiDomain
        }
    },
      components: {
    popup
  },
    mounted(){
        this.onLoad();
    },
    methods:{
        goldFn(n){
            if(n===2){
                if(+this.available_amount === 0){
                    this.$toast('余额为0')
                }else{
                    this.$router.push('/withdraw')
                }
            }else{
                this.$router.push('/myPoints')
            }
            
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
            axios.get(`${this.apiUrl}/getRewardLog`).then((res)=>{
                let {data} = res;
                toast1.clear();
                if(data.status === 1){
                    that.pageshow = true
                    let {outcome, income,available_amount} = data.info;
                    that.available_amount = available_amount;
                    that.income = income;
                    that.outcome = outcome;
                
                }else{
                    that.$toast(that.message);
                }
            })
            .catch(()=>{
                toast1.clear();
                that.$toast('连接超时，请重试');
            })
        }
    }
}
</script>
<style lang="scss">
.myearn-wrapper{
    min-height: 100vh;
    background-color: #f4f4f4;

    // .myearn-con{
        .myearn-hed{
            padding: .4rem .2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            .bala{
                text-align: left;
                font-size: .24rem;
                .ba1{
                    color: #bbb;
                }
                .ba2{
                    color: #ed6a0c;
                    font-size: .7rem;
                    line-height: 1.2;
                }
            }
            
            .qwidt{
                display: flex;
                flex-direction: column;
                button{
                    width: 1.8rem;
                    padding: 0;
                    height: 34px;
                    margin-top: .3rem;
                    border-radius: 5px;
                    &:first-child{
                        margin-top: 0;
                    }
                }
                // height: .6rem;
                // padding: 0 .3rem;
                // border: 1px solid #ed6a0c;
                // border-radius: 100px;
                // display: flex;
                // align-items: center;
                // font-size: .22rem;
                // color: #ed6a0c;
                // i{  
                //     margin-right: .1rem;
                //     color: #ed6a0c;
                // }
            }
        }
        .myearn-bod{
            margin-top: .2rem;
            background: #fff;
            padding:  .2rem;
            .item1{
                border-top: 1px solid #eee;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: .3rem 0;
                .item1-1{
                    font-size: .26rem;
                    font-size: #bbb;
                    text-align: left;
                    .date{
                        font-size: .24rem;
                        color: #ccc;
                    }
                }
                .item1-2{
                    color: #ed6a0c;
                    font-size: .3rem;
                    font-weight: bold;
                    &.o2{
                        color: #07c160;
                    }
                }
            }
            .van-tabs__nav{
                .van-tabs__line{
                    display: none;
                }
                .van-tab{
                    font-weight: bold;
                    font-size: .3rem;
                }
                .van-tab--active{
                    color: #ed6a0c;
                }
            }
            
        }
    // }

}

</style>