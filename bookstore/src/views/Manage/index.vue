<template>
    <div class="manage" >
       <table class="tb">
            <tr class="tb_head">
                <th>编号</th><th>书名</th><th>出版社</th><th>库存</th><th>成本价</th><th>定价</th><th>操作</th>
            </tr>
            <tr v-for="b in state.temPage" :key="(b as Book).book_id" class="tb_list">
                <td>{{ b.book_id }}</td>
                <td>{{ b.book_name }}</td>
                <td>{{ b.book_press }}</td>
                <td>{{ b.book_inventory }}</td>
                <td>{{ b.book_cost }}</td>
                <td>{{ b.book_price }}</td>
                <td>
                    <el-button type="primary" size="small" @click="edit(b)">编辑</el-button>
                    <el-button type="success" size="small">查看</el-button>
                </td>
            </tr>
        </table>
        <div class="page">
            <el-pagination 
                background 
                layout="prev, pager, next" 
                :page-size="5"
                :total="total"
                @change="change"
            />
        </div>
        <!-- 表单 -->
        <el-dialog v-model="dialogTableVisible" title="编辑">
            <el-form
                ref="formRef"
                :model="state.formData"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="书名" prop="book_name">
                    <el-input
                        v-model="(state.formData as Book).book_name"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="出版社" prop="book_press">
                    <el-input
                    v-model="(state.formData as Book).book_press"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="商家" prop="store_name">
                    <el-input
                    v-model="(state.formData as Book).store_name"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="图片" prop="book_imgUrl">
                    <label>
                        <el-image 
                            class="bookImg" 
                            :src="(state.formData as Book).book_imgUrl" 
                            fit="cover" 
                            title="点击上传"
                        />
                        <input type="file" style="opacity: 0;">
                    </label>
                </el-form-item>
                <el-form-item label="库存" prop="book_inventory">
                    <el-input-number v-model="(state.formData as Book).book_inventory" :min="0" :max="1000"  />
                </el-form-item>
                <el-form-item label="成本价" prop="book_cost">
                    <el-input-number v-model="(state.formData as Book).book_cost" :min="0" :max="1000"  />
                </el-form-item>
                <el-form-item label="定价" prop="book_price">
                    <el-input-number v-model="(state.formData as Book).book_price" :min="0" :max="1000"  />
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogTableVisible=false">取消</el-button>
                    <el-button type="primary" @click="confirm">确认修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup name="manage" lang="ts">
import myAxios from "@/use/myAxios";
import { reactive,ref } from "vue";
import { ElMessage} from 'element-plus'
import type Book from '@/types/book';
type state = {
    temPage:Array<Book>|[],
    formData:Book|{}
}

// 当前页数
let nowPage = ref<number>(1); 
// 每页展示多少
const pageSize:number = 5 ; 
// 一共有几条数据
let total = ref<number>(0);
//一页的数据
const state = reactive<state>({
    temPage:[],
    formData:{}
}) ;
// 声明弹窗状态
const dialogTableVisible = ref<boolean>(false);
/* 图片信息 */
let imgUrl = ref<string>('');
// 获取总图书量
myAxios.get('webapi/getAll').then(res=>{
    total.value = res.data.data[0].count;
})
    
/* 渲染函数，向后端请求数据进行重渲染 */
const show = () => {
    myAxios({
        method:'POST',
        url:'webapi/books',
        data:{
            index: (nowPage.value - 1) * pageSize,
            pageSize
        },
    }).then(res=>{
        state.temPage = res.data.data ;
    })
}
show();
/* 当前页面改变时，重新获取数据 */
const change = (cur:number) => {
    nowPage.value = cur ;
    show();
}

/* 打开编辑框 */
const edit = (book:Book) => {
    /* 弹出编辑框 */
    dialogTableVisible.value = true ;
    /* 初始化数据 */
    state.formData = book ;
    imgUrl.value = (state.formData as Book).book_imgUrl ;
}

// const upload =  (e) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = async (event) => {
//         img.value  =  await event.target.result;
//     }
// }
/* 确认修改 */
const confirm = () => {
    myAxios({
        method:'POST',
        url:'/webapi/updateBook',
        data:{
            formData:state.formData
        },
    }).then(res=>{
        ElMessage({message:'修改成功!',type:'success'});
        dialogTableVisible.value = false;
    }).catch(err=>{
        console.error(err);
    })
}
</script>


<style lang="scss" scoped>
    .manage{
        width:100vw;
        height: 90vh;
        background-color: white;
        .page{
            position: fixed;
            bottom:2vh;
            right:2vw;
        }
        .tb{
            width:100%;
            height: 90%;
            border-collapse: collapse;
           .tb_head{
                background-color: white;
                th{
                    height: 70px;
                    color:$blueplus;
                    text-align: center;
                    border:1px solid #EBEEF5;
                }
            }
           .tb_list{
                background-color: #ecf5ff;
                transition: all .2s ;
                td{
                    height: 50px;
                    color:$blue;
                    text-align: center;
                    border:1px solid #EBEEF5;
                }
            }
           .tb_list:hover{
                background-color: #DCDFE6;
            }
        }
        .bookImg{
            width:100px;
            height: 120px;
            border:1px solid #c8c9cc;
            position: relative;
        }
        .bookImg::after{
            content: '点击上传图片';
            display: none;
            width:100%;
            height: 100%;
            position: absolute;
            top:0;
            text-align: center;
            line-height: 120px;
            background-color: rgba(128, 128, 128, 0.5);
            color:black;
            font-weight: 500;
        }
        .bookImg:hover {
            &::after{
                cursor: pointer;
                display: block;
            }
        }
    }
</style>