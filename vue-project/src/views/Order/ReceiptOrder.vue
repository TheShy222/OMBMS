<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-col :span="8">
      <el-button type="success" @click="bindAdd">新增</el-button>
      <el-button type="info" @click="refresh">刷新</el-button>
    </el-col>
    <el-col :span="8">
      <el-input v-model="searchId" placeholder="进货单搜索" clearable></el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="warning" @click="search">查找订单</el-button>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" prop="orderNumber" label="进货单" />
    <el-table-column align="center" prop="name" label="供应商" />
    <el-table-column align="center" prop="phoneNumber" label="电话" />
    <el-table-column align="center" prop="goodsId" label="货号" />
    <el-table-column align="center" prop="size" label="尺码" />
    <el-table-column align="center" prop="number" label="数量" />
    <el-table-column align="center" prop="price" label="进货价" />
    <el-table-column fixed="right" align="center" label="操作" #default="scope" width="180">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination background layout="total,sizes,prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30]"
    @size-change="bindSizeChange" @current-change="bindCurrentChange">
  </el-pagination>
  <!-- 弹框组件 -->
  <el-dialog :title="type === 'ADD' ? '新增入库订单' : '编辑入库订单'" v-model="show" width="40%">
    <ReceiptDialog v-if="show" :order="order" :type="type" @close="bindCloseDialog"></ReceiptDialog>
  </el-dialog>
</template>

<script>
import {
  RequestReceiptOrder,
} from '@/api/Order/order.js'
import ReceiptDialog from '@/components/ReceiptDialog.vue'
export default {
  components: { ReceiptDialog },
  data() {
    return {
      show: false,
      type: 'ADD', // EDIT 编辑 ADD 添加
      order: null,
      expressType: [],
      orderNumber: '',
      sizeType: [],
      list: [],
      pageSize: '10',
      pageNo: '1',
      searchId: '',
      total: '',
    }
  },
  created() {
    this.getReceiptOrder()
  },
  methods: {
    bindCloseDialog() {
      this.show = false
      this.getReceiptOrder()
    },
    //添加入库订单
    bindAdd() {
      this.type = 'ADD'
      this.show = true
    },
    //获取订单信息
    async getReceiptOrder() {
      const res = await RequestReceiptOrder(
        this.pageSize,
        this.pageNo,
        this.searchId
      )
      if (res.data.code == 1) {
        this.list = res.data.list
        this.total = res.data.total
      }
    },
    //编辑订单
    async edit(row) {
      this.type = 'EDIT'
      this.order = row
      this.show = true
    },
    //页大小改变事件
    bindSizeChange(value) {
      this.pageSize = value
      this.getReceiptOrder()
    },
    //页号改变事件
    bindCurrentChange(value) {
      this.pageNo = value
      this.getReceiptOrder()
    },
    //刷新
    refresh() {
      this.getReceiptOrder()
    },
    //搜索
    search() {
      this.getReceiptOrder()
    },
  },
}
</script>

<style lang="scss" scoped>
.type {
  margin-left: 40px;
}
</style>
