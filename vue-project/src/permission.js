import router from './router'
/**
 * 全局前置导航守卫 beforeEach
 *    只要路由跳转都会执行
 * to: 即将要进入的目标 
   from: 当前导航正要离开的路由 
   login -> home
    return false 不放行
      业务: 统一登录身份认证
            登录身份认证
              => 没有登录的情况不允许访问需要登录的页面   
            如何实现?
               1. 登录成功，保存成功的登录状态
               2. 在前置导航守卫中判断保存的登录状态是否存在， 
                   如果存在，表示登录成功，放行 return true
                   如果不存在， 更优雅，重定向到登录界面
 */
router.beforeEach((to, from) => {
    // 1. 加入白名单: 有些路由是不需要登录身份认证 path: /login ,  /
    if (to.path === '/login' || to.path==='/frontPage' || to.path==='/IndexF' ||to.path==='/category/shoes' || to.path==='/category/outerWear' || to.path==='/category/cotta' || to.path==='/category/socks' ||to.path==='/category/hat' ||to.path==='/category/downJackets' || to.path==='/category/trousers') {
        return true //放行
    }
    // 2. 登录认证
    let admin = localStorage.getItem('loginAccount')
    if (admin) {
        return true // 放行
    } else {
        // 如果不存在， 更优雅，重定向到登录界面
        ElMessage({
            message: '你没有权限访问!',
            type: 'error',
        })
        router.replace({ path: '/login' })
    }
})
