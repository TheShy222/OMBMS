<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-col :span="8">
      <el-button type="success" round @click="addShow = true">新增</el-button>
      <el-button type="warning" round @click="refresh">刷新</el-button>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" prop="id" label="ID" />
    <el-table-column align="center" prop="name" label="账号" />
    <el-table-column align="center" prop="password" label="密码" />
    <el-table-column align="center" label="头像" #default="scope">
      <el-image :src="scope.row.adminimg">
      </el-image>
    </el-table-column>
    <el-table-column align="center" label="操作" #default="scope">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
      <el-popconfirm title="确认要删除此记录吗?" @confirm="deleteAdmin(scope.row)">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </el-table-column>
  </el-table>
  <!-- 添加弹框 -->
  <el-dialog title="添加前台网页管理员" v-model="addShow" width="40%">
    <el-form :model="receptionAdmin" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="receptionAdmin.id"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="receptionAdmin.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="receptionAdmin.password"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload list-type="picture-card" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addReceptionAdmin">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 编辑弹框 -->
  <el-dialog title="编辑前台网页管理员" v-model="editShow" width="40%">
    <el-form :model="receptionAdmin" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="receptionAdmin.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="receptionAdmin.password"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload list-type="picture-card" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="editReceptionAdmin">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  RequestReceptionAdmin,
  RequestAddReceptionAdmin,
  RequestEditReceptionAdmin,
  RequestDeleteReceptionAdmin
} from '@/api/ReceptionAdmin/receptionAdmin.js'
export default {
  data() {
    return {
      receptionAdmin: {
        id: '',
        name: '',
        password: '',
        adminimg: ''
      },
      list: [],
      addShow: false,
      editShow: false,
      imageUrl: '', //图片预览地址
      imageFile: null //上传图片文件
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    //获取前台管理员信息
    async getReceptionAdmin() {
      const res = await RequestReceptionAdmin()
      if (res.data.code == 1) {
        this.list = res.data.list
      }
    },
    //刷新
    refresh() {
      this.getReceptionAdmin()
      this.addShow = false
      this.editShow = false
      this.receptionAdmin = {}
      this.imageUrl=''
    },
    //添加前台管理员
    async addReceptionAdmin() {
      const formData = new FormData()
      formData.append('id', this.receptionAdmin.id)
      formData.append('name', this.receptionAdmin.name)
      formData.append('password', this.receptionAdmin.password)
      formData.append('adminimg', this.imageFile)
      const res = await RequestAddReceptionAdmin(formData)
      if (res.data.code == 1) {
        ElNotification({
          message: '添加前台管理员成功!',
          type: 'success',
        })
        this.refresh()
      }
      else {
        ElMessage({
          message: '请输入相关信息或ID已重复！',
          type: 'error',
        })
      }
    },
    //删除前台管理员
    async deleteAdmin(row) {
      const res = await RequestDeleteReceptionAdmin(row.id)
      if (res.data.code == 1) {
        ElNotification({
          message: '删除前台管理员成功!',
          type: 'success',
        })
      }
      this.refresh()
    },
    //头像上传
    beforeAvatarUpload(rawFile) {
      const arr = ['image/jpeg', 'image/png', 'image/jpg']
      // 图片格式验证
      if (!arr.includes(rawFile.type)) {
        ElMessage({
          message: '上传图片格式不正确！!',
          type: 'error',
        })
        return false
      }
      // 图片大小验证
      if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage({
          message: '上传图片大小不能超过2M!',
          type: 'error',
        })
        return false
      }
      // 图片预览
      //1. 选中的本地图片转成Base64编码 赋值给 imageUrl
      //2. FileReader 读文件
      this.imageUrl = URL.createObjectURL(rawFile)
      // 上传图片
      this.imageFile = rawFile
      return false // 不向下执行
    },
    //编辑管理员
    edit(row) {
      this.receptionAdmin = row
      this.imageUrl=this.receptionAdmin.adminimg
      this.editShow = true
    },
    async editReceptionAdmin() {
      const formData = new FormData()
      formData.append('id', this.receptionAdmin.id)
      formData.append('name', this.receptionAdmin.name)
      formData.append('password', this.receptionAdmin.password)
      formData.append('adminimg', this.imageFile)
      const res = await RequestEditReceptionAdmin(formData)
      if (res.data.code == 1) {
        ElNotification({
          message: '修改前台管理员成功!',
          type: 'success',
        })
      }
      this.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.avatar{
  width: 150px;
  height: 150px;
}
</style>