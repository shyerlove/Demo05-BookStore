<template>
    <div class="shopcar">
       <table>
            <th><input type="checkbox">全选</th>
            <th>书名</th>
            <th>描述</th>
            <th>单价</th>
            <th>数量</th>
            <th>操作</th>
       </table>
       <Shopcard></Shopcard>
       <Shopcard></Shopcard>
       <div class="bill">
            <button >去结算</button>
            <span>总价: ￥999</span>
            <span>
                已选择x本书籍
                <el-icon color="#2d2d2f"><ArrowUpBold /></el-icon>
            </span>
       </div>
    </div>
</template>

<script setup name="shopcar">
    import Shopcard from '../../components/Shopcard/index.vue'
</script>

<style lang="scss" scoped>
    .shopcar{
        width:95%;
        height: 80%;
        margin: 0 auto;
        background-color: $bgc_color;
        table{
            width: 100%;
            border-spacing: 0px;
            th{
                color: black;
                height:10vh;
                line-height: 10vh;
                background-color: $blueplus;
            }
            th:nth-child(1){width:10%}
            th:nth-child(2){width:30%}
            th:nth-child(3){width:30%}
            th:nth-child(4){width:10%}
            th:nth-child(5){width:10%}
            th:nth-child(6){width:10%}
        }

        .bill{
            width: 100%;
            height: 10vh;
            position: fixed;
            bottom:0;
            left:0;
            background-color: white;
            z-index: 9;
            button{
                width:100px;
                height: 100%;
                float:right;
                background-color: red;
            }
            button:hover{
                cursor: pointer;
            }
            span{
                height: 100%;
                float: right;
                color:black;
                line-height: 10vh;
                margin-right: 2vw;
            }
        }
    }
</style>