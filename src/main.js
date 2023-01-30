import Vue from 'vue'

import Cookies from 'js-cookie'
import Element from 'element-ui'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果想用英文的ele语言包，默认支持中文

import App from './App'
import store from './store'
import router from './router'
import * as filters from './filters' // global filters

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // global css
import './styles/element-variables.scss'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log



/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  /*locale: enLang // 如果使用中文，无需设置，请删除*/
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
