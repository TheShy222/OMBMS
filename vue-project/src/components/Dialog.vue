<template>
    <el-form :model="expressInfo" label-width="80px">
        <el-form-item label="名称">
            <el-input v-model="expressInfo.type"></el-input>
        </el-form-item>
        <el-form-item label="Logo">
            <el-upload list-type="picture-card" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addExpress">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { RequestAddExpress, RequestEditExpress } from '@/api/Express/express.js'
export default {
    props: ['express', 'type'],
    emits: ['close'],
    data() {
        return {
            expressInfo: {
                id: '',
                type: '',
                logo: ''
            },
            imageUrl: '', //图片预览地址
            imageFile: null //上传图片文件
        }
    },
    created() {
        if (this.type === 'EDIT') {
            this.expressInfo = { ...this.express }
            this.imageUrl = this.expressInfo.logo
        }
    },
    methods: {
        //关闭弹框
        onClose() {
            this.$emit('close')
        },
        async addExpress() {
            const formData = new FormData()
            formData.append('id', this.expressInfo.id)
            formData.append('type', this.expressInfo.type)
            formData.append('logo', this.imageFile)
            // 编辑
            let res
            if (this.type === 'EDIT') {
                res = await RequestEditExpress(formData)
            } else {
                res = await RequestAddExpress(formData)
            }
            const { code } = res.data
            if (code === 1) {
                ElMessage({
                    message: this.type === 'EDIT' ? '编辑物流方式成功!' : '添加物流方式成功!',
                    type: 'success',
                })
                this.onClose()
            }
        },
        //图片上传
        beforeAvatarUpload(rawFile) {
            const arr = ['image/jpeg', 'image/png', 'image/jpg']
            // 图片格式验证
            if (!arr.includes(rawFile.type)) {
                ElMessage({
                    message: '上传图片格式不正确！!',
                    type: 'error',
                })
                return false
            }
            // 图片大小验证
            if (rawFile.size / 1024 / 1024 > 5) {
                ElMessage({
                    message: '上传图片大小不能超过5M!',
                    type: 'error',
                })
                return false
            }
            // 图片预览
            //1. 选中的本地图片转成Base64编码 赋值给 imageUrl
            //2. FileReader 读文件
            this.imageUrl = URL.createObjectURL(rawFile)
            // 上传图片
            this.imageFile = rawFile
            return false // 不向下执行
        },
    }
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 150px;
    height: 150px;
}
</style>