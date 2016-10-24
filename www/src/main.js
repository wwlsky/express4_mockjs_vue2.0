import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

// 注册插件
Vue.use(VueRouter)
Vue.use(VueResource)

import Home from './views/Home.vue'
import Login from './views/Login.vue'

// 配置路由
const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login }
    ]
})

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
