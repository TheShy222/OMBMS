<template>
    <!-- 富文本框的容器 -->
    <div>
        <textarea :id="tinymceId"></textarea>
        <el-button type="primary" size="default" @click="bindConfirm">确定</el-button>
    </div>
</template>
<script>
import {RequestAddFile} from '@/api/NoticeFile/file.js'
export default {
    computed: {
        tinymceId(){
            return 'vue-tinymce-'+Date.now()
        } 
    },
    mounted() {
        this.$nextTick(() => {
            tinymce.init({
                selector: '#'+this.tinymceId,
                branding: false,
                height: 500,
                plugins: 'advlist link image lists paste',
                paste_data_images: true //支持图片粘贴
            })
        })
    },
    methods: {
        async bindConfirm() {
            let file=tinymce.activeEditor.getContent()
            console.log(tinymce.activeEditor.getContent())
            const res=await RequestAddFile(file)
            if(res.data.code==1){
                ElMessage.info('添加日志成功!')
            }
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
