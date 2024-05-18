<template>
    <div class="shopcard">
      <header>
        <input type="checkbox" @change="allSelect" :checked="myIsAll"/>
        <span>{{data[0].store_name}}</span>
      </header>
      <section class="card">
        <ul v-for="item in data" :key="item">
            <li>
                <input 
                    type="checkbox" 
                    :checked="item.isSelect"
                    @change="myAllSelect(item)"
                />
            </li>
            <li>
                <img :src="item.book_imgUrl" alt="加载中...">
                <span>{{ item.book_name }}</span>
            </li>
            <li>{{ item.book_name }}</li>
            <li>{{ item.book_price }}</li>
            <li>{{ item.book_count }}</li>
            <li>
                <el-button type="danger" :icon="Delete" circle @click="delCard(item.book_id)"/>
            </li>
        </ul>
      </section>
    </div>
</template>

<script setup name="shopcard" lang="ts">
import myAxios from '@/use/myAxios';
import {Delete} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {ref,watch} from 'vue'

const user = JSON.parse(sessionStorage.getItem('user') as string);
const prop = defineProps(['index','data','send','isAll','isClick','show']);
// 是否选中当前商家全部商品
let myIsAll = ref<boolean>(false) ; 

/* 选中该商家的全部商品 */
const allSelect = () => {
    myIsAll.value = !myIsAll.value ;
    prop.send(prop.index,myIsAll.value) ;
}
/* 判断是否全部选中同一个商家 */
const myAllSelect = (item:any) => {
    item.isSelect = !item.isSelect ;
    let tem  =  true ;
    prop.data.forEach((e:any) => {
        if(!e.isSelect) tem = false ;
    })
    myIsAll.value = tem ;
}

/* 将购物车全部选中 */
watch(()=>prop.isClick,(newVal) => {
    if(newVal){
        myIsAll.value = true;
        prop.send(prop.index,myIsAll.value);
    }else{
        myIsAll.value = false;
        prop.send(prop.index,myIsAll.value);
    }
})
/* 点击移除出购物车 */
const delCard = async (book_id:number) => {
    const data =  await myAxios.post('/webapi/delShopcar',{user_id: user.id,book_id});
    if(data.status == 200){
        ElMessage({
            message:'移除成功',
            type:'success'
        });
        prop.show(); 
    }else{
        ElMessage({
            message:'移除失败',
            type:'warning'
        });
    }
}
</script>

<style lang="scss" scoped>
    .shopcard{
        width:95vw;
        margin:2vh auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        header{
            width:100%;
            height: 5vh;
            display: flex;
            align-items:center;
            margin-bottom: 1vh;
            span{
                display: block;
                width:fit-content;
                height: 100%;
                color:black;
                align-items: center;
                margin-left: 2vw;
                line-height: 5vh;
            }
        }
        .card{
            border-radius: 5px;
            width:100%;
            height: auto;
            box-shadow: 1px 1px 3px 1px #A3A6AD;

            ul{
                display: flex;
                height:20vh;
                display: flex;
                align-items: center;
                background-color: whitesmoke;
                border-bottom:1px solid #CFD3DC;
                li{
                    color:$blueplus;
                    text-align: center;
                }
                li:nth-child(1){width:10%}
                li:nth-child(2){
                    width:30%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content:center;
                    img{
                        width:30%;
                        height: 90%;
                        border:1px solid $blueplus;
                    }
                    span{
                        width:40%;
                        display: block;
                        color:$blue;
                    }
                }
                li:nth-child(3){
                    width:30%;
                    overflow: hidden;
                    text-wrap: nowrap;
                    text-overflow: ellipsis;
                    padding:0 20px;
                }
                li:nth-child(4){width:10%}
                li:nth-child(5){width:10%}           
                li:nth-child(6){width:10%}
                }       
        }
            ul:nth-child(1){border-top:4px solid $blue;}
    }
</style>