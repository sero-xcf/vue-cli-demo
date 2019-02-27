<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- //商品列表项区域 -->
      <div class="mui-card" v-for="(item,i) in shopCarList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch :value="$store.getters.goodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.goodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <div>
                <span class="price">￥{{item.sell_price}}</span>
               
                  <input @click="subtract(item.id)" type="button" value="-">
                  <input type="number"  v-model="goodsCount[item.id]">
                  <input @click="increment(item.id)" type="button" value="+">
               

                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选商品 <span class="red">{{$store.getters.goodsCountAndAmount.count}}</span> 件，总价<span class="red">￥{{$store.getters.goodsCountAndAmount.amount}}</span></p>
            
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
          shopCarList:[],
          goodsCount:this.$store.getters.goodsCount
        }
    },
    created(){
      this.getShopCarList()
    },
    methods:{
        getShopCarList(){
            var idArr=[]
            this.$store.state.car.forEach(item=>idArr.push(item.id))
            if(idArr.length <= 0){
                return 
            }
            this.$http.get("goods/getshopcarlist/"+idArr.join(",")).then(result=>{
              this.shopCarList = result.body.message
            })
        },
        subtract(id){
          this.goodsCount[id] > 1 && this.goodsCount[id]--
          this.$store.commit("updateCount",{id:id,count:this.goodsCount[id]})
        },
          increment(id){
          this.goodsCount[id]++
          this.$store.commit("updateCount",{id:id,count:this.goodsCount[id]})
        },
        remove(id,index){
          this.shopCarList.splice(index,1)
          this.$store.commit("removeFormCar",id)
        },
        selectedChanged(id,val){
          this.$store.commit("updateGoodsSelected",{id,selected:val})
        },
      
    }
}
</script>

<style lang="less">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
      margin: 0 10px;
    }
    .info {
      h1 {
        font-size: 14px;
      }
      .price {
        color: red;
        font-weight: bold;
      }
      
         
        input {
          width: 30px;
          height: 30px;
          margin: 0;
          padding: 0;
          text-align: center;
         
        }
      
    }
  }
  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color:red;
      font-weight: bold;
      font-size:16px;
    }
  }
}
</style>