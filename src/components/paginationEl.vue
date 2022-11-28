<template>
  <el-pagination
    :page-sizes="pageSizes"
    :page-size="pageSizeCurrent"
    :current-page.sync="currentPageNow"
    layout="sizes,total, prev, pager, next"
    :total="pageTotalCurrent"
    @size-change="handleSizeChange"
    @current-change="currentChangeHandle"
  />
</template>

<script>
export default {
  name: 'PaginationEl',
  components: {},
  props: {
    // 页码数组
    pageSizes: {
      default: function() {
        return [10, 30, 50, 70]
      }
    },
    // 页码初始大小
    pageSize: {
      default: 10
    },
    // 页面总数
    pageTotal: {
      default: 1000
    },
    // 当前页码
    currentPage: {
      default: 1
    }
  },
  data() {
    return {
      currentPageNow: this.currentPage,
      pageSizeCurrent: this.pageSize,
      pageTotalCurrent: this.pageTotal
    }
  },
  watch: {
    pageSize: function(val, oldVal) {
      this.pageSizeCurrent = val
    },
    pageTotal: function(val, oldVal) {
      this.pageTotalCurrent = val
    },
    currentPage: function(val, oldVal) {
      this.currentPageNow = val
    }
  },
  created() {},
  mounted() {
    this.pageSizeCurrent = this.pageSize
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    currentChangeHandle(val) {
      this.$emit('current-change', val)
    }
  }
}
</script>

<style scoped>

</style>
