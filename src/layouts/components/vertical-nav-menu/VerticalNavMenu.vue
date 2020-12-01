<!-- =========================================================================================
  File Name: VerticalNavMenu.vue
  Description: Vertical NavMenu Component
  Component Name: VerticalNavMenu
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="parentx">
    <vs-sidebar
      class="v-nav-menu items-no-padding"
      v-model="isVerticalNavMenuActive"
      ref="verticalNavMenu"
      default-index="-1"
      :click-not-close="clickNotClose"
      :reduce-not-rebound="reduceNotRebound"
      :parent="parent"
      :hiddenBackground="clickNotClose"
      :reduce="reduce"
      v-hammer:swipe="onMenuSwipe"
    >
      <div @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div
          class="header-sidebar flex items-end justify-between"
          slot="header"
        >
          <router-link
            tag="div"
            class="vx-logo cursor-pointer flex items-center"
            to="/dashboard"
          >
            <logo class="mr-4 fill-current text-primary" />
          </router-link>
          <div>
            <template v-if="!showCloseButton && !verticalNavMenuItemsMin">
              <img
                src="../../../assets/images/sidebar_icon/menu-open.png"
                id="btnVNavMenuMinToggler"
                class="mr-0 cursor-pointer"
                @click="toggleReduce(!reduce)"
                width="26px"
              />
            </template>
          </div>
        </div>
        <div class="shadow-bottom" v-show="showShadowBottom" />
        <component
          :is="scrollbarTag"
          ref="verticalNavMenuPs"
          class="scroll-area-v-nav-menu pt-2"
          :settings="settings"
          @ps-scroll-y="psSectionScroll"
          @scroll="psSectionScroll"
          :key="$vs.rtl"
        >
          <template v-for="(item, index) in menuItemsUpdated" >
            <template v-if="!item.header">
            <div @mouseenter="openSubSidebar(item.name)" :key="`item-${index}`">
              <v-nav-menu-item
                v-if="!item.submenu"
                :index="index"
                :to="item.slug !== 'external' ? item.url : null"
                :href="item.slug === 'external' ? item.url : null"
                :icon="item.icon"
                :target="item.target"
                :isDisabled="item.isDisabled"
                :slug="item.slug"
              >
                  <img
                    :src="
                      require('../../../assets/images/sidebar_icon/' +
                        item.icon_url)
                    "
                  />
                  <span v-show="!verticalNavMenuItemsMin" class="truncate">{{
                    $t(item.i18n) || item.name
                  }}</span>
              </v-nav-menu-item>
                </div>
            </template>
          </template>

          <ul class="bt-menu-list">
            <li
              v-for="data in bottom_data"
              :key="data.id"
              class="vs-sidebar--item"
            >
              <div v-if="data.url" @mouseenter="openSubSidebar(data.name)">
                <router-link :to="data.url" class="border-0">
                  <span class="feather-icon select-none relative"> </span>
                  <!-- <div > -->
                    <img
                      :src="
                        require('../../../assets/images/sidebar_icon/' +
                          data.icon_url)
                      "
                    />
                    <span v-show="!verticalNavMenuItemsMin" class="truncate">{{
                      $t(data.i18n) || data.name
                    }}</span>
                  <!-- </div> -->
                </router-link>
              </div>
              <div v-else>
                <a class="border-0">
                  <span class="feather-icon select-none relative"></span>
                  <img
                    :src="
                      require('../../../assets/images/sidebar_icon/' +
                        data.icon_url)
                    "
                  />
                  <span v-show="!verticalNavMenuItemsMin" class="truncate">{{
                    $t(data.i18n) || data.name
                  }}</span>
                </a>
              </div>
            </li>
          </ul>
        </component>
        <!-- /Menu Items -->
      </div>
    </vs-sidebar>
    <div class="v-nav-menu">
      <vs-sidebar
        position-left
        :click-not-close="clickNotClose"
        :hiddenBackground="clickNotClose"
        v-model="activeSubsidebar"
        class="items-no-padding"
        :class="reduce === true && isMouseEnter === false ? 'menu_close' : ''"
      >
        <section
          class="scroll-area-v-nav-menu submenu-section pt-2 ps ps--active-y"
          @mouseleave="closeSubSidebar()"
        >
          <div
            class="vs-sidebar--item"
            v-for="item in documentSubMenu"
            :key="item.title"
          >
            <!-- subactive-menu -->
            <a href="#" class tabindex="-1" target="_self">
              <span class="feather-icon select-none relative"></span>
              <div class="submenu-listmain">
                <div class="submenu-img">
                  <img
                    :src="
                      require('../../../assets/images/sidebar_icon/' +
                        item.icon_url)
                    "
                  />
                </div>
                <div class="submenu-name">
                  <span class="truncate pl-0 fw-500" style>{{
                    item.title
                  }}</span>
                  <i class="truncate text-white" style>{{ item.sub_title }}</i>
                </div>
              </div>
            </a>
          </div>
        </section>
      </vs-sidebar>

      <vs-sidebar
        :click-not-close="clickNotClose"
        :hiddenBackground="clickNotClose"
        position-left
        v-model="activeBottomSubsidebar"
        class="items-no-padding"
        :class="reduce === true && isMouseEnter === false ? 'menu_close' : ''"
      >
        <section
          class="scroll-area-v-nav-menu submenu-section pt-2 ps ps--active-y settingBottomSubMenu"
          @mouseleave="closeSubSidebar()"
        >
          <div
            class="vs-sidebar--item"
            v-for="item in settingBottomSubMenu"
            :key="item.title"
          >
            <!-- subactive-menu -->
            <!-- this.$store.state.AppActiveUser.userRole === 'company' && () -->
            <a href="#" class tabindex="-1" target="_self" v-if="item.display === false">
              <span class="feather-icon select-none relative"></span>
              <div class="submenu-listmain">
                <!-- <div class="submenu-img">
                  <img :src="require('../../../assets/images/sidebar_icon/' + item.icon_url )" />
                </div> -->
                <div class="submenu-name">
                  <span class="truncate pl-0 fw-500" style>{{
                    item.title
                  }}</span>
                  <!-- <i class="truncate text-white" style>{{item.sub_title}}</i> -->
                </div>
              </div>
            </a>
          </div>
        </section>
      </vs-sidebar>
    </div>
    <!-- Swipe Gesture -->
    <div
      v-if="!isVerticalNavMenuActive"
      class="v-nav-menu-swipe-area"
      v-hammer:swipe="onSwipeAreaSwipe"
    />
    <!-- /Swipe Gesture -->
  </div>
