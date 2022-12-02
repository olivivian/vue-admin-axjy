<template>
  <div style="text-align: center;min-height: 500px">
    <div style="margin-bottom: 20px;margin-right: 10px">
      <el-input
        v-model="filterText"
        prefix-icon="el-icon-search"
        clearable
        placeholder="输入关键字进行过滤"
      />
    </div>

    <el-tree
      ref="tree"
      v-loading="loading"
      node-key="id"
      :data="data"
      :show-checkbox="false"
      :default-expanded-keys="expandedKeys"
      :expand-on-click-node="expandOnClick"
      :empty-text="emptyText"
      :highlight-current="highlightCurrent"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @node-click="nodeClickHandle"
    >

      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span class="">{{ data.name|ellipsis }}</span>
        <!--            <el-tooltip :content="data.name" placement="right" effect="light">-->
        <!--              <span>{{ data.name | ellipsis}}</span>-->
        <!--            </el-tooltip>-->

        <span>
          <el-button
                      type="text"
                      size="mini"
                      @click="() => nodeAddHandle(node, data)"
              >
            <!--新增-->
            <span class="el-icon-plus" />
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => nodeModifyHandle(node, data)"
          >
            <!--修改-->
            <span class="el-icon-edit-outline" />
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => nodeDelHandle(node, data)"
          >
            <!--删除-->
            <span class="el-icon-delete" />
          </el-button>

        </span>

      </span>

    </el-tree>

    <!--<el-pagination
                style="margin: 10px 0 0 -15px"
                small
                hide-on-single-page
                @current-change="currentChangeHandle"
                :page-size="pageSize"
                layout="prev, pager, next"
                :pager-count="7"
                :total="pageTotal">
        </el-pagination>-->
  </div>
</template>

<script>
import { treeListQuery } from '@/api/component-demo'
export default {
  components: {},
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 6) {
        return value.slice(0, 6) + '...'
      }
      return value
    }
  },
  props: {
    // 树类型：BLOC,BRAND,AREA
    type: {
      type: String,
      default: undefined
    },
    // 是否赖加载，默认true
    lazy: {
      type: Boolean,
      default: true
    },
    // 选中节点是否高亮显示
    highlightCurrent: {
      type: Boolean,
      default: false
    },
    // 是否过滤门店节点
    filterStore: {
      type: Boolean,
      default: false
    },
    // 是否在点击节点的时候展开或者收缩节点
    expandOnClick: {
      type: Boolean,
      default: false
    },
    // 默认展开的节点
    defaultExpandedKeys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      filterText: '',
      loading: true,
      pageNo: 1,
      pageSize: 21,
      pageTotal: 0,
      defaultProps: {
        children: 'child',
        label: 'name',
        isLeaf: 'isLeaf'
      },
      totalData: [],
      data: [],
      filterCondition: {}
    }
  },
  computed: {
    // 树节点默认展开的值
    expandedKeys() {
      if (this.defaultExpandedKeys && this.defaultExpandedKeys.length > 0) {
        return this.defaultExpandedKeys
      }
      if (this.$store.getters.currentRelation && this.$store.getters.currentRelation.length > 0) {
        return [this.$store.getters.currentRelation[0].id]
      }
      return []
    },
    // 无数据提示文案
    emptyText() {
      return this.loading ? '' : '暂无数据'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    /**
             * 节点被点击事件
             */
    nodeClickHandle(data, node, self) {
      this.$emit('nodeClick', data, node, self)
    },
    /*
            * 新增
            */
    nodeAddHandle(node, data) {
      this.$emit('nodeAdd', data, node)
    },
    /*
              * 修改
              */
    nodeModifyHandle(node, data) {
      this.$emit('nodeModify', data, node)
    },
    /*
            * 删除
            */
    nodeDelHandle(node, data) {
      console.log('nodeDel', node, data)
      this.$emit('nodeDel', data, node)
    },
    /**
             * 数据首次加载
             */
    loadData() {
      treeListQuery().then(res => {
        this.loading = false
        this.data = res.data
      })
    },

    searchSubmit(data) {
      this.filterCondition = data
      this._loadData()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>

<style scoped lang="scss">
    .tree-tip{
        font-size: 12px;
        margin-bottom: 10px;
        color: #333333;
        .tree-tip-row{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            margin-left: 18px;
            .bg1{
                background:silver;
            }
            .bg2{
                background:#409EFF;
            }
            .small-block{
                display: inline-block;
                width: 30px;
                height: 15px;
                margin-right: 6px;
            }
            .tip-text{}
        }

    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 17px;
    }
</style>
