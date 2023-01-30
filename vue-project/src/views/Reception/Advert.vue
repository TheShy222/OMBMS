<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-button type="success" @click="addShow = true">新增</el-button>
    <el-button type="danger" @click="refresh">刷新</el-button>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column align="center" prop="carouselid" label="ID" />
    <el-table-column align="center" label="轮播图" #default="scope">
      <el-image :src="scope.row.url" style="width: 300px; height: 100px">
      </el-image>
    </el-table-column>
    <el-table-column align="center" label="操作" #default="scope">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
      <el-popconfirm title="确认要删除此记录吗?" @confirm="deleteCarousel(scope.row)">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </el-table-column>
  </el-table>
  <!-- 添加弹框 -->
  <el-dialog title="添加轮播图" v-model="addShow" width="40%">
    <el-form :model="carouselInfo" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="carouselInfo.carouselId"></el-input>
      </el-form-item>
      <el-form-item label="轮播图">
        <el-upload list-type="picture-card" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddCarousel">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 编辑弹框 -->
  <el-dialog title="编辑轮播图" v-model="editShow" width="40%">
    <el-form :model="carouselInfo" label-width="80px">
      <el-form-item label="轮播图">
        <el-upload list-type="picture-card" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editCarousel">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  RequestCarousel,
  RequestAddCarousel,
  RequestEditCarousel,
  RequestDeleteCarousel
} from '@/api/Carousel/carousel.js'
export default {
  data() {
    return {
      addShow: false,
      editShow: false,
      carouselInfo: {
        carouselid: '',
        url: ''
      },
      list: [],
      imageUrl: '', //图片预览地址
      imageFile: null //上传图片文件
    }
  },
  created() {
    this.refresh()
  },
  methods: {
    async getCarousel() {
      const res = await RequestCarousel()
      if (res.data.code === 1) {
        this.list = res.data.list
      }
    },
    //添加轮播图
    async AddCarousel() {
      const formData = new FormData()
      formData.append('carouselId', this.carouselInfo.carouselId)
      formData.append('url', this.imageFile)
      const res = await RequestAddCarousel(formData)
      if (res.data.code == 1) {
        ElNotification({
          message: '添加轮播图成功',
          type: 'success',
        })
        this.refresh()
      }
    },
    //刷新
    refresh() {
      this.getCarousel()
      this.addShow=false
      this.editShow=false
      this.carouselInfo={}
      this.imageUrl=''
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
      if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage({
          message: '上传图片大小不能超过5M!',
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
    //编辑
    edit(row) {
      this.editShow = true
      this.carouselInfo = row
      this.imageUrl = this.carouselInfo.url
    },
    async editCarousel() {
      const formData = new FormData()
      formData.append('carouselid', this.carouselInfo.carouselid)
      formData.append('url', this.imageFile)
      const res = await RequestEditCarousel(formData)
      if (res.data.code == 1) {
        ElNotification({
          message: '编辑轮播图成功',
          type: 'success',
        })
        this.refresh()
      }
    },
    //删除
    async deleteCarousel(row) {
      const res = await RequestDeleteCarousel(row.carouselid)
      if (res.data.code == 1) {
        ElNotification({
          message: '删除轮播图成功',
          type: 'success',
        })
        this.refresh()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 150px;
  height: 150px;
}
</style>