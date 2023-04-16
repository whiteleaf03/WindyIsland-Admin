import * as VueRouter from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})