<template>
    <div class="login">
        <loginForm></loginForm>
    </div>
</template>

<script setup name="login">
    import {reactive, ref} from 'vue'
    import loginForm from './loginForm.vue'
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    position: relative;

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background-image: url('../../assets/login_bgc.jpg');
        background-size: cover;
        filter: blur(5px);
        z-index: -1;
        top: 0;
    }
}
</style>