</template>


<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VNavMenuGroup from './VerticalNavMenuGroup.vue'
import VNavMenuItem from './VerticalNavMenuItem.vue'
import Logo from '../Logo.vue'

export default {
  name: 'v-nav-menu',
  components: {
    VNavMenuGroup,
    VNavMenuItem,
    VuePerfectScrollbar,
    Logo
  },
  props: {
    logo: { type: String },
    openGroupHover: { type: Boolean, default: false },
    parent: { type: String },
    reduceNotRebound: { type: Boolean, default: true },
    navMenuItems: { type: Array, required: true },
    title: { type: String }
  },
  data: () => ({
    activeSubsidebar: false,
    activeBottomSubsidebar: false,
    settingBottomSubMenu: [
      {
        id: 1,
        icon_url: 'subM1.png',
        title: 'Presets',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 2,
        icon_url: 'subM1.png',
        title: 'Certificators',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 3,
        icon_url: 'subM1.png',
        title: 'Operators',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 4,
        icon_url: 'subM1.png',
        title: 'Seats',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 5,
        icon_url: 'subM1.png',
        title: 'Devices',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 6,
        icon_url: 'subM1.png',
        title: 'Licences',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 7,
        icon_url: 'subM1.png',
        title: 'Wallet',
        sub_title: 'Presets',
        display: false
      },
      {
        id: 8,
        icon_url: 'subM1.png',
        title: 'Limits',
        sub_title: 'Presets',
        display: false
      },
    ],
    documentSubMenu: [{
      id: 1,
      icon_url: 'subM1.png',
      title: 'Search',
      sub_title: 'Find Specific Documents'
    },
    {
      id: 2,
      icon_url: 'subM2.png',
      title: 'New',
      sub_title: 'Create Documents'
    },
    {
      id: 3,
      icon_url: 'subM3.png',
      title: 'Upload',
      sub_title: 'Add Documents'
    },
    {
      id: 4,
      icon_url: 'subM4.png',
      title: 'Signature',
      sub_title: 'Apply Signature'
    },
    {
      id: 5,
      icon_url: 'subM5.png',
      title: 'Cloud',
      sub_title: 'Storage provide'
    },
    {
      id: 6,
      icon_url: 'subM6.png',
      title: 'Setting',
      sub_title: 'Users Restrictions'
    },
    {
      id: 7,
      icon_url: 'subM7.png',
      title: 'Clients',
      sub_title: 'Download Appliactions'
    },
    ],
    bottom_data: [],
    guestBottomData: [
      {
        url: '/apps/eCommerce/shop',
        name: 'Upgrade',
        icon_url: 'cart.png',
        i18n: 'Upgrade',
        isbottom: true
      },
      {
        url: '/help',
        name: 'Help',
        icon_url: 'help.png',
        i18n: 'Help',
        isbottom: true,
      },
      {
        name: 'Authenticated',
        icon_url: 'check.png',
        i18n: 'Authenticated',
        isbottom: true
      }
    ],
    personBottomData: [
      {
        url: '/setting',
        name: 'Setting & Limits',
        icon_url: 'gear.png',
        i18n: 'Setting & Limits',
        isbottom: true
      },
      {
        url: '/apps/eCommerce/shop',
        name: 'Upgrade',
        icon_url: 'cart.png',
        i18n: 'Upgrade',
        isbottom: true
      },
      {
        url: '/help',
        name: 'Help',
        icon_url: 'help.png',
        i18n: 'Help',
        isbottom: true,
      },
      {
        name: 'Authenticated',
        icon_url: 'check.png',
        i18n: 'Authenticated',
        isbottom: true
      }
    ],
    operatorBottomData: [
      {
        url: '/setting',
        name: 'Setting & Limits',
        icon_url: 'gear.png',
        i18n: 'Setting & Limits',
        isbottom: true
      },
      {
        url: '/konwledgebase',
        name: 'Knowledge Base',
        icon_url: 'help.png',
        i18n: 'Knowledge Base',
        isbottom: true,
      },
      {
        name: 'Authenticated',
        icon_url: 'check.png',
        i18n: 'Authenticated',
        isbottom: true
      }
    ],
    companyBottomData: [
      {
        url: '/apps/eCommerce/shop',
        name: 'Upgrade',
        icon_url: 'cart.png',
        i18n: 'Upgrade',
        isbottom: true
      },
      {
        url: '/setting',
        name: 'Setting & Limits',
        icon_url: 'gear.png',
        i18n: 'Setting & Limits',
        isbottom: true
      },
      {
        url: '/konwledgebase',
        name: 'Knowledge Base',
        icon_url: 'help.png',
        i18n: 'Knowledge Base',
        isbottom: true,
      },
      {
        url: '/help',
        name: 'Help Desk',
        icon_url: 'help.png',
        i18n: 'Help Desk',
        isbottom: true,
      },
      {
        name: 'Authenticated',
        icon_url: 'check.png',
        i18n: 'Authenticated',
        isbottom: true
      }
    ],
    partnerBottomData: [
      {
        url: '/setting',
        name: 'Setting & Limits',
        icon_url: 'gear.png',
        i18n: 'Setting & Limits',
        isbottom: true
      },
      {
        url: '/konwledgebase',
        name: 'Knowledge Base',
        icon_url: 'help.png',
        i18n: 'Knowledge Base',
        isbottom: true,
      },
      {
        url: '/help',
        name: 'Helpdesk',
        icon_url: 'help.png',
        i18n: 'Helpdesk',
        isbottom: true,
      },
      {
        name: 'Authenticated',
        icon_url: 'check.png',
        i18n: 'Authenticated',
        isbottom: true
      }
    ],
    adminBottomData: [
      {
        url: '/setting',
        name: 'Setting',
        icon_url: 'gear.png',
        i18n: 'Setting',
        isbottom: true
      },
      {
        name: 'Authenticated',
        icon_url: 'check.png',
        i18n: 'Authenticated',
        isbottom: true
      }
    ],
    clickNotClose: false, // disable close navMenu on outside click
    isMouseEnter: false,
    reduce: false, // determines if navMenu is reduce - component property
    showCloseButton: false, // show close button in smaller devices
    settings: {      // perfectScrollbar settings
      maxScrollbarLength: 60,
      wheelSpeed: 1,
      swipeEasing: true
    },
    showShadowBottom: false
  }),
  computed: {
    isGroupActive () {
      return (item) => {
        const path = this.$route.fullPath
        const routeParent = this.$route.meta ? this.$route.meta.parent : undefined
        let open = false

        const func = (item) => {
          if (item.submenu) {
            item.submenu.forEach((item) => {
              if (item.url && (path === item.url || routeParent === item.slug)) { open = true } else if (item.submenu) { func(item) }
            })
          }
        }
        func(item)
        return open
      }
    },
    menuItemsUpdated () {
      const clone = this.navMenuItems.slice()

      for (const [index, item] of this.navMenuItems.entries()) {
        if (item.header && item.items.length && (index || 1)) {
          const i = clone.findIndex(ix => ix.header === item.header)
          for (const [subIndex, subItem] of item.items.entries()) {
            clone.splice(i + 1 + subIndex, 0, subItem)
          }
        }
      }
      // console.log('Clone =>', clone);

      return clone
    },
    isVerticalNavMenuActive: {
      get () { return this.$store.state.isVerticalNavMenuActive },
      set (val) { this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', val) }
    },
    layoutType () { return this.$store.state.mainLayoutType },
    reduceButton: {
      get () { return this.$store.state.reduceButton },
      set (val) { this.$store.commit('TOGGLE_REDUCE_BUTTON', val) }
    },
    isVerticalNavMenuReduced () { return Boolean(this.reduce && this.reduceButton) },
    verticalNavMenuItemsMin () { return this.$store.state.verticalNavMenuItemsMin },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    windowWidth () { return this.$store.state.windowWidth }
  },
  watch: {
    '$route' () {
      if (this.isVerticalNavMenuActive && this.showCloseButton) this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)
    },
    reduce (val) {
      const verticalNavMenuWidth = val ? 'reduced' : this.$store.state.windowWidth < 1200 ? 'no-nav-menu' : 'default'
      this.$store.dispatch('updateVerticalNavMenuWidth', verticalNavMenuWidth)

      setTimeout(function () {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    },
    layoutType () { this.setVerticalNavMenuWidth() },
    reduceButton () { this.setVerticalNavMenuWidth() },
    windowWidth () { this.setVerticalNavMenuWidth() }
  },
  methods: {
    openSubSidebar (item) {
      if (item == 'Documents') {
        this.activeBottomSubsidebar = false
        if (this.$store.state.AppActiveUser.userRole === 'guest') {
          this.activeSubsidebar = false
        } else {
          this.activeSubsidebar == true ? this.activeSubsidebar = false : this.activeSubsidebar = true
        }
      }
      else if (item == 'Setting' || item =='Setting & Limits' ) {
        this.activeSubsidebar = false
        if(this.$store.state.AppActiveUser.userRole === 'operator'){
          this.activeBottomSubsidebar = false
        }else{
          this.activeBottomSubsidebar == true ? this.activeBottomSubsidebar = false : this.activeBottomSubsidebar = true
        }
      }
      else {
        this.activeBottomSubsidebar = false
        this.activeSubsidebar = false
      }
    },

    closeSubSidebar(){
      this.activeBottomSubsidebar = false
        this.activeSubsidebar = false
    },
    onMenuSwipe (event) {
      if (event.direction === 4 && this.$vs.rtl) {

        // Swipe Right
        if (this.isVerticalNavMenuActive && this.showCloseButton) this.isVerticalNavMenuActive = false

      } else if (event.direction === 2 && !this.$vs.rtl) {

        // Swipe Left
        if (this.isVerticalNavMenuActive && this.showCloseButton) this.isVerticalNavMenuActive = false
      }
    },
    onSwipeAreaSwipe (event) {

      if (event.direction === 4 && !this.$vs.rtl) {

        // Swipe Right
        if (!this.isVerticalNavMenuActive && this.showCloseButton) this.isVerticalNavMenuActive = true
      } else if (event.direction === 2 && this.$vs.rtl) {

        // Swipe Left
        if (!this.isVerticalNavMenuActive && this.showCloseButton) this.isVerticalNavMenuActive = true
      }
    },
    psSectionScroll () {
      const scroll_el = this.$refs.verticalNavMenuPs.$el || this.$refs.verticalNavMenuPs
      this.showShadowBottom = scroll_el.scrollTop > 0
    },
    mouseEnter () {
      if (this.reduce) this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', false)
      this.isMouseEnter = true
    },
    mouseLeave () {
      if (this.reduce) this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', true)
      this.isMouseEnter = false
    },
    setVerticalNavMenuWidth () {

      if (this.windowWidth > 1200) {
        if (this.layoutType === 'vertical') {
          // Set reduce
          this.reduce = !!this.reduceButton

          // Open NavMenu
          this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)

          // Set Menu Items Only Icon Mode
          const verticalNavMenuItemsMin = !!(this.reduceButton && !this.isMouseEnter)
          this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', verticalNavMenuItemsMin)

          // Menu Action buttons
          this.showCloseButton = false
          this.clickNotClose = true

          const verticalNavMenuWidth = this.isVerticalNavMenuReduced ? 'reduced' : 'default'
          this.$store.dispatch('updateVerticalNavMenuWidth', verticalNavMenuWidth)

          return
        }
      }

      // Close NavMenu
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', false)

      // Reduce button
      if (this.reduceButton) this.reduce = false

      // Menu Action buttons
      this.showCloseButton = true
      this.clickNotClose = false

      // Update NavMenu Width
      this.$store.dispatch('updateVerticalNavMenuWidth', 'no-nav-menu')

      // Remove Only Icon in Menu
      this.$store.commit('UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN', false)
    },
    toggleReduce (val) {
      // console.log('My Value =>', val);
      this.reduceButton = val
      this.setVerticalNavMenuWidth()
    },
  },
  mounted () {
    const activeUser = JSON.parse(localStorage.getItem('userInfo'))
    // console.log('Active User =>', activeUser.userRole);
    this.setVerticalNavMenuWidth()
    if (this.$store.state.AppActiveUser.userRole === 'guest' || activeUser.userRole === 'guest') {
      this.bottom_data = this.guestBottomData
    } else if (this.$store.state.AppActiveUser.userRole === 'person' || activeUser.userRole === 'person') {
      this.bottom_data = this.personBottomData
    } else if (this.$store.state.AppActiveUser.userRole === 'operator' || activeUser.userRole === 'operator') {
      this.bottom_data = this.operatorBottomData
    } else if (this.$store.state.AppActiveUser.userRole === 'company' || activeUser.userRole === 'company') {
      this.bottom_data = this.companyBottomData
      this.settingBottomSubMenu.forEach(item => {
        if (item.id === 1 || item.id === 2 || item.id === 8) {
          item.display = true
        }
      });
    } else if (this.$store.state.AppActiveUser.userRole === 'partner' || activeUser.userRole === 'partner') {
      this.bottom_data = this.partnerBottomData
    } else if (this.$store.state.AppActiveUser.userRole === 'administrators' || activeUser.userRole === 'administrators') {
      this.bottom_data = this.adminBottomData
    }
  }
}
</script>


<style lang="scss">
@import "@/assets/scss/vuexy/components/verticalNavMenu.scss";
</style>
