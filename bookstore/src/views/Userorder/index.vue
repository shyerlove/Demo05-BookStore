<template>
    <div class="userorder">
            <template  v-for="item in obj.orders" :key="item.book_id">
                <Order :data="item" />
            </template>
    </div>
</template>

<script setup lang="ts" name="userorder">
import myAxios from '@/use/myAxios';
import Order from '@/components/Order/index.vue'
import { ref,reactive,onMounted } from 'vue' ;
import { useStore } from 'vuex';

const userStore = useStore();

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
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>