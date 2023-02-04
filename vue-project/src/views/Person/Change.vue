<template>
  <el-form :model="admin">
    <el-form-item label="账号">
      <el-input disabled v-model="admin.name"></el-input>
    </el-form-item>
    <el-form-item label="当前密码">
      <el-input disabled v-model="admin.password"></el-input>
    </el-form-item>
    <el-form-item label="新的密码">
      <el-input  v-model="newPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="bindChange">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  RequestChangePass
} from '@/api/Admin/admin.js'
export default {
  data() {
    return {
      admin: {},
      newPassword:''
    }
  },
  created() {
    this.admin = this.Admin[0]
    this.imageUrl = this.Admin[0].headimg
  },
  computed: {
    Admin() {
      return this.$store.getters['loginAccount/loginAccount']
    },
  },
  methods: {
    async bindChange() {
      console.log(this.admin.id,this.newPassword)
      const res = await RequestChangePass(this.admin.id,this.newPassword)
      if (res.data.code == 1) {
        ElMessage({
          message: '修改密码成功,请重新登录！',
          type: 'success',
        })
        this.$router.replace({ path: '/login' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 500px;
  margin-left: 400px;

  .avatar {
    width: 150px;
    height: 150px;
  }
}
</style>