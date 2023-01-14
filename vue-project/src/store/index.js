import { createStore } from 'vuex'
import loginAccount from "./modules/loginAccount"
import createPersistedState from 'vuex-persistedstate'
// 创建store对象
const store = createStore({
    modules: {
        loginAccount
    },
    // 集成插件
    plugins:[createPersistedState({
        storage:sessionStorage,
        key:'storekey'
    })]
})

export default store
