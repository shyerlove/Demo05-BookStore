<template>
     <el-table 
        :data="obj.tableData" 
        style="width: 100%;height: 90vh;"
        empty-text="暂无订单..."
        :header-row-style="{'height':'10vh'}"
        :header-cell-style="{ 'text-align': 'center' }" 
        :cell-style="{ 'text-align': 'center','height':'15vh' }" 
        :row-style="rowStyle"
     >
        <el-table-column prop="stock_id" label="订单号" width="150" />
        <el-table-column prop="store_name" label="商家" width="150" />
        <el-table-column prop="book_name" label="书名" width="150" />
        <el-table-column prop="count" label="数量" width="150" />
        <el-table-column prop="all_price" label="总价" width="150" />
        <el-table-column prop="stock_state" label="库存状态" width="150">
            <template #default="{row}">
                <el-tag :type="row.book_inventory - row.count >= 0 ?'success':'danger'">
                    {{ row.book_inventory - row.count >= 0 ? '库存充足' : '库存不足' }}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
            <template #default="{row}">
                <el-button 
                    round type="primary" 
                    style="margin:0;"
                    :disabled="row.book_inventory - row.count < 0"
                    @click="order(row.store_id,row.stock_id,2)"
                >接收订单</el-button>
                <el-button 
                    round 
                    type="danger" 
                    style="margin:1vh 0;"
                    @click="order(row.store_id,row.stock_id,0)"
                >取消订单</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import myAxios from '@/use/myAxios';
import { ElMessage } from 'element-plus';
import { ref,reactive,onMounted } from 'vue' ;
import {useStore} from 'vuex';
const store = useStore();

const s = new WebSocket(`ws://localhost:3002/wsapi/stockorder?user_id=${store.state.user.id}`);
s.onmessage = ({data}) =>{
    console.log(JSON.parse(data));
}

// 实时更新数据
s.onmessage = ({data}) => {
    data = JSON.parse(data);
    ElMessage({
        message: data.msg,
        type: data.type,
        duration: 1000
    })
    main();
}
const obj = reactive({
    tableData:[]
})

const main = async () => {
    const {data} = await myAxios.get('/webapi/stackorder');
    obj.tableData = data.data ;
}
onMounted(() => {
    main();
})



/* 行样式 */
const rowStyle = ({row}:{row:any}) => {
    if(row.book_inventory - row.count >= 0){
        return {
            'background-color':'#f0f9eb'
        }
    }else{
        return {
            'background-color':'#fef0f0',
        }
    }
}

/* 操作订单 */
const order = async (store_id:number,stock_id :number,stock_state :0 | 2) => {
    const data = {
        role: 0,
        data:{
            store_id,
            stock_id,
            stock_state
        }
    }
    // 告知商家订单状态已更新
    s.send(JSON.stringify(data));
    
}

</script>

<style scoped lang="scss">

</style>