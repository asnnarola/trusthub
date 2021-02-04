/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'


// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

// axios
import axios from './axios.js'
Vue.prototype.$http = axios

// otp-Input
import OtpInput from "@bachdgvn/vue-otp-input";
Vue.component("v-otp-input", OtpInput);
// API Calls
import './http/requests'

// mock
import './fake-db/index.js'

// Theme Configurations
import '../themeConfig.js'


// Firebase
import '@/firebase/firebaseConfig'


// Auth0 Plugin
import AuthPlugin from './plugins/auth'
Vue.use(AuthPlugin)



// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'

// VueCookies
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

// VuePdfReader
// import VuePdfReader from 'vue-pdf-reader';
// Vue.use(VuePdfReader);

// social login
import VueSocialauth from 'vue-social-auth'
Vue.use(VueSocialauth, {
  providers: {
    facebook: {
      clientId: '444282176963354',
      redirectUri: 'https://beta.trusthub.cloud/login'
    },
    twitter: {
      clientId: 'jaH3uvNvgtzobL2ewSh2K8KsH',
      // clientSecret: "7IexmcIrefNPTq6jvsgnB8UQzO75TnYCYwbIP1UA3CQboDBWek",
      // redirectUri: 'http://localhost:8080/login'
      // redirectUri: 'http://192.168.100.85:8080/login',
      redirectUri: 'https://beta.trusthub.cloud/login'
    },
    linkedin: {
      clientId:'78l9d81xybkxw6',
      redirectUri: 'https://beta.trusthub.cloud/login',
      scope:'r_liteprofile%20r_emailaddress%20w_member_social'
    },
  }
})

// Signature_Pad
// import SignaturePad from './signaturePad.js'


// Vuexy Admin Filters
import './filters/filters'


// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


// Tour
import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')


// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)


// Google Maps
// import * as VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     // Add your API key here
//     key: 'YOUR_KEY',
//     libraries: 'places' // This is required if you use the Auto complete plug-in
//   }
// })

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// FontAwsome
require('./assets/fontawesome/scss/fontawesome.scss')

// Feather font icon
require('./assets/css/iconfont.css')

// vue-context
import VueContext from 'vue-context'
Vue.component("VueContext", VueContext)

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  acl,
  // SignaturePad,
  render: h => h(App)
}).$mount('#app')
