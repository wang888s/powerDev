<template>
    <el-card>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-input v-model.trim="formData.input" placeholder="请输入站点名称、ID">
                    <template #append>
                        <el-select v-model="select" placeholder="查询条件" style="width: 115px">
                            <el-option label="按名称查询" value="name" />
                            <el-option label="按id查询" value="id" />
                        </el-select>
                    </template>
                </el-input>
            </el-col>
            <el-col :span="6">
                <el-select v-model="formData.value" placeholder="充电站状态">
                    <el-option label="全部" :value="1"></el-option>
                    <el-option :value="2" label="使用中"></el-option>
                    <el-option :value="3" label="空闲中"></el-option>
                    <el-option :value="4" label="维护中"></el-option>
                    <el-option :value="5" label="待维修"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-button @click="loadData" type="primary">查询</el-button>
                <el-button @click="resetData" type="default">重置</el-button>
            </el-col>

        </el-row>

    </el-card>
    <el-card class="mt">
        <el-row :gutter="10">
            <el-col :span="6">
                <el-statistic title="累计充电量(度)" :value="268900" />
            </el-col>
            <el-col :span="6"><el-statistic title="累计充电次数(次)" :value="1389" /></el-col>
            <el-col :span="6"><el-statistic title="服务区域(个)" :value="88" /></el-col>
            <el-col :span="6"><el-statistic title="累计效益(元)" :value="5622178" /></el-col>
        </el-row>

    </el-card>
    <el-card class="mt">
        <el-button type="primary" @click="handleAdd">
            <el-icon style="margin-right: 5px;">
                <Plus />
            </el-icon>
            新增充电站
        </el-button>
    </el-card>
    <el-card class="mt">
        <el-table :data="tableData" height="600" style="width: 100%">
            <el-table-column prop="index" type="index" label="序号" />
            <el-table-column prop="name" label="站点名称" />
            <el-table-column prop="id" label="站点ID" />
            <el-table-column prop="city" label="所属城市" />
            <el-table-column prop="fast" label="快充数" />
            <el-table-column prop="slow" label="慢充数" />
            <el-table-column prop="status" label="充电站状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 2" type="primary">使用中</el-tag>
                    <el-tag v-else-if="scope.row.status == 3" type="success">空闲中</el-tag>
                    <el-tag v-else-if="scope.row.status == 4" type="warning">维护中</el-tag>
                    <el-tag v-else-if="scope.row.status == 5" type="danger">待维修</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="now" label="正在充电" />
            <el-table-column prop="fault" label="故障数" />
            <el-table-column prop="person" label="站点负责人" />
            <el-table-column prop="tel" label="负责人电话" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确定要删除吗"  @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="mt fr mb" v-model:current-page="pageInfo.page" v-model:page-size="pageInfo.pageSize"
            background layout="total, sizes, prev, pager, next, jumper" :total="totals" :page-sizes="[10, 20, 30, 50]"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />


    </el-card>
    <StationForm :dialog-visible="visible" @close="visible = false" @reload="loadData" destroy-on-close />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { listDataApi, deleteApi } from '@/api/chargingstation';
import { reactive } from 'vue';
import type { RowType } from "@/types/station"
import StationForm from '@/views/chargingstation/components/StationForm.vue'
import { useStationStore } from '@/store/station'
import { ElMessage } from 'element-plus';
//顶部查询框和下拉框数据
const formData = reactive({
    input: '',
    value: 1
})
//总数据条数
const totals = ref(0)
//总数据内容
const tableData = ref([]);

const loading = ref(false);
//搜索框自带下拉框数据
const select = ref('name')
//分页数据
const pageInfo = reactive({
    page: 1,
    pageSize: 10
})
//表单弹窗
const visible = ref(false)
//弹窗表单pinia数据
const stationStore = useStationStore()
const { setRowData } = stationStore
//编辑弹窗表单数据
const edit = (row: RowType) => {

    setRowData(row)
    visible.value = true;
}
//删除表单数据
const handleDelete = async (id: string) => {
    const res = await deleteApi(id)

    if(res.code===200){
        ElMessage({
        message: res.data,
        type: 'success',
    });
    loadData()
    }
}
//重置弹窗表单数据
const resetData = () => {
    pageInfo.page = 1;
    pageInfo.pageSize = 10;
    formData.input = ""
    formData.value = 1
    select.value = "name"
    loadData()
}
//新增充电桩数据
const handleAdd = () => {
    setRowData({
        name: "",
        id: "",
        city: "",
        fast: "",
        slow: "",
        status: 1,
        now: "",
        fault: "",
        person: "",
        tel: ""
    })
    visible.value = true;
}
const loadData = async () => {
    loading.value = true
    const { data: { list, total } } = await listDataApi({ [select.value]: formData.input, status: formData.value, ...pageInfo, })
    totals.value = total
    tableData.value = list


}
onMounted(() => {
    loadData()
})
const handleSizeChange = (size: number) => {
    pageInfo.pageSize = size
    loadData()
}
const handleCurrentChange = (page: number) => {
    pageInfo.page = page;
    loadData()
}



</script>