<template>
    <div class="inventory">
        <div class="search">
            <input type="text" v-model="inp" class="inp" @keyup.enter="search" />
            <el-button 
                type="primary" 
                style="height: 5vh;margin-left: 1vw;"
                @click="search"
            >搜索
            </el-button>
            <el-select v-model="select" style="width: 9vw;height: 5vh;margin-left: 2vw;" @keyup.enter="search();inp=''">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <el-table 
            :data="obj.pageData" 
            class="table" 
            :header-row-style="{'height':'10vh'}"
            :row-style="rowStyle"
            :header-cell-style="{ 'text-align': 'center' }" 
            :cell-style="{ 'text-align': 'center' }" 
            empty-text="暂无数据..."
        >
            <el-table-column prop="book_id" label="ID" width="150" />
            <el-table-column prop="book_name" label="书名" width="150" />
            <el-table-column prop="book_class" label="类别" width="150">
                <template #default="{ row }">
                    <el-tag type="warning">{{ row.book_class }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="msg" label="描述" width="150" show-overflow-tooltip />
            <el-table-column prop="book_press" label="出版社" width="150" />
            <el-table-column prop="book_price" label="出售价" width="150" />
            <el-table-column prop="book_count" label="库存" width="150" />
        </el-table>
        <div class="pagination">
            <el-button type="success" @click="$router.push({name:'stock'})">去进货</el-button>
            <el-pagination 
                style="float:right;"
                background 
                layout="prev, pager, next" 
                :total="pageCount" 
                :page-size="pageSize"
                @change="pageChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import bookData from '@/types/bookData';
import myAxios from '@/use/myAxios';
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router'
const store = useStore();
const router = useRouter();

// 库存数据
const obj = reactive({
    tableData: <Array<bookData>>[],
    filterData: <Array<bookData>>[],
    pageData: <Array<bookData>>[],
});
// 总量
const pageCount = ref<number>(0);
// 一页的数据
const pageSize = ref<number>(5);
// 当前页
let pageIndex = ref<number>(1);

/* 渲染函数 */
const main = () => {
    pageCount.value = obj.filterData.length ;
    const now = pageSize.value * (pageIndex.value - 1) ;  
    const end = now + pageSize.value ;
    // 初始化当前页数据
    obj.pageData = obj.filterData.slice(now, end);
}
    
// 初始化数据
onMounted( async () => {
    const { data } = await myAxios(`/webapi/inventory?user_id=${store.state.user.id}`);
    obj.tableData = data.data; // 初始化原始数据
    // 初始化过滤数据
    obj.filterData = obj.tableData;
    main();
})

// 输入框
const inp = ref<string>('');

// 选择框内容配置
const options = [
    {
        value: 0,
        label: '全部'
    },
    {
        value: 1,
        label: '书名'
    },
    {
        value: 2,
        label: 'ID'
    },
    {
        value: 3,
        label: '类别'
    },
    {
        value: 4,
        label: '出版社'
    }
];
// 选择框内容
const select = ref<number>(0);

// 初始化列表样式
const rowStyle = ({ row, rowIndex }: { row: any, rowIndex: number }) => {
    if (rowIndex % 2 == 0) {
        return {
            'height': '12vh',
            'background-color': 'white'
        }
    } else {
        return {
            'height': '12vh',
            'background-color': '#f0f9eb'
        }
    }
}

// 搜索
const search = () => {
    switch(select.value){
        case 0 :
            obj.filterData = obj.tableData ;
            main();
            break;
        case 1 :
            obj.filterData = obj.tableData.filter(item => item.book_name.includes(inp.value));
            main();
            break;
        case 2 :
            obj.filterData = obj.tableData.filter(item => item.book_id === +inp.value);
            main();
            break;
        case 3 :
            obj.filterData = obj.tableData.filter(item => item.book_class.includes(inp.value));
            main();
            break;
        case 4 :
            obj.filterData = obj.tableData.filter(item => item.book_press.includes(inp.value));
            main();
            break;
        default :
            break;
    }
}

// 页面变更事件
const pageChange = (newIndex:number) => {
    pageIndex.value = newIndex;
    main();
}





</script>

<style scoped lang="scss">
.inventory {
    width: 100vw;
    height: 90vh;

    .search {
        width: 100%;
        height: 10vh;
        display: flex;
        align-items: center;
        padding: 0 1vw;

        .inp {
            width: 30vw;
            height: 5vh;
            background-color: white;
            border-radius: 3px;
            border: 1px solid #dedfe0;
            text-indent: 10px;
            transition: all .2s;

            &:hover {
                border-color: #c8c9cc;
            }

            &:focus {
                border-color: #409EFF;
            }
        }
    }

    .table {
        width: 100%;
        height: 70vh;
    }
    .pagination{
        width:100%;
        height: 10vh;
        background-color: white;
        padding: 2vh 2vw;
    }
}

</style>