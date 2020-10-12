<template>
  <div class="navbar-bookmarks flex items-center">
    <!-- STARRED PAGES - FIRST 10 -->
    <ul class="vx-navbar__starred-pages">
      <draggable
        v-model="starredPagesLimited"
        :group="{ name: 'pinList' }"
        class="flex cursor-move h-top-icon"
      >
        <li class="starred-page" v-for="img in headr_Icon1" :key="img.icon_url">
          <vs-button
          class="h-top-link"
            @click.stop="handelIdentityBar(img)"
            type="filled"
          >
            <img
              :src="require('@/assets/images/header_icon/' + img.icon_url)"
            />
          </vs-button>
        </li>
      </draggable>
    </ul>
    <ul class="vx-navbar__starred-pages">
      <draggable
        v-model="starredPagesLimited"
        :group="{ name: 'pinList' }"
        class="flex cursor-move h-top-icon"
      >
        <li
          class="starred-page"
          :class="img.data.length > 0 ? 'active' : ''"
          v-for="img in header_Icon2"
          :key="img.icon_url"
        >
          <vs-button
            @click.stop="handelIdentityBar(img)"
            class="h-top-link"
            type="filled"
          >
            <img
              :src="require('@/assets/images/header_icon/' + img.icon_url)"
            />
          </vs-button>
        </li>
      </draggable>
    </ul>
    <ul class="vx-navbar__starred-pages">
      <draggable
        v-model="starredPagesLimited"
        :group="{ name: 'pinList' }"
        class="flex cursor-move h-top-icon"
      >
        <li
          class="starred-page"
          v-for="img in header_Icon3"
          :key="img.icon_url"
        >
          <vs-button
            @click.stop="handelIdentityBar(img)"
            class="h-top-link"
            type="filled"
          >
            <img
              :src="require('@/assets/images/header_icon/' + img.icon_url)"
            />
          </vs-button>
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue'

export default {
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    },
    identityStatus: {
      type: Function
    }
  },
  components: {
    draggable,
    VxAutoSuggest
  },
  data () {
    return {
      headr_Icon1: [
        {
          id: 1,
          icon_url: 'id.png',
          data:[]
        },
        {
          id: 2,
          icon_url: 'chip.png',
          data:[]
        }
      ],
      header_Icon2: [
        {
          id: 1,
          icon_url: 'face.png',
          data:[]
        },
        {
          id: 2,
          icon_url: 'fingerprint.png',
          data:[{
            id:1,
            icon_url:'fingerprint,png'
          }]
        },
        {
          id: 3,
          icon_url: 'palm.png',
          data:[]
        },
        {
          id: 4,
          icon_url: 'voice.png',
          data:[]
        },
        {
          id: 5,
          icon_url: 'eye.png',
          data:[]
        }],
      header_Icon3: [
        {
          id: 1,
          icon_url: 'signature.png',
          data:[]
        },
      ],
      active: false,
      showBookmarkPagesDropdown: false
    }
  },
  watch: {
    '$route' () {
      if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
    }
  },
  computed: {
    navbarSearchAndPinList () {
      return {pages: this.$store.state.navbarSearchAndPinList['pages']}
    },
    starredPages () {
      return this.$store.state.starredPages
    },
    starredPagesLimited: {
      get () {
        return this.starredPages.slice(0, 10)
      },
      set (list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list)
      }
    },
    starredPagesMore: {
      get () {
        return this.starredPages.slice(10)
      },
      set (list) {
        this.$store.dispatch('arrangeStarredPagesMore', list)
      }
    },
    textColor () {
      return {'text-white': this.$store.state.mainLayoutType === 'vertical' && this.navbarColor !== (this.$store.state.theme === 'dark' ? '#10163a' : '#fff') }
    }
  },
  methods: {
    handelIdentityBar(image){
      if ( image.data.length > 0 && this.$store.state.AppActiveUser.userRole === 'person' ) {
        this.active === true ? this.active = false: this.active = true
        this.identityStatus(this.active)
      }
      // this.$emit("identityBarStatus", this.active);
    },
    selected (obj) {
      this.$store.commit('TOGGLE_CONTENT_OVERLAY', false)
      this.showBookmarkPagesDropdown = false
      this.$router.push(obj.pages.url).catch(() => {})
    },
    actionClicked (item) {
      this.$store.dispatch('updateStarredPage', { url: item.url, val: !item.is_bookmarked })
      // this.$refs.bookmarkAutoSuggest.filterData()
    },
    outside () {
      this.showBookmarkPagesDropdown = false
    },
    hnd_search_query_update (query) {
      // Show overlay if any character is entered
      this.$store.commit('TOGGLE_CONTENT_OVERLAY', !!query)
    }
  },
  directives: {
    'click-outside': {
      bind (el, binding) {
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          /* eslint-disable no-mixed-operators */
          if (bubble || !el.contains(e.target) && el !== e.target) {
          /* eslint-enable no-mixed-operators */
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      },

      unbind (el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}

</script>
