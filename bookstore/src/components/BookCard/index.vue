<template>
    <div class="book">
        <span class="store">
            {{ book.store_name }}
        </span>
        <div class="img"> 
            <img :src="'http://127.0.0.1:3002/img?i='+book.book_imgUrl" alt="加载中...">
        </div>
        <div class="tit">
            <div class="left">
                <h2>{{ book.book_name }}</h2>
                <span class="msg">{{book.msg}}</span>
            </div>
            <span class="price">
                <span class="b">
                    {{(book.book_price.toString()).split('.')[0]}}.
                </span>
                <span class="s">{{ (book.book_price.toString()).split('.')[1]||'00'}}</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue' ;
const {book} = defineProps(['book']) ;

</script>

<style scoped lang="scss">
.book {
  width: 11.25rem;
  height: 15.625rem;
  overflow: hidden;
  position: relative;
  border-radius: .3125rem;
  box-shadow: 0 0 .3125rem rgba(0, 0, 0, 0.1);
  
  .store {
    width: 100%;
    height: 1.875rem;
    line-height: 1.875rem;
    padding: 0 .625rem;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    z-index: 2;
    transition:  top .2s;
  }

  .img {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .tit {
    width: 100%;
    height: 5.625rem;
    position: absolute;
    bottom: -6.25rem;
    left: 0;
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: .625rem;
    transition: bottom 0.3s;
  }

  .tit {
    .left{
        width:60%;
        height: 100%;
        h2 {
            font-size: 1.5rem;
            margin: 0;
        }
        .msg{
            width:100%;
            font-size: .875rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box ;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: 300;
        }
    }
    .price{
        width:30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        color:#fd3f31;
        .b,
        .s{
           width:100%;
           height: 60%; 
           font-size: 2rem;
           font-weight: bold;
           display: flex;
           align-items: center;       
         }
        .s{
            height: 40%;
            font-size: 1.375rem;
            text-align: end;
        }
    }
  }

  &:hover {
    cursor: pointer;
    .img img{
        filter: brightness(0.7);
    }
    .store{
        top: -3.125rem;
    }
    .tit{
      bottom: 0;
    }
  }
}

</style>