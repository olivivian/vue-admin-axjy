<template>
  <div class="components-container">
    <aside>
      <div>1、没有安装，直接下载tinymce.min.js放到public文件夹下，在Tinymce/index里面引用</div>
      <div>2、在Tinymce/index里面修改批量上传图片的地址</div>
      <a target="_blank" class="link-type"
         href="https://github.com/tinymce/tinymce">tinymce文档</a>
    </aside>

    <div>
      <xj-tinymce
              v-model="content" :toolbar="['bold italic blockquote image preview fullscreen']"
              :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import xjTinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { xjTinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">富文本示例!</h1>
<p style="text-align: center; font-size: 15px;">
<ul>
<li>toolbar工具的展示可以自己配置</li>
</ul>`
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

