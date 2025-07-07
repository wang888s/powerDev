<template>
    <div class="header">
        <div class="personal">
            <el-badge is-dot class="item">
                <el-button icon="Bell" type="primary" />
            </el-badge>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>

            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">欢迎回家,{{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item icon="User" command="user">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="SwitchButton" command="logout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        
    </div>
</template>
<script lang="ts" setup>

// import router from '@/router';
import { useUserStore } from '@/store/auth';
import {useRouter} from "vue-router"
const router=useRouter()
const userStore=useUserStore()

// const router=useRoute();
// console.log(userStore);

function handleCommand(command:string){
    if(command=="user"){
        router.push("./personal")
    }
    if(command=="logout"){
        userStore.logout()
        router.push("/login")
    }
    
}


</script>
<style lang="less" scoped>
.header{
    // display: flex;
    background-color: white;
    height: 60px;
    align-items: center;
    padding: 10px 20px 0;
    .personal{
        float: right;
        display:flex;
        align-items: center;
        .el-dropdown-link{
            margin-left: 20px;
            // margin-right: 10px;
        }
        .item {
            margin-top: 10px;
            margin-right: 20px;
        }
    }
}

</style>