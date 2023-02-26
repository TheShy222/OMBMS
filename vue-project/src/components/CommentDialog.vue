<template>
    <el-form :model="CommentInfo" label-width="80px">
        <el-form-item label="用户ID">
            <el-input v-model="CommentInfo.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="CommentInfo.name"></el-input>
        </el-form-item> 
        <el-form-item label="评论ID">
            <el-input disabled v-model="CommentInfo.commentId"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input v-model="CommentInfo.content"></el-input>
        </el-form-item>
        <el-form-item label="卖家秀">
            <el-upload list-type="picture-card" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else>
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="点赞">
            <el-input v-model="CommentInfo.likes"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
            <el-input v-model="CommentInfo.orderNumber"></el-input>
        </el-form-item>
        <el-form-item label="商品详情">
            <el-input v-model="CommentInfo.detail"></el-input>
        </el-form-item>
        <el-form-item label="尺码">
            <el-select
                v-model="CommentInfo.size"
                clearable
                placeholder="选择尺码"
            >
                <el-option
                    v-for="item in sizeType"
                    :key="item.id"
                    :label="item.size"
                    :value="item.size"
                />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="bindConfirm">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { RequestGoodsSizeType } from '@/api/Goods/goodsList.js'
import {
    RequestAddComment,
    RequestEditComment,
} from '@/api/Comment/comment.js'
export default {
    props: ['commentInfo', 'type'],
    emits: ['close'],
    data() {
        return {
            CommentInfo: {
                id: '',
                name:'',
                userImg: '',
                commentId: '',
                content: '',
                commentImg: '',
                likes: '',
                orderNumber: '',
                detail: '',
                size:''
            },
            sizeType: [],
            imageUrl: '', //图片预览地址
            imageFile: null, //上传图片文件
        }
    },
    created() {
        if (this.type === 'EDIT') {
            this.CommentInfo = { ...this.commentInfo }
            this.imageUrl=this.commentInfo.commentImg
        } else {
            this.getGoodsSize()
        }
    },
    methods: {
        //关闭弹框
        onClose() {
            this.$emit('close')
        },
        //获取商品尺码种类
        async getGoodsSize() {
            const res = await RequestGoodsSizeType()
            if (res.data.code == 1) {
                this.sizeType = res.data.list
            }
        },
        async bindConfirm() {
            // 编辑
            let res
            const formData = new FormData()
            formData.append('id', this.CommentInfo.id)
            formData.append('name', this.CommentInfo.name)
            formData.append('commentId', this.CommentInfo.commentId)
            formData.append('content', this.CommentInfo.content)
            formData.append('commentImg', this.imageFile)
            formData.append('likes', this.CommentInfo.likes)
            formData.append('orderNumber', this.CommentInfo.orderNumber)
            formData.append('detail', this.CommentInfo.detail)
            formData.append('size', this.CommentInfo.size)
            if (this.type === 'EDIT') {
                res = await RequestEditComment(formData)
            } else {
                res = await RequestAddComment(formData)
            }
            if (res.data.code === 1) {
                ElMessage({
                    message:
                        this.type === 'EDIT'
                            ? '编辑评论成功!'
                            : '添加评论成功!',
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
        }
    },
}
</script>
<style lang="scss" scoped>
.avatar {
    width: 150px;
    height: 150px;
}
</style>
