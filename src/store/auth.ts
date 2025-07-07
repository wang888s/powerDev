import { defineStore } from 'pinia'
import { loginApi } from '../api/user'


interface loginData{
  username:string,
  password:string
}
//选项式
export const useUserStore = defineStore('user', {
    state: () => ({
      token:sessionStorage.getItem("token") || "",
      roles:sessionStorage.getItem('roles') ? JSON.parse(sessionStorage.getItem('roles')!) : [],
      username:sessionStorage.getItem("username") || "",
      menu:sessionStorage.getItem("menu")?JSON.parse(sessionStorage.getItem("menu")!):[]
    }),
    
    actions: {
      async login(data:loginData){
        try{
          const res=await loginApi(data)
          const {data:{menulist,token,user:{roles,username}}} =await loginApi(data)
          this.token=token
          this.roles=roles
          this.menu=menulist
          this.username=username
          sessionStorage.setItem("token",token )
          sessionStorage.setItem("roles",JSON.stringify(roles) )
          sessionStorage.setItem("menu",JSON.stringify(menulist))
          sessionStorage.setItem("username",username)
          console.log(res);
          
        }catch(e){
          console.log(e);
        }
      },
      logout() {
        this.token = "";
        this.roles = [];
        this.username=""
        this.menu=[]
        sessionStorage.clear()
      },
    },
  })
