<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-col :span="8">
      <el-button type="success" round @click="add">新增</el-button>
      <el-button type="warning" round @click="refresh">刷新</el-button>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column label="头像" #default="scope">
      <el-image :src="scope.row.headimg">
      </el-image>
    </el-table-column>
    <el-table-column prop="name" label="账号" />
    <el-table-column prop="password" label="密码" />
    <el-table-column label="操作" #default="scope">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
      <el-button type="danger" @click="dele(scope.row)">删除</el-button>
    </el-table-column>
  </el-table>
  <!-- 添加弹框 -->
  <el-dialog title="添加系统管理员" v-model="addShow" width="40%">
    <el-form :model="admin" :rules="rules" label-width="80px" ref="addAdminRef">
      <el-form-item label="ID" prop="id">
        <el-input v-model="admin.id"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="name">
        <el-input v-model="admin.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="admin.password"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headimg">
        <el-upload list-type="picture-card" action="#" show-file-list="false" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addAdmin">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 编辑弹框 -->
  <el-dialog title="编辑系统管理员" v-model="editShow" width="40%">
    <el-form :model="admin" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="admin.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="admin.password"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="headimg">
        <el-upload list-type="picture-card" action="#" show-file-list="false" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="editAdmin">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  RequestAdminsInfo,
  RequestAddAdmin,
  RequestdeleAdmin,
  RequestEditAdmin
} from '@/api/Admin/admin.js'
export default {
  data() {
    return {
      admin: {
        id: '',
        name: '',
        password: '',
        headimg: ''
      },
      rules: {
        id: [
          {
            required: true,
            message: '请输入ID',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        headimg: [
          {
            required: true,
            message: '请输入头像',
            trigger: 'blur'
          },
        ],
      },
      list: [],
      addShow: false,
      editShow: false,
      imageUrl: '', //图片预览地址
      imageFile: null //上传图片文件
    }
  },
  created() {
    this.getAdminsList()
  },
  methods: {
    //获取管理员信息
    async getAdminsList() {
      const res = await RequestAdminsInfo()
      if (res.data.code == 1) {
        this.list = res.data.list
      }
    },
    //刷新
    refresh() {
      this.getAdminsList()
    },
    //添加管理员
    add() {
      this.addShow = true
    },
    async addAdmin() {
      const formData = new FormData()
      formData.append('id', this.admin.id)
      formData.append('name', this.admin.name)
      formData.append('password', this.admin.password)
      formData.append('headimg', this.imageFile)
      const res = await RequestAddAdmin(formData)
      if (res.data.code == 1) {
        ElMessage({
          message: '添加管理员成功!',
          type: 'success',
        })
        this.addShow = false
        this.admin = {}
        this.getAdminsList()
      }
      else {
        ElMessage({
          message: '请输入相关信息!',
          type: 'error',
        })
      }
    },
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
    //删除管理员
    async dele(row) {
      const res = await RequestdeleAdmin(row.id)
      if (res.data.code == 1) {
        ElMessage({
          message: '删除管理员成功!',
          type: 'success',
        })
      }
      this.getAdminsList()
    },
    //编辑管理员
    edit(row) {
      this.admin = row
      this.imageUrl=this.admin.headimg
      this.editShow = true
    },
    async editAdmin() {
      const formData = new FormData()
      formData.append('name', this.admin.name)
      formData.append('password', this.admin.password)
      formData.append('headimg', this.imageFile)
      formData.append('id', this.admin.id)
      const res = await RequestEditAdmin(formData)
      if (res.data.code == 1) {
        ElMessage({
          message: '修改管理员成功!',
          type: 'success',
        })
      }
      this.editShow = false
      this.admin = {}
      this.getAdminsList()
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

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>