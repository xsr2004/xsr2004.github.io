<template>
    <div>    

        <el-menu 
          default-active="1-4-1" 
          class="el-menu-vertical-demo" 
          @open="handleOpen" 
          @close="handleClose" 
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          >
          <img src="../assets/user.png" alt="" class="title_top_img">
        <h3 v-show="!isCollapse">通用后台管理系统</h3>

          <!-- 一级菜单 -->
          <el-menu-item @click="clickMenu(item)" v-for="item in nochildren" :key="item.name" :index="item.name" >
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
          <!-- 二级菜单 -->
          <el-submenu  v-for="item in haschildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group  v-for="everyitem in item.children" :key="everyitem.path">
              <el-menu-item :index="everyitem.path" @click="clickMenu(everyitem)">{{everyitem.label}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
    </div>
  
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    padding-left: 0;
    
    text-align: left;
  }
  .el-menu{
    height: 100vh;
    border: 0;
    h3{
      color:#fff;
      height: 20px;
      line-height: 25px;
      font-size: 16px;
      text-align: center;
      font-weight: 400;
      margin-bottom: 20px;
    }
  }
  .title_top_img{
    display: block;
    width: 60px;
    height: 60px;
    margin:20px auto 
    // text-align: center;
  }
</style>

<script>

  export default {
    name:'CommonAside',
    data() {
      return {
        
        menuData:[
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },//home
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 's-goods',
          url: 'MallManage/MallManage'
        },//mall
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },//user
        {
          path:'/personal',
          name:'personal',
          label:'个人中心',
          icon:'s-custom',
          url:'personal/personal'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }//其他
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        // 当页面路由与跳转路由不一样时才跳转
        if(this.$route.path!=item.path)
        {
          if(!(this.$route.path==='/'&&item.path==='/home')){
            this.$router.push(item.path)//直接跳转item.path对应的路由
          }
        }
        this.$store.commit('selectMenu',item)
      },
      
      
    },
    computed:{
        // 没有子菜单
        nochildren(){
            return this.menuData.filter((item)=>{return !item.children})
        },
        haschildren(){  
            return this.menuData.filter((item)=>{return item.children})
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
    }
  }
</script>