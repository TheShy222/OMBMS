<template>
  <el-container>
    <!-- 左侧区域 -->
    <el-aside :width="asideWidth">
      <div class="g-title">
        <el-image :src="url"></el-image>
        <h3>商城前台</h3>
      </div>
      <el-menu active-text-color="#ffd04b" background-color="#2d3436" text-color="#fff">
        <el-menu-item index="1">
          <el-icon><Lightning /></el-icon>
          <router-link :to="{ path: '/category/shoes' }">鞋子</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Ship /></el-icon>
          <router-link :to="{ path: '/category/outerWear' }">外套</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Sunny /></el-icon>
          <router-link :to="{ path: '/category/cotta' }">短袖</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><Drizzling /></el-icon>
          <router-link :to="{ path: '/category/socks' }">袜子</router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><Pouring /></el-icon>
          <router-link :to="{ path: '/category/hat' }">帽子</router-link>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><Moon /></el-icon>
          <router-link :to="{ path: '/category/downJackets' }">羽绒服</router-link>
        </el-menu-item>
        <el-menu-item index="7">
          <el-icon><MostlyCloudy /></el-icon>
          <router-link :to="{ path: '/category/trousers' }">裤子</router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <el-input v-model="input" placeholder="搜索" />
        <div>
          <el-button>注册</el-button>
          <el-button>登录</el-button>
        </div>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <!-- 子路由输出 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      asideWidth: '200px',
      url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    }
  },
  computed: {
    admin() {

    },
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100vh;

  .el-aside {
    background-color: #2d3436;
    color: white;
    transition: 0.6s;

    .g-title {
      display: flex;
      margin: 20px;

      h3 {
        margin-left: 20px;
      }
    }

    .el-image {
      width: 25px;
      height: 25px;
    }

    p {
      margin-left: 20px;
    }

    .el-menu {
      border-right: 0;
    }
  }

  .el-container {
    .el-header {
      display: flex;
      height: 60px;
      justify-content: space-between;
      background:linear-gradient(120deg,red, orange, yellow, green, blue, indigo, violet);
      align-items: center;
      .el-input {
        width: 250px;
        height: 30px;
      }

      .g-header-r {
        display: flex;
        align-items: center;

        p {
          color: white;
          cursor: pointer;
          margin-right: 20px;
        }

        .el-image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
    }

  }
}
</style>