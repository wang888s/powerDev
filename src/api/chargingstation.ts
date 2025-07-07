import type { RowType } from '@/types/station'
import { post } from '../utils/http'

enum Api {
    stationList = '/stationList',
    stationEdit='/station/edit',
    stationDelete="/station/delete",
}
interface ListType{
    id?:string,
    name?:string,
    status:number,
    page:number,
    pageSize:number,
}
function listDataApi(listData:ListType){
    return post(Api.stationList,listData)
}
function editApi(data:RowType):Promise<any>{
    return post(Api.stationEdit,data)
}
function deleteApi(id:string):Promise<any>{
    return post(Api.stationDelete,{id})
}

export { listDataApi, editApi,deleteApi}