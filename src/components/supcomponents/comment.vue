<template lang="">
    <div class="cmt-container">
       <h3>发表评论</h3>
       <hr>
       <textarea placeholder="请输入要BB的内容(最多BB120个字)" maxlength="120">
           
       </textarea>
       <mt-button type="primary" size="large">发表评论</mt-button>
        <div class=cmt-list>
            <div class=cmt-item v-for="(item, i) in comments" :key="item.add_time">
                <div class=cmt-title>
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}
                </div>
                 <div class=cmt-body>
                   {{item.content === "undefined"? "此用户很懒，啥也没说" : item.content}}
                 </div>
            
            </div>
           
           
        </div>
         <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>    
    </div>
</template>
<script>
export default {
    data(){
        return {
         pageindex :1,
         comments:[]
         
        }
    },
    created(){
        this.getcomments()
    },
    methods:{
        getcomments(){
          this.$http.get("getcomments/"+this.id+"?pageindex="+this.pageindex).then(result=>{
              console.log(result)
              this.comments = this.comments.concat(result.body.message)

          })
        },
        getmore(){
            this.pageindex++
            this.getcomments()
        }
    },
    props:["id"]
}
</script>
<style lang="less">
   .cmt-container{
       h3{
           font-size:18px;
       }
       textarea{
           font-size:14px;
           height: 85px;
           margin: 0;
       }
       .cmt-list{
           margin:5px 0 ;
           .cmt-item{
             font-size:13px;
             .cmt-title{
               background-color: #ccc;
               line-height: 30px;
             }
             .cmt-body{
               line-height: 35px;
               text-indent: 2em;
             }  
           }
       }
   } 
</style>