<template>
  <div class="bar-wrap">
    <el-form
      ref="filterForm"
      :inline="true"
      :model="filterForm"
      label-width="80px"
    >

      <el-form-item prop="name">
        <el-input
          v-model.trim="filterForm.name"
          placeholder="请输入品牌名称"
          class="handle-input mr10"
          @keyup.enter.native="searchSubmit"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="search" @click="searchSubmit">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'XjTableToolbar',
  components: {},
  props: [],
  data() {
    return {
      filterForm: {
        name: undefined,
        type: undefined,
        id: undefined
      }
    }
  },
  watch: {},
  created() {},
  mounted() {

  },
  methods: {
    /**
       * 查询
       */
    searchSubmit: function() {
      this.$emit('searchSubmit', this.filterForm)
    },
    /**
       * 重置
       */
    resetForm: function() {
      this.$refs.filterForm.resetFields()
      this.searchSubmit()
    }
  }
}
</script>

<style scoped>

</style>
