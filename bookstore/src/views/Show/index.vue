<template>
      <div>
         <Nav ></Nav>
         <div class="view">
            <RouterView></RouterView>
         </div>
      </div>
</template>
 
 <script setup name="login">
    import Nav from '../../components/Nav/index.vue'
    import {RouterView} from 'vue-router'
 </script>
 
 <style lang="scss" scoped>
   .view{
      width:100vw;
      background-color: $bgc_color;
      position:relative;
      top:10vh;
   }
 </style>