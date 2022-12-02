<template>
   <div style="margin: 50px">


       <aside>
           <div>在public/index.html引入</div>
           <div>
               https://map.qq.com/api/gljs?v=1.exp&libraries=service&key=腾讯地图key
           </div>
       </aside>

       <div style="display: flex;align-items: center;width: 400px">
           <el-input v-model="storeCenter"/>
           <el-button  type="primary" @click="mapPosition">自动获取</el-button>
       </div>
       <div style="margin: 20px 0">
           当前经纬度 {{longitude+'，'+latitude}}
       </div>
       <xj-tencent-map ref="tencentMap"
                    @currentLocationOper="getLatLang"
                    @mapConvertOper="getCurrentLocation" />
   </div>
</template>

<script>
  import xjTencentMap from '@/components/tencentMap/tencent-map'
  export default {
    name: 'TencentMapDemo',
    props: [],
    components: { xjTencentMap },
    data () {
      return {
        longitude:'',//经度
        latitude:'',//纬度
        storeCenter:'北京市东城区景山前街4号',
      }
    },
    watch: {},
    created () {},
    mounted () {},
    methods: {
      mapPosition(){
        this.$refs.tencentMap.mapConvert(this.storeCenter, '0')
      },
      //根据 省市区的选择和具体地址的填写，获取经纬度（自动获取经纬度）
      getLatLang(locationResult) {
        let location = locationResult.location;
        this.longitude = location.lng;
        this.latitude = location.lat;
      },
      //根据直接在地图输入框填写的完整地址 获取经纬度
      getCurrentLocation(locationResult) {
        let location = locationResult.location;
        this.longitude = location.lng;
        this.latitude = location.lat;

      },
    },
  }
</script>

<style scoped>

</style>
