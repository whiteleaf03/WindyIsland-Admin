<template>
    <div id="blog-edit">
        <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center">
            <div>首页 / 博客撰写</div>
            <div><el-button type="danger" @click="submitArticle(undefined, undefined)">发布博客</el-button></div>
        </div>
        <div id="blog-info">
            <div style="display: flex">
                <div class="blog-info-item" style="margin-right: 24px;">
                    <div class="blog-info-tips">文章标题</div>
                    <el-input v-model="article.title" placeholder="*必填" clearable style="margin-bottom: 12px; margin-right: 12px"/>
                </div>
                <div class="blog-info-item">
                    <div class="blog-info-tips">文章副标题</div>
                    <el-input v-model="article.describe" placeholder="*必填" clearable style="margin-bottom: 12px"/>
                </div>
            </div>
            <div style="display: flex">
                <div class="blog-info-item" style="margin-right: 24px;">
                    <div class="blog-info-tips">边框颜色</div>
                    <el-input v-model="article.borderColor" placeholder="*必填" clearable style="margin-bottom: 12px; margin-right: 12px"/>
                </div>
                <div class="blog-info-item">
                    <div class="blog-info-tips">封面图片路径</div>
                    <el-input v-model="article.cover" placeholder="*必填" clearable style="margin-bottom: 12px"/>
                </div>
            </div>
        </div>
        <div id="blog-editor">
            <div style="border: 1px solid #ccc">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="article.content"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                />
            </div>
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";

export default {
    name: "BlogEdit",
    components: { Editor, Toolbar },
    setup() {
        const article = ref({
            title: '',
            describe: '',
            borderColor: '',
            cover: '',
            content: '',
            author: 'WhiteLeaf03'
        })

        async function submitArticle() {
            let result
            await axios({
                url: "/api/article",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(article.value)
            }).then((res) => {
                result = res.data
            })
            if (result.msg === "OK") {
                alert("发布成功")
            } else {
                alert("发布失败")
            }
        }

        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()
        // 内容 HTML
        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }
        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })
        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }

        return {
            article,
            submitArticle,
            editorRef,
            mode: 'default',
            toolbarConfig,
            editorConfig,
            handleCreated
        };
    }
}
</script>

<style scoped>
#blog-edit {
    display: flex;
    flex-direction: column;
    padding: 24px;
}

#blog-info {
    display: flex;
    flex-direction: column;
}

.blog-info-item {
    width: 50%;
}

.blog-info-tips {
    margin: 1px 11px;
}

#blog-editor {
    min-height: 320px;
}
</style>