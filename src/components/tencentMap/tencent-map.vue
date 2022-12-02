<template>
  <div style="position: relative">
    <div id="container" style="width:740px;height:450px;" />
    <div id="panel">
      <p  style="display: flex;align-items: center">
        <label style="margin-right: 10px;flex: 40px 0 0;">地址</label>
        <el-input
          v-model="currentDetailAddress"
          style="margin-right: 10px"
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
        />
        <!--        <input id='address' type="text" :value=currentDetailAddress >-->
        <input id="convert" type="button" class="btn" value="地址解析" @click="mapConvert(currentDetailAddress)">
      </p>
       <!--<p>
         <label style="margin-right: 10px;flex: 40px 0 0;">坐标</label>
         <input id='location' type='text' disabled value='' />
       </p>-->
    </div>
  </div>

</template>

<script>
const TMap = window.TMap
export default {
  name: 'TencentMap',
  components: {},
  props: [],
  data() {
    return {
      currentDetailAddress: '',
      map: '',
      longitude: '',
      latitude: '',
      geocoder: {},
      markers: {}
    }
  },
  watch: {},
  created() {

  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      const map = new TMap.Map('container', {
        zoom: 18,
        center: new TMap.LatLng(39.986785, 116.301012)
      })
      this.map = map
      this.geocoder = new TMap.service.Geocoder() // 新建一个正逆地址解析类
      this.markers = new TMap.MultiMarker({
        map: map,
        geometries: []
      })

      /* //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
        //自己设置地图中心点
        var myLatlng = new qq.maps.LatLng(39.916527,116.397128);
        // var myLatlng = new qq.maps.LatLng(39.48602511162973,119.1412353515625);
        //定义工厂模式函数
        var myOptions = {
          zoom: 10,               //设置地图缩放级别
          center: myLatlng,      //设置中心点样式
          mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
        }
        //获取dom元素添加地图信息
        let map = new qq.maps.Map(document.getElementById("container"), myOptions);

        this.map = map;*/

      // 给地图添加点击事件
      // 并获取鼠标点击的经纬度
      /*  qq.maps.event.addListener(map, 'click', function(event) {
          this.longitude = event.latLng.getLat();
          this.latitude = event.latLng.getLng();
          alert("经度:"+this.longitude+","+"纬度:"+this.latitude);
        });*/
    },

    /*
    * type 0-自动获取（经纬度）  1-地址解析（省市区详细地址）
    */
    mapConvert(detailAddress, type) {
      this.markers.setGeometries([])
      // 将给定的地址转换为坐标位置
      this.geocoder
      // .getLocation({ address: document.getElementById('address').value })
        .getLocation({ address: detailAddress })
        .then((result) => {
          this.markers.updateGeometries([
            {
              id: 'main',
              position: result.result.location // 将得到的坐标位置用点标记标注在地图上
            }
          ])
          this.map.setCenter(result.result.location)
          if (type === '0') {
            this.$emit('currentLocationOper', result.result)
          } else {
            this.$emit('mapConvertOper', result.result)
          }

          /* document.getElementById(
              'location'
            ).value = result.result.location.toString();*/
          // 显示坐标数值
        }).catch((err) => {
          this.$message.error(err.message || '未查询到该地址')
          /* console.log('err',err)*/
        })
    },

    changeMap(addressId, addressName) {
      console.log(addressId, addressName)
      const search = new TMap.service.Search()
      search.searchRegion({
        keyword: addressName,
        cityName: addressId
      }).then((result) => {
        this.map.setCenter(result.data[0].location)
      })
    }
  }
}
</script>

<!--<style scoped>

</style>-->

<style type="text/css" lang="scss">
  #container {
    width: 100%;
    height: 100%;
  }

  #panel {
    position: absolute;
    background: #FFF;
    width:320px;
    padding: 10px;
    z-index: 9999;
    top: 30px;
    left: 30px;
  }
  .el-select-dropdown{
    z-index: 99999!important;
  }
</style>
