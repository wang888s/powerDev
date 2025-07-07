<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card shadow="always">
                <div class="title">
                    <h3>今日设备运行状况</h3>
                    <p>更新时间:2025年5月17日</p>
                    <el-icon color="#86909c" style="margin-left: 5px;">
                        <Refresh />
                    </el-icon>
                </div>
                <div class="equipment">
                    <div class="item">
                        <h4 class="mt mb">充电桩使用率</h4>
                        <img :src="flash" class="mt mb">
                        <h1 class="mb">2263 / 3398</h1>
                        <div class="statistic-card">
                            <el-statistic :value="9">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="green">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">充电柜使用率</h4>
                        <img :src="flash2" class="mt mb">
                        <h1 class="mb">655 / 1233</h1>
                        <div class="statistic-card">
                            <el-statistic :value="22">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        24%
                                        <el-icon color="red">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h4 class="mt mb">充电站使用率</h4>
                        <img :src="flash3" class="mt mb">
                        <h1 class="mb">72 / 95 </h1>
                        <div class="statistic-card">
                            <el-statistic :value="47">
                                <template #title>
                                    <div style="display: inline-flex; align-items: center">
                                        异常设备
                                        <el-tooltip effect="dark" content="当前有9台设备异常，请尽快处理" placement="top">
                                            <el-icon style="margin-left: 4px" :size="12">
                                                <Warning />
                                            </el-icon>
                                        </el-tooltip>
                                    </div>
                                </template>
                            </el-statistic>
                            <div class="statistic-footer">
                                <div class="footer-item">
                                    <span>相较昨日</span>
                                    <span class="green">
                                        14%
                                        <el-icon color="green">
                                            <CaretTop />
                                        </el-icon>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>常用功能</h1>
                    </div>
                </template>
                <div class="quick mt mb">
                    <div :span="4">
                        <img :src="repair">
                        <p>设备维修</p>
                    </div>
                    <div :span="4">
                        <img :src="daily">
                        <p>每日日报</p>
                    </div>
                    <div :span="4">
                        <img :src="progress">
                        <p>任务进度</p>
                    </div>
                    <div :span="4">
                        <img :src="total">
                        <p>营收占比</p>
                    </div>
                    <div :span="4">
                        <img :src="money">
                        <p>营收统计</p>
                    </div>
                    <div :span="4">
                        <img :src="remain">
                        <p>待办事项</p>
                    </div>
                </div>
            </el-card>
            <el-card class="mt">
                <template #header>
                    <div class="card-header">
                        <h1>能源统计</h1>
                    </div>
                </template>
                <el-row :gutter="5">
                    <el-col :span="8">
                        <div ref="chartRef" style="width: 100%;height: 400px;"></div>
                    </el-col>
                    <el-col :span="16">
                        <div ref="chartRef2" style="width: 100%;height: 400px;"></div>
                    </el-col>
                </el-row>


            </el-card>

        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import flash from "@/assets/flash.png"
import flash2 from "@/assets/flash2.png"
import flash3 from "@/assets/flash3.png"
import repair from "@/assets/repair.png"
import progress from "@/assets/progress.png"
import remain from "@/assets/remain.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import daily from "@/assets/daily.png"

import { ref } from "vue"
import { useChart } from '@/hooks/useChart'
import { chartDataApi,chartDataApi2 } from "@/api/dashboard"
import { reactive } from "vue"

const chartRef = ref(null)
const chartRef2 = ref(null)

//饼图
const setChartData = async () => {
    const chartOptions: any = reactive({
        legend: {
            top: 'bottom'
        },
        tooltip: {
            trigger: "item",
            formatter: '{a}<br/>{b}:{c}'
        },
        series: [
            {
                name: '营收占比',
                type: 'pie',
                radius: ["50%", "70%"],
                center: ['50%', '50%'],
                roseType: "area",
                emphasis: {
                    label: {
                        show: true,
                        fontSize: "16",
                        fontWeight: "bold"
                    }
                },
                data: []
            }
        ],
        graphic: {
            type: 'text',
            left: "center",
            top: "center",
            style: {
                text: "营收占比",
                fontSize: 20,
                fill: "#333"
            }
        }
    })
    const res = await chartDataApi()
    chartOptions.series[0].data = res.data.list;
    return chartOptions
}

const setChartData2 = async () => {
    const chartOptions: any = reactive({
        title: {
            text: '电量统计',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}kw'
            }
        },
        series: [
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "purple",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "lightgreen",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },
            {
                name: '',
                type: 'line',
                data: [],
                lineStyle: {
                    width: 4
                },
                itemStyle: {
                    color: "skyblue",
                    shadowBlur: 5,
                    shadowColor: 'rgba(0,255,0,0.5)'
                },
                smooth: true
            },

        ]
    });
    const res = await chartDataApi2()
    chartOptions.legend.data = res.data.list.map((item: any) => item.name);
    for (let i = 0; i < res.data.list.length; i++) {
        chartOptions.series[i].name = res.data.list[i].name
        chartOptions.series[i].data = res.data.list[i].data
    }
    return chartOptions
}
useChart(chartRef, setChartData)
useChart(chartRef2, setChartData2)

</script>
<style lang="less" scoped>
.title {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;

    p {
        color: #86909c;
        margin-left: 20px;
    }
}

.equipment {
    display: flex;
    justify-content: space-between;
    margin: 0 50px;

    .item {
        h4 {
            margin-bottom: 20px;
            margin-top: 20px;
        }

        h1 {
            font-size: 36px;

        }

        .statistic-card {
            :deep(.el-statistic__content) {
                margin-top: 10px !important;
                margin-bottom: 10px
            }
        }

    }
}

.quick {
    padding: 0 40px;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    p {
        margin-top: 10px;
        color: #333;
    }
}
</style>
    
