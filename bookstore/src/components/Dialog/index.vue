<template>
   <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    
  >
    <span>提示</span>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
  </el-dialog>
</template>

<script setup name="login">
   let {dialogVisible} = defineProps(['dialogVisible']);
</script>

<style lang="scss" scoped>

</style>