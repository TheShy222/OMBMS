<template>
  <el-row style="margin-bottom: 10px">
    <el-col>
      <el-button type="success" @click="addShow = true">新增</el-button>
      <el-button type="warning" @click="refresh">刷新</el-button>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" prop="supplierid" label="ID" />
    <el-table-column align="center" prop="name" label="名称" />
    <el-table-column align="center" prop="phoneNumber" label="电话" />
    <el-table-column align="center" prop="address" label="地址" />
    <el-table-column align="center" prop="mainbusiness" label="主营" />
    <el-table-column align="center" prop="ltt" label="最近相关" />
    <el-table-column align="center" label="操作" #default="scope">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
      <el-popconfirm title="确认要删除此记录吗?" @confirm="dele(scope.row.supplierid)">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </el-table-column>
  </el-table>
  <!-- 添加弹框 -->
  <el-dialog title="添加供应商" v-model="addShow" width="40%">
    <el-form :model="supplier" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="supplier.supplierid"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="supplier.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="supplier.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="supplier.address"></el-input>
      </el-form-item>
      <el-form-item label="主营">
        <el-input v-model="supplier.mainbusiness"></el-input>
      </el-form-item>
      <el-form-item label="最近相关">
        <el-date-picker v-model="supplier.ltt" type="date" placeholder="选择时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addSupplier">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 编辑弹框 -->
  <el-dialog title="编辑供应商" v-model="editShow" width="40%">
    <el-form :model="supplier" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="supplier.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="supplier.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="supplier.address"></el-input>
      </el-form-item>
      <el-form-item label="主营">
        <el-input v-model="supplier.mainbusiness"></el-input>
      </el-form-item>
      <el-form-item label="最近相关">
        <el-date-picker v-model="supplier.ltt" type="date" placeholder="选择时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="editSupplier">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import {
  RequestGetSupplier,
  RequestAddSupplier,
  RequestDeleteSupplier,
  RequestEditSupplier
} from '@/api/Supplier/supplier.js'
//获取供应商列表
let list = ref([])
const getSupplier = async () => {
  const res = await RequestGetSupplier()
  if (res.data.code == 1) {
    list.value = res.data.list
  }
}
getSupplier()
//添加供应商
let addShow = ref(false)
const supplier = ref({ supplierid: '', name: '', phoneNumber: '', address: '', mainbusiness: '', ltt: '' })
const addSupplier = async () => {
  const res = await RequestAddSupplier(supplier.value)
  if (res.data.code == 1) {
    ElNotification.success({
      message: '添加供应商成功！'
    })
    refresh()
  }
}
//删除
const dele = async id => {
  const res = await RequestDeleteSupplier(id)
  if (res.data.code == 1) {
    ElNotification.success({
      message: '删除供应商成功！'
    })
  }
  refresh()
}
//编辑
let editShow = ref(false)
const edit = row => {
  supplier.value = row
  editShow.value = true
}
const editSupplier = async () => {
  const res = await RequestEditSupplier(supplier.value)
  if (res.data.code == 1) {
    ElNotification.success({
      message: '编辑供应商成功！'
    })
  }
  refresh()
}
//刷新
const refresh = () => {
  supplier.value = {}
  getSupplier()
  addShow.value = false
  editShow.value = false
}
</script>

<style lang="scss" scoped>

</style>