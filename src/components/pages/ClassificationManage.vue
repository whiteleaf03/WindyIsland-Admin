<template>
    <div id="classification-manage">
        <div style="display: flex; justify-content: center; margin: 24px">
            <el-button type="primary" style="margin: 0 auto" @click="openDialog()">新增分类</el-button>
        </div>
        <el-dialog
            v-model="dialog"
            title="新增分类"
            width="30%"
        >
            <el-input v-model="name" placeholder="分类名"/>
            <div style="width: 100%; height: 32px"></div>
            <el-input v-model="cover" placeholder="封面图"/>
            <template #footer>
                  <span class="dialog-footer">
                    <el-button type="primary" @click="uploadClassification()">确定</el-button>
                  </span>
            </template>
        </el-dialog>
        <div id="classification-list">
            <el-table :data="classificationList" border style="width: 100%">
                <el-table-column type="index" label="序号" width="50" />
                <el-table-column prop="cover" label="封面图" width="120" >
                    <template #default="scope">
                        <div style="width: 100%; height: 100%; display: flex">
                            <el-image :src="scope.row.cover" fit="contain" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="分类名" />
                <el-table-column prop="total" label="总数" />
                <el-table-column prop="total" label="编辑" >
                    <template #default="scope">
                        <el-button :icon="EditPen" type="primary" >编辑</el-button>
                        <el-button :icon="Delete" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {Delete, EditPen} from "@element-plus/icons-vue";
import axios from "axios";

export default {
    name: "ClassificationManage",
    computed: {
        Delete() {
            return Delete
        },
        EditPen() {
            return EditPen
        }
    },
    components: {Delete},
    data() {
        return {
            height: '',
            classificationList: [],
            dialog: false,
            name: '',
            cover: ''
        }
    },
    methods: {
        setHeight() {
            this.height = `height: calc(100vh - ${document.getElementById('content-header').clientHeight + 12}px - 48px)`
        },
        async getClassificationInfo() {
            let result
            await axios({
                url: '/api/classification/info',
                method: "GET"
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                this.classificationList = result.data
            }
        },
        openDialog() {
            this.dialog = true
        },
        closeDialog() {
            this.dialog = false
        },
        async uploadClassification() {
            let result
            await axios({
                url: "/api/classification",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    name: this.name,
                    cover: this.cover
                })
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                this.closeDialog()
                this.name = ''
                this.cover = ''
                await this.getClassificationInfo()
            } else {
                alert('添加失败')
            }
        },
        async deleteClassification(id) {
            let result
            await axios({
                url: "/api/classification",
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    id: id
                })
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                await this.getClassificationInfo()
            } else {
                alert("删除分类失败")
            }
        },
    },
    mounted() {
        this.setHeight()
        this.getClassificationInfo()
    }
}
</script>

<style scoped>
#classification-manage {
    background-color: white;
    margin: 24px;
}

#classification-list {
    margin: 24px;
}
</style>