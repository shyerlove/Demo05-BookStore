<template>
    <div class="userorder">
            <template  v-for="item in obj.orders" :key="item.book_id">
                <Order :data="item" :main="main"/>
            </template>
            <h1 v-show="obj.orders.length === 0">暂无订单...</h1>
    </div>
</template>

<script setup lang="ts" name="userorder">
import myAxios from '@/use/myAxios';
import Order from '@/components/Order/index.vue'
import {reactive,onMounted, nextTick } from 'vue' ;
import { useStore } from 'vuex';
import mySocket from '@/use/useSocket';

const userStore = useStore();
const userSocket = new mySocket(`/wsapi/userorder?user_id=${userStore.state.user.id}`,3);

userSocket.onMessaged(async () => {
    await main();
    await nextTick();
});

const obj = reactive({
    orders: []
})
const main = async () => {
    const { data } = await myAxios({
        url: '/webapi/orders',
        method: 'get',
        params: {
            user_id: userStore.state.user.id
        }
    })
    obj.orders = data.data ;    
    
}

onMounted(() => {
    main();
})
</script>

<style scoped lang="scss">
.userorder{
    width:100vw;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        margin:30vh auto;
    }
}
</style>