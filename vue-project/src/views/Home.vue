<template>
  <el-container>
    <!-- 左侧区域 -->
    <el-aside :width="asideWidth">
      <div class="g-title">
        <el-image :src="url"></el-image>
        <h3 v-show="isCollapse">商城后台</h3>
      </div>
      <Menu :isCollapse="isCollapse"></Menu>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <el-icon @click="bindCollapse" class="iconChange">
          <component :is="componentName"></component>
        </el-icon>

        <div>
          <el-dropdown>
            <div class="g-header-r">
              <p>欢迎{{admin[0].job}}：{{ admin[0].name }}</p>
              <el-image :src="job"></el-image>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="bindUser"><el-icon>
                    <User />
                  </el-icon>个人中心</el-dropdown-item>
                <el-dropdown-item @click="bindChange">
                  <el-icon><Lock /></el-icon>修改密码</el-dropdown-item>
                <el-dropdown-item @click="bindExit">
                  <el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item>
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
import { Fold, Expand} from '@element-plus/icons-vue'
export default {
  components: {
    BreadCrumb,
    Menu,
    Expand,
    Fold
  },
  data() {
    return {
      url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
      isCollapse: true,
      asideWidth: '200px',
      componentName: Fold,
      job:''
    }
  },
  mounted () {
    this.job=this.admin[0].headimg
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
    bindChange() {
      this.$router.replace({ path: '/change' })
    },
    bindUser() {
      this.$router.push({ path: '/person/personal'})
    },
  },
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100vh;

  .el-aside {
    background-color:#262424;
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
      justify-content: space-between;
      padding: 10px 20px;
      background-color:#262424;
      height: 60px;

      .iconChange {
        cursor: pointer;
        font-size: 28px;
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