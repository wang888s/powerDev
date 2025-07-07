<template>
    <el-sub-menu v-if="item.children" :index="item.url"  >
        <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{item.name}}</span>
          </template>
        <my-menu v-for="children in item.children"  :key="children.url" :item="children"></my-menu>
    </el-sub-menu>
    <!-- 隐藏订单详情页 -->
    <el-menu-item v-else :index="item.url" @click="add(item.name, item.url, item.icon)" v-show="!(item.name=='订单详情')">
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>

</template>
<script lang="ts">

import { defineComponent,type PropType } from 'vue'
import  {type MenuItem as MenuItemType } from "../../types/user/index";
import { useTabsStore } from '@/store/tabs';
export default defineComponent({
    name:'MyMenu', // 你可以给组件起一个名字
    props:{
        item:{
            type: Object as PropType<MenuItemType>,//使用 TypeScript 的 PropType 来指定 item 的具体类型为 MenuItemType
            required: true
        }
    },
    setup(){
        const tabsStore=useTabsStore();
        const{addTab,setCurrentTab}=tabsStore
        //提供add方法setCurrentTab方法用于修改tabsStore中的tabs属性
        function add(name: string, url: string, icon: string) {
            addTab(name, url, icon)
            //setCurrentTab方法让点击页签的同时左侧侧边栏也变化
            setCurrentTab(name,url)
        }
        return {add }

    }
})
// console.log(item);

</script>
<style lang="less" scoped>
.is-active{
    background-color:rgb(34 , 136, 255);
    color: #fff !important;
    div{
    span{color: #fff }
} 
    
}

//鼠标划过样式
.el-menu-item:hover{
    background-color: rgb(34 , 136, 255) !important;color: #fff !important;
}
:deep(.el-sub-menu__title:hover){
    background-color: rgb(34 , 136, 255) !important;color: #fff !important;

}
</style>