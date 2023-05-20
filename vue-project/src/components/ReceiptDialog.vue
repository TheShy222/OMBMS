<template>
    <el-form :model="orderInfo" label-width="80px">
        <el-form-item label="进货单">
            <el-input disabled v-model="orderInfo.orderNumber"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
            <el-select
                v-model="orderInfo.name"
                clearable
                placeholder="选择供应商"
            >
                <el-option
                    v-for="item in supplierList"
                    :key="item.supplierid"
                    :label="item.name"
                    :value="item.name"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="orderInfo.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="货号">
            <el-input v-model="orderInfo.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="尺码">
            <el-select
                v-model="orderInfo.size"
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
        <el-form-item label="数量">
            <el-input v-model="orderInfo.number"></el-input>
        </el-form-item>
        <el-form-item label="进货价">
            <el-input v-model="orderInfo.price"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="bindConfirm">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { RequestGoodsSizeType } from '@/api/Goods/goodsList.js'
import {
    RequestAddReceiptOrder,
    RequestEditReceiptOrder,
} from '@/api/Order/order.js'
import {
  RequestGetSupplier,
} from '@/api/Supplier/supplier.js'
export default {
    props: ['order', 'type'],
    emits: ['close'],
    data() {
        return {
            orderInfo: {
                orderNumber: '',
                name: '',
                phoneNumber: '',
                goodsId: '',
                size: '',
                number: '',
                price: '',
            },
            sizeType: [],
            supplierList: [],
        }
    },
    created() {
        this.getGoodsSize()
        this.getSupplier()
        if (this.type === 'EDIT') {
            this.orderInfo = { ...this.order }
        }
    },
    methods: {
        //获取供应商信息
        async getSupplier() {
            const res = await RequestGetSupplier()
            if (res.data.code === 1) {
                this.supplierList = res.data.list
            }
        },
        //关闭弹框
        onClose() {
            this.$emit('close')
        },
        async getGoodsSize() {
            const res = await RequestGoodsSizeType()
            if (res.data.code == 1) {
                this.sizeType = res.data.list
            }
        },
        async bindConfirm() {
            // 编辑
            let res
            if (this.type === 'EDIT') {
                res = await RequestEditReceiptOrder(this.orderInfo)
            } else {
                res = await RequestAddReceiptOrder(this.orderInfo)
            }
            if (res.data.code === 1) {
                ElMessage({
                    message:
                        this.type === 'EDIT'
                            ? '编辑入库订单成功!'
                            : '添加入库订单成功!',
                    type: 'success',
                })
                this.onClose()
            }
        },
    },
}
</script>
<style></style>
