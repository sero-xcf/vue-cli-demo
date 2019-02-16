<template lang="">
    <div class="photoInfo-container">
       <h3>{{ photoInfo.title}}</h3>
       <p class="subtitle">
           <span>发表时间{{ photoInfo.add_time | dateFormat}}</span>
           <span>点击{{ photoInfo.click}}次</span>  
       </p>
       <hr>

       <!-- 缩略图区域 -->
       <div class="thumbs">
             <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="index"/>
       </div>

       <!-- 图片内容区域 -->
       <div class="content" v-html=" photoInfo.content"></div>

       <!-- 放置一个现成的子组件 -->
      <cmt-box :id="this.id"></cmt-box>
    </div>
</template>
<script>
// 导入评论子组件
import comment from "../../components/supcomponents/comment.vue"
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("getimageInfo/" + this.id).then(result => {
        this.photoInfo = result.body.message[0];
      });
    },
    getThumbs() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        // 循环每个图片数据，补全图片的宽和高
        result.body.message.forEach(item => {
          item.w = 600;
          item.h = 400;
        });
        // 把完整的数据保存到 list 中
        this.list = result.body.message;
      });
    },    
  },
  components:{
      "cmt-box":comment
    }
};
</script>
<style lang="less" scoped>
.photoInfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>