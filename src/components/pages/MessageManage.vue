<template>
    <div id="message-manage">
        <el-table :data="messageList" border style="width: 100%">
            <el-table-column prop="nickname" label="用户名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="content" label="留言内容"></el-table-column>
            <el-table-column prop="updateTime" label="留言时间">
                <template #default="scope">
                    {{ tsToDate(scope.row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="留言状态">
                <template #default="scope">
                    <div v-if="scope.row.status === 1" style="color: #67C23A">已过审</div>
                    <div v-else-if="scope.row.status === 0" style="color: #409EFF">待审核</div>
                    <div v-else style="color: #F56C6C">被封禁</div>
                </template>
            </el-table-column>
            <el-table-column label="管理">
                <template #default="scope">
                    <el-button type="success" plain v-if="scope.row.status === 0" @click="auditMessage(scope.row.id, 1)">通过</el-button>
                    <el-button type="danger" plain v-if="scope.row.status === 0" @click="auditMessage(scope.row.id, -1)">封禁</el-button>
                    <el-button type="info" plain disabled v-else>已过审</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="position: relative; margin-top: 24px">
            <el-pagination
                :page-size="10"
                layout="prev, pager, next"
                :total="page.total"
                v-model:current-page="page.index"
                @current-change="handleCurrentPageChange"
                style="position: absolute; right: 0;"
            />
        </div>
    </div>
</template>

<script>
import {tsToDate} from "../../expand/utils.js";
import axios from "axios";
import {createCommentVNode} from "vue";

export default {
    name: "MessageManage",
    data() {
        return {
            page: {
                total: 1,
                index: 1
            },
            messageList: []
        }
    },
    methods: {
        tsToDate,
        async getMessageListTotal() {
            let result
            await axios({
                url: "/api/message/list/page/size",
                method: "GET"
            }).then((res) => {
                result = res.data
            })
            this.page.total = result.data.total / 10 + 1
        },
        async getMessageList() {
            let result
            await axios({
                url: '/api/message/list/page',
                methods: "GET",
                params: {
                    page: this.page.index
                }
            }).then((res) => {
                result = res.data
            })
            this.messageList = result.data
        },
        async handleCurrentPageChange() {
            await this.getMessageList()
        },
        async auditMessage(id, status) {
            let result
            await axios({
                url: "/api/message",
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    id: id,
                    status: status
                })
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                alert("修改成功")
            } else {
                alert("修改失败")
            }
            await this.getMessageList()
        }
    },
    mounted() {
        this.getMessageListTotal()
        this.getMessageList()
    }
}
</script>

<style scoped>
#message-manage {
    margin: 24px;
    position: relative;
    display: flex;
    flex-direction: column;
}
</style>