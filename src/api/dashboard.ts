import { get } from '../utils/http'

enum Api {
    chartData = '/chartData',//饼图
    chartData2 = '/chartData2'//折线图
    
}
function chartDataApi(): Promise<any> {
    return get(Api.chartData)
}
function chartDataApi2():Promise<any>{
    return get(Api.chartData2)
}  
export { chartDataApi,chartDataApi2 }