<template>

  <el-upload
    class="avatar-uploader"
    name="files"
    :action="uploadUrl()"
    :headers="headers()"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="uploadStyle">
    <i v-else class="el-icon-plus avatar-uploader-icon" :style="uploadStyle" />
  </el-upload>
</template>

<script>
/**
 * @desc  饿了么图片上传封装
 * @param {String} imageUrlProp 上传成功返回的图片链接
 * @param {String} uploadStyle 上传框的样式自定义
 */
import { uploadUrl, headers } from '@/utils/common'
export default {
  props: {
    imageUrlProp: {
      type: String
    },
    uploadStyle: {
      type: String
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  watch: {
    imageUrlProp(val, old) {
      this.imageUrl = val
    }
  },
  methods: {
    uploadUrl,
    headers,
    handleAvatarSuccess(res, file) {
      if (res.code !== 'error') {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.$emit('avatarSuccess', res.data[0].filePath)
      } else {
        this.$message.error(res.msg || '上传失败')
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
