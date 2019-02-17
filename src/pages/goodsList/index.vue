<template lang="">
    <div class="goodsList-container">
        <div class="goodsItem" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h3>{{item.title}}</h3>
            <div class="goods-info">
                <p class="price">
                <span class="new-price">￥{{item.market_price}}</span>
                <span class="old-price">￥{{item.sell_price}}</span>  
                </p>
                <p class="sell">
                <span >热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>  
                </p>
            </div>
        </div>
           <!-- 加载更多 -->
          <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
          
      
      
      
    </div>
 
</template>
<script>
export default {
    data(){
        return {
         pageIndex:1,
         goodsList:[]
        }
    },
    created(){
      this.getGoodsList()
    },
    methods:{
      getGoodsList(){
        this.$http.get("getgoods?pageindex="+this.pageIndex).then(result=>{
            this.goodsList = this.goodsList.concat(result.body.message)
        })
      },
      getMore(){
         this.pageIndex++
         this.getGoodsList()
      },
      goDetail(id){
        this.$router.push("/home/goodsInfo/"+id)
      }
    }
}
</script>
<style lang="less">
.goodsList-container {
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goodsItem {
    padding: 3px;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow:0 0 8px #ccc;
    margin:4px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height:293px;
   
   
    img {
      width: 100%;
    //   height: 200px;
    }
    h3 {
      font-size: 14px;
      font-weight: 700;
    }
    .goods-info {
       background-color: #ccc;
       padding: 3px;
      .price {
       
        margin-top: 8px;
        .new-price {
          color: red;
          font-size: 16px;
        }
        .old-price {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
     
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
    }
  }
}
</style>