<!-- =========================================================================================
  File Name: TheCustomizer.vue
  Description: Template Customizer
  Component Name: TheCustomizer
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="theme-customizer" class="uploadmodal-wrapper">
    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active=!active"
      color="primary"
      type="filled"
      class="customizer-btn upload-btn"
    >
      <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />
      Upload
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
        Upload
      </vs-button>
      <div class="h-full">
        <div class="customizer-header pt-4 pb-4 flex items-center justify-between px-6">
          <div>
            <h4 class="text-white">UPLOAD</h4>
            <small class="text-white">
              <i>Advance Upload</i>
            </small>
          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-5 mt-0" />
        <component
          :is="scrollbarTag"
          class="scroll-area--customizer pt-4 pb-6"
          :settings="settings"
          :key="$vs.rtl"
        >
          <div class="vx-row mb-3 ml-3 mr-3">
            <div class="vx-col w-full">
              <vs-input class="w-full inputbox-style" label="Type" v-model="popup_type" />
            </div>
          </div>

          <div class="vx-row mb-3 ml-3 mr-3">
            <div class="vx-col w-full">
              <vs-input class="w-full inputbox-style" label="Category" v-model="popup_category" />
            </div>
          </div>

          <div class="vx-row mb-3 ml-3 mr-3">
            <div class="vx-col w-full">
              <vs-input class="w-full inputbox-style" label="Folder" v-model="popup_folder" />
            </div>
          </div>

          <div class="vx-row mb-3 ml-3 mr-3">
            <div class="vx-col w-full">
              <vs-input class="w-full inputbox-style" label="Template" v-model="popup_template" />
            </div>
          </div>

          <div class="vx-row mb-3 ml-3 mr-3">
            <div class="vx-col w-full d-flex justify-content-between align-items-center">
              <vs-input
                class="w-full inputbox-style input-btn-style"
                label="Labels"
                v-model="popup_label"
              />
              <vs-button
                class="float-right btn-yellow mt-25px labeladd-btn ml-3 h-38 pd-0 w-100px"
                :disabled="popup_label == ''"
                @click="addLabels()"
              >Add</vs-button>
            </div>
          </div>

          <div class="vx-row ml-6 mr-6">
            <div class="vx-col w-full pl-1 pr-1">
              <div class="labeladd-block">
                <vs-chip
                  @click="remove(label)"
                  v-for="(label, index) in labels"
                  :key="index"
                  closable
                >{{ label }}</vs-chip>
              </div>
            </div>
          </div>

          <div class="vx-row ml-3 mr-3">
            <div class="vx-col w-full text-right">
              <p class="star-wrapper mt-1 d-flex justify-content-end align-items-center flex-wrap">
                <span class="mr-3">Stars</span>
                <!-- <i class="fas fa-star pl-2"></i>
                <i class="fas fa-star pl-2"></i>
                <i class="fas fa-star pl-2"></i>
                <i class="fas fa-star pl-2"></i>
                <i class="fas fa-star pl-2"></i>-->
                <star-rating :star-size="20" :read-only="true" :rounded-corners="true" :rating="5"></star-rating>
              </p>
            </div>
          </div>

          <div class="vx-row ml-3 mr-3">
            <vs-upload action="http://localhost:3000/Documents" />
          </div>
          <div class="vx-row ml-3 mr-3 mb-6">
            <div class="vx-col w-full">
              <div
                class="toggle-wrapper w-100 text-right d-flex justify-content-end align-items-center"
              >
                <span class="mr-3">Convert to .pdf</span>
                <vs-switch color="dark" v-model="tglSwitch" />
              </div>
            </div>
          </div>
          <vs-divider class="mb-5 mt-0 pl-6 pr-6 pb-2 pt-3" />

          <div class="vx-row mt-3 mb-6 pb-3">
            <div class="vx-col w-full text-center">
              <vs-button class="mb-2 btn-yellow mr-3 h-38 pd-0 w-100px" @click="runOfficeToPDF()">Save</vs-button>
              <vs-button class="mb-2 btn-gray h-38 pd-0 w-100px fw-500">Canel</vs-button>
            </div>
          </div>
        </component>
      </div>
    </vs-sidebar>
  </div>
</template>


<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import StarRating from 'vue-star-rating'

import {PDFNet} from '@pdftron/webviewer'
import CoreControls from '../../../../node_modules/@pdftron/webviewer/public/core/CoreControls.js'
export default {
  data () {
    return {
      tglSwitch: true,
      active: false,
      popup_type: '',
      popup_category: '',
      popup_folder: '',
      popup_template: '',
      popup_label: '',
      labels: ['foo', 'bar'],
      settings: {
        maxScrollbarLength: 250,
        wheelSpeed: .100
      },
    }
  },
  components: {
    VuePerfectScrollbar,
    StarRating
  },
  computed: {
    rtl: {
      get () { return this.$vs.rtl },
      set (val) { this.$vs.rtl = val }
    },
    scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
  },
  methods: {
    addLabels () {
      if (this.popup_label) {
        this.labels.push(this.popup_label)
        this.popup_label = ''
      }
    },
    remove (item) {
      this.labels.splice(this.labels.indexOf(item), 1)
    },
    convertOfficeToPDF (inputUrl, outputName, l) {
      CoreControls.office2PDFBuffer(inputUrl, { l }).then(buffer => {
        saveBufferAsPDFDoc(buffer, outputName);
        console.log('Finished downloading ' + outputName);
      });
    },
    runOfficeToPDF () {
      const inputDir = '../assets/files/';
      const docxFilename = 'demo.docx';
      PDFNet.initialize()
      .then(() => convertOfficeToPDF(inputDir + this.file, 'converted.pdf'))
      .then(() => {
        console.log('Test Complete!');
      })
      .catch(err => {
        console.log('An error was encountered! :(', err);
      });
    }
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
