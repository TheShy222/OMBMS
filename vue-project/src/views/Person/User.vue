<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-col :span="8">
      <el-button type="success" round @click="addShow=true">新增</el-button>
      <el-button type="warning" round @click="ascOrder">升序排列</el-button>
      <el-button type="danger" round @click="descOrder">降序排列</el-button>
      <el-button type="info" round @click="refresh">刷新</el-button>
    </el-col>
    <el-col :span="8">
      <el-input v-model="searchId" placeholder="搜索" clearable></el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="warning" @click="bindSearch">搜索用户</el-button>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" prop="id" label="ID" />
    <el-table-column align="center" prop="name" label="姓名" />
    <el-table-column align="center" prop="phoneNumber" label="电话" />
    <el-table-column align="center" prop="address" label="地址" />
    <el-table-column align="center" prop="integral" label="积分" />
    <el-table-column align="center" label="操作" #default="scope">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination background layout="total,sizes,prev, pager, next, jumper" :total="total" :page-sizes="[5, 10, 15]"
    @size-change="bindSizeChange" @current-change="bindCurrentChange">
  </el-pagination>
  <!-- 新增弹框 -->
  <el-dialog title="新增用户" v-model="addShow" width="40%">
        <el-form :model="user" label-width="80px">
            <el-form-item label="ID">
                <el-input v-model="user.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="user.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="user.address"></el-input>
            </el-form-item>
            <el-form-item label="积分">
                <el-input disabled v-model="user.integral"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="addUser">确定</el-button>
            </el-form-item>
        </el-form>
  </el-dialog>
  <!-- 编辑弹框 -->
  <el-dialog title="编辑用户" v-model="editShow" width="40%">
        <el-form :model="user" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="user.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="user.address"></el-input>
            </el-form-item>
            <el-form-item label="积分">
                <el-input v-model="user.integral"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="editUser">确定</el-button>
            </el-form-item>
        </el-form>
  </el-dialog>
</template>

<script>
import { RequestUsersInfo,RequestEditUser,RequestAddUser } from '@/api/User/user.js'
export default {
  data() {
    return {
      user: {
        id: '',
        name: '',
        phoneNumber: '',
        address: '',
        integral: 0
      },
      list: [],
      total: '', // 总记录条数
      pageSize: '10', // 每页记录条数
      pageNo: '1', // 当前页号
      searchId: '',
      asc: '',//1 控制升序
      desc: '',//1 控制降序 
      addShow: false,
      editShow: false,
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    //获取用户信息
    async getUsersList() {
      const res = await RequestUsersInfo(this.pageSize, this.pageNo, this.searchId, this.asc, this.desc)
      if (res.data.code == 1) {
        this.list = res.data.list
        this.total = res.data.total
      }
    },
    //升序
    ascOrder() {
      this.asc = 1
      this.desc = ''
      this.getUsersList()
    },
    //降序
    descOrder() {
      this.asc = ''
      this.desc = 1
      this.getUsersList()
    },
    //刷新
    refresh() {
      this.asc = ''
      this.desc = ''
      this.searchId = ''
      this.addShow=false
      this.editShow=false
      this.user={}
      this.user.integral=0
      this.getUsersList()
    },
    //搜索
    bindSearch() {
      this.getUsersList()
    },
    // 页大小改变事件
    bindSizeChange(value) {
      this.pageSize = value
      this.getUsersList()
    },
    //页号改变事件
    bindCurrentChange(value) {
      this.pageNo = value
      this.getUsersList()
    },
    async addUser(){
      const res = await RequestAddUser(this.user)
      if (res.data.code == 1) {
        ElMessage({
          message: '添加用户成功',
          type: 'success',
        })
        this.addShow=false
        this.user={}
        this.user.integral=0
        this.getUsersList()
      }
    },
    //编辑
    edit(row) {
      this.editShow = true
      this.user = row
    },
    async editUser() {
      const res = await RequestEditUser(this.user)
      if (res.data.code == 1) {
        ElMessage({
          message: '修改用户成功',
          type: 'success',
        })
        this.editShow=false
        this.user={}
        this.user.integral=0
        this.getUsersList()
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>