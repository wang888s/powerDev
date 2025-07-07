import { post } from "@/utils/http";

enum Api{
    Login = '/login',
}
interface loginData{
    username:string,
    password:string
}
function loginApi(data:loginData):Promise<any>{
    return post(Api.Login,data)
}
export{loginApi}