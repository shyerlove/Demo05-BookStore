<template>
    <div class="manage" >
       <table class="tb">
           <thead>
                <tr class="tb_head">
                    <th>编号</th><th>书名</th><th>出版社</th><th>库存</th><th>成本价</th><th>类别</th><th>操作</th>
                </tr>
           </thead>
           <tbody>
                <tr v-for="b in state.temPage" :key="(b as BookData).book_id" class="tb_list">
                    <td>{{ b.book_id }}</td>
                    <td>{{ b.book_name }}</td>
                    <td>{{ b.book_press }}</td>
                    <td>{{ b.book_inventory }}</td>
                    <td>{{ b.book_cost }}</td>
                    <td>{{ b.book_class }}</td>
                    <td>
                        <el-button type="primary" size="small" @click="edit(b,false)">编辑</el-button>
                        <el-button type="success" size="small" @click="look(b)">查看</el-button>
                    </td>
                </tr>
           </tbody>
        </table>
        <el-button type="primary" class="add" @click="add">新增</el-button>
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
                :rules="rule"
            >
                <el-form-item label="书名" prop="book_name">
                    <el-input
                        v-model="(state.formData as BookData).book_name"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="出版社" prop="book_press">
                    <el-input
                    v-model="(state.formData as BookData).book_press"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="类别" prop="book_class">
                    <el-input
                    v-model="(state.formData as BookData).book_class"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="图片" prop="book_imgUrl">
                    <label>
                        <el-image 
                            class="bookImg" 
                            :src="src" 
                            fit="cover" 
                            title="点击上传"
                        />
                        <input type="file" style="opacity: 0;" @change="upload">
                    </label>
                </el-form-item>
                <el-form-item label="库存" prop="book_inventory">
                    <el-input-number v-model="(state.formData as BookData).book_inventory" :min="0" :max="1000"  />
                </el-form-item>
                <el-form-item label="成本价" prop="book_cost">
                    <el-input-number v-model="(state.formData as BookData).book_cost" :min="0" :max="1000"  />
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogTableVisible=false">取消</el-button>
                    <el-button type="primary" @click="confirm(formRef)">{{ isAdd?'添加':'确认修改' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 点击查看，进行图片预览 -->
        <el-dialog v-model="imgDialog" class="imgDialog">
            <el-image  
                :src="src" 
                fit="cover" 
            />
        </el-dialog>
    </div>
</template>

<script setup name="manage" lang="ts">
import myAxios from "@/use/myAxios";
import { reactive,ref } from "vue";
import { ElMessage, FormInstance} from 'element-plus'
import type BookData from '@/types/bookData';
import toBuffer from "@/utils/urlToBuffer";
import hash from '@/utils/hash';
type state = {
    temPage:Array<BookData>|[],
    formData:BookData|{}
}

// 表单验证规则
const rule = {
    book_name: [
        { required: true, message: '请输入书名', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    book_press: [
        { required: true, message: '请输入出版社', trigger: 'blur' },
        { min: 2, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
    ],
    book_class: [
        { required: true, message: '请输入类别', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    book_inventory:[
        {required: true,message:'库存不能小于100', trigger:'blur' },
    ],
    book_cost:[
        { required: true, message: '成本价过高',trigger:'blur' },
    ],
} ;

// 当前页数
let nowPage = ref<number>(1); 
// 每页展示多少
const pageSize:number = 5 ; 
// 一共有几条数据
let total = ref<number>(0);
// 一页的数据
const state = reactive<state>({
    temPage:[], // 每一页的数据
    formData:{} // 对话框中的临时数据
}) ;
// 表单dom
const formRef = ref();
// 声明弹窗状态
const dialogTableVisible = ref<boolean>(false);
// 新增：true 修改：false
const isAdd = ref<boolean>(false);
// 记录对话框的临时src
let src = ref<string>('');
// 记录dataurl
const file = ref<string>('');
// 是否开启图片预览
const imgDialog = ref<boolean>(false);
    
/* 渲染函数，向后端请求数据进行重渲染 */
const show = () => {
    // 获取总图书量
    myAxios.get('webapi/getAll').then(res=>{
        total.value = res.data.data[0].count;
    })
    // 获取单页图书
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
// 组件初次创建之前初始化数据
show();
/* 当前页面改变时，重新获取数据 */
const change = (cur:number) => {
    nowPage.value = cur ;
    show();
}

/* 打开编辑框 */
const edit = (book:BookData,isadd:boolean) => {
    // 确定是添加还是修改
    isAdd.value = isadd ;
    /* 弹出编辑框 */
    dialogTableVisible.value = true ;
    /* 初始化数据 */
    state.formData = book ;
    // 初始化src
    src.value = 'http://127.0.0.1:3002/img?i='+(state.formData as BookData).book_imgUrl;
    
}

/* 更换图书图片 */
const upload =  (e:Event) => {    
    /* 防止用户上传违规资源 */
    if((e.target as HTMLFormElement).files[0].type.split('/')[0] !== 'image'){
        ElMessage({
            message: '请上传图片文件',
            type: 'error',
        })
        return ;
    }
    const reader = new FileReader();
    reader.readAsDataURL((e.target as HTMLFormElement).files[0]);
    reader.onload =  (event) => {
        file.value = src.value = (event.target?.result as string) ;
    }
}
/* 添加图书 */
const add = () => {
    state.formData = {
        book_id:0,
        book_name:'',
        book_press:'',
        book_class:'',
        book_imgUrl:'',
        book_inventory:0,
        book_cost:0,
    };
    edit(state.formData as BookData,true);
}
/* 确认修改 */
const confirm = async (formDOM:FormInstance) => {
    await formDOM.validate(async (valid:any) => {
    if (valid) {
       // 创建formdata对象
    const formdata = new FormData();
    // 获取
    let blob = await toBuffer(file.value) ;
    const h = await hash(blob);
    formdata.append('hash',h as string);
    formdata.append('book_id',(state.formData as BookData).book_id.toString());
    formdata.append('book_name',(state.formData as BookData).book_name);
    formdata.append('book_press',(state.formData as BookData).book_press);
    formdata.append('book_class',(state.formData as BookData).book_class);
    formdata.append('book_imgUrl',blob);
    formdata.append('book_inventory',(state.formData as BookData).book_inventory.toString());
    formdata.append('book_cost',(state.formData as BookData).book_cost.toString());
    if(isAdd.value){        
        myAxios({
            method:'POST',
            url:'/webapi/addBookData',
            data:formdata,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res => {
            ElMessage({message:'添加成功!',type:'success'});
            dialogTableVisible.value = false;
            show();
        }).catch(err=>{
            console.error(err);
        })  
    }else{        
        myAxios({
            method:'POST',
            url:'/webapi/updateBookData',
            data:formdata,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(res => {
            ElMessage({message:'修改成功!',type:'success'});
            dialogTableVisible.value = false;
            show();
        }).catch(err=>{
            console.error(err);
        })  
    }
    } else {
      return ;
    }
  })
}

const look = (book:BookData) => {
    imgDialog.value = !imgDialog.value;
    state.formData = book ;
    src.value = 'http://127.0.0.1:3002/img?i='+(state.formData as BookData).book_imgUrl;
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
        .add{
            position: fixed;
            bottom:2vh;
            left:2vw;
        }
        .tb{
            width:100%;
            border-collapse: collapse;
            .tb_head{
                width:100%;
                height: 10vh;
                background-color: white;
                th{
                    height: 100%;
                    color:$blueplus;
                    text-align: center;
                    border:1px solid #EBEEF5;
                }
            }
            tbody{
                width:100%;
                .tb_list{
                    width: 100%;
                    background-color: #ecf5ff;
                    transition: all .2s ;
                    td{
                        height:14vh;
                        color:$blue;
                        text-align: center;
                        border:1px solid #EBEEF5;
                    }
                }
                .tb_list:hover{
                    background-color: #DCDFE6;
                }
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
        .imgDialog{
          div{
            display: flex;
            align-items: center;
          }
        }
    }
</style>