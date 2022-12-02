<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <xj-rent-tree
                        ref="rentTree"
                        :filter-store="true"
                        :highlight-current="true"
                        @nodeClick="treeNodeClickHandle"
                        @nodeAdd="addCategory"
                        @nodeModify="editCategory"
                        @nodeDel="deleteCategory"
                />
            </el-col>
        </el-row>

    </div>
</template>

<script>
  import xjRentTree from '@/components/basicTreeEdit.vue'
  export default {
    name: 'EditTree',
    props: [],
    components: {
      xjRentTree
    },
    data () {
      return {}
    },
    watch: {},
    created () {},
    mounted () {},
    methods: {
      /**
       * 节点击事件
       */
      treeNodeClickHandle(data, node, self) {

      },

      addCategory: function(row) {
        this.$message({
          message: '点击新增',
          type: 'warning'
        })
      },

      editCategory: function(row) {
        this.$message({
          message: '点击修改',
          type: 'warning'
        })
      },

      deleteCategory: function(row) {
        this.$message({
          message: '点击删除',
          type: 'warning'
        })
      },
    },
  }
</script>

<style scoped>

</style>
