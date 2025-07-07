<template>
    <div class="bg">
        <div class="login">
            <div class="logo">
                <img :src=logo  width="70px" height="70px">
                <h1 class="ml">电擎智控管理系统</h1>
            </div>
            <div class="mt">
                <el-form ref="formRef" :model="ruleForm" :rules="rules">
                    <el-form-item  prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名" prefix-icon="User" />
                    </el-form-item>
                    <el-form-item  prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="Lock" type="password" />
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" style="width: 100%" @click="handleLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
        </div>
        
    </div>
    
    
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import logo from "@/assets/logo.png"
import { useUserStore } from "@/store/auth.ts"
import router from '../router'


//表单数据数据类型
interface RuleForm {
    username:string
    password:string
}
//表单数据数据绑定
const ruleForm:RuleForm =reactive({ //reactive官网有明确说明，不推荐使用泛型的写法
    username: "admin",
    password:"admin666"
})

//表单校验规则
const rules=reactive<FormRules<RuleForm>>({
    username:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 4, max: 8, message: '用户名要求4到8位字符', trigger: 'blur' },
    ],
    password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
//表单数据
const formRef = ref<FormInstance>();
//按钮事件
const useStore =useUserStore()
function handleLogin(){
    formRef.value?.validate(async (valid: boolean) => { //?.可选链操作符 
    if(valid){
        await useStore.login(ruleForm)
        router.push("/")
    }
  })
}
</script>
<style lang="less" scoped>
.bg{
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-position:center;
    background-repeat: no-repeat;
    height: 100vh;
    .login{
        width: 500px;
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px;
        left: 10%;

        .logo{
        display:flex;
        justify-content: center;
        align-items: center;
        h1{
            color: rgb(29, 29, 176);
        }
    }
    }
    
}
</style>