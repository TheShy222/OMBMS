import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
    },
    //首页
    {
      path: '/home',
      component: Home,
      redirect: '/index', // 重定向到index路由
      children: [
        {
          path: '/index',
          component: Index,
          meta: { hidden: false },
        },
      ],
    },
    //人员管理模块
    {
      path: '/person',
      meta: { title: '人员管理' },
      component: Home,
      children: [
        {
          path: '/person/user',
          component: () => import('@/views/Person/User.vue'),
          meta: { hidden: true, title: '用户列表' },
        },
        {
          path: '/person/customer',
          component: () => import('@/views/Person/Customer.vue'),
          meta: { hidden: true, title: '客服列表' },
        },
        {
          path: '/person/admin',
          component: () => import('@/views/Person/Admin.vue'),
          meta: { hidden: true, title: '管理员列表' },
        },
        {
          path: '/person/supplier',
          component: () => import('@/views/Person/Supplier.vue'),
          meta: { hidden: true, title: '供应商列表' },
        },
      ],
    },
     //商品管理模块
     {
      path: '/product',
      meta: { title: '商品管理' },
      component: Home,
      children: [
        {
          path: '/product/goodsinfo',
          component: () => import('@/views/Product/GoodsInfo.vue'),
          meta: { hidden: true, title: '商品列表' },
        },
        {
          path: '/product/goodsCategory',
          component: () => import('@/views/Product/GoodsInfo.vue'),
          meta: { hidden: true, title: '商品分类' },
        },
      ],
     },
     //订单模块
    {
      path: '/order',
      meta: { title: '订单管理' },
      component: Home,
      children: [
        {
          path: '/oreder/issueOrder',
          component: () => import('@/views/Order/IssueOrder.vue'),
          meta: { hidden: true, title: '出库订单' },
        },
        {
          path: '/oreder/receiptOrder',
          component: () => import('@/views/Order/ReceiptOrder.vue'),
          meta: { hidden: true, title: '入库订单' },
        },
        {
          path: '/order/afterSalesOrder',
          component: () => import('@/views/Order/AfterSalesOrder.vue'),
          meta: { hidden: true, title: '售后订单' },
        },
      ],
    },
    //前台管理模块
    {
      path: '/reception',
      meta: { title: '前台管理' },
      component: Home,
      children: [
        {
          path: '/reception/notice',
          component: () => import('@/views/Reception/Notice.vue'),
          meta: { hidden: true, title: '公告管理' },
        },
        {
          path: '/reception/advert',
          component: () => import('@/views/Reception/Advert.vue'),
          meta: { hidden: true, title: '轮播广告管理' },
        },
        {
          path: '/reception/delivery',
          component: () => import('@/views/Reception/Delivery.vue'),
          meta: { hidden: true, title: '配送方式管理' },
        },
        {
          path: '/reception/comment',
          component: () => import('@/views/Reception/Comment.vue'),
          meta: { hidden: true, title: '评论管理' },
        },
      ],
    },
     // 404路由不存在匹配，放在路由最下面
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotPage.vue')
    }
  ]
})

export default router
