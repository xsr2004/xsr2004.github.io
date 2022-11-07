<template>
    <div class="tabs">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.path"
            :closable="item.name!=='home'"
            :disable-transitions="false"
            :effect="$route.name===item.name?'dark':'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            size="small">
            {{ item.label }}
        </el-tag>
    </div>
    
</template>
<script>
import { mapState ,mapMutations} from 'vuex';
export default {
    name:'CommonTag',
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
           tags:state=>{
                return state.tab.tabsList
           } 
        })
    },
    methods:{
        ...mapMutations(['closeTag']),//将store中的mutations中的closeTag函数拿过来，不用commit了
        changeMenu(item){//点击tag跳转相关路由
            this.$router.push({name:item.name})
        },
        handleClose(item,index){//点击tag删除功能
            this.closeTag(item)
            const length=this.tags.length
            //删除之后的跳转逻辑
            if((item.name!=this.$route.name)){
                // 如果删除的和现在的路由不同
                return
            }
            if(index===length){
                //如果删除的是最后一个，就跳转上一条
                this.$router.push({
                    name:this.tags[index-1].name
                })
            }
            else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>
<style scoped lang="less">
.tabs{
    padding:10px;
    background-color: #E9EEF3;
    padding-bottom: 0px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>