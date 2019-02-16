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
  components: { App },
  template: '<App/>'
})
