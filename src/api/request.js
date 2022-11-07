import axios from 'axios'


const instance1=axios.create({
    baseURL:'http://localhost:3000/',
    timeout:5000,
})
instance1.interceptors.request.use(function (config) {
    
    console.log(config,'我是config');
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
instance1.interceptors.response.use(function (response) {
    let responseParams=response.config.params
    if(responseParams)//有参数的处理
    {
      //这步不能直接拿到response.config.params里面的东西，不知道为啥
      if(responseParams.limit){//有分页参数的处理表格数据
          response.data=response.data.slice(responseParams.limit*(responseParams.page-1),responseParams.limit*responseParams.page)
      }
      if(responseParams.SearchName){//有查找参数的处理表格数据
          response.data=response.data.filter((v)=>{
            return v.name===responseParams.SearchName
          })
      }
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });


const instance2=axios.create({
    baseURL:'http://localhost:3000/',
    timeout:5000,
})
// 登录的请求拦截器
instance2.interceptors.request.use(function(config){
  console.log(config);
  return config
},function(error){
   return Promise.reject(error)
})

instance2.interceptors.response.use(function(response){
  response.judge=false
  response.data.forEach((v) => {
    if(v.username===JSON.parse(response.config.data).username){
        response.judge=true
    }
  });
  // console.log(JSON.parse(response.config.data).username);//要把字符串转为对象
  return response
},function(error){
  return Promise.reject(error)
})

export  {instance1,instance2}