<template>
    <div style="margin: 100px">

        <aside>
            <b>思路</b>
            <ul>
                <li>将列数据定义在data中，然后动态绑定列数据到模板上</li>
                <li>提供一组用于设置列展示的复选框，默认选中所有列，即默认展示所有列</li>
                <li>选中或取消选中某个列时，更新模板中动态绑定的列数据，实现页面只显示需要展示的列</li>
            </ul>
        </aside>

        <div style="margin: 30px">
            <label>请选择表格需要展示的列：</label>
            <el-checkbox-group v-model="checkedTableColumns">
                <el-checkbox
                        v-for="column in tableColumns"
                        :key="column.prop"
                        :label="column.prop"
                >{{ column.label }}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table :data="tableData" border>
            <el-table-column
                    v-for="column in bindTableColumns"
                    :key="column.prop"
                    :prop="column.prop"
                    :label="column.label"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    name: 'table-row-hide',
    props: [],
    components: {},
    data () {
      return {
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          }
        ],//表格数据
        tableColumns: [
          {
            prop: "date",
            label: "日期",
            show: true,
          },
          {
            prop: "name",
            label: "姓名",
            show: true,
          },
          {
            prop: "address",
            label: "地址",
            show: true,
          },
        ],// 表格所有列数据，列数据的唯一来源
      }
    },
    watch: {},
    computed: {
      bindTableColumns() {//绑定到模板上的列数据，即需要展示的列数据
        return this.tableColumns.filter((column) => column.show);
      },
      /* 这里使用了getter和setter，这样写的好处不用自己手动监听复选框的选中事件 */
      checkedTableColumns: {//复选框中选中的列数据
        get() {
          // 返回选中的列名
          return this.bindTableColumns.map(column => column.prop);
        },
        set(checked) {
          // 设置表格列的显示与隐藏
          this.tableColumns.forEach((column, index) => {
            // 如果选中，则设置列显示
            if(checked.includes(column.prop)) {
              column.show = true;
            } else {
              // 如果未选中，则设置列隐藏
              column.show = false;
            }
          })
        }
      }
    },
    created () {},
    mounted () {},
    methods: {},
  }
</script>

<style scoped></style>
