<template>
    <div id="container"></div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { mapListApi } from "@/api/map.ts"
import icon from "../../assets/flashIcon.png";
import stationPic from "@/assets/station.jpg"
let map: any = null;
const markersData = ref<any>([])
onMounted(() => {
    //   window._AMapSecurityConfig = {
    //     securityJsCode: "a77d0b14088789d468b4aa223720a699",
    //   };
    AMapLoader.load({
        key: "7cc73ff7857df7b17d1068502844590d", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 5, // 初始化地图级别
                center: [116.397428, 39.90923], // 初始化地图中心点位置
            });
            mapListApi().then(({ data }) => {
                console.log(data);
                markersData.value = data;
                const infoWindow = new AMap.InfoWindow({
                    offset: new AMap.Pixel(0, -30), // 信息窗体的偏移量
                    // content: "这是信息窗体！",
                });
                markersData.value.forEach((markerData: any) => {
                    const marker = new AMap.Marker({
                        position: markerData.position,
                        title: markerData.title,
                        icon: icon
                    });
                    marker.on('click', () => {
                        infoWindow.setContent(`
              <div style="display:flex;padding:10px;align-items:center;">
                <div>
                    <img src="${stationPic}" width="200px"/>  
                  </div>
                  <div style="width:180px;line-height:30px;margin-left:20px">
                    <h3>${markerData.title}</h3> 
                    <p>充电桩数量：${markerData.count}</p> 
                    <p >充电站状态：<span style="color:blue">${markerData.status == 1 ? "使用中" : "维护中"}</span></p> 
                  </div>
                </div>
            `); // 设置窗体内容
                        infoWindow.open(map, marker.getPosition());
                    });
                    marker.setMap(map); // 将标记添加到地图上
                });
            })
        })
        .catch((e) => {
            console.log(e);
        });
});
onUnmounted(() => {
    map?.destroy();
});
</script>
<style lang="less" scoped>
#container {
    width: 100%;
    height: 80vh;
}

.info-modal {
    display: flex;
    padding: 20px !important;
}
</style>