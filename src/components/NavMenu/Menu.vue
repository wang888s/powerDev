<template>
    <div class="logo">
        <img :src="logo" width="34px"  height="34px" >
        <h1 >电擎智控</h1>
    </div>
    <el-menu :router="true" :default-active="$route.path">
        <MenuItem v-for="item in menuItems" :key="item.url" :item="item"></MenuItem>
    </el-menu>
    
    
</template>
  
<script lang="ts" setup>
import { useUserStore } from "../../store/auth";
import MenuItem from './MenuItem.vue';
import logo from "@/assets/logo.png"
const userStore=useUserStore()
const menuItems=userStore.menu
// console.log(menuItems);


</script>
<style lang="less" scoped>
.logo{
   display:flex;
   justify-content: center;
   align-items: center;
   height: 50px;
   padding:10px 0;
   img{
    margin-left: -10px;
   }
   h1{color:#333;margin-left: 10px;font-size: 22px }
  
}
//去除默认描边
.el-menu{
    border-right: none; 
  }

</style>