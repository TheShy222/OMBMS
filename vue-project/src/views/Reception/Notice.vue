<template>
  <div>
      <!-- 富文本框的容器 -->
      <textarea id="default-editor"></textarea>
      <el-button type="primary" size="default" @click="bindConfirm">确定</el-button>
  </div>
</template>

<script>
export default {
  methods: {
      bindConfirm() {
          console.log(tinymce.activeEditor.getContent())
          ElMessage.info('添加日志成功!')
      },
  },
  mounted() {
      this.$nextTick(()=>{
          tinymce.init({
          selector: 'textarea#default-editor',
          branding: false,
          height: 500,
          plugins:'advlist link image lists paste',
          paste_data_images:true //支持图片粘贴
      })
      })
  },
}
</script>

<style lang="scss" scoped></style>
