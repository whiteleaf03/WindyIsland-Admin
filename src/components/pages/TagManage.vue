<template>
    <div id="tag-manage" :style="height">
        <div style="display: flex; justify-content: center; margin: 24px"><el-button type="primary" style="margin: 0 auto" @click="openDialog()">新增标签</el-button></div>
        <el-dialog
            v-model="dialog"
            title="新增标签"
            width="30%"
        >
            <el-input v-model="name" placeholder="标签名" />
            <template #footer>
                  <span class="dialog-footer">
                    <el-button type="primary" @click="uploadTag()">确定</el-button>
                  </span>
            </template>
        </el-dialog>
        <div style="display: flex;">
            <div class="tag-manage-list" v-for="(item, index) in this.waterfall">
                <div class="tag-manage-list-item" v-for="item in this.waterfall[index]">
                    <div style="margin-bottom: 12px; display: flex; position: relative">
                        <div style="margin-right: 12px;">标签名称</div>
                        <div style="color: dodgerblue">{{ item.name }}</div>
                        <div style="position: absolute; right: 0"><el-icon color="#FF0000"><Delete @click="deleteTag(item.id)"/></el-icon></div>
                    </div>
                    <div style="display: flex">
                        <div style="margin-right: 12px;">博客数量</div>
                        <div style="color: #15b715">{{ item.total }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Delete} from "@element-plus/icons-vue";
import axios from "axios";

export default {
    name: "TagManage",
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
            console.log(`height: calc(100vh - ${document.getElementById('content-header').clientHeight + 12}px - 48px)`)
            this.height = `height: calc(100vh - ${document.getElementById('content-header').clientHeight + 12}px - 48px)`
        },
        async getTagInfo() {
            let result
            await axios({
                url: '/api/tag/info',
                method: "GET"
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                let tagList = result.data
                let waterfall = [[], [], [], []]
                for (let index in tagList) {
                    waterfall[index % 4].push(tagList[index])
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
        async uploadTag() {
            let result
            await axios({
                url: "/api/tag",
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
                await this.getTagInfo()
            } else {
                alert('添加失败')
            }
        },
        async deleteTag(id) {
            let result
            await axios({
                url: "/api/tag",
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
                await this.getTagInfo()
            } else {
                alert("删除标签失败")
            }
        },
    },
    mounted() {
        this.setHeight()
        this.getTagInfo()
    }
}
</script>

<style scoped>
#tag-manage {
    display: flex;
    flex-direction: column;
    margin: 24px;
    background-color: white;
}

.tag-manage-list {
    width: 25%;
    display: flex;
    flex-direction: column;
}

.tag-manage-list-item {
    border: 1px solid gray;
    padding: 12px;
    margin: 24px;
    font-family: Tanugo糖果手写体, fangsong;
    font-size: larger;
    font-weight: bolder;
}
</style>