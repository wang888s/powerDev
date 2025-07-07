import type { MenuItem } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'


//组合式
export const useTabsStore=defineStore('tabs',()=>{
    const tabs=ref<MenuItem[]>([]);
    const currentTab=ref<{name:string;url:string}>({ name: "数据看板", url: "/dashboard" })
    const addTab=(name:string,url:string,icon:string)=>{
        if(!tabs.value.some(tab => tab.url === url)) {
            tabs.value.push({ name, url, icon });

        }

    }
    const setCurrentTab = (name: string, url: string) => {
        currentTab.value = { name, url }
       
    }
    const removeTab=(name:string)=>{
        // console.log(currentTab);
        if (currentTab.value.name===name) {
            const currentTabIndex=tabs.value.findIndex(tab => tab.name === name)
            // console.log(currentTabIndex);
            if (currentTabIndex!=0) {
                currentTab.value = tabs.value[currentTabIndex - 1];
            }else{
                return
            }
            
        }
        //filter筛选符合条件的数组并返回新数组
        tabs.value = tabs.value.filter(tab => tab.name !== name)
    }
    return {tabs,addTab,currentTab,setCurrentTab,removeTab}
}

)