import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/base.css'
import './permission.js' //登录认证
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(store)
app.mount('#app')

