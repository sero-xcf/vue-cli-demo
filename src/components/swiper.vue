<template lang="">
    <div>
      <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in banners" :key="index">
                <a :href="item.url">
                <img :class="{full:fullscreen}" :src="item.img || item.src" alt>
                </a>
            </mt-swipe-item>
       </mt-swipe> 
    </div>
</template>
<script>
export default {
    props:["banners","fullscreen"]
}
</script>
<style lang="less">
    .mint-swipe {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
      img {
        
        height: 100%;
      }
      img.full{
        width: 100%;
      }
    }
  }
</style>