<template>
    <div id="image-manage">
        <div id="image-manage-upload">
            <el-upload
                    class="upload-demo"
                    drag
                    action="/api/picture/upload"
                    multiple
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽图片到此处或<em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png格式 大小不超过20MB
                    </div>
                </template>
            </el-upload>
        </div>
        <div id="image-manage-list">
            <div style="flex: 1">
                <div class="image-manage-list-waterfall" v-for="(item, index) in this.waterfall[0]">
                    <div class="image-manage-list-waterfall-item"><el-image :src="item.name" fit="contain" @click="openDialog(item)"/></div>
                </div>
            </div>
            <div style="flex: 1">
                <div class="image-manage-list-waterfall" v-for="(item, index) in this.waterfall[1]">
                    <div class="image-manage-list-waterfall-item"><el-image :src="item.name" fit="contain" @click="openDialog(item)"/></div>
                </div>
            </div>
            <div style="flex: 1">
                <div class="image-manage-list-waterfall" v-for="(item, index) in this.waterfall[2]">
                    <div class="image-manage-list-waterfall-item"><el-image :src="item.name" fit="contain" @click="openDialog(item)"/></div>
                </div>
            </div>
            <div style="flex: 1">
                <div class="image-manage-list-waterfall" v-for="(item, index) in this.waterfall[3]">
                    <div class="image-manage-list-waterfall-item"><el-image :src="item.name" fit="contain" @click="openDialog(item)"/></div>
                </div>
            </div>
            <div style="flex: 1">
                <div class="image-manage-list-waterfall" v-for="(item, index) in this.waterfall[4]">
                    <div class="image-manage-list-waterfall-item"><el-image :src="item.name" fit="contain" @click="openDialog(item)"/></div>
                </div>
            </div>
            <el-dialog
                v-model="dialog"
                title="图片详情"
                width="30%"
            >
                <div style="display: flex; flex-direction: column; min-height: 120px">
                    <div style="flex:1 ;display: flex">
                        <div style="flex: 1; margin-left: 24px">文件路径</div>
                        <div style="flex: 3; text-align: left">{{ dialogData.name }}</div>
                    </div>
                    <div style="flex:1 ;display: flex">
                        <div style="flex: 1; margin-left: 24px">上传日期</div>
                        <div style="flex: 3; text-align: left">{{ dialogData.updateTime }}</div>
                    </div>
                </div>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button type="danger" @click="deleteDialog()">删除</el-button>
                    <el-button type="primary" @click="closeDialog()">确定</el-button>
                  </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {UploadFilled} from "@element-plus/icons-vue";
import axios from "axios";
import {tsToDate} from "../../expand/utils.js";
import {ElMessage, ElNotification} from "element-plus";

export default {
    name: "ImageManage",
    components: {UploadFilled},
    data() {
        return {
            waterfall: [
                [],
                [],
                [],
                [],
                []
            ],
            dialog: false,
            dialogData: {}
        }
    },
    methods: {
        async getImageList() {
            let result
            let imageList
            let waterfall = [
                [],
                [],
                [],
                [],
                []
            ]
            await axios({
                url: "/api/picture/list",
                method: "GET",
            }).then((res) => {
                result = res.data
            })
            imageList = result.data
            console.log()
            for (let index in imageList) {
                imageList[index].name = "/images/" + imageList[index].name
                waterfall[index % 5].push(imageList[index])
            }
            this.waterfall = waterfall
        },
        openDialog(item) {
            let dialogData = item
            dialogData.updateTime = tsToDate(dialogData.updateTime)
            this.dialogData = dialogData
            this.dialog = true
        },
        closeDialog() {
            this.dialog = false
        },
        async deleteDialog() {
            let result
            await axios({
                url: "/api/picture",
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    id: this.dialogData.id
                })
            }).then((res) => {
                result = res.data
            })
            if (result.msg === "OK") {
                this.closeDialog()
                await this.getImageList()
            } else {
                alert("删除失败")
            }
        }
    },
    mounted() {
        this.getImageList()
    }
}
</script>

<style scoped>
#image-manage {
    display: flex;
    flex-direction: column;
}

#image-manage-upload {
    margin: 24px auto;
    width: 50%;
}

#image-manage-list {
    max-height: 65vh;
    overflow: auto;
    display: flex;
}

.image-manage-list-waterfall {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.image-manage-list-waterfall-item {
    margin: 24px;
    display: flex;
    justify-content: center;
}
</style>