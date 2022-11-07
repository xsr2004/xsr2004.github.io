import { FormItem } from "element-ui"

const state={
    isCollapse:false,
    tabsList:[
        {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
        },//默认首页
    ]//面包屑
}
const mutations={
    //修改isCollapse
    collapseMenu(state){
        state.isCollapse=!state.isCollapse
    },
    //更新面包xue
    selectMenu(state,val){
        // 如果添加的数据存在就不操作
        if(val.name!=='home'){
            const index=state.tabsList.findIndex(v=>{
                return v.name===val.name
            })
            //如果不存在
            if(index===-1){
                state.tabsList.push(val)
            }
            
        }
    },
    //删除tagslist中指定item
    closeTag(state,val){
        const index=state.tabsList.findIndex(v=>{
            return v.name===val.name
        })
        state.tabsList.splice(index,1)
    }
}

export default{
    state,
    mutations,
}