<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-button type="success" @click="bindAddExpress">新增</el-button>
    <el-button type="danger" @click="refresh">刷新</el-button>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" prop="id" label="ID" />
    <el-table-column align="center" prop="type" label="名称" />
    <el-table-column align="center" label="Logo" #default="scope">
      <el-image :src="scope.row.logo" style="width: 120px; height: 80px">
      </el-image>
    </el-table-column>
    <el-table-column align="center" label="操作" #default="scope">
      <el-button type="primary" @click="bindEdit(scope.row)">编辑</el-button>
      <el-popconfirm title="确认要删除此记录吗?" @confirm="deleteType(scope.row)">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </el-table-column>
  </el-table>
  <!-- 弹框组件 -->
  <el-dialog :title="type === 'ADD' ? '新增物流方式' : '编辑物流方式'" v-model="show" width="40%">
    <Dialog v-if="show" :express="express" :type="type" @close="bindCloseDialog"></Dialog>
  </el-dialog>
</template>

<script>
import Dialog from '../../components/Dialog.vue'
import {
  RequestExpressType,
} from '@/api/Order/order.js'
import { RequestDeleteExpress } from '@/api/Express/express.js'
export default {
  components: { Dialog },
  data() {
    return {
      list: "",
      show: false,
      type: 'ADD', // EDIT 编辑 ADD 添加
      express: null,
    };
  },
  created() {
    this.refresh()
  },
  methods: {
    //刷新
    refresh() {
      this.getExpress()
    },
    //添加物流方式
    bindAddExpress() {
      this.type = 'ADD'
      this.show = true
    },
    //编辑物流方式
    bindEdit(row) {
      this.express = row
      this.type = 'EDIT'
      this.show = true
    },
    //删除物流方式
    async deleteType(row) {
      const res = await RequestDeleteExpress(row.id)
      if (res.data.code == 1) {
        ElMessage({
          message: '删除物流方式成功!',
          type: 'success',
        })
        this.refresh()
      }
    },
    bindCloseDialog() {
      this.show = false
      this.getExpress()
    },
    async getExpress() {
      const res = await RequestExpressType();
      if (res.data.code == 1) {
        this.list = res.data.list;
      }
    }
  },

}
</script>

<style lang="scss" scoped></style>