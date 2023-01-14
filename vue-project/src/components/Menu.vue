<template>
  <el-menu active-text-color="#ffd04b" background-color="#2d3436" text-color="#fff" :collapse="!isCollapse">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>人员管理</span>
      </template>
      <el-menu-item index="1-1">
        <el-icon>
          <UserFilled />
        </el-icon>
        <router-link :to="{ path: '/person/user' }">用户列表</router-link>
      </el-menu-item>
      <el-menu-item index="1-2">
        <el-icon>
          <Menu />
        </el-icon>
        <router-link :to="{ path: '/person/customer' }">客服列表</router-link>
      </el-menu-item>
      <el-menu-item index="1-3">
        <el-icon>
          <WarnTriangleFilled />
        </el-icon>
        <router-link :to="{ path: '/person/admin' }">管理员列表</router-link>
      </el-menu-item>
      <el-menu-item index="1-4">
        <el-icon>
          <Menu />
        </el-icon>
        <router-link :to="{ path: '/person/supplier' }">供应商列表</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <Food />
        </el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="2-1">
        <el-icon>
          <MilkTea />
        </el-icon>
        <router-link :to="{ path: '/product/goodsinfo' }">商品列表</router-link>
      </el-menu-item>
      <el-menu-item index="2-2">
        <el-icon>
          <FolderAdd />
        </el-icon>
        <router-link :to="{ path: '/product/goodsCategory' }">商品分类</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Service />
        </el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item index="3-1">
        <el-icon>
            <Female />
        </el-icon>
        <router-link :to="{ path: '/oreder/issueOrder' }">出库订单</router-link>
      </el-menu-item>
      <el-menu-item index="3-2"><el-icon>
          <Star />
        </el-icon>
        <router-link :to="{ path: '/oreder/receiptOrder' }">入库订单</router-link>
      </el-menu-item>
      <el-menu-item index="3-3"><el-icon>
          <Star />
        </el-icon>
        <router-link :to="{ path: '/order/afterSalesOrder' }">售后订单</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <PieChart />
        </el-icon>
        <span>前台管理</span>
      </template>
      <el-menu-item index="4-1">
        <el-icon>
            <CircleCheck />
          </el-icon>
        <router-link :to="{ path: '/reception/notice' }">公告管理</router-link>
      </el-menu-item>
      <el-menu-item index="4-2">
        <el-icon>
          <CircleClose />
        </el-icon>
        <router-link :to="{ path: '/reception/advert' }">轮播广告管理</router-link>
      </el-menu-item>
      <el-menu-item index="4-3">
        <el-icon>
          <CircleClose />
        </el-icon>
        <router-link :to="{ path: '/reception/delivery' }">配送方式管理</router-link>
      </el-menu-item>
      <el-menu-item index="4-4">
        <el-icon>
          <CircleClose />
        </el-icon>
        <router-link :to="{ path: '/reception/comment' }">评论管理</router-link>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: Boolean,
  },
}
</script>

<style lang="scss" scoped>

</style>
