<template>
  <div>
    <!-- <el-row>
        <el-col :span="8">
          <el-card class="box-card">
              <div class="user">
                  <img src="../assets/user.png" alt="">
                <div class="user-info">
                  <p class="name">Admin</p>
                  <p class="access">超级管理员</p>
                </div>
              </div>
              <div class="login-info">
                  <p >上次登录时间：<span>2022-7-19</span></p>
                  <p class="located">上次登录地点：<span>北京</span></p>
              </div>
          </el-card>
        </el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row> -->
    <!-- 添加功能 -->
    <el-card class="box-card first">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-input  placeholder="请输入用户姓名" v-model="SearchParams.SearchName" @keyup.enter.native="Search"></el-input>
            </el-col>
          <el-button type="primary" icon="el-icon-search" @click="Search" >搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="button_AddHomeData(form)">添加</el-button>

         
          </el-row>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :before-close="handleClose" >
            <el-form ref="form" :model="form" label-width="80px" class="add_form" :rules="rules">
              <el-form-item label="用户姓名" prop="name">
                  <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="zip">
                <el-input v-model="form.zip" placeholder="请输入用身份证号"></el-input>
              </el-form-item>
            <el-form-item label="城市"  prop="province">
              <el-select v-model="form.province" placeholder="省份" class="add_form province" >
                <el-option label="北京" value="北京"></el-option>
                <el-option label="陕西" value="陕西"></el-option>
              </el-select>

              <!-- <el-select v-model="form.region.county" placeholder="县/村">
                <el-option label="绥德" value="shanghai"></el-option>
                <el-option label="杨陵" value="shanghai"></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item prop="city">
              <el-select v-model="form.city" placeholder="市区">
                <el-option label="东城" value="东城"></el-option>
                <el-option label="海淀" value="海淀"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入家庭地址"></el-input>
              </el-form-item>
          <el-form-item label="添加日期" prop="date">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">立即创建</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
          </el-form>
        </el-dialog>
          

    </el-card>
    <!-- 展示后台数据 -->
    <el-card class="box-card" style="height:550px">
      <el-table
    :data="tableData"
    border
    style="width: 100%"
    max-height="500">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="130">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="100">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="身份证号"
      width="240">
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="button_EditHomeData(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="button_DeleteHomeData(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="TotalData"
        :page-size=8
        @current-change="handlePage">
    </el-pagination>
  </div>
</template>

<script>
import {GetHomeDataPage,GetHomeData,AddHomeData,EditHomeData,DeleteHomeData,GetHomeDataSearch} from '../api/index'
export default {
    name:'home',
    data(){
        return{
          tableData: [],
          dialogFormVisible: false,
          form: {
            name: '',
            province:'',
            city:'',
            address:'',
            date: '',
            zip:''
          },
          rules: {
              name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              province: [
                { required: true, message: '请选择省份', trigger: 'change' }
              ],
              city: [
                { required: true, message: '请选择市区', trigger: 'change' }
              ],
              date: [
                {  required: true, message: '请选择日期', trigger: 'change' }
              ],
              address: [
                {  required: true, message: '请选择地址', trigger: 'change' }
              ],
              zip:[
                {required: true, message: '请输入身份证号', trigger: 'change'},
              ]
          },
          modelType:0,
          SearchParams:{
            SearchName:''
          },
          TotalData:0,
          PageDate:{
            page:1,
            limit:8,
          }
        }
    },
    mounted(){
      GetHomeData().then((response)=>{
        this.tableData=response.data
        this.TotalData=this.tableData.length
      })
    },
    methods:{
      onSubmit(form) {
      this.$refs.form.validate((valid)=>{
          //通过表单验证
          if(valid){
            if(this.modelType===0)
            {
              
              AddHomeData(this.form).then(()=>{GetHomeData().then((response)=>{this.tableData=response.data})})
              this.$message({
                  type: 'success',
                  message: '添加成功'
                });  
              this.handleClose()
            }
            if(this.modelType===1){
              EditHomeData(this.form).then(()=>{GetHomeData().then((response)=>{
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });   
                this.tableData=response.data})})
              this.handleClose()
            }     
          }
      })
    },
      handleClose(){
          this.$refs.form.resetFields()
          this.dialogFormVisible=false
      },
      button_AddHomeData(){
          this.dialogFormVisible=true  
          this.modelType=0
      },
      button_EditHomeData(row){
        this.dialogFormVisible=true
        this.form=JSON.parse(JSON.stringify(row))
        // this.form=row
        this.modelType=1
      },
      button_DeleteHomeData(row){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                DeleteHomeData(row).then(()=>{GetHomeData().then((response)=>{this.tableData=response.data})})
                this.modelType=2
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
      },
      Search(){     
          //对input框筛选
          if(this.SearchParams.SearchName!==''){
                GetHomeDataSearch(this.SearchParams).then((response)=>{
                // 如果没有找到，做个处理？
                if(response.data.length===0){
                  this.$message.error('后台没有这个人')
            
                }
                //如果找到了
                else{
                  this.$message.success("从后台找到了此人!")
                  this.tableData=response.data
                  
                }
          })}
          else{
            this.$message.warning('请输入值，毕竟所有人都有名字！')
          }
          this.SearchParams.SearchName=''
          
      },
      handlePage(val){
        this.PageDate.page=val
        GetHomeDataPage(this.PageDate).then((response)=>{this.tableData=response.data})
      }
    }
}
</script>

<style lang="less" scoped>
.first{
  margin-bottom: 15px;
}
.add_form{
  .province{
  box-sizing: border-box;
  width: 100px;
  }
}
</style>