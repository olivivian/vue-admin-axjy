<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="120px">
    <el-form-item v-if="disableStatus" label="品牌ID" prop="id">
      <el-input v-model.trim="form.id" :disabled="disableStatus" />
    </el-form-item>
    <el-form-item label="品牌名称" prop="name">
      <el-input v-model.trim="form.name" />
    </el-form-item>

    <el-form-item>
      <div class="toolbar">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button :disabled="disableStatus" @click="resetForm">重置</el-button>
      </div>
    </el-form-item>

  </el-form>
</template>

<script>

import { TableOperHandle,TableDetailQuery } from '@/api/table'
export default {
  name: 'XjForm',
  components: {
  },
  props: {
    method: { // 如果添加，就用post，修改就用put
      required: true,
      type: String
    }
  },
  data() {
    return {
      disabled: false,
      form: {
        id: undefined,
        name: undefined,
        imageUrl: undefined,
        appId: undefined,
        active_url: undefined,
        xuanxiCode: undefined,
        type: undefined,
        sourceFrom: 1,
        hasCheck: false,
        sort: undefined,
        code: 0,
        remark: undefined
      },


      // 规则
      rules: {
      /*  id: [
          { validator: this.pattern.isAlphaNumber, trigger: 'change' },
          { required: true, message: '请输入品牌ID', trigger: 'blur' }
        ],*/
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 1, max: 32, message: '长度在 2 到 32 个字符', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '请输入品牌LOGO', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择品牌类型', trigger: 'change' }
        ],
        code: [
          { validator: this.pattern.isAlphaNumber, trigger: 'change' },
          { required: true, message: '请输入关联ID', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    disableStatus: function() {
      // 如果是【修改操作】则返回 true，表示不能修改
      return this.method === 'put'
    }
  },
  watch: {},
  created() {},
  mounted() {

  },
  methods: {
    /* 初始化数据*/
    loadData: function(id) {

      TableDetailQuery(id).then(res => {
        this.$COMMON.requestError({
          _this: this,
          showSuccessMsg: false,
          res: res
        }).then(() => {
          this.form = res.data
        })
      })
    },
    /* 提交*/
    onSubmit: function() {
      // 参数验证
      let verify = false
      this.$refs.form.validate((valid) => {
        verify = valid
      })
      if (!verify) {
        return
      }

      // 判断新增、更新
      let cmd = 'ADD'
      if (this.method === 'put') { cmd = 'UPDATE' }

      const params = {
        cmd: cmd,
        ...this.form
      }
      TableOperHandle(params).then(res => {
        this.$emit('submitSuccess', res, this.method) // 添加成功
      })
    },
    /* 表单重置*/
    resetForm() {
      this.$refs.form.resetFields()
      // this.$refs.form.clearValidate();
    },
  }
}
</script>

<style scoped>
  .brand-scroll-box{
    max-height: 300px;
    overflow: auto;
    padding-right: 25px;
  }
</style>
