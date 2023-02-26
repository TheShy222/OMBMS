<template>
    <el-table :data="list" style="width: 100%">
        <el-table-column align="center" prop="id" label="用户ID" />
        <el-table-column align="center" prop="name" label="姓名" />
        <el-table-column align="center" prop="commentId" label="评论ID" />
        <el-table-column align="center" prop="content" label="评论内容" />
        <el-table-column align="center" label="卖家秀" #default="scope">
            <el-image :src="scope.row.commentImg"> </el-image>
        </el-table-column>
        <el-table-column align="center" prop="likes" label="点赞" />
        <el-table-column align="center" prop="orderNumber" label="订单号" />
        <el-table-column align="center" prop="detail" label="商品详情" />
        <el-table-column align="center" prop="size" label="尺码" />
        <el-table-column
            fixed="right"
            align="center"
            label="操作"
            #default="scope"
            width="180"
        >
            <el-button type="primary" @click="Edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="Dele(scope.row)">删除</el-button>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: ['list'],
    emits: ['edit','dele'],
    methods: {
        Edit(row) {
            this.$emit('edit',row)
        },
        Dele(row) {
            this.$emit('dele',row.commentId)
        },
    },
}
</script>

<style lang="scss" scoped>
.el-image {
    width: 100px;
    height: 100px;
}
</style>
