<template>
    <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="8">
            <el-button type="success" @click="addShow = true">新增</el-button>
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
            <el-badge :value="sending" class="type">
                <el-button>未发货</el-button>
            </el-badge>
            <el-badge :value="sent" type="primary" class="type">
                <el-button>已发货</el-button>
            </el-badge>
        </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
        <el-table-column
            fixed="left"
            align="center"
            prop="orderNumber"
            label="订单号"
            width="100"
        />
        <el-table-column align="center" prop="name" label="姓名" width="80" />
        <el-table-column
            align="center"
            prop="phoneNumber"
            label="电话"
            width="120"
        />
        <el-table-column
            align="center"
            prop="address"
            label="地址"
            width="250"
        />
        <el-table-column align="center" prop="id" label="商品ID" width="150" />
        <el-table-column align="center" prop="size" label="尺码" width="80" />
        <el-table-column align="center" prop="number" label="数量" width="60" />
        <el-table-column align="center" prop="price" label="售价" width="100" />
        <el-table-column
            align="center"
            prop="totalPrice"
            label="总价"
            width="100"
        />
        <el-table-column align="center" prop="state" label="状态" width="70" />
        <el-table-column
            align="center"
            prop="express"
            label="物流"
            width="70"
        />
        <el-table-column
            fixed="right"
            align="center"
            label="操作"
            #default="scope"
            width="180"
        >
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button type="success" @click="sale(scope.row)">发货</el-button>
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
    <el-dialog title="添加订单" v-model="addShow" width="40%">
        <el-form :model="order" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="order.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="order.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="order.address"></el-input>
            </el-form-item>
            <el-form-item label="商品ID" prop="id">
                <el-input v-model="order.id"></el-input>
            </el-form-item>
            <el-form-item label="尺码">
                <el-select
                    v-model="order.size"
                    clearable
                    placeholder="选择尺码大小"
                >
                    <el-option
                        v-for="item in sizeType"
                        :key="item.id"
                        :label="item.size"
                        :value="item.size"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="数量" prop="number">
                <el-input v-model="order.number"></el-input>
            </el-form-item>
            <el-form-item label="售价" prop="price">
                <el-input v-model="order.price"></el-input>
            </el-form-item>
            <el-form-item label="总价" prop="totalPrice">
                <el-input v-model="order.totalPrice"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio-group v-model="order.state">
                    <el-radio label="未发货" />
                    <el-radio label="已发货" />
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrder">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑订单" v-model="editShow" width="40%">
        <el-form :model="order" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="order.name"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="order.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="order.address"></el-input>
            </el-form-item>
            <el-form-item label="尺码">
                <el-select
                    v-model="order.size"
                    clearable
                    placeholder="选择尺码大小"
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
                <el-button type="primary" @click="editOrder">确定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 发货 -->
    <el-dialog title="物流方式" v-model="expressShow" width="40%">
        <el-form :model="order" label-width="80px">
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
            <el-form-item>
                <el-button type="primary" @click="confirmExpress"
                    >确定</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {
    RequestIssueOrder,
    RequestAddIssueOrder,
    RequestIssueOrderState,
    RequestChangeIssueOrderState,
    RequestEditIssueOrder,
    RequestGoodsNumberChange,
    RequestExpressType,
} from '@/api/Order/order.js'
import { RequestGoodsSizeType } from '@/api/Goods/goodsList.js'
export default {
    data() {
        return {
            addShow: false,
            editShow: false,
            expressShow: false,
            order: {
                orderName: '',
                name: '',
                phoneNumber: '',
                address: '',
                id: '',
                size: '',
                number: '',
                price: '',
                totalPrice: '',
                state: '',
                express: '',
            },
            expressType: [],
            orderNumber: '',
            sizeType: [],
            list: [],
            pageSize: '10',
            pageNo: '1',
            searchId: '',
            total: '',
            sending: '',
        }
    },
    created() {
        this.getSize()
        this.getIssueOrder()
        this.getIssueOrderState()
    },
    computed: {
        sent() {
            return this.total - this.sending
        },
    },
    methods: {
        //获取订单信息
        async getIssueOrder() {
            const res = await RequestIssueOrder(
                this.pageSize,
                this.pageNo,
                this.searchId
            )
            if (res.data.code == 1) {
                this.list = res.data.list
                this.total = res.data.total
            }
        },
        //获取订单状态信息
        async getIssueOrderState() {
            const res = await RequestIssueOrderState()
            if (res.data.code == 1) {
                this.sending = res.data.sending
            }
        },
        //添加订单
        async addOrder() {
            const res = await RequestAddIssueOrder(this.order)
            if (res.data.code == 1) {
                ElMessage({
                    message: '添加订单成功!',
                    type: 'success',
                })
            }
            const res2 = await RequestGoodsNumberChange(this.order)
            this.addShow = false
            this.getIssueOrder()
            this.getIssueOrderState()
        },
        //获取尺码
        async getSize() {
            const res = await RequestGoodsSizeType()
            if (res.data.code == 1) {
                this.sizeType = res.data.list
            }
        },
        //编辑订单
        async edit(row) {
            this.order = row
            this.editShow = true
        },
        async editOrder() {
            const res = await RequestEditIssueOrder(this.order)
            if (res.data.code == 1) {
                ElMessage({
                    message: '编辑订单成功!',
                    type: 'success',
                })
                this.editShow = false
                this.order = {}
                this.getIssueOrder()
                this.getIssueOrderState()
            }
        },
        //发货
        async sale(row) {
            this.expressShow = true
            this.orderNumber = row.orderNumber
            const res = await RequestExpressType()
            if (res.data.code == 1) {
                this.expressType = res.data.list
            }
        },
        async confirmExpress() {
            const res = await RequestChangeIssueOrderState(
                this.orderNumber,
                this.order.express
            )
            if (res.data.code == 1) {
                ElMessage({
                    message: '发货成功!',
                    type: 'success',
                })
            }
            this.expressShow = false
            this.getIssueOrder()
            this.getIssueOrderState()
        },
        //页大小改变事件
        bindSizeChange(value) {
            this.pageSize = value
            this.getIssueOrder()
        },
        //页号改变事件
        bindCurrentChange(value) {
            this.pageNo = value
            this.getIssueOrder()
        },
        //刷新
        refresh() {
            this.getIssueOrder()
            this.order = {}
        },
        //搜索
        search() {
            this.getIssueOrder()
        },
    },
}
</script>

<style lang="scss" scoped>
.type {
    margin-left: 40px;
}
</style>
