<template>
    <div class="too-wrapper" v-cloak>
        <van-nav-bar
            class="navbar"
            :border="false"
            :title="title"
            left-arrow
            @click-left="onarrowLeftClick"
        />
        <div class="too-con" v-if="!!news_content">
            <van-image :show-loading="false" :src="news_content" lazy-load style="width: 100%; ">
            <template v-slot:error>
                <van-icon name="warning-o" class="too-warn-icon" />
                <p class="too-warn-txt">图片加载失败</p>
            </template>
            </van-image>
            <!-- <img src="http://www.jiaoyiker.com//data/upload/2019-09-15/5d7deecc29fc2.jpg" alt=""> -->
        </div>
        <popup></popup>
    </div>
</template>
<script>
import qs from 'qs';
import axios from '@/tool/axios.js'
import popup from "@/components/popup.vue";
export default {
    data(){
   
        return {
            title:'同心台',
            news_content:'',
            apiUrl: this.$store.state.apiDomain,
            staUrl:this.$store.state.staticDomain
        }
    },
      components: {
    popup
  },
    created: function() {
        
    },
    mounted(){
        this.firstApi();
        
    },
    methods:{
        resetSrc: function(t) {
            var e = this.staUrl;
            let sd = '';
            t.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function(t, r) {
                var i = e + r;
                sd = i;
                return i
            })
            return sd;
        },
        onarrowLeftClick(){
            this.$router.go(-1)
        },
        firstApi(){
            let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${this.apiUrl}/getNews`,{
                params:{
                    n_id:that.$route.query.id
                }
            }).then((res)=>{
                let {data} = res
                if(data.status === 1){

                    that.title = data.info.newList.news_title
                   that.news_content= that.resetSrc(data.info.newList.news_content)
                   
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
.too-wrapper{
    padding-bottom: 3rem;
    min-height: 100vh;
    background-color: #fbbb5f;
    .too-con{
        .van-image__error{
            background: transparent;
            margin-top: 1rem;
        }
        .van-image__loading{
            background: transparent;
        }
    }
    
    .too-warn-icon{
        font-size: .24rem;
        color: #fff;
    }
    .too-warn-txt{
        font-size: .22rem;
        line-height: 1;
        margin-top: .1rem;
        color: #fff;
    }
}
</style>