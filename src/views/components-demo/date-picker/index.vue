<template>
   <div class="container">
       <aside>
           <a target="_blank" class="link-type"
              href="https://momentjs.com/">momentjs文档</a>
       </aside>

       <h3>时间带快捷选择 / 禁止选择未来的时间</h3>
       <div style="margin-bottom: 20px">
           {{filterForm}}
       </div>
       <el-date-picker
               v-model="arrTime"
               :clearable="false"
               type="daterange"
               :picker-options="pickerOptions"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               value-format="timestamp"
               @change="changeTime"
       />
   </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'Datepicker',
    props: [],
    components: {},
    data () {
      return {
        // 时间
        arrTime: [],
        pickerOptions: {
          disabledDate(time) {
            // 1、日期禁止选择今天以前的日期
            // return time.getTime() < new Date().getTime() - 86400000

            // 今天选择今天及今天之前的时间
            // return time.getTime() < Date.now()

            // 2、日期禁止选择今天之后的日期
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [date, date])
            }
          }, {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [date, new Date()])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        filterForm:{
          createStartTime:undefined,
          createEndTime:undefined,
        }
      }
    },
    watch: {},
    created () {},
    mounted () {},
    methods: {
      /* 日期监听函数*/
      changeTime() {
        const arrTime = this.arrTime
        if (arrTime.length > 0) {
          arrTime[0] = parseFloat(arrTime[0])
          arrTime[1] = parseFloat(arrTime[1])
        }
        this.filterForm.createStartTime = moment(moment(arrTime[0]).format('YYYY-MM-DD 00:00:00')).format('x')
        this.filterForm.createEndTime = moment(moment(arrTime[1]).format('YYYY-MM-DD 23:59:59')).format('x')
        /* 如果结束时间为今天的23:59:59，则改为当前时间*/
        /* if (this.filterForm.createEndTime.toString() === moment(moment().format('YYYY-MM-DD 23:59:59')).format('x')) {
          this.filterForm.createEndTime = moment().format('x')
        }*/
      },
    },
  }
</script>

<style scoped>

</style>
