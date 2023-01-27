<template>
  <el-menu active-text-color="#ffd04b" background-color="#2d3436" text-color="#fff" :collapse="!isCollapse">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Star /></el-icon>
        <span>人员管理</span>
      </template>
      <el-menu-item index="1-1">
        <el-icon>
          <UserFilled />
        </el-icon>
        <router-link :to="{ path: '/person/user' }">用户列表</router-link>
      </el-menu-item>
      <el-menu-item index="1-2">
        <el-icon><Headset /></el-icon>
        <router-link :to="{ path: '/person/customer' }">前台网页编辑人员</router-link>
      </el-menu-item>
      <el-menu-item index="1-3">
        <el-icon><Avatar /></el-icon>
        <router-link :to="{ path: '/person/admin' }">管理员列表</router-link>
      </el-menu-item>
      <el-menu-item index="1-4">
        <el-icon><HelpFilled /></el-icon>
        <router-link :to="{ path: '/person/supplier' }">供应商列表</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item index="2-1">
        <el-icon><Memo /></el-icon>
        <router-link :to="{ path: '/product/goodsinfo' }">商品列表</router-link>
      </el-menu-item>
      <el-menu-item index="2-2">
        <el-icon><FolderOpened /></el-icon>
        <router-link :to="{ path: '/product/goodsCategory' }">商品分类</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><WalletFilled /></el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item index="3-1">
        <el-icon><RemoveFilled /></el-icon>
        <router-link :to="{ path: '/order/issueOrder' }">出库订单</router-link>
      </el-menu-item>
      <el-menu-item index="3-2">
        <el-icon><CirclePlusFilled /></el-icon>
        <router-link :to="{ path: '/order/receiptOrder' }">入库订单</router-link>
      </el-menu-item>
      <el-menu-item index="3-3">
        <el-icon><Refresh /></el-icon>
        <router-link :to="{ path: '/order/afterSalesOrder' }">售后订单</router-link>
      </el-menu-item>
      <el-menu-item index="3-4">
        <el-icon><Promotion /></el-icon>
        <router-link :to="{ path: '/order/delivery' }">配送方式管理</router-link>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><Service /></el-icon>
        <span>前台管理</span>
      </template>
      <el-menu-item index="4-1">
        <el-icon><ChatRound /></el-icon>
        <router-link :to="{ path: '/reception/notice' }">公告管理</router-link>
      </el-menu-item>
      <el-menu-item index="4-2">
        <el-icon><Edit /></el-icon>
        <router-link :to="{ path: '/reception/advert' }">轮播广告管理</router-link>
      </el-menu-item>
      <el-menu-item index="4-3">
        <el-icon><ChatDotRound /></el-icon>
        <router-link :to="{ path: '/reception/comment' }">评论管理</router-link>
      </el-menu-item>
      <el-menu-item index="4-4">
        <el-icon><GoldMedal /></el-icon>
        <router-link :to="{ path: '/reception/recommend' }">推荐列表</router-link>
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
