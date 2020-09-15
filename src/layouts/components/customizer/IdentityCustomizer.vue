<template>
  <div id="theme-customizer" class="uploadmodal-wrapper">
    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active=!active"
      color="primary"
      type="filled"
      class="customizer-btn upload-btn"
    >
      <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />Identity
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
        class="customizer-btn upload-btn closeupload-btn"
      >
        <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />
        Identity
      </vs-button>
      <div class="h-full flow-wrapper">
        <div class="customizer-header pt-4 pb-4 flex items-center justify-between px-6">
          <div>
            <h4 class="text-white">IDENTITY</h4>
            <small class="text-white">
              <i>Biometric Records</i>
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
          <div class="traking-wrapper p-0">
            <div v-for="(item, index) in biometric_data" :key="index" class="identity-wrapper">
              <router-link to="#" class="d-flex w-100 align-items-center identity-list">
                <div class="identity-img mr-5">
                  <img
                    :src="require('@/assets/images/identity_icon/' + item.icon_url)"
                    class="img-fluid iconhide-hover"
                  />
                  <img class="iconshow-hover img-fluid" :src="require('@/assets/images/header_icon/' + item.icon_url)" />
                </div>
                <div class="identity-label">
                  <p>{{item.header}}</p>
                  <h6>
                    <small>
                    <i>{{item.sub_header}}</i>
                    </small>
                  </h6>
                </div>
              </router-link>
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
      settings: {
        maxScrollbarLength: 250,
        wheelSpeed: .100
      },
      biometric_data: [
        {
          header: 'DOCUMENT IDENTITY',
          sub_header: 'Scanned Document Information',
          icon_url: 'id.png'
        },
        {
          header: 'DIGITAL CERTIFICATE',
          sub_header: 'Hardware Stored Certificate',
          icon_url: 'chip.png'
        },
        {
          header: 'FACE RECOGNITION',
          sub_header: 'Captured Face Recognition Details',
          icon_url: 'face.png'
        },
        {
          header: 'FINGERPRINT TEMPLATE',
          sub_header: 'Captured Fingerprint Information',
          icon_url: 'fingerprint.png'
        },
        {
          header: 'PALM SCAN',
          sub_header: 'Captured Palm Information',
          icon_url: 'palm.png'
        },
        {
          header: 'VOICE RECORD',
          sub_header: 'Registered Voice Frequency',
          icon_url: 'voice.png'
        },

        {
          header: 'IRIS MAP',
          sub_header: 'Captured Iris Map',
          icon_url: 'eye.png'
        },
        {
          header: 'SIGNATURE GRAPH',
          sub_header: 'Graphometric Signature Information',
          icon_url: 'signature.png'
        },
      ],

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
