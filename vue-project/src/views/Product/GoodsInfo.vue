<template>
  <el-row :gutter="20" style="margin-bottom: 10px">
    <el-col :span="8">
      <el-button type="success" plain @click="getGoodsType">新增</el-button>
      <el-button type="info" plain @click="refresh">刷新</el-button>
      <el-button type="primary" plain @click="bindBatchDelete">批量删除</el-button>
      <el-button type="success" plain @click="bindExcelExport">导出excel</el-button>
    </el-col>
    <el-col :span="8">
      <el-input v-model="searchId" placeholder="货号搜索" clearable></el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="warning" plain @click="search">搜索商品</el-button>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column align="center" prop="id" label="商品ID" width="70" />
    <el-table-column align="center" prop="goodsId" label="货号" width="120" />
    <el-table-column align="center" prop="goodsShelves" label="货架号" width="80" />
    <el-table-column align="center" prop="type" label="种类" width="80" />
    <el-table-column align="center" prop="brand" label="品牌" width="80" />
    <el-table-column align="center" prop="size" label="尺码" width="80" />
    <el-table-column align="center" label="图片" #default="scope" width="200">
      <el-image :src="scope.row.picture" style="width: 100px; height: 100px">
      </el-image>
    </el-table-column>
    <el-table-column align="center" prop="price" label="售价" width="80" />
    <el-table-column align="center" prop="detail" label="详情" width="200" />
    <el-table-column align="center" prop="reserve" label="库存" width="55" />
    <el-table-column align="center" label="操作" #default="scope" width="180">
      <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
      <el-popconfirm title="确认要删除此记录吗?" @confirm="deleteGoods(scope.row)">
        <template #reference>
          <el-button type="danger">删除</el-button>
        </template>
      </el-popconfirm>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination background layout="total,sizes,prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 30]"
    @size-change="bindSizeChange" @current-change="bindCurrentChange">
  </el-pagination>
  <!-- 添加的弹框 -->
  <el-dialog title="添加商品" v-model="addShow" width="40%">
    <el-form :model="goodsInfo" label-width="80px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="goodsInfo.id"></el-input>
      </el-form-item>
      <el-form-item label="货号" prop="goodsId">
        <el-input v-model="goodsInfo.goodsId"></el-input>
      </el-form-item>
      <el-form-item label="货架号" prop="goodsShelves">
        <el-input v-model="goodsInfo.goodsShelves"></el-input>
      </el-form-item>
      <el-form-item label="种类">
        <el-select v-model="goodsInfo.type" clearable placeholder="选择种类">
          <el-option v-for="item in goodsType" :key="item.id" :label="item.type" :value="item.type" />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="goodsInfo.brand" clearable placeholder="选择品牌种类">
          <el-option v-for="item in brandCategory" :key="item.id" :label="item.brandName" :value="item.brandName" />
        </el-select>
      </el-form-item>
      <el-form-item label="尺码">
        <el-select v-model="goodsInfo.size" clearable placeholder="选择尺码大小">
          <el-option v-for="item in sizeType" :key="item.id" :label="item.size" :value="item.size" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload list-type="picture-card" action="#" show-file-list="false" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="goodsInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="detail">
        <el-input v-model="goodsInfo.detail"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="reserve">
        <el-input v-model="goodsInfo.reserve"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addGoods">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 编辑的弹框 -->
  <el-dialog title="编辑商品" v-model="editShow" width="40%">
    <el-form :model="goodsInfo" label-width="80px">
      <el-form-item label="货架号" prop="goodsShelves">
        <el-input v-model="goodsInfo.goodsShelves"></el-input>
      </el-form-item>
      <el-form-item label="种类">
        <el-select v-model="goodsInfo.type" clearable placeholder="选择种类">
          <el-option v-for="item in goodsType" :key="item.id" :label="item.type" :value="item.type" />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="goodsInfo.brand" clearable placeholder="选择品牌种类">
          <el-option v-for="item in brandCategory" :key="item.id" :label="item.brandName" :value="item.brandName" />
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload list-type="picture-card" action="#" show-file-list="false" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="售价" prop="price">
        <el-input v-model="goodsInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="detail">
        <el-input v-model="goodsInfo.detail"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="reserve">
        <el-input v-model="goodsInfo.reserve"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editGoods">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  RequestGoodsInfo,
  RequestGoodsType,
  RequestGoodsBrandType,
  RequestGoodsSizeType,
  RequestAddGoods,
  RequestDeleteGoods,
  RequestBatchDelete,
  RequestEditGoods
} from '@/api/Goods/goodsList.js'
import { excelExport2 } from '@/utils/xlsxutil.js'
export default {
  data() {
    return {
      goodsInfo: {
        id:'',
        goodsId: '',
        goodsShelves: '',
        type: '',
        brand: '',
        size: '',
        picture: '',
        price: '',
        detail: '',
        reserve: ''
      },
      addShow: false,
      editShow: false,
      list: [],
      goodsType: [],
      brandCategory: [],
      sizeType: [],
      total: '',
      pageSize: '10',
      pageNo: '1',
      searchId: '',
      ids: '',//批量删除的id
      imageUrl: '', //图片预览地址
      imageFile: null //上传图片文件
    }
  },
  created() {
    this.getGoodsList()
    // this.getGoodsType()
  },
  methods: {
    //获取商品信息
    async getGoodsList() {
      const res = await RequestGoodsInfo(this.pageSize, this.pageNo, this.searchId)
      if (res.data.code == 1) {
        this.list = res.data.list
        this.total = res.data.total
      }
    },
    //获取添加框输入种类信息
    async getGoodsType() {
      this.addShow = true
      const res1 = await RequestGoodsType()
      if (res1.data.code == 1) {
        this.goodsType = res1.data.list
      }
      const res2 = await RequestGoodsBrandType()
      if (res2.data.code == 1) {
        this.brandCategory = res2.data.list
      }
      const res3 = await RequestGoodsSizeType()
      if (res3.data.code == 1) {
        this.sizeType = res3.data.list
      }
    },
    //页大小改变事件
    bindSizeChange(value) {
      this.pageSize = value
      this.getGoodsList()
    },
    //页号改变事件
    bindCurrentChange(value) {
      this.pageNo = value
      this.getGoodsList()
    },
    //搜索产品
    async search() {
      this.getGoodsList()
    },
    //刷新
    refresh() {
      this.addShow=false
      this.editShow=false
      this.getGoodsList()
      this.ids=''
      this.goodsInfo={}
      this.imageUrl=''
    },
    //添加商品
    async addGoods() {
      const formData = new FormData()
      formData.append('id', this.goodsInfo.id)
      formData.append('goodsId', this.goodsInfo.goodsId)
      formData.append('goodsShelves', this.goodsInfo.goodsShelves)
      formData.append('type', this.goodsInfo.type)
      formData.append('brand', this.goodsInfo.brand)
      formData.append('size', this.goodsInfo.size)
      formData.append('picture', this.imageFile)
      formData.append('price', this.goodsInfo.price)
      formData.append('detail', this.goodsInfo.detail)
      formData.append('reserve', this.goodsInfo.reserve)
      const res = await RequestAddGoods(formData)
      if (res.data.code == 1) {
        ElNotification({
          message: '添加商品成功',
          type: 'success',
        })
        this.refresh()
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
    //删除商品
    async deleteGoods(row) {
      const res = await RequestDeleteGoods(row.id)
      if (res.data.code == 1) {
        ElNotification({
          message: '删除商品成功',
          type: 'success',
        })
        this.refresh()
      }
    },
    //多选
    handleSelectionChange(value) { // [{id:10,name:''}] => [10,12,34] => '10,12,34'
      const list = value.map(item => item.id)
      const ids = list.join(',')
      this.ids = ids
    },
    //批量删除
    async bindBatchDelete() {
      if (this.ids == '') {
        ElMessage({
          type: 'info',
          message: '请选择删除产品',
        })
        return
      }
      const res = await RequestBatchDelete(this.ids)
      if (res.data.code == 1) {
        ElNotification({
          message: '批量删除商品成功',
          type: 'success',
        })
        this.refresh()
      }
    },
    //编辑商品
    edit(row) {
      this.editShow = true
      this.goodsInfo = row
      this.imageUrl=this.goodsInfo.picture
    },
    async editGoods() {
      const formData = new FormData()
      formData.append('id', this.goodsInfo.id)
      formData.append('goodsId', this.goodsInfo.goodsId)
      formData.append('goodsShelves', this.goodsInfo.goodsShelves)
      formData.append('type', this.goodsInfo.type)
      formData.append('brand', this.goodsInfo.brand)
      formData.append('size', this.goodsInfo.size)
      formData.append('picture', this.imageFile)
      formData.append('price', this.goodsInfo.price)
      formData.append('detail', this.goodsInfo.detail)
      formData.append('reserve', this.goodsInfo.reserve)
      const res = await RequestEditGoods(formData)
      if (res.data.code == 1) {
        ElNotification({
          message: '编辑商品成功',
          type: 'success',
        })
      }
      this.refresh()
    },
    //导出excel
    bindExcelExport() {
      excelExport2(
        this.list,
        {
          id:'ID',
          goodsId: '货号',
          goodsShelves: '货架号',
          type: '商品种类',
          brand: '品牌',
          size: '尺码',
          picture:'图片',
          price: '价格',
          detail: '详情',
          reserve:'库存'
        },
        '商品列表'
      )
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