<template>
    <div class="shopcard">
      <header>
        <el-checkbox size="large" />
        <span>xxx直营店</span>
      </header>
      <section class="card">
        <ul v-for="item in 2" :key="item">
            <li>
                <el-checkbox size="large" />
            </li>
            <li>xxx</li>
            <li>Lorem, ipsum dolor.</li>
            <li>88.88</li>
            <li>999</li>
            <li>
                <el-button type="danger" :icon="Delete" circle />
                <el-button type="warning" :icon="Star" circle />
            </li>
      </ul>
      </section>
     
    </div>
</template>

<script setup name="shopcard">
    import {Delete,Star} from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
    .shopcard{
        width:95vw;
        // height: auto;
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
                li:nth-child(2){width:30%}
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