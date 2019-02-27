// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from "vue-resource"

Vue.use(vueResource)
Vue.http.options.root = 'http://www.lovegf.cn:8899/api/';
import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.css'

import "./styles/common.css"
import "./libs/mui/css/mui.css"
import "./libs/mui/css/icons-extra.css"
import { Button } from 'mint-ui';

// 安装vuex
import Vuex from "vuex"
Vue.use(Vuex)
//页面加载时获取
 let car =JSON.parse(localStorage.getItem("key") || "[]") 
let store =new Vuex.Store({
  state:{
   car:car//id price count selected
  },
  mutations:{
    addToCar(state,goodsInfo){
      //加入购物车的逻辑
      //如果存在只需要更新数量即可
      //如果不存在 只需push到car中

       //假设法
      // 假设不存在
      // var flag =false     
      // state.car.some(item=>{
      //   if(item.id === goodsInfo.id){
      //     item.count += parseInt(goodsInfo.count)
      //     flag =true
      //     return true
      //   }
      //   if(!flag){
      //     state.car.push(goodsInfo)
      //   }

      // })
        var index = state.car.findIndex(item=>
             item.id === goodsInfo.id)
        if(index === -1){
          state.car.push(goodsInfo)
        }else{
          state.car[index].count += parseInt(goodsInfo.count) 
        }
        //数据变化 存在本地缓存中
        localStorage.setItem("key",JSON.stringify(state.car))     
    },
    //这里的goodsInfo只要有count和id即可
    updateCount(state,goodsInfo){
      state.car.some(item=>{
        if(item.id===goodsInfo.id){
          item.count =goodsInfo.count
          return true
        }
      })
      localStorage.setItem("key",JSON.stringify(state.car))  
    },
    removeFormCar(state,id){
      state.car.some((item,i)=>{
        if(item.id === id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem("key",JSON.stringify(state.car))  
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id === info.id){
          item.selected = !info.selected
          return true
        }
      })
      localStorage.setItem("key",JSON.stringify(state.car))  
    }
    
  },
  getters:{
    totalCount(state){
      let sum = 0
      state.car.forEach(item=>{
          sum +=  item.count 
      })
      return sum
    },
    
    goodsCount(state){
      let o ={}
      state.car.forEach(item=>{
        o[item.id] = item.count
      })
      return o
    },
    goodsSelected(state){
      let o ={}
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o
    },
    goodsCountAndAmount(state){
      let o ={
        count:0, //数量
        amount:0 //总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count,
          o.amount += item.price * item.count
        }
   
      })
      return o
    }
    
  }
})

//全局注册组件
import swiper from "./components/swiper.vue"
Vue.component("swiper",swiper)

Vue.component(Button.name, Button);

import { Header } from 'mint-ui';

Vue.component(Header.name, Header);

import moment from "moment"
//定义全局过滤器
Vue.filter("dateFormat",function(datestr,pattern="YYYY-MM-DD HH:mm:ss"){
  return  moment(datestr).format(pattern)
})
//安装vue-pic-preview
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
