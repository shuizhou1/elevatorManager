import 'babel-polyfill';
if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
// import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'                            // api: http://www.iconfont.cn/
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth, getDictName,formatFormValue } from '@/utils'
// import EButton from '@/components/e-button'
// import ESelect from '@/components/e-select'
import '@/scss/app.scss'
import '@/assets/css/index.css'
import '@/assets/css/main.css'

// Vue.use(ESelect)
// Vue.use(EButton)
Vue.use(VueCookie)
Vue.use(ElementUI)
Vue.config.productionTip = false
import BabelPolyFill from 'babel-polyfill'
// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}
 Vue.directive( 'enterNumber', {
         inserted(el, binding, vnode, oldVnode) {
             el.addEventListener("keypress", function (e) {
                 e = e || window.event;
                 console.log(e);
                 let charcode = typeof e.charCode === "number" ? e.charCode : e.keyCode;
                 let re = /\d/;

                 if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
                     if (e.preventDefault) {
                         e.preventDefault();
                     } else {
                         e.returnValue = false;
                     }
                 }
             });
         }
    //  }
 })
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
Vue.prototype.formatFormValue = formatFormValue // 格式化表单输入
Vue.prototype.getDictName = getDictName  // 加载数据字典
Vue.use(BabelPolyFill)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
