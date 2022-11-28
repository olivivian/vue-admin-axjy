<template>

  <div class="page-container">
    <!--tool-bar-->
    <div class="handle-box">
      <el-button icon="el-icon-plus" type="primary" @click="addTableRow">添加</el-button>
    </div>

    <!--custom-bar-->
    <xj-table-toolbar @searchSubmit="searchSubmit" />

    <!--table-->
    <xj-table
      ref="xjTable"
      @selectionChange="TableSelectionChange"
      @onEdit="editbrand"
      @onDetail="detailbrand"
      @rowClick="rowClickHandle"
      @onDelete="deletebrand"
      @statusChangeChange="statusChangeChange"
    />

    <!--新增编辑dialog-->
    <el-dialog width="550px" :title="formTitle" :visible.sync="formDialogVisible">
      <xy-form
        ref="brandForm"
        :method="formMethod"
        @submitSuccess="brandFormSubmitSuccess"
      />
    </el-dialog>

    <!--详情dialog-->
    <el-dialog width="550px" title="详情" :visible.sync="formDetailDialogVisible">
      <xy-detail
        ref="brandDetail"
      />
    </el-dialog>

  </div>

</template>

<script>

import { brandManageOper, brandHyperChain } from '@/api/table'

export default {
  name: 'BasicPage',
  components: {
    xjTableToolbar: () => import('./TableToolbar.vue'),
    xjTable: () => import('./Table.vue'),
    xyForm: () => import('./Form.vue'),
    xjDetail: () => import('./Detail.vue')
  },
  props: [],
  data() {
    return {
      formMethod: 'post',
      selectRows: [], // 选中行
      formDialogVisible: false,
      formDetailDialogVisible: false,
      filter: { // 表格过滤
        brandName: undefined,
        aliasName: undefined,
        brandibuteType: undefined
      },
    }
  },
  computed: {
    // 属性标题
    formTitle: function() {
      if (this.formMethod === 'post') {
        return '新增'
      }
      return '修改'
    }
  },
  watch: {},
  created() {},
  mounted() {

  },
  methods: {
    /**
       * 表格选中
       */
    TableSelectionChange: function(val) {
      this.selectRows = val
    },
    /**
       *  表格单点事件处理
       */
    rowClickHandle(row, event, column) {
      this.selectRows = [row]
    },
    /**
       *  列表刷新
       */
    brandTableRefresh: function(status) {
      this.$refs.brandTable.loadData(this.filter, status)
    },

    /**
       * 查询提交
       */
    searchSubmit: function(data) {
      this.filter = data
      this.brandTableRefresh('search')
    },
    /**
       * 更多操作导航
       */
    moreOperateHandle: function(cmd) {
      /*  if (cmd === 'delete') {
           this.deleteArea();
       }*/
    },
    /**
       * 发起添加
       */
    addTableRow: function(row) {
      this.formMethod = 'post'
      if (this.$refs.brandForm) {
        this.$refs.brandForm.resetForm()
        this.$refs.brandForm.loadData(null, row)
      }
      this.formDialogVisible = true
    },

    /**
       * 通过table 发起编辑
       */
    editbrand: function(row) {
      this.formMethod = 'put'
      this.formDialogVisible = true
      setTimeout(() => {
        if (this.$refs.brandForm) {
          this.$refs.brandForm.loadData(row.id, row)
        }
      }, 300)
    },
    /**
     * 通过table 发起查看详情
     */
    detailbrand: function(row) {
      this.formDetailDialogVisible = true
      setTimeout(() => {
        if (this.$refs.brandDetail) {
          this.$refs.brandDetail.loadData(row.id, row)
        }
      }, 300)
    },
    /*
      * 只在表格开关修改状态
      */
    statusChangeChange: function(row) {
      this.selectRows = row

      parseFloat(row.showStatus) === 1 ? 0 : 1

      const params = {
        cmd: 'UPDATE',
        ...row
      }
      brandManageOper(params).then(res => {
        this.$COMMON.requestError({
          _this: this,
          showSuccessMsg: false,
          res: res
        }).then(() => {
          this.brandFormSubmitSuccess() // 修改成功
        })
      })
    },
    /**
       * 删除属性
       */
    deletebrand: function(row) {
      const _this = this
      this.$confirm('是否确定删除品牌【' + row.name + '】?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          cmd: 'DEL',
          id: row.id
        }
        brandManageOper(params).then(res => {
          this.$COMMON.requestError({
            _this: this,
            res: res
          }).then(() => {
            _this.brandTableRefresh()
          })
        })
      }).catch(() => {
      })
    },
    /**
     * 表单提交成功
     * @param res
     * @param method
     */
    brandFormSubmitSuccess: function(res, method) {
      this.brandTableRefresh()
      this.formDialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
