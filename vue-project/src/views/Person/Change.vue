<template>
    <el-form :model="admin">
        <el-form-item label="账号">
            <el-input disabled v-model="admin.name"></el-input>
        </el-form-item>
        <el-form-item label="当前密码">
            <el-input disabled v-model="admin.password"></el-input>
        </el-form-item>
        <el-form-item label="新的密码">
            <el-input v-model="newPassword"></el-input>
        </el-form-item>
        <el-form-item label="当前头像">
            <el-upload
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="bindChange">确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { RequestChangePass } from '@/api/Admin/admin.js'
export default {
    data() {
        return {
            admin: {},
            newPassword: '',
            imageUrl: '', //图片预览地址
            imageFile: null, //上传图片文件
        }
    },
    created() {
        this.admin = this.Admin[0]
        this.imageUrl = this.Admin[0].headimg
    },
    computed: {
        Admin() {
            return this.$store.getters['loginAccount/loginAccount']
        },
    },
    methods: {
        async bindChange() {
            const formData = new FormData()
            formData.append('password', this.newPassword)
            formData.append('headimg', this.imageFile)
            formData.append('id', this.admin.id)
            const res = await RequestChangePass(formData)
            if (res.data.code == 1) {
                ElMessage({
                    message: '修改个人信息成功,请重新登录！',
                    type: 'success',
                })
                this.$router.replace({ path: '/login' })
            }
        },
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
            if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage({
                    message: '上传图片大小不能超过2M!',
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
    },
}
</script>

<style lang="scss" scoped>
.el-form {
    width: 500px;
    margin-left: 400px;

    .avatar {
        width: 150px;
        height: 150px;
    }
}
</style>
