<template>
  <div class="header-box">
    <van-icon :name="nameArrowLeft" class="left" v-if="nameArrowLeft" @click="arrowLeftClick"/>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
        <template v-if="nameArrowRightType === 'text'">
          <span @click="arrowRightClick">{{nameArrowRightText}}</span>
        </template>
        <template v-if-else="nameArrowRightType === 'icon'">
          <van-icon :name="nameArrowRight" class="left" v-if="nameArrowRight" @click="arrowRightClick"/>
        </template>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    nameArrowLeft: String,
    nameArrowRightType: String,
    nameArrowRight: String,
    nameArrowRightText:String
    // eventArrowLeft: String
  },
  methods:{
    arrowLeftClick(event){
      this.$emit('onarrowLeftClick', event)
      // if(ln === 'arrow-left' && ls === '1'){
      //   this.$router.go(-1)
      // }
    },
    arrowRightClick(event){
      this.$emit('onarrowRightClick', event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-box{
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  height: .5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e48e0b;
  padding: 0 .2rem;
  font-size: .16rem;
  color: #fff;
  .left{
        margin-left: -.07rem;
  }
  .center{
    text-align: center;
  }
  .right{
    span{
      font-size: .14rem;
    }
  }
}
</style>
