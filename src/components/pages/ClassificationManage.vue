<template>
    <div style="display: flex; justify-content: center; margin: 24px">
        <el-button type="primary" style="margin: 0 auto" @click="openDialog()">新增分类</el-button>
    </div>
    <el-dialog
            v-model="dialog"
            title="新增分类"
            width="30%"
    >
        <el-input v-model="name" placeholder="分类名"/>
        <template #footer>
                  <span class="dialog-footer">
                    <el-button type="primary" @click="uploadClassification()">确定</el-button>
                  </span>
        </template>
    </el-dialog>
    <div style="display: flex;">
        <div class="classification-manage-list" v-for="(item, index) in this.waterfall">
            <div class="classification-manage-list-item" v-for="item in this.waterfall[index]">
                <div style="margin-bottom: 12px; display: flex; position: relative">
                    <div style="margin-right: 12px;">分类名称</div>
                    <div style="color: dodgerblue">{{ item.name }}</div>
                    <div style="position: absolute; right: 0">
                        <el-icon color="#FF0000">
                            <Delete @click="deleteClassification(item.id)"/>
                        </el-icon>
                    </div>
                </div>
                <div style="display: flex">
                    <div style="margin-right: 12px;">博客数量</div>
                    <div style="color: #15b715">{{ item.total }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Delete} from "@element-plus/icons-vue";
import axios from "axios";

export default {
    name: "ClassificationManage",
    components: {Delete},
    data() {
        return {
            height: '',
            waterfall: [
                [],
                [],
                [],
                []
            ],
            dialog: false,
            name: ''
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
                let classificationList = result.data
                let waterfall = [[], [], [], []]
                for (let index in classificationList) {
                    waterfall[index % 4].push(classificationList[index])
                }
                this.waterfall = waterfall
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
                    name: this.name
                })
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                this.closeDialog()
                this.name = ''
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
    display: flex;
    flex-direction: column;
    margin: 24px;
    background-color: white;
}

.classification-manage-list {
    width: 25%;
    display: flex;
    flex-direction: column;
}

.classification-manage-list-item {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 12px;
    margin: 24px;
    font-family: Tanugo糖果手写体, fangsong;
    font-size: larger;
    font-weight: bolder;
    background-color: white;
}
</style>