<template>
    <div id="essay-edit">
        <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center">
            <div>首页 / 随笔撰写</div>
            <div><el-button type="danger" @click="submitEssay(undefined, undefined)">发布随笔</el-button></div>
        </div>
        <div id="essay-info">
            <div class="essay-info-item">
                <div class="essay-info-tips">文章标题</div>
                <el-input v-model="essay.title" placeholder="文章标题" clearable style="margin-bottom: 12px; margin-right: 12px"/>
            </div>
            <div class="essay-info-item">
                <div class="essay-info-tips">文章副标题</div>
                <el-input v-model="essay.describe" placeholder="文章副标题" clearable style="margin-bottom: 12px"/>
            </div>
            <div class="essay-info-item">
                <div class="essay-info-tips">封面图片路径</div>
                <el-input v-model="essay.cover" placeholder="封面图片路径" clearable style="margin-bottom: 12px"/>
            </div>
        </div>
        <div id="essay-editor">
            <div style="border: 1px solid #ccc">
                <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editorRef"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                />
                <Editor
                        style="height: 500px; overflow-y: hidden;"
                        v-model="essay.content"
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
    name: "EssayEdit",
    components: { Editor, Toolbar },
    setup() {
        const essay = ref({
            title: '',
            describe: '',
            borderColor: '',
            cover: '',
            content: '',
            author: 'WhiteLeaf03'
        })

        async function submitEssay() {
            let result
            await axios({
                url: "/api/essay",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(essay.value)
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
        const editorConfig = {
            placeholder: '请输入内容...' ,
            MENU_CONF: {
                'uploadImage': {
                    // 小于该值就插入 base64 格式（而不上传），默认为 0
                    base64LimitSize: 10 * 1024 * 1024 // 10MB
                }
            }
        }
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
            essay,
            submitEssay,
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
#essay-edit {
    display: flex;
    flex-direction: column;
    padding: 24px;
}

#essay-editor {
    min-height: 320px;
}
</style>