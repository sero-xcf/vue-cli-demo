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
let store =new Vuex.Store({
  state:{
   car:[]//id price count selected
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
    }
  },
  getters:{

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
