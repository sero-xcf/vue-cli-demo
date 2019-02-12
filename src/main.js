// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui'
Vue.use(Mint)
import 'mint-ui/lib/style.css'

import "./styles/common.css"
import "./libs/mui/css/mui.css"
import "./libs/mui/css/icons-extra.css"


import { Header } from 'mint-ui';

Vue.component(Header.name, Header);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
