<template>
    <div class="login">
        <el-form  :inline="true" :model="form" :rules="rules" class="login-container" :ref="form">
        <h2 class="login-title">Login</h2>
        <el-form-item  prop="username" class="input-item">
            <el-input v-model="form.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <el-form-item  prop="password" class="input-item">
            <el-input v-model="form.password" placeholder="密码" type="password" show-password prefix-icon="el-icon-lock" @keyup.enter.native="submit()"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit()" >登录</el-button>s
        </el-form-item>
        </el-form>
    </div>
    
</template>
<script>
import Cookie from 'js-cookie'
import {LoginSubmit} from '../api/index'
export default {
    data(){
        return {
            form:{
                username:'',
                password:'',
            },
            rules:{
                username:
                [
                    {required: true,trigger: 'blur', message: '请输入用户名'},
                ],
                password:[
                    {required: true,trigger: 'blur', message: '请输入密码'},
                ]
            },
        }
    },
    methods:{
        //登录
        submit(){
            //token信息
            // 将token信息存入cookie，用于不同页面的通信
            LoginSubmit(this.form).then((response)=>{
                if(response.judge){
                    let token=1
                    Cookie.set('token',token);
                    this.$router.push('/Home')
                }
                else{
                    this.$message.error('后台没有这个username');
                    this.form.username=''
                    this.form.password=''
                }
            })
            
        }
    }
}
</script>
<style scoped lang="less">

.login{
    //页面加全屏背景
    background: url(../images/4.jpg) no-repeat;
    width: 100%;
    height: 100%;
    position:fixed;
    background-size:100% 100%;
    
}
.login-container{
    width: 350px;
    margin:200px auto;
    margin-right: 200px;
    padding:35px 35px 15px 35px;
    background: rgba(0,0,0,0.4);
    border-radius: 10px;
    // box-shadow: 0 0 25px #cac6c6;
    // border:1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(20px);
    .input-item{
        margin-left: 50px;
    }
    .el-input{
        width: 198px;
        background: rgba(255, 255, 255, 0.01);
    }
     box-sizing: border-box;
     .el-button{
        margin-left: 95px;
        margin-top: 20px;
        background-color: gray;
        border: 0;
        width: 100px;
        height: 40px;
     }
     
}
.login-title{
    margin:10px 10px;
    margin-bottom: 40px;
    text-align: center;
    color:#fff;
}
/deep/ .el-input__inner {

    background-color: rgba(255, 255, 255, 0.247);
    border: 0;
    // border-bottom: 2px solid #fff;
}
/deep/ .el-input input {
  color: #fff !important;

}
</style>
