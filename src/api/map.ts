import { post } from "@/utils/http";

enum Api{
    MapList = '/mapList',
}
function mapListApi():Promise<any>{
    return post(Api.MapList)
}

export{mapListApi}
// interface mapData{
//     position:[],
//     title:string,
//     status:number,
//     count:number
// }
// function mapApi(data:mapData):Promise<any>{
//     return post(Api.MapList,data)
// }
// export{mapApi}