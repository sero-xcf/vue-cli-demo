<template lang="">
    <div class="goodsInfo-container">
         <!-- 小球 -->
         <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
         </transition>
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :banners="banners"></swiper>
                </div>
            </div>
        </div>
          <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="new-price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p>
                        购买数量:
                        <input @click="buyCount >= 2 && buyCount--" type="button" value="-" :disabled="buyCount === 1"></input>
                        <input @change="filterMaxCount" v-model="buyCount"  type="number"></input>
                        <input @click="buyCount <goodsInfo.stock_quantity && buyCount++" type="button" value="+" :disabled="buyCount === goodsInfo.stock_quantity"></input>

                    </p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                </div>
            </div>
            
        </div>
        
            <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <p>商品货号:{{goodsInfo.goods_no}}</p>
                   <p>库存情况:{{goodsInfo.stock_quantity}}</p>
                   <p>上架时间:{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      banners: [],
      buyCount: 1,
      goodsInfo: {},
      ballFlag:false
    };
  },
  created() {
    this.getBanners();
    this.getGoodsInfo();
  },
  methods: {
    getBanners() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        this.banners = result.body.message;
      });
    },
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        this.goodsInfo = result.body.message[0];
      });
    },
    filterMaxCount() {
      if (this.buyCount > this.goodsInfo.stock_quantity) {
        this.buyCount = this.goodsInfo.stock_quantity;
      }
    },
    goDesc(id) {
      this.$router.push("/home/goodsDesc/" + id);
    },
    goComment(id) {
      this.$router.push("/home/goodsComment/" + id);
    },
    addToShopCar() {
        
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter: function(el) {
      el.style.transform="translate(0,0)";
      
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      //获取小球在页面中的位置
      const ballPosition =this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的位置
      const badgePosition =document.getElementById("badge").getBoundingClientRect();
      
      const xDist =badgePosition.left - ballPosition.left;
      const yDist =badgePosition.top - ballPosition.top;

      el.offsetWidth;
      el.style.transform=`translate(${ xDist}px,${  yDist}px)`;
      el.style.transition="all 1s ease";
      done();
    },
    afterEnter: function(el) {
      this.ballFlag = !this.ballFlag;
    }
  }
};
</script>

<style lang="less">
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  .new-price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  input {
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
  .ball {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    top: 387px;
    left: 130px;
   
  }
}
</style>