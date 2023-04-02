<template>
    <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="8">
            <el-button type="success" @click="bindAdd">新增</el-button>
            <el-button type="info" @click="refresh">刷新</el-button>
        </el-col>
        <el-col :span="8">
            <el-input
                v-model="searchId"
                placeholder="订单号搜索"
                clearable
            ></el-input>
        </el-col>
        <el-col :span="8">
            <el-button type="warning" @click="search">查找订单</el-button>
        </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
        <el-table-column align="center" prop="orderNumber" label="订单号" />
        <el-table-column align="center" prop="cause" label="退货理由" />
        <el-table-column align="center" prop="detail" label="详情" />
        <el-table-column align="center" prop="phoneNumber" label="电话" />
        <el-table-column align="center" prop="express" label="物流" />
        <el-table-column align="center" prop="price" label="金额" />
        <el-table-column
            fixed="right"
            align="center"
            label="操作"
            #default="scope"
        >
            <el-button type="danger" @click="bindDelete(scope.row.orderNumber)"
                >删除</el-button
            >
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        background
        layout="total,sizes,prev, pager, next, jumper"
        :total="total"
        :page-sizes="[10, 20, 30]"
        @size-change="bindSizeChange"
        @current-change="bindCurrentChange"
    >
    </el-pagination>
    <!-- 添加的弹框 -->
    <el-dialog title="添加退货订单" v-model="addShow" width="40%">
        <el-form :model="order" label-width="80px">
            <el-form-item label="订单号" prop="orderNumber">
                <el-input disabled v-model="order.orderNumber"></el-input>
            </el-form-item>
            <el-form-item label="退货理由" prop="cause">
                <el-input v-model="order.cause"></el-input>
            </el-form-item>
            <el-form-item label="详情" prop="detail">
                <el-input v-model="order.detail"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="order.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="物流">
                <el-select
                    v-model="order.express"
                    clearable
                    placeholder="选择物流方式"
                >
                    <el-option
                        v-for="item in expressType"
                        :key="item.id"
                        :label="item.type"
                        :value="item.type"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="number">
                <el-input v-model="order.price"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addAfterSaleOrder"
                    >确定</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {
    RequestGetAfterSaleOrder,
    RequestAddAfterSaleOrder,
    RequestDeleteAfterSaleOrder,
} from '@/api/AfterSaleOrder/afterSaleOrder'
import { RequestExpressType } from '@/api/order/order.js'
export default {
    data() {
        return {
            addShow: false,
            order: {
                orderName: '',
                cause: '',
                detail: '',
                phoneNumber: '',
                express: '',
                price: '',
            },
            expressType: [],
            list: [],
            pageSize: '10',
            pageNo: '1',
            searchId: '',
            total: '',
        }
    },
    created() {
        this.getAfterSaleOrder()
    },
    methods: {
        bindAdd() {
            this.addShow = true
            this.getExpressType()
        },
        //获取订单信息
        async getAfterSaleOrder() {
            const res = await RequestGetAfterSaleOrder(
                this.pageSize,
                this.pageNo,
                this.searchId
            )
            if (res.data.code == 1) {
                this.list = res.data.list
                this.total = res.data.total
            }
        },
        async getExpressType() {
            const res = await RequestExpressType()
            if (res.data.code == 1) {
                this.expressType = res.data.list
            }
        },
        //添加订单
        async addAfterSaleOrder() {
            const res = await RequestAddAfterSaleOrder(this.order)
            if (res.data.code == 1) {
                ElMessage({
                    message: '添加订单成功!',
                    type: 'success',
                })
                this.refresh()
            }
        },
        //页大小改变事件
        bindSizeChange(value) {
            this.pageSize = value
            this.getAfterSaleOrder()
        },
        //页号改变事件
        bindCurrentChange(value) {
            this.pageNo = value
            this.getAfterSaleOrder()
        },
        //刷新
        refresh() {
            this.getAfterSaleOrder()
            this.addShow = false
            this.order = {}
        },
        //搜索
        search() {
            this.getAfterSaleOrder()
        },
        async bindDelete(orderNumber) {
            const res = await RequestDeleteAfterSaleOrder(orderNumber)
            if (res.data.code == 1) {
                ElMessage({
                    message: '删除售后订单成功!',
                    type: 'success',
                })
                this.refresh()
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
