<template>
    <el-tabs v-model="currentTab.name" class="demo-tabs" closable @tab-click="handleClick" @tab-remove="remove" type="card">
        <el-tab-pane v-for="item in tabs" :label="item.name" :key="item.name" :name="item.name">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon >
                        <component :is="item.icon" />
                    </el-icon>
                    <span>&nbsp{{item.name}}</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
    <RouterView></RouterView>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useUserStore } from '@/store/auth';
import { useTabsStore } from '@/store/tabs';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const userStore=useUserStore()
const route=useRoute()

const {menu} =storeToRefs(userStore)


const tabsStore=useTabsStore()
const {tabs,currentTab}=storeToRefs(tabsStore)
const {removeTab,addTab,setCurrentTab}=tabsStore;//因为是方法，不需要响应式，单独解构

function findObjectByUrl(arr:any[], url:string){
    for (const item of arr) {
    if (item.url === url) {
      return item;
    }
    if (item.children) {
      const found:any = findObjectByUrl(item.children, url);
      if (found) {
        return found;
      }
    }
  }
  return null; // 如果未找到，返回 null
}
const {name,url,icon} =findObjectByUrl(menu.value,route.path)
addTab(name,url,icon)
setCurrentTab(name,url)
// console.log("当前页签",currentTab.value);

//传入的是el-tab-pane的name属性
const remove=(name:string)=>{
  //如果删除的是高亮的，再进行路由跳转
  if(currentTab.value.name==name){
        removeTab(name);
        router.push(currentTab.value.url)
    }else{
        removeTab(name); 
    }
}
const handleClick = ({index}:{index:number}) => {
    setCurrentTab(tabs.value[index].name,tabs.value[index].url)
    router.push(tabs.value[index].url)
    // console.log(tabs)
}
</script>
<style lang="less" scoped>
 .demo-tabs {
  :deep(.is-active) {
    color: white !important;background-color: #5696ff;
    
}
  
  }
</style>