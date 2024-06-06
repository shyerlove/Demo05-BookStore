<template>
    <div class="manuser">
        <el-table 
            :data="userData" 
            :border="parentBorder" 
            class="user_list"
        >
            <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <p m="t-0 b-2">ID: {{ props.row.id }}</p>
                        <p m="t-0 b-2">电话号码: {{ props.row.phone }}</p>
                        <p m="t-0 b-2">身份: {{ props.row.role }}</p>
                        <el-button m="t-0 b-2" type="danger">修改</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" />
            <el-table-column label="姓名" prop="name" />
            <el-table-column 
                label="身份" 
            >
                <template #default="props">
                    <el-tag :type="props.row.role === '用户' ? '' : 'success'">
                        {{ props.row.role }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>


<script setup name="manuser" lang="ts">
const userData = [
    {
        id: '1',
        name: 'Tom',
        role: '管理员',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
    },
    {
        id: '2',
        name: 'Tom',
        role: '管理员',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
    },
    {
        id: '3',
        name: 'Tom',
        role: '用户',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
    },
    
]
// 过滤
const filterRole = (value,row) => {
  return row.role === value ;
}
</script>

<style lang="scss" scoped>
.manuser{
    display: flex;
    justify-content: center;
    .user_list{
        width: 70%;
        height: 90vh;
        overflow-y: auto;
    }
}
</style>