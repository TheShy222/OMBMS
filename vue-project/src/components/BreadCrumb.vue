<template>
  <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in navigateList" :key="index" >{{item.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
      return {
          navigateList:[]
      }
  },
  watch: {
      /**
       * 路由变化，更新面包屑导航
       *   侦听$route
       *   获取matced数组中元素，更新面包屑内容
       */
      $route(value){
          if(value.path === '/index'){
              this.navigateList = []
              return 
          }
          const navigateList = value.matched.map(item=> {
              return {path:item.path,title:item.meta.title}
          })
          this.navigateList = navigateList
      }
  }
}
</script>

<style lang="scss" scoped></style>
