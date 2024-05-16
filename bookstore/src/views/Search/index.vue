<template>
    <div class="search">
        <span></span>
       <div :class="isMini?'search_inp search_inp_min':'search_inp'">
            <input type="text" ref="inp">
            <button @click="search">搜索</button>
       </div>
       <List :listDown="isMini" :list="list" v-show="s"></List>
    </div>
</template>

<script setup name="home">
    import myAxios from '@/use/myAxios';
    import List from '../../components/List/index.vue'
    import {reactive, ref} from 'vue'

    const list = reactive([]);
    const isMini = ref(false) ;
    const s = ref(false) ;
    /* 搜索结果 */
    const inp = ref();

    const search = async () => {
        isMini.value = true ;
        s.value = true ;
        /* 等待查询结果 */
        const result = await myAxios({
        method:'GET',
        url:'/webapi/search',
        params:{
            book_name:inp.value.value
        },
        headers:{
            'token':JSON.parse(sessionStorage.getItem('user')).token
        }
    })
    Object.assign(list,result.data.data);
    }
</script>

<style lang="scss" scoped>
.search{
    width: 100%;
    min-height: 90vh;
    position: relative;
    background-color: $bgc_color;
    &>span{
        display: block;
        width: 100vw;
        height: 10vh;
    }
    
    .search_inp{
        position: absolute;
        width: 60%;
        height: 10vh;
        left:20vw;
        top:40vh;
        display: flex;
        transition: all 0.3s linear;
        z-index: 2;
        input{
            width: 80%;
            height: 90%;
            border:1px solid $blueplus;
            border-radius: 5px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            font-size: 18px;
            text-indent: 10px;
            color:$blueplus;
            border-right:none;
            background-color: transparent;
        }
        input:focus{
            border-color: $blue;
        }
        button{
            width: 20%;
            height: 90%;
            border:1px solid $blue;
            border-radius: 5px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            background-color:  $blueplus;
            font-size:20px;
            transition: all 0.2s;
            color:white;
        }
        button:hover{
            cursor: pointer;
            font-size: 22px;
            background-color: $blue;
        }
        button:active{
            font-size: 18px;
            background-color: $blueplus;
        }
    }

    .search_inp_min{
        width:30%;
        height: 7vh;
        top:2vh;
        left:1vw;
    }
}

</style>