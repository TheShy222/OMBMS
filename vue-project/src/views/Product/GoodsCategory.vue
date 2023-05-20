<template>
    <el-row :gutter="20" style="margin-bottom: 10px">
        <el-button type="success" @click="addShow = true">新增</el-button>
        <el-button type="danger" @click="refresh">刷新</el-button>
    </el-row>
    <el-table :data="list" style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" />
        <el-table-column align="center" prop="type" label="类型" />
        <el-table-column align="center" label="样例" #default="scope">
            <el-image
                :src="scope.row.sample"
                style="width: 100px; height: 100px"
            >
            </el-image>
        </el-table-column>
        <el-table-column align="center" label="操作" #default="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm
                title="确认要删除此记录吗?"
                @confirm="deleteType(scope.row)"
            >
                <template #reference>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-popconfirm>
        </el-table-column>
    </el-table>
    <!-- 添加弹框 -->
    <el-dialog title="添加商品种类" v-model="addShow" width="40%">
        <el-form :model="typeInfo" label-width="80px">
            <el-form-item label="ID" prop="id">
                <el-input v-model="typeInfo.id"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
                <el-input v-model="typeInfo.type"></el-input>
            </el-form-item>
            <el-form-item label="样例">
                <el-upload
                    list-type="picture-card"
                    action="#"
                    show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="AdddGoodsType"
                    >确定</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑商品种类" v-model="editShow" width="40%">
        <el-form :model="typeInfo" label-width="80px">
            <el-form-item label="类型" prop="type">
                <el-input v-model="typeInfo.type"></el-input>
            </el-form-item>
            <el-form-item label="样例">
                <el-upload
                    list-type="picture-card"
                    action="#"
                    show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="editGoodsType"
                    >确定</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {
    RequestGoodsType,
    RequestAddGoodsType,
    RequestEditGoodsType,
    RequestDeleteGoodsType,
} from '@/api/Goods/goodsList.js'
export default {
    data() {
        return {
            addShow: false,
            editShow: false,
            typeInfo: {
                id: '',
                type: '',
                sample: '',
            },
            list: [],
            imageUrl: '', //图片预览地址
            imageFile: null, //上传图片文件
        }
    },
    created() {
        this.getGoodsType()
    },
    methods: {
        async getGoodsType() {
            const res = await RequestGoodsType()
            if (res.data.code == 1) {
                this.list = res.data.list
            }
        },
        //添加种类
        async AdddGoodsType() {
            const formData = new FormData()
            formData.append('id', this.typeInfo.id)
            formData.append('type', this.typeInfo.type)
            formData.append('sample', this.imageFile)
            const res = await RequestAddGoodsType(formData)
            if (res.data.code == 1) {
                ElNotification({
                    message: '添加商品种类成功',
                    type: 'success',
                })
                this.addShow = false
                this.getGoodsType()
            }
        },
        //刷新
        refresh() {
            this.getGoodsType()
            this.typeInfo = {}
            this.imageUrl = ''
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
        //编辑
        edit(row) {
            this.editShow = true
            this.typeInfo = row
            this.imageUrl = row.sample
        },
        async editGoodsType() {
            const formData = new FormData()
            formData.append('id', this.typeInfo.id)
            formData.append('type', this.typeInfo.type)
            formData.append('sample', this.imageFile)
            const res = await RequestEditGoodsType(formData)
            if (res.data.code == 1) {
                ElNotification({
                    message: '编辑商品成功',
                    type: 'success',
                })
                this.editShow = false
            }
            this.getGoodsType()
        },
        //删除
        async deleteType(row) {
            const res = await RequestDeleteGoodsType(row.id)
            if (res.data.code == 1) {
                ElNotification({
                    message: '删除商品种类成功',
                    type: 'success',
                })
                this.getGoodsType()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 150px;
    height: 150px;
}
</style>
