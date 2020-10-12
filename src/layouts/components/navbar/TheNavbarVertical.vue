<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />
        <div class="d-flex align-items-center justify-content-between topnavbarall-icon">

        <bookmarks :navbarColor="navbarColor" :identityStatus="identityStatus" @identityBarStatus="identityBarStatus = $event" v-if="windowWidth >= 992 && (this.$store.state.AppActiveUser.userRole === 'person' || this.$store.state.AppActiveUser.userRole === 'operator' || activeUser.userRole ==='person' || activeUser.userRole === 'operator')" />
        {{identityBarStatus}}

        <vs-spacer />

        <i18n v-if="this.$store.state.AppActiveUser.userRole === 'operator' || activeUser.userRole === 'operator'"/>
        <i18n-person v-if="this.$store.state.AppActiveUser.userRole === 'person' || activeUser=== 'person' "/>
        </div>
        <profile-drop-down />
      </vs-navbar>
    </div>
  </div>
</template>


<script>
import Bookmarks            from './components/Bookmarks.vue'
import I18n                 from './components/I18n.vue'
import I18nPerson                from './components/I18nPerson'
import ProfileDropDown      from './components/ProfileDropDown.vue'

export default {
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    },
    test:{
      type: Function
    }
  },
  data() {
    return {
      identityBarStatus:'',
      idStatus:'',
      activeUser:JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  components: {
    Bookmarks,
    I18n,
    I18nPerson,
    ProfileDropDown
  },
  computed: {
    navbarColorLocal () {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth () {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor () {
      return {'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth () {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj () {
      if      (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth)               return 'navbar-full'
    }
  },
  methods: {
    identityStatus(status){
      // console.log('Status =<', status);
      if(status == false || status == true){
        this.idStatus = status
        this.test(this.idStatus)
      }
      // this.$emit('test',status)
      // this.test(status)
      // return this.$emit("identityBar", this.identityBarStatus);
    },
    showSidebar () {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    }
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.identityStatus()
  //   }, 300);
  // },
}
</script>
