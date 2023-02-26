<template>
    <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="8">
            <el-button type="success" @click="bindAdd">新增</el-button>
            <el-button type="info" @click="refresh">刷新</el-button>
        </el-col>
        <el-col :span="8">
            <el-input
                v-model="searchId"
                placeholder="评论ID搜索"
                clearable
            ></el-input>
        </el-col>
        <el-col :span="8">
            <el-button type="warning" @click="search">查找评论</el-button>
        </el-col>
    </el-row>
    <!-- 表格组件 -->
    <CommentTable :list="list" @edit="bindEdit" @dele="bindDele"></CommentTable>
    <!-- 分页组件 -->
    <el-pagination
        background
        layout="total,sizes,prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 20, 30]"
        @size-change="bindSizeChange"
        @current-change="bindCurrentChange"
    >
    </el-pagination>
    <!-- 弹框组件 -->
    <el-dialog
        :title="type === 'ADD' ? '新增评论' : '编辑评论'"
        v-model="show"
        width="40%"
    >
        <CommentDialog
            v-if="show"
            :commentInfo="commentInfo"
            :type="type"
            @close="bindCloseDialog"
        ></CommentDialog>
    </el-dialog>
</template>

<script>
import { RequestComment, RequestDeleteComment } from '@/api/Comment/comment.js'
import CommentTable from '@/components/CommentTable.vue'
import CommentDialog from '@/components/CommentDialog.vue'
export default {
    components: { CommentTable, CommentDialog },
    data() {
        return {
            show: false,
            type: 'ADD', // EDIT 编辑 ADD 添加
            commentInfo: null,
            sizeType: [],
            list: [], //评论数据
            pageSize: '10',
            pageNo: '1',
            searchId: '',
            total: '',
        }
    },
    created() {
        this.getComment()
    },
    methods: {
        //关闭弹框
        bindCloseDialog() {
            this.show = false
            this.getComment()
        },
        //新增评论
        bindAdd() {
            this.type = 'ADD'
            this.show = true
        },
        //删除评论
        async bindDele(id) {
            const res = await RequestDeleteComment(id)
            if (res.data.code === 1) {
                ElMessage({
                    message: '删除评论成功!',
                    type: 'success',
                })
                this.getComment()
            }
        },
        //获取评论列表
        async getComment() {
            const res = await RequestComment(
                this.pageSize,
                this.pageNo,
                this.searchId
            )
            if (res.data.code === 1) {
                this.list = res.data.list
                this.total = res.data.total
            }
        },
        //编辑评论
        async bindEdit(row) {
            this.type = 'EDIT'
            this.commentInfo = row
            this.show = true
        },
        //页大小改变事件
        bindSizeChange(value) {
            this.pageSize = value
            this.getComment()
        },
        //页号改变事件
        bindCurrentChange(value) {
            this.pageNo = value
            this.getComment()
        },
        //刷新
        refresh() {
            this.getComment()
        },
        //搜索
        search() {
            this.getComment()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
