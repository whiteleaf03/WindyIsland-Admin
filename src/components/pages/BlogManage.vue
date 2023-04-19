<template>
    <div id="blog-manage" :style="contentHeight">
        <div id="blog-manage-table" :style="tableHeight">
            <el-table :data="articleList" style="width: 100%; height: 100%;" border stripe>
                <el-table-column type="expand" width="64px">
                    <template #default="scope">
                        <div class="blog-manage-table-info" style="display: flex;">
                            <div class="blog-manage-table-info-item">
                                <div style="margin-bottom: 12px; font-size: x-large; display: flex; align-items: center">封面图<el-icon size="x-large" color="#E6A23C" style="margin-left: 6px" @click="openDialog({type: '封面图修改', id: scope.row.id})"><Edit /></el-icon></div>
                                <el-image style="width: 100%;" :src="scope.row.cover" fit="contain" lazy/>
                            </div>
                            <div class="blog-manage-table-info-item" style="margin-left: 28px; display: block">
                                <div style="margin-bottom: 12px; font-size: x-large; text-align: center; display: flex; align-items: center">简介<el-icon size="x-large" color="#E6A23C" style="margin-left: 6px" @click="openDialog({type: '简介修改', id: scope.row.id})"><Edit /></el-icon></div>
                                <div style="font-size: large" v-html="scope.row.describe"></div>
                            </div>
                            <div class="blog-manage-table-info-item" style="margin-left: 28px; display: block">
                                <div style="margin-bottom: 12px; font-size: x-large; text-align: center; display: flex; align-items: center">详细信息</div>
                                <div style="font-size: large; display: flex; flex-direction: column; height: 100%">
                                    <div style="flex: 1">创建时间: {{ tsToDate(scope.row.createTime) }}</div>
                                    <div style="flex: 1; display: flex; align-items: flex-start">边框颜色:&nbsp;<div :style="'display: inline-block; width: 24px; height: 24px; background-color:' + scope.row.borderColor"></div><el-icon size="x-large" color="#E6A23C" style="margin-left: 6px" @click="openDialog({type: '边框颜色修改', id: scope.row.id})"><Edit /></el-icon></div>
                                    <div style="flex: 1; color: #67c23a; display: flex; align-items: flex-start" v-if="!scope.row.isDelete">状态: 未删除<el-icon size="x-large" color="#E6A23C" style="margin-left: 6px" @click=""><Delete /></el-icon></div>
                                    <div style="flex: 1; color: #f56c6c;" v-else>状态: 已删除</div>
                                    <div style="flex: 1">访问量: {{ scope.row.view }}</div>
                                    <div style="flex: 1">评论数: {{ scope.row.comment }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="标题" prop="title">
                    <template #default="scope"><div style="display: flex; justify-content: space-between; align-items: center">{{ scope.row.title }}<el-icon size="x-large" color="#E6A23C" @click="openDialog({type: '标题修改', id: scope.row.id})"><Edit /></el-icon></div></template>
                </el-table-column>
                <el-table-column label="作者" prop="title">
                    <template #default="scope"><div style="display: flex; justify-content: space-between; align-items: center">{{ scope.row.author }}</div></template>
                </el-table-column>
                <el-table-column label="分类" prop="classification">
                    <template #default="scope"><div style="display: flex; justify-content: space-between; align-items: center">{{ scope.row.classification }}<el-icon size="x-large" color="#E6A23C" @click="openDialog({type: '分类修改', id: scope.row.id})"><Edit /></el-icon></div></template>
                </el-table-column>
                <el-table-column label="标签" prop="tags"><template #default="scope">
                    <div style="display: flex; justify-content: space-between;">
                        <div><el-tag
                            v-for="tag in scope.row.tags"
                            class="blog-manage-table-tag"
                            size="large"
                        >
                            {{ tag }}
                        </el-tag></div>
                        <div style="display: flex; align-items: center"><el-icon size="x-large" color="#E6A23C" @click="openDialog({type: '标签修改', id: scope.row.id})"><Edit /></el-icon></div>
                    </div>
                </template></el-table-column>
                <el-table-column label="更新时间"><template #default="scope">{{ tsToDate(scope.row.updateTime) }}</template></el-table-column>
            </el-table>
            <el-dialog
                v-model="dialog"
                title="信息修改"
                width="30%"
            >
                <div style="font-size: x-large; margin-bottom: 24px">{{ dialogItem.type }}</div>
                <div v-if="dialogItem.type === '标题修改'"><el-input v-model="dialogData.title" placeholder="标题" /></div>
                <div v-if="dialogItem.type === '分类修改'">
                    <el-select v-model="dialogData.classificationId" class="m-2" placeholder="Select" size="large">
                        <el-option
                            v-for="item in classificationList"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>
                <div v-if="dialogItem.type === '标签修改'">
                    <el-checkbox-group v-model="dialogData.tagIds">
                        <el-checkbox v-for="item in tagList" :label="item.id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div v-if="dialogItem.type === '封面图修改'"><el-input v-model="dialogData.cover" placeholder="封面图路径" /></div>
                <div v-if="dialogItem.type === '简介修改'"><el-input v-model="dialogData.describe" placeholder="简介" /></div>
                <div v-if="dialogItem.type === '边框颜色修改'">
                    <el-color-picker v-model="dialogData.borderColor"/>
                </div>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="submitEdit">
                      确认
                    </el-button>
                  </span>
                </template>
            </el-dialog>
        </div>
        <div id="blog-manage-pagination">'
            <el-pagination
                :page-size="10"
                layout="prev, pager, next"
                :total="page.total"
                v-model:current-page="page.index"
                @current-change="handleCurrentPageChange"
            />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {prop} from "dom7";
import {tsToDate} from "../../expand/utils.js";
import {Delete, Edit} from "@element-plus/icons-vue";

export default {
    name: "BlogManage",
    components: {Delete, Edit},
    data() {
        return {
            contentHeight: '',
            tableHeight: '',
            articleList: [],
            page: {
                index: 1,
                total: 100
            },
            dialog: false,
            dialogItem: null,
            dialogData: {
                id: null,
                title: null,
                classificationId: null,
                tagIds: [],
                cover: null,
                describe: null,
                borderColor: null
            },
            classificationList: [],
            tagList: []
        }
    },
    methods: {
        tsToDate,
        prop,
        setHeight() {
            let contentHeaderHeight = document.getElementById('content-header').clientHeight + 12
            let paginationHeight = document.getElementById('blog-manage-pagination').clientHeight
            this.contentHeight = `height: calc(100vh - ${contentHeaderHeight}px - 48px)`
            this.tableHeight = `height: calc(100vh - ${contentHeaderHeight}px - 48px - ${paginationHeight}px)`
        },
        async getArticleListPagingTotal() {
            let result
            await axios({
                url: '/api/article/list/page/size',
                method: "GET"
            }).then((res) => {
                result = res.data
            })
            this.page.total = result.data.total
        },
        async getArticleListInPaging() {
            let result
            await axios({
                url: '/api/article/list/page',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    page: this.page.index
                }
            }).then((res) => {
                result = res.data
            })
            this.articleList = result.data
        },
        async handleCurrentPageChange() {
            await this.getArticleListInPaging()
        },
        async getClassificationList() {
            let result
            await axios({
                url: '/api/classification/list',
                method: "GET"
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                this.classificationList = result.data
            }
        },
        async getTagList() {
            let result
            await axios({
                url: '/api/tag/list',
                method: "GET"
            }).then((res) => {
                result = res.data
            })
            if (result.msg === 'OK') {
                this.tagList = result.data
            }
        },
        async openDialog(item) {
            this.dialogData = {
                id: null,
                title: null,
                classificationId: null,
                tagIds: [],
                cover: null,
                describe: null,
                borderColor: null
            }
            if (item.type === '分类修改') {
                await this.getClassificationList()
            }
            if (item.type === '标签修改') {
                await this.getTagList()
            }
            this.dialogData.id = item.id
            this.dialogItem = item
            this.dialog = true
        },
        closeDialog() {
            this.dialogData = {
                id: null,
                title: null,
                classificationId: null,
                tagIds: null,
                cover: null,
                describe: null,
                borderColor: null
            }
            this.dialog = false
        },
        async submitEdit() {
            let result
            await axios({
                url: '/api/article',
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(this.dialogData)
            }).then((res) => {
                result = res.data
            })
            if (result.msg === "OK") {
                await this.getArticleListPagingTotal()
                await this.getArticleListInPaging()
                this.closeDialog()
            } else {
                alert("修改失败")
            }
        }
    },
    mounted() {
        this.setHeight()
        this.getArticleListPagingTotal()
        this.getArticleListInPaging()
    }
}
</script>

<style scoped>
#blog-manage {
    margin: 24px;
    position: relative;
}

#blog-manage-table {

}

.blog-manage-table-info {
    padding: 12px 64px;
}

.blog-manage-table-info-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(128, 128, 128, 0.2);
    border-radius: 5px;
    padding: 32px;
    flex: 1;
}

.blog-manage-table-tag {
    margin-right: 6px;
}

#blog-manage-pagination {
    position: absolute;
    right: 0;
}
</style>