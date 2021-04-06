<template>
    <div>
        <van-tabbar 
        class="common-footer-module"
        route 
        :fixed="false"
        active-color="#fbbb5f" 
        inactive-color="#cecfd8">
            <van-tabbar-item v-for="(item, index) in gridItems" :key="index" :icon="item.icon" replace :class="{itemon:item.id === isActive}" @click="tabnarfn(item)">{{item.text}}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            gridItems:[
                {id:1,icon:'wap-home',text:'首页',url:'/home'},
                {id:2,icon:'bookmark',text:'财富',url:'/plan'},
                {id:5,icon:'shopping-cart',text:'电销',url:'/dx/'},
                {id:3,icon:'smile-comment',text:'互帮',url:'/help'},
                // {id:6,icon:'bookmark',text:'商学院',url:'/teaching/0'},
                {id:4,icon:'manager',text:'我的',url:'/me'},
                
            ]
        }
    },
    created(){
        let open_academy = parseInt(sessionStorage.getItem('open_academy'))
        let str = {id:6,icon:'bookmark',text:'商学院',url:'/teaching/0'}
        if(open_academy){
            this.gridItems.splice(4,0,str)
        }
    },
    props:["isActive"],
    methods:{
        tabnarfn(n){
            if(n.id === 5){
                this.$dialog({ message: '等待开启' });
                // window.location.href='/dx/'
            }else{
                this.$router.push(n.url)
            }
        }
    }
}
</script>
<style lang="scss">
.common-footer-module{
    z-index: 10!important;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    .van-tabbar-item{
        font-size: .24rem;
    }
    .van-tabbar-item__icon{
        font-size: .34rem;
        
    }
    .van-tabbar-item__text{
            // font-size: .12rem;
        }
    .itemon{
        .van-tabbar-item__icon{
            animation: myfirst .1s;
            color: #fbbb5f;
        }
        .van-tabbar-item__text{
            color: #fbbb5f;
        }
    }
}

@keyframes myfirst{0%{font-size: .2rem;}to{font-size: .24rem;}}
</style>