<template>
    <div class="my">
        <div class="left">
            <el-avatar :size="150" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            <h2>xxxxx</h2>
            <h4>暂无简介</h4>
            <button class="setting_btn">
                个人设置
            </button>
            <div class="msg">
                <el-badge :value="2" class="item" type="warning">
                <button class="msg_btn">我的收藏</button>
            </el-badge>
            <el-badge :value="2" class="item" type="danger">
                <button class="msg_btn">我的关注</button>
            </el-badge>
            <el-badge :value="999" class="item" type="primary" max="999">
                <button class="msg_btn">我的积分</button>
            </el-badge>
            </div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup name="my">

</script>

<style lang="scss" scoped>
    .my{
        width:90%;
        height: 90vh;
        display: flex;
        .left{
            width:40% ;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
          
        
            h2{
                color:black;
                margin-top: 10px;
            }

            h4{
                width:50%;
                // height: 50px;
                font-size: 14px;
                color:gray;
                text-align: center;
                margin: 10px 0px;
            }

            .setting_btn{
                width:100px;
                height: 30px;
                border: 1px solid #a6a9ad;
                background-color: white;
                color:#525457;
                font-size: 12px;
                transition: all 0.2s;
            }
            .setting_btn:hover{
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.3);
                color:#a6a9ad;
                box-shadow: inset 0 0 3px  #a6a9ad;
            }
            .setting_btn:active{
                color:#525457;
            }

            .msg{
                width:100%;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .msg_btn{
                    width:fit-content;
                    padding:5px;
                    height:40px;
                    background-color: transparent;
                    color:$blue;
                    border: 1px solid $blueplus;
                    transition: all 0.2s;
                }
                .msg_btn:hover{
                    cursor: pointer;
                    background-color: $blueplus;
                    color:whitesmoke;
                }
            }
        }
        .right{
            width:60% ;
            height: 100%;
        }
    }
</style>