import {instance1,instance2} from "./request";

// 请求首页数据函数
export const GetHomeDataPage=(params)=>{
    // console.log(params,'params');
    return instance1.get('/HomeData',{params})
}
export const GetHomeDataSearch=(params)=>{
    // console.log(params,'params');
    return instance1.get('/HomeData',{params})
}
export const GetHomeData=()=>{
    console.log("没有page");
    return instance1.get('/HomeData')
}
export const AddHomeData=(data)=>{

    return instance1.post('/HomeData',data)
}
export const EditHomeData=(data)=>{
    
    return instance1.put(`/HomeData/${data.id}`,data)
}
export const DeleteHomeData=(data)=>{
    return instance1.delete(`/HomeData/${data.id}`,data)
}
export const LoginSubmit=(data)=>{
    return instance2.get('/Login',{data})
}
