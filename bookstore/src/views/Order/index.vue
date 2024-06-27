<template>
    <div class="order">
        <el-table
            :data="obj.tableData"
            style="width: 100%;height: 90vh;"
            empty-text="暂无订单..."
            :header-row-style="{'height':'10vh'}"
            :row-style="rowStyle"
            :header-cell-style="{ 'text-align': 'center' }" 
            :cell-style="{ 'text-align': 'center','height':'15vh' }" 
            @row-click="del"
        >
            <el-table-column prop="stock_id" label="订单号" width= "150" />
            <el-table-column prop="book_name" label="书名" width="150" />
            <el-table-column prop="book_press" label="出版社" width="150" />
            <el-table-column prop="book_cost" label="价格" width="150" />
            <el-table-column prop="all_price" label="总价" width="150" />
            <el-table-column prop="count" label="数量" width="150" />
            <el-table-column prop="stock_state" label="订单状态" width="150">
                <template #default="{ row }">
                    <span v-if="row.stock_state == 0">未同意</span>
                    <span v-if="row.stock_state == 1">未处理</span>
                    <el-button 
                        v-if="row.stock_state == 2" 
                        type="primary"
                        @click="openWin(row)"
                    >点击编辑新订单</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer 
            v-model="isOpen" 
            title="快初始化你的新订单吧" 
            :with-header="true"
            direction="btt"
            class="drawer"
            size="70%"
        >
        <el-input placeholder="请输入书本描述" v-model="book.msg"/>
        <el-input placeholder="定价" v-model="book.price" />
            <el-button @click="isOpen=false">取消</el-button>
            <el-button @click="initOrder">入库</el-button>
        </el-drawer>
    </div>
</template>

<script setup lang="ts" name="hall">
import myAxios from '@/use/myAxios';
import mySocket from '@/use/useSocket';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
// 开启websocket连接
const storeSocket = new mySocket(`/wsapi/stockorder?store_id=${store.state.user.id}`,3);
storeSocket.onMessaged(() => {
    main() ;
})
const isOpen = ref<boolean>(false);
const book = reactive({
    stock_id:0,
    msg:'',
    price:0
})
const obj = reactive({
    tableData:[]
});
onMounted(() => {
   main();
});

const main = async () => {
    const { data } = await myAxios.get('/webapi/stackorder',{params:{store_id:store.state.user.id}});
    obj.tableData = data.data ;
    
}
/* 行样式 */
const rowStyle = ({row}:{row:any}) => {
    switch(row.stock_state){
        case 0:
            return {
                'background-color':'#fef0f0'
            }
        case 1:
            return {
                'background-color':'#ecf5ff',
            }
        case 2:
            return {
                'background-color':'#f0f9eb'
            }
        default:
            return '';
    }
}


// 弹出编辑窗
const openWin = (row:any) => {
    isOpen.value = true ;
    book.stock_id = row.stock_id ;
    book.msg = row.book_name ;
    book.price = row.book_cost + 1 ;
}
// 初始化新订单
const initOrder = async () => {
    const {data} = await myAxios({
        method:'POST',
        url:'/webapi/stackorder',
        data: book
    })
    ElMessage({
        message:data.msg,
        type:data.type
    })
    main();
    isOpen.value = false ;
}

// 点击删除遗留订单
const del = (row:any) => {
    if(row.stock_state !== 0){
        return ;
    }
    ElMessageBox.confirm(
        '确认删除该订单记录吗?',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        const result = await myAxios.post('/webapi/stackorder',{stock_id:row.stock_id})
        ElMessage({
            type: result.data.type,
            message: result.data.msg,
        })
        main();
        
    })
}
</script>

<style scoped lang="scss">
.order{
    
}
</style>