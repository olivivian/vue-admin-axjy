<template>
  <div class="detail-content">
    <div class="flex-content flex flex-wrap">
      <div class="flex">
        <div class="detail-label">品牌ID：</div>
        <span>{{ form.id }}</span>
      </div>
      <div class="flex">
        <div class="detail-label">品牌名称：</div>
        <span>{{ form.name }} </span>
      </div>
      <div class="flex">
        <div class="detail-label"> 品牌类型：</div>
        <span>
          {{ renderDataSourceFilter(form.type, 'brand_type') }}
        </span>
      </div>
      <div class="flex">
        <div class="detail-label">关联平台：</div>
        <span>
          {{ idToNameSourceFilter(form.sourceFrom,sourcefromOption) }}
        </span>
      </div>
      <div class=" flex">
        <div class="detail-label">关联ID：</div>
        <span>{{ form.code }}</span>
      </div>
      <div class="flex">
        <div class="detail-label">品牌简介：</div>
        <span>{{ form.remark }}</span>
      </div>
    </div>

    <div class="flex mtb10">
      <div class="detail-label">品牌LOGO：</div>
      <span>
        <el-image
          class="el-image-warp"
          :src="form.imageUrl"
          :preview-src-list="[form.imageUrl]"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </span>
    </div>
  </div>

</template>

<script>
import { TableDetailQuery } from '@/api/table'
export default {
  filters: {
  },
  props: {
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    /**
       *数据初始化
       **/
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
    }

  }
}
</script>

<style lang="scss">
  .el-image-warp{
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
</style>
