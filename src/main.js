import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import router from './router'
import store from './store/index'
import Cookie from "js-cookie"
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

//添加全局前置守卫
router.beforeEach((to,from,next)=>{
  //判断token是否存在
  const token=Cookie.get('token')
  console.log(token);
  if(!token&&to.name!=='Login'){
    // 没有登录并且当前路由不是login
    next({name:'Login'})
  }else if(token&&to.name==='Login'){
    // token有并且当前就是login
    next({name:'Home'})
  }else{
    next()
  }
})
const vm=new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store,
})
console.log(vm);