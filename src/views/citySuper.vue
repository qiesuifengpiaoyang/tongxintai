<template>
    <div class="citysuper-wrapper">
        <van-nav-bar
            class="navbar"
            :border="false"
            title="城市监督员"
            left-arrow
            @click-left="onClickLeft"
        />
        <div v-if="pageshow">
            <div v-if="newmsg" class="citysuper-add">
                <p>添加城市管理员</p>
                <div class="citysuper-list">
                    <van-cell-group
            :border="false"
        >
                    <div class="he-ya-1">
                    <van-field
                        class="he-ya-cl mb10 br5"
                        :border="false"
                        readonly
                        clickable
                        :value="province_name"
                        placeholder="选择省份"
                        @click="getCity(1)"
                        />
                    <van-field
                        class="he-ya-cl mb10 br5"
                        :border="false"
                        readonly
                        clickable
                        :value="city_name"
                        placeholder="选择市"
                        @click="getCity(2)"
                        />
                    <van-field
                        class="he-ya-cl mb10 br5"
                        :border="false"
                        readonly
                        clickable
                        :value="county_name"
                        placeholder="选择县"
                        @click="getCity(3)"
                        />
                </div>
                </van-cell-group>
                    <van-popup v-model="showPicker" round position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="columns"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                    />
                    </van-popup>
                </div>
                <div class="citysuper-btn" @click="btnCl">
                    确认
                </div>
            </div>
            <div v-else class="citysuper-status">
                <p>{{msg}}</p>
            </div>
        </div>
        <popup></popup>
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import popup from "@/components/popup.vue";
import axios from '@/tool/axios.js'
import { ImagePreview } from 'vant';
import qs from 'qs';
export default {
    data(){
        return {
            pageshow:false,
            pid:0, // 选择省市县
            id:0, // 选择城市id
            newmsg:false,
            showPicker:false,
            columns:[],
            province_name:'',
            province_id:0,
            city_id:0,
            county_id:0,
            city_name:'',
            county_name:'', // 城市名称
            msg:'',
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
        btnCl(){
            let that = this;
            if(!that.city_id){
                that.$toast('城市不能为空');
                return
            }
            const toast1 = that.$toast.loading({
                message: '提交中...',
                forbidClick: true,
                duration:0
                });
            axios.post(`${that.apiUrl}/applyCitySupervisor`,qs.stringify({cityid:that.id})).then((res)=>{
                toast1.clear();
                that.pageshow = true;
                let {data} = res;
                if(data.status === 1){
                    that.$dialog.alert({
                    message: '提交成功',
                    }).then(() => {
                    // on close
                    that.$router.push('/helpCenter')
                    });
                }else{
                    that.$toast(data.message);
                }
            }).catch((error) => {
                toast1.clear();
            })            
        },
        onConfirm(n){
            let that = this;
            if(that.pid === 1){
                that.id = n.id;
                that.province_id = n.id;
                that.province_name = n.text;
                that.city_name = '';
                that.city_id = 0;
                that.county_id = 0;
                that.county_name = '';
                that.columns = [];
            }else if(that.pid === 2){
                that.id = n.id;
                that.city_id = n.id;
                that.city_name = n.text;
                that.county_id = 0;
                that.county_name = '';
                that.columns = [];
            }else if(that.pid === 3){
                that.id = n.id;
                that.county_id = n.id;
                that.county_name = n.text;
                that.columns = [];
            }
            that.showPicker = false;
        },
        mapArr(data,n,m,d,i){
            let that = this;
            try{
                if(Array.isArray(data.info)){
                    if(data.info.length > 0){
                        let arr1 = [...data.info]
                        arr1.map((item)=>{
                            item.text = item.name;
                        })
                        that[d] = true;
                        that[n] = arr1;
                        that[m] = true;
                    }else{
                        that[d] = false;
                        if(i===1){
                            that.$toast('省不存在');
                        }else if(i===2){
                            that.$toast('市不存在,请联系管理员');
                        }else if(i===3){
                            that.$toast('县不存在,请联系管理员');
                        }
                        
                    }
                }
            }catch(e){console.log(e)}
            
        },
        getCity(n){
            let that = this;
            that.pid = n;
            if(n===1){
                that.id = 0;
            }else if(n===2){
                if(!that.province_id){
                    return;
                }
                that.id = that.province_id;
            }else if(n===3){
                if(!that.city_id){
                    return;
                }
                that.id = that.city_id;
            }
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${that.apiUrl}/getCity`,{
                params:{
                    id:that.id
                }
            }).then((res)=>{
                toast1.clear();
                that.pageshow = true;
                let {data} = res;
                if(data.status === 1){
                    if(Array.isArray(data.info)){
                        if(data.info.length > 0){
                            let arr1 = [...data.info]
                            arr1.map((item)=>{
                                item.text = item.name;
                            })
                            that.showPicker = true;
                            that.columns = arr1;
                        }else{
                            if(n===1){
                                that.$toast('省不存在');
                            }else if(n===2){
                                that.$toast('市不存在');
                            }else if(n===3){
                                that.$toast('县不存在');
                            }
                            
                        }
                    }
                }else{
                    that.$toast(data.message);
                }
            }).catch((error) => {
                toast1.clear();
            })
        },
        firstAPi(){
           let that = this;
            const toast1 = that.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:0
                });
            axios.get(`${that.apiUrl}/getApplyCitySupervisor`).then((res)=>{
                toast1.clear();
                
                let {data} = res;
                if(data.status === 1){
                    let {info} = data;
                    if(info.status===1){
                        that.msg = `您申请的城市监督员 【${info.city_name}】-【审核中】`
                    }else if(info.status===2){
                        that.msg = `您申请的城市监督员 【${info.city_name}】-【审核通过】`
                    }else if(info.status===3){
                        that.msg = `您申请的城市监督员 【${info.city_name}】-【审核失败】`
                    }else{
                        that.newmsg = true
                    }
                }else{
                    that.$toast(data.message);
                }
                that.pageshow = true;
            }).catch(()=>{
                that.pageshow = true;
                toast1.clear();
            })
       },
        onClickLeft(){
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="scss">
    .citysuper-wrapper{
        padding-bottom: 1.5rem;
        min-height: 100vh;
        background: #fbbb5f;
        font-size: .26rem;
        .he-ya-1{
            display: flex;
            justify-content: space-between;
            .he-ya-cl{
                flex-basis: 30%;
            }
        }
        .van-cell-group{
            background: transparent;
            // padding: .24rem;
            .van-cell__title{
                color: #abbddb;
                text-align: left;
            }
            .van-field__label{
                width: 2.2rem;
            }
            .van-cell{
                background-color: #3b4576;
            }
            .van-field__value,.van-field__control{
                color:#7388ab
            }
            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder{color:#7388ab}
        }
        .citysuper-btn{
            text-align: center;
            color: #fff;
            font-size: 0.3rem;
            margin-top: 0.5rem;
            background: #1989fa;
            border-radius: 5px;
            padding: 0.26rem 0;
            line-height: 1;
        }
        .citysuper-list{
            // display: flex;
            // justify-content: space-between;
            margin-top: .2rem;
            // height: 2rem;
            .list-p{
            width: 30%;
                float: left;
                margin-left: 0;
            }
            .list-c{
                width: 30%;
                float: left;
                margin-left: 3%;
            }
            .list-o{
                    width: 30%;
                float: left;
                margin-left: 3%;
            }
        }
        .citysuper-add{
            padding: .2rem;
            text-align: left;
            font-size: .28rem;
        }
        .citysuper-status{
            text-align: center;
            color: red;
            margin-top: 2rem;
        }
    }
</style>