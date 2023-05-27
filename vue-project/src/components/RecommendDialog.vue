<template>
    <el-form :model="recommendInfo" label-width="80px">
        <el-form-item label="图片">
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
        <el-form-item label="品牌">
            <el-select
                v-model="recommendInfo.name"
                clearable
                placeholder="选择品牌"
            >
                <el-option
                    v-for="item in brand"
                    :key="item.id"
                    :label="item.brandName"
                    :value="item.brandName"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="价格">
            <el-input v-model="recommendInfo.price"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="bindConfirm">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { RequestGoodsBrandType } from '@/api/Goods/goodsList.js'
import {
    RequestAddRecommend,
    RequestEditRecommend,
} from '@/api/Recommend/recommend.js'
export default {
    props: ['recommend', 'type'],
    emits: ['close'],
    data() {
        return {
            recommendInfo: {
                id: '',
                url: '',
                name: '',
                price: '',
            },
            brand: [],
            imageUrl: '', //图片预览地址
            imageFile: null, //上传图片文件
        }
    },
    created() {
        this.getBrand()
        if (this.type === 'EDIT') {
            this.recommendInfo = { ...this.recommend }
            this.imageUrl = this.recommend.url
        }
    },
    methods: {
        //关闭弹框
        onClose() {
            this.$emit('close')
        },
        //获取商品品牌
        async getBrand() {
            const res = await RequestGoodsBrandType()
            if (res.data.code == 1) {
                this.brand = res.data.list
            }
        },
        async bindConfirm() {
            // 编辑
            let res
            const formData = new FormData()
            formData.append('id', this.recommendInfo.id)
            formData.append('recommendImg', this.imageFile)
            formData.append('name', this.recommendInfo.name)
            formData.append('price', this.recommendInfo.price)
            if (this.type === 'EDIT') {
                res = await RequestEditRecommend(formData)
            } else {
                res = await RequestAddRecommend(formData)
            }
            if (res.data.code === 1) {
                ElMessage({
                    message:
                        this.type === 'EDIT'
                            ? '编辑推荐成功!'
                            : '添加推荐成功!',
                    type: 'success',
                })
                this.onClose()
            }
        },
        //用户头像上传
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
    },
}
</script>
<style lang="scss" scoped>
.avatar {
    width: 150px;
    height: 150px;
}
</style>
