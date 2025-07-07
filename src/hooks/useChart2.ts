import {type Ref, onBeforeUnmount, onMounted, ref, markRaw } from "vue";
import * as echarts from 'echarts';
import { debounce } from 'lodash-es';

export function useChart(chartRef: Ref<HTMLElement | null>, setChartData: any) {
    const chartInstance = ref<echarts.ECharts | null>(null);//创建图表实例

    const initChart = async () => {
        if (chartRef.value) {
            //绘制echarts图表两步
            //1 先初始化echarts实例 var myChart = echarts.init(chartRef.value);
            //2 然后使用指定的配置项和数据显示图表 myChart.setOption(...)
            chartInstance.value = markRaw(echarts.init(chartRef.value));
            const options = await  ref(setChartData)

            chartInstance.value.setOption(options.value)

        }
    }

    //添加防抖优化
    const resizeChart =debounce (() => {
        chartInstance.value?.resize()
    },300);

    onMounted(() => {
        initChart()
        window.addEventListener("resize", resizeChart)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("resize", resizeChart)
        if (chartInstance.value) {
            chartInstance.value.dispose()
        }
    })

}