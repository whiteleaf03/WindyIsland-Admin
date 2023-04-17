<template>
    <div id="admin">
        <div id="menu">
            <el-menu style="height: 100%" background-color="#333744" text-color="#FFFFFF" active-text-color="#00C8FF" router="true" default-active="data">
                <el-menu-item index="/admin/data"><el-icon><House /></el-icon>后台首页</el-menu-item>
                <el-menu-item index="/admin/blog/manage"><el-icon><Notebook /></el-icon>博客管理</el-menu-item>
                <el-menu-item index="/admin/blog/edit"><el-icon><EditPen /></el-icon>撰写博客</el-menu-item>
                <el-menu-item index="/admin/essay/manage"><el-icon><Memo /></el-icon>随笔管理</el-menu-item>
                <el-menu-item index="/admin/essay/edit"><el-icon><EditPen /></el-icon>撰写随笔</el-menu-item>
                <el-menu-item index="/admin/message/manage"><el-icon><ChatLineSquare /></el-icon>留言管理</el-menu-item>
                <el-menu-item index="/admin/user/manage"><el-icon><User /></el-icon>用户管理</el-menu-item>
                <el-menu-item index="/admin/classification/manage"><el-icon><Filter /></el-icon>分类管理</el-menu-item>
                <el-menu-item index="/admin/tag/manage"><el-icon><PriceTag /></el-icon>标签管理</el-menu-item>
                <el-menu-item index="/admin/image/manage"><el-icon><Picture /></el-icon>图片管理</el-menu-item>
            </el-menu>
        </div>
        <div id="content">
            <header id="content-header">
                <div style="flex: 1"></div>
                <div style="flex: 1">博客后台管理系统</div>
                <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end"><img src="/images/avatar.jpg" alt="" id="avatar"></div>
            </header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {ChatLineSquare, EditPen, Filter, House, Memo, Notebook, Picture, PriceTag, User} from "@element-plus/icons-vue";

export default {
    name: "Admin",
    components: {ChatLineSquare, EditPen, Filter, House, Memo, Notebook, Picture, PriceTag, User},
    data() {
        return {

        }
    },
    methods: {
        setAvatarSize() {
            let avatarSize = document.getElementById('content-header').clientHeight
            document.getElementById('avatar').style.height = `${avatarSize * 0.8}px`
        }
    },
    mounted() {
        this.setAvatarSize()
    }
}
</script>

<style scoped>
#admin {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #f0f2f5;
}

#menu {
    flex: 1;
}

#content {
    flex: 7;
    display: flex;
    flex-direction: column;
    position: relative;
}

header {
    font-family: 思源黑体-Normal, fangsong;
    font-weight: bolder;
    font-size: x-large;
    color: black;
    text-align: center;
    background-color: white;
    padding: 6px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#avatar {
    margin-right: 32px;
    border-radius: 25px;
}
</style>