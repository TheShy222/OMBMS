<template>
  <el-container>
    <!-- 左侧区域 -->
    <el-aside :width="asideWidth">
      <div class="g-title">
        <el-image :src="url"></el-image>
        <h3 v-show="isCollapse">商城后台</h3>
      </div>
      <p>首页</p>
      <Menu :isCollapse="isCollapse"></Menu>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <el-icon size="25" @click="bindCollapse" class="iconChange">
          <component :is="componentName"></component>
        </el-icon>

        <div>
          <el-dropdown>
            <div class="g-header-r">
              <p>欢迎您:{{ admin[0].name }}</p>
              <el-image :src="admin[0].headimg"></el-image>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="bindUser"><el-icon>
                    <User />
                  </el-icon>个人中心</el-dropdown-item>
                <el-dropdown-item @click="bindLogin"><el-icon>
                    <Refresh />
                  </el-icon>切换用户</el-dropdown-item>
                <el-dropdown-item @click="bindExit"><el-icon>
                    <Close />
                  </el-icon>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <!-- 面包屑导航 -->
        <BreadCrumb></BreadCrumb>

        <!-- 子路由输出 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import Menu from '@/components/Menu.vue'
import { Fold, Expand } from '@element-plus/icons-vue'
export default {
  components: {
    BreadCrumb,
    Menu,
    Fold,
    Expand
  },
  data() {
    return {
      url: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      isCollapse: true,
      asideWidth: '200px',
      componentName: Fold
    }
  },
  computed: {
    admin() {
      return this.$store.getters['loginAccount/loginAccount']
    },
  },
  methods: {
    bindCollapse() {
      this.isCollapse = !this.isCollapse
      this.asideWidth = this.isCollapse ? '200px' : '70px'
      this.componentName = this.isCollapse ? Fold : Expand
    },
    bindExit() {
      localStorage.removeItem('loginAccount')
      this.$router.replace({ path: '/login' })
    },
    bindLogin() {
      this.$router.replace({ path: '/login' })
    },
    bindUser() {
      // this.$router.replace({ path: '/user' })
    },
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
    transition: 0.5s;

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
      justify-content: space-between;
      padding: 10px 20px;
      background-color: rgb(118, 67, 236);
      height: 60px;

      .iconChange {
        cursor: pointer;
      }

      .g-header-r {
        display: flex;
        align-items: center;
        p {
          color: white;
          cursor: pointer;
          margin-right: 20px;
        }
        .el-image{
          width: 45px; 
          height: 45px;
          border-radius: 50%;
        }
      }
    }

    .el-breadcrumb {
      margin: 10px 0;
    }
  }
}
</style>