<template>
  <div id="theme-customizer" class="uploadmodal-wrapper">
    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active=!active"
      color="primary"
      type="filled"
      class="customizer-btn upload-btn labelmodel-btn"
    >
      <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />{{$t('Labels')}}
    </vs-button>

    <!-- Customizer Content -->
    <vs-sidebar
      click-not-close
      hidden-background
      position-right
      v-model="active"
      class="items-no-padding"
    >
      <vs-button
        @click.stop="active=!active"
        color="primary"
        type="filled"
        class="customizer-btn upload-btn closeupload-btn labelmodel-btn"
      >
        <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />
        {{$t('Labels')}}
      </vs-button>
      <div class="h-full flow-wrapper">
        <div class="customizer-header pt-4 pb-4 flex items-center justify-between px-6">
          <div>
            <h4 class="text-white">{{$t('Labels')}}</h4>
            <small class="text-white">
              <i>{{$t('UserDatas')}}</i>
            </small>
          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0 mt-0" />
        <component
          :is="scrollbarTag"
          class="scroll-area--customizer pt-0 pb-6"
          :settings="settings"
          :key="$vs.rtl"
        >
          <div class="traking-wrapper">
            <div class="labels-wrappes">
              <span class="text-white fw-500 mr-2">{{$t('Name')}}</span>
              <vs-input class="border-0 w-100 labels-inputbox" v-model="name" />
            </div>
            <div class="labels-wrappes">
              <span class="text-white fw-500 mr-2">{{$t('DocumentId')}}</span>
              <vs-input class="border-0 w-100 labels-inputbox" v-model="document" />
            </div>
            <div class="labels-wrappes">
              <span class="text-white fw-500 mr-2">{{$t('Passport')}}</span>
              <vs-input class="border-0 w-100 labels-inputbox" v-model="passport" />
            </div>
            <div class="labels-wrappes">
              <span class="text-white fw-500 mr-2">{{$t('Address')}}</span>
              <vs-input class="border-0 w-100 labels-inputbox" v-model="address" />
            </div>
            <div class="labels-wrappes">
              <span class="text-white fw-500 mr-2">{{$t('Telephone')}}</span>
              <vs-input class="border-0 w-100 labels-inputbox" v-model="telephone" />
            </div>
          </div>
        </component>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import { format } from 'path';
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  data () {
    return {
      active: false,
      name: '',
      document: '',
      passport: '',
      address: '',
      telephone: '',
      settings: {
        maxScrollbarLength: 250,
        wheelSpeed: .100
      },
    }
  },
  computed: {
    rtl: {
      get () { return this.$vs.rtl },
      set (val) { this.$vs.rtl = val }
    },
    scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
  },
  components: {
    VuePerfectScrollbar
  },

}

</script>


<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 70%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
