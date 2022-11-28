<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :empty-text="emptyText"
      :highlight-current-row="highLightRow"
      stripe
      border
      style="width: 100%"
      @selection-change="selectionChangeHandle"
      @row-click="rowClickHandle"
    >

      <el-table-column
        type="selection"
        align="center"
        fixed="left"
        width="55"
      />

      <el-table-column
        type="index"
        :index="indexMethod"
        align="center"
        fixed="left"
        width="50"
      />

      <el-table-column
        align="center"
        property="id"
        label="区块链状态"
        min-width="120px"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.chainState == 1"
            style="color: #2d8cf0;cursor: pointer;"
            class="shanglian"
            @click="showUpLink(scope.row)"
          >已上链
            <i class="el-icon-link" />
          </span>
          <span v-else>未上链</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        property="id"
        label="链上品牌ID"
      />

      <el-table-column
        align="center"
        property="name"
        label="链上品牌名称"
      />


      <el-table-column
        align="center"
        property="imageUrl"
        label="品牌LOGO"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        property="code"
        label="关联ID"
      />
      <el-table-column
        align="center"
        property="integral"
        label="服务积分"
      />
      <el-table-column
        align="center"
        property="sort"
        label="当前排序"
      />
      <el-table-column
        align="center"
        property="remark"
        label="品牌简介"
      />

      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandle(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="editHandle(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="serverCodeHandle(scope.row)">积分变动</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row)">
            <span class="failure">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <xy-page-el
        :current-page="currentPage"
        :page-total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="currentChangeHandle"
      />
    </div>

  </div>
</template>

<script>
import xyPageEl from '@/components/paginationEl'
import { TableListQuery } from '@/api/table'
export default {
  name: 'XjTable',
  components: {
    xyPageEl
  },
  props: {
    // 行高亮
    highLightRow: {
      type: Boolean,
      default: true
    },
    // 过滤器
    filter: {
      default: function() {
        return {
          pageSize: 10,
          name: undefined // 名称
        }
      },
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      // 选中的行
      selectRows: [],
      emptyText: '暂无数据',
      pageTotal: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      dataLinkVisible: false,
      selRow: undefined // 单选选中后的
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.loadData()
  },
  methods: {
    /* 索引排序*/
    indexMethod(index) {
      if (this.currentPage > this.pageTotal / this.pageSize) {
        if (this.pageTotal % this.pageSize === 0) {
          this.currentPage = parseInt(this.pageTotal / this.pageSize)
        } else {
          this.currentPage = parseInt(this.pageTotal / this.pageSize) + 1
        }
      }
      return index + this.pageSize * (this.currentPage - 1) + 1
    },
    /**
       * 调整每页显示条数
       */
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },
    /**
       * 分页事件
       */
    currentChangeHandle: function(val) {
      this.currentPage = val
      this.loadData()
    },
    /**
       * 数据加载
       */
    loadData: function(filter, status) {
      if (this.loading) {
        return
      }

      if (status === 'search') { // 如果是搜索，重置到第一页；
        this.currentPage = 1
      }

      const params = Object.assign(this.filter, {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }, filter)
      this.loading = true

      TableListQuery(params).then(res => {
        this.loading = false
        this.tableData = res.data.data
        this.pageTotal = res.data.count
      })
    },
    /*
     * 表格开关
     */
    showStatusChange: function(row) {
      this.$emit('statusChangeChange', row)
    },
    /**
       * 表格选择处理
       */
    selectionChangeHandle: function(selection) {
      this.$emit('selectionChange', selection)
    },
    /**
       * 点击修改处理
       */
    editHandle: function(row) {
      this.$emit('onEdit', row)
    },
    /*
     * 服务积分变动
     * */
    serverCodeHandle(row) {
      this.$emit('serverCodeHandle', row)
    },
    /**
     * 点击详情处理
     */
    detailHandle: function(row) {
      this.$emit('onDetail', row)
    },
    /**
       * 点击删除处理
       * @param row
       */
    deleteHandle: function(row) {
      this.$emit('onDelete', row)
    },
    /**
       * 行选中
       */
    rowClickHandle: function(row, event, column) {
      this.$emit('rowClick', row, event, column)
    },
    /*
     * 查看上链数据
     * */
    showUpLink(row) {
      this.dataLinkVisible = true
      this.selRow = row
    }
  }
}
</script>

<style scoped>
  .shanglian:hover{
    color: #77b7fa !important;
  }
</style>
