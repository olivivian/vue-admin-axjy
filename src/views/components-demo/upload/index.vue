<template>
   <div style="margin: 30px 30px">
       <h2>图片上传</h2>
       <xy-avatar-up-load
               :image-url-prop="imageUrl"
               @avatarSuccess="getAvatarImg"
       />

       <h2>上传多图，拖拽排序</h2>
       <image-drag
               :show-sort="showSort"
               :list="file_list"
               :multiple="true"
               :action="uploadUrl"
               :headers="headers"
               :on-error="uploadError"
               :on-success="bannerPicSuccess"
               :before-upload="beforeAvatarUpload"
               @update="updateFile"
       />
   </div>
</template>

<script>
import xyAvatarUpLoad from '../../../components/AvatarUpLoad'
import ImageDrag from '../../../components/ComImageDrag'
import { Loading } from 'element-ui'
import { uploadUrl, headers } from '@/utils/common'
export default {
  name: 'Upload',
  components: {
    xyAvatarUpLoad,
    ImageDrag
  },
  data() {
    return {
      //单图
      imageUrl:'',//https://www.baidu.com/img/flexible/logo/pc/index.png,

      //多图 拖拽
      showSort:true,//是否显示开启排序
      file_list: [ // 图片列表
        'https://www.baidu.com/img/flexible/logo/pc/index.png',
        'https://www.baidu.com/img/flexible/logo/pc/index.png'
      ],
    }
  },
  methods: {
    /********单图********/
    //获取上传的图片地址
    getAvatarImg(url) {
      this.imageUrl = url
    },

    /********多图 拖拽********/
    // 上传图片路径
    uploadUrl,
    //上传图片 Authorization
    headers,
    // 图片长传-之前
    beforeAvatarUpload(file) {
      // 文件大小验证
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.info('上传文件不能超过 1MB!')
      }
      return isLt1M
    },
    // 图-成功
    bannerPicSuccess(res) {
      if (res.code !== 'error') {
        Loading.service({ fullscreen: true }).close()
        this.file_list.push(res.data[0].filePath)
        this.$emit('upLoadImgResult', this.file_list)
      } else {
        this.$message.error(res.msg || '上传失败')
      }
    },
    // 图片上传报错
    uploadError() {
      this.$message.error('上传失败，请重新上传')
      Loading.service({ fullscreen: true }).close()
    },
    updateFile(val) {
      this.file_list = val
      this.$emit('upLoadImgResult', this.file_list)
    }
  }
}
</script>

<style scoped>

</style>
