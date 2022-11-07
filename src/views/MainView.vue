<template>
    <div>
      
    <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
      <el-container>
            <el-header>
                <common-header></common-header>
            </el-header>
            <common-tag></common-tag>
            <el-main>
                <!-- Main路由出口 -->
                <router-view></router-view>
            </el-main>
      </el-container>
    </el-container>
    
    </div>
  </template>
  
  <script>
  import CommonAside from '../components/CommonAside.vue'
  import CommonHeader from '../components/CommonHeader.vue'
  import CommonTag from '@/components/CommonTag.vue'

  export default {
      name:'MainView',
      data(){
          return{
              
          }
      },
      components:{
        CommonAside,
        CommonHeader,
        CommonTag
      }
  }
  </script>
  
  <style>
  html body{
    padding: 0;
    margin: 0;
  }
  .el-header{
    padding: 0;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    line-height: 32px;
    padding-top: 10px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
 
</style>