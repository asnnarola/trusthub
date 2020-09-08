<template>
  <div id="theme-customizer" class="uploadmodal-wrapper">
    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active=!active"
      color="primary"
      type="filled"
      class="customizer-btn upload-btn"
    >
      <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />Traking
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
        Traking
      </vs-button>
      <div class="h-full flow-wrapper">
        <div class="customizer-header pt-4 pb-4 flex items-center justify-between px-6">
          <div>
            <h4 class="text-white">TRAKING</h4>
            <small class="text-white">
              <i>Document Management</i>
            </small>
          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0 mt-0" />
        <component
          :is="scrollbarTag"
          class="scroll-area--customizer pt-4 pb-6"
          :settings="settings"
          :key="$vs.rtl"
        >
          <div class="traking-wrapper">
            <!-- <vs-checkbox color="warning" v-model="chkbox1"> -->
            <div class="d-flex pb-10 position-relative traking-wrap">
              <div class="checkbox-block">
                <i class="fas fa-check"></i>
              </div>
              <div class="trak-detail">
                <h6 class="mb-1">
                  <b>Income Document</b>
                </h6>
                <p class="mb-1 fw-500">Uploaded by Roberto Minoletti</p>
                <p>
                  <i>UTC {{CurrentDate}}</i>
                </p>
              </div>
            </div>
            <!-- </vs-checkbox> -->
            <!-- <vs-checkbox color="warning" v-model="chkbox2"> -->
            <div class="d-flex pb-10 position-relative traking-wrap">
              <div class="checkbox-block">
                <i class="fas fa-check"></i>
              </div>
              <div class="trak-detail">
                <h6 class="mb-1">
                  <b>Flow Orchestrator</b>
                </h6>
                <p class="mb-1 fw-500">Sent to Sign by Reberto Minoletti</p>
                <p>
                  <i>UTC {{CurrentDate}}</i>
                </p>
              </div>
            </div>
            <!-- </vs-checkbox> -->
            <!-- <vs-checkbox color="warning" v-model="chkbox3"> -->
            <div class="d-flex pb-10 position-relative traking-wrap">
              <div class="checkbox-block">
                <i class="fas fa-check"></i>
              </div>
              <div class="trak-detail">
                <h6 class="mb-1">
                  <b>Signature Process</b>
                </h6>
                <p class="mb-1 fw-500">Signed by Reberto Minoletti</p>
                <p>
                  <i>UTC {{CurrentDate}}</i>
                </p>
              </div>
            </div>
            <!-- </vs-checkbox> -->
            <!-- <vs-checkbox color="warning" v-model="chkbox4"> -->
            <div class="d-flex pb-10 position-relative traking-wrap">
              <div class="checkbox-block">
                <i class="fas fa-check"></i>
              </div>
              <div class="trak-detail">
                <h6 class="mb-1">
                  <b>Identification</b>
                </h6>
                <p class="mb-1 fw-500">Face Recognition by Reberto Minoletti</p>
                <p>
                  <i>UTC {{CurrentDate}}</i>
                </p>
              </div>
            </div>
            <!-- </vs-checkbox> -->
            <!-- <vs-checkbox color="warning" v-model="chkbox5"> -->
            <div class="d-flex pb-10 position-relative traking-wrap">
              <div class="checkbox-block">
                <i class="fas fa-check"></i>
              </div>
              <div class="trak-detail">
                <h6 class="mb-1">
                  <b>Document Management</b>
                </h6>
                <p class="mb-1 fw-500">Stored in OpenKM by Reberto Minoletti</p>
                <p>
                  <i>UTC {{CurrentDate}}</i>
                </p>
              </div>
            </div>
            <!-- </vs-checkbox> -->
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
      chkbox1: true,
      chkbox2: true,
      chkbox3: true,
      chkbox4: true,
      chkbox5: true,
      CurrentDate: new Date().toISOString(),
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
