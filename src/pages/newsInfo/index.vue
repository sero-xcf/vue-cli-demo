<template lang="">
    <div class="newsInfo-container">
        <!-- 大标题 -->
       <h3 class="title">{{newsInfo.title}}</h3>
       <!-- 子标题 -->
       <p class="subtitle">
           <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
            <span>点击:{{newsInfo.click}}次</span>  
       </p>
       <hr>
       <!-- 内容区 -->
       <div class="content" v-html="newsInfo.content"></div>
       <!-- 评论区 -->
       <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
//导入评论的子组件
import comment from "../../components/supcomponents/comment.vue"
export default {
   data(){
       return {
           id:this.$route.params.id,
           newsInfo:{}
       }
   },
   created(){
     this.getnewsInfo()
   },
   methods:{
       getnewsInfo(){
         this.$http.get("getnew/"+this.id).then(result=>{
             console.log(result)
             this.newsInfo = result.body.message[0]
         })
       }
   },
   components:{
       //用来注册子组件的节点
       "comment-box":comment
   } 
}
</script>
<style lang="less">
    .newsInfo-container{
        padding: 0 4px;
      .title{
        font-size:16px;
        text-align: center;
        margin:15px 0;
        color:red;
      }
      .subtitle{
        font-size:13px;
        color:#226aff;
        display: flex;
        justify-content: space-between;
      }
      .content{
          img{
              width: 100%;
          }
      }
    }
</style>