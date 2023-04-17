import * as VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import Admin from "../components/Admin.vue";
import DataAnalysis from "../components/pages/DataAnalysis.vue";
import BlogManage from "../components/pages/BlogManage.vue";
import BlogEdit from "../components/pages/BlogEdit.vue";
import EssayManage from "../components/pages/EssayManage.vue";
import EssayEdit from "../components/pages/EssayEdit.vue";
import MessageManage from "../components/pages/MessageManage.vue";
import UserManage from "../components/pages/UserManage.vue";
import ClassificationManage from "../components/pages/ClassificationManage.vue";
import TagManage from "../components/pages/TagManage.vue";
import ImageManage from "../components/pages/ImageManage.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/admin',
        component: Admin,
        redirect: '/admin/data',
        children: [
            {
                path: 'data',
                component: DataAnalysis
            },
            {
                path: 'blog',
                children: [
                    {
                        path: 'manage',
                        component: BlogManage
                    },
                    {
                        path: 'edit',
                        component: BlogEdit
                    }
                ]
            },
            {
                path: 'essay',
                children: [
                    {
                        path: 'manage',
                        component: EssayManage
                    },
                    {
                        path: 'edit',
                        component: EssayEdit
                    }
                ]
            },
            {
                path: 'message',
                children: [
                    {
                        path: 'manage',
                        component: MessageManage
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: 'manage',
                        component: UserManage
                    }
                ]
            },
            {
                path: 'classification',
                children: [
                    {
                        path: 'manage',
                        component: ClassificationManage
                    }
                ]
            },
            {
                path: 'tag',
                children: [
                    {
                        path: 'manage',
                        component: TagManage
                    }
                ]
            },
            {
                path: 'image',
                children: [
                    {
                        path: 'manage',
                        component: ImageManage
                    }
                ]
            }
        ]
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})