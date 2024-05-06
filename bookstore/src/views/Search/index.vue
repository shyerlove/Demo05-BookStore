<template>
    <div class="search">
       <div :class="isMini?'search_inp search_inp_min':'search_inp'">
            <input type="text" >
            <button @click="search">搜索</button>
       </div>
       <List :listDown="isMini" :list="0"></List>
    </div>
</template>

<script setup name="home">
    import List from '../../components/List/index.vue'
    import {ref} from 'vue'

    const isMini = ref(false) ;
    const search = () => {
        isMini.value = !isMini.value ;
    }
</script>

<style lang="scss" scoped>
.search{
    width: 100%;
    height: 100%;
    position: relative;
    
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