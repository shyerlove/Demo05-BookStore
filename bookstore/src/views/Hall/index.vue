<template>
    <div class="hall">
        <el-card class="left" >
            <el-row>
                <el-col :span="6" style="text-align: center;">
                    <el-statistic title="今日销量" :value="100" />
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <el-statistic :value="100">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                今日净收入
                                <el-icon style="margin-left: 4px" :size="12"><Male /></el-icon>
                            </div>
                        </template>
                    </el-statistic>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <el-statistic title="本月累计销量" :value="999" />
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <el-statistic :value="100">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                本月净收入
                                <el-icon style="margin-left: 4px" :size="12"><Male /></el-icon>
                            </div>
                        </template>
                    </el-statistic>
                </el-col>
            </el-row>
        </el-card>

        <div class="right">
            <div class="card"  v-for="(item,index) in 6" :key="index">
                <div class="img">
                    <img src="/src/assets/svg/jinhuo.svg" >
                </div>
                <p>去进货</p>
            </div>
            <div class="card bigCard"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="hall">

</script>

<style scoped lang="scss">
    .hall{
        width: 100vw;
        height: 90vh;
        padding: 0 2vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
            width:45%;
            height: 95%;
            background-color: white;
        }
        .right{
            width:50%;
            height: 95%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .card{
                width:48%;
                height: 20%;
                background-color: white;
                margin-bottom: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all .3s;
                &:hover{
                    cursor: pointer;
                    box-shadow: 0 0 5px rgb(159, 157, 157);
                    .img{
                        transform: scale(0.8);
                        animation:iconAction .3s linear .5s;
                    }
                }
                .img{
                    width:8vw;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    img{
                        width:4vw;
                    }
                }
                p{
                    width:12vw;
                    height: 100%;
                    font-size: 34px;
                    display: flex;
                    align-items: center;
                    font-weight: 300;
                    margin-left: 10px;
                }
            }
            .bigCard{
                width:100%;
                align-self: end;
                margin-bottom:0;
            }
        }
    }

    @keyframes iconAction {
        0%{transform: scale(1.1);}
        40%{transform: scale(1);}
        70%{transform: scale(1.1);}
        100%{transform: scale(1);}
    }
</style>