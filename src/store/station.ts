import { defineStore } from 'pinia';
import { ref } from 'vue';
import type{ RowType } from "@/types/station";
 export const useStationStore= defineStore('station',()=>{
    const rowData=ref<RowType>({
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
    const setRowData=(row:RowType)=>{
        rowData.value = row
        console.log("store",rowData.value)
    }
    // const deleteRowData=(row:RowType)=>{

    // }
    return { rowData, setRowData }
 })