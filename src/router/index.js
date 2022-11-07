// 路由文件
import Vue from 'vue'
import VueRouter from 'vue-router';
//import路由组件
import MainView from '../views/MainView.vue'//主视图

import Home from '../views/Home.vue'//首页
import User from '../views/User.vue'//用户管理
import Mall from '../mall/index.vue'//商品管理
import PageOne from '../other/pageOne.vue'//页面1
import PageTwo from '../other/pageTwo.vue'//页面2
import Login from '../views/Login.vue'//登录页面
import personal from '../views/personal.vue'//个人中心

export default new VueRouter({
    // mode:'history',
    routes:[
        {
            path:'/',
            component:MainView,
            redirect:'/Home',//重定向，当路径为#，直接跳转为redirect
            children:[
                {
                    path:'Home',
                    name:'home',
                    component:Home,
                },
                {
                    path:'User',
                    name:'user',
                    component:User,
                },
                {
                    path:'Mall',
                    name: 'mall',
                    component:Mall,
                },
                {
                    path:'Page1',
                    name: 'page1',
                    component:PageOne,
                },
                {
                    path:'Page2',
                    name: 'page2',
                    component:PageTwo,
                },
                {
                    path:'/personal',
                    name:'personal',
                    component:personal
                }
            ]
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },

        

       
    ],
   
})