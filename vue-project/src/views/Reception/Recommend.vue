<template>
    <el-row :gutter="20" style="margin-bottom: 10px">
        <el-button type="success" @click="bindAdd">新增</el-button>
        <el-button type="danger" @click="refresh">刷新</el-button>
    </el-row>
    <el-table :data="list" style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" />
        <el-table-column align="center" label="图片" #default="scope">
            <el-image :src="scope.row.url" style="width: 80px; height: 80px">
            </el-image>
        </el-table-column>
        <el-table-column align="center" prop="name" label="品牌" />
        <el-table-column align="center" prop="price" label="价格" />
        <el-table-column align="center" label="操作" #default="scope">
            <el-button type="primary" @click="bindEdit(scope.row)"
                >编辑</el-button
            >
            <el-popconfirm
                title="确认要删除此记录吗?"
                @confirm="deleteRecommend(scope.row)"
            >
                <template #reference>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-popconfirm>
        </el-table-column>
    </el-table>
    <!-- 弹框组件 -->
    <el-dialog
        :title="type === 'ADD' ? '新增推荐' : '编辑推荐'"
        v-model="show"
        width="40%"
    >
        <RecommendDialog
            v-if="show"
            :recommend="recommend"
            :type="type"
            @close="bindCloseDialog"
        ></RecommendDialog>
    </el-dialog>
</template>

<script>
import {
    RequestRecommend,
    RequestDeleteRecommend,
} from '@/api/Recommend/recommend.js'
import RecommendDialog from '@/components/RecommendDialog.vue'
export default {
    components: {
        RecommendDialog,
    },
    data() {
        return {
            list: '',
            show: false,
            type: 'ADD', // EDIT 编辑 ADD 添加
            recommend: null,
        }
    },
    created() {
        this.refresh()
    },
    methods: {
        //关闭弹框
        bindCloseDialog() {
            this.show = false
            this.getRecommend()
        },
        refresh() {
            this.getRecommend()
        },
        async getRecommend() {
            const res = await RequestRecommend()
            if (res.data.code == 1) {
                this.list = res.data.list
            }
        },
        bindAdd() {
            this.type = 'ADD'
            this.show = true
        },
        bindEdit(row) {
            this.type = 'EDIT'
            this.recommend = row
            this.show = true
        },
        async deleteRecommend(row) {
            const res = await RequestDeleteRecommend(row.id)
            if (res.data.code == 1) {
                ElMessage({
                    message: '删除推荐成功!',
                    type: 'success',
                })
                this.refresh()
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
