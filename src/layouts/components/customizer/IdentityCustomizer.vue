<template>
  <div id="content-area" class="content-area-reduced h-min-auto h-auto">
    <div class="content-wrapper h-min-auto h-auto">
      <div class="router-view h-min-auto h-auto p-0">
        <div class="router-content h-min-auto h-auto">
          <div class="content-area__content h-min-auto h-auto">
            <div class="grid-demo__layout-container h-min-auto h-auto m-0">
            <div id="theme-customizer" class="uploadmodal-wrapper">
              <!-- Open Customizer Button -->
              <!-- @click.stop="active=!active" -->
              <vs-button
                @click.stop="active = !active"
                color="primary"
                type="filled"
                class="customizer-btn upload-btn identitymodel-btn"
                v-if="sho_button === true"
              >
                <img
                  :src="
                    require('../../../assets/images/sidebar_icon/menu-open.png')
                  "
                />Identity
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
                  @click.stop="active = !active"
                  color="primary"
                  type="filled"
                  class="customizer-btn upload-btn closeupload-btn identitymodel-btn"
                  v-if="sho_button === true"
                >
                  <img
                    :src="
                      require('../../../assets/images/sidebar_icon/menu-open.png')
                    "
                  />
                  Identity
                </vs-button>
                <div class="h-full flow-wrapper">
                  <div
                    class="customizer-header pt-4 pb-4 flex items-center justify-between px-6"
                  >
                    <div>
                      <h4 class="text-white">IDENTITY</h4>
                      <small class="text-white">
                        <i>Biometric Records</i>
                      </small>
                    </div>
                    <feather-icon
                      icon="XIcon"
                      @click.stop="active = false"
                      class="cursor-pointer"
                    ></feather-icon>
                  </div>
                  <vs-divider class="mb-0 mt-0" />
                  <component
                    :is="scrollbarTag"
                    class="scroll-area--customizer pt-0 pb-6"
                    :settings="settings"
                    :key="$vs.rtl"
                  >
                    <div class="traking-wrapper p-0">
                      <div
                        v-for="(item, index) in biometric_data"
                        :key="index"
                        class="identity-wrapper"
                      >
                        <router-link
                          to="#"
                          class="d-flex w-100 align-items-center identity-list"
                        >
                          <div
                            class="identity-img mr-5"
                            @click="onItemClick(item.id)"
                          >
                            <img
                              :src="
                                require('@/assets/images/identity_icon/' +
                                  item.icon_url)
                              "
                              class="img-fluid iconhide-hover"
                            />
                            <img
                              class="iconshow-hover img-fluid"
                              :src="
                                require('@/assets/images/header_icon/' +
                                  item.icon_url)
                              "
                            />
                          </div>
                          <div
                            class="identity-label"
                            @click="onItemClick(item.id)"
                          >
                            <p>{{ item.header }}</p>
                            <h6>
                              <small>
                                <i>{{ item.sub_header }}</i>
                              </small>
                            </h6>
                          </div>
                        </router-link>
                        <div v-if="item.id === 4 && showID === 4">
                          <!-- <h1>Hello</h1> -->
                          <swiper
                            :options="swiperOption"
                            :dir="$vs.rtl ? 'rtl' : 'ltr'"
                            :key="$vs.rtl"
                          >
                            <swiper-slide>
                              <div
                                class="d-flex justify-content-center pt-10 pb-10"
                              >
                                <img
                                  class="iconshow-hover img-fluid"
                                  src="@/assets/images/header_icon/f1.png"
                                />
                              </div>
                            </swiper-slide>
                            <swiper-slide>
                              <div
                                class="d-flex justify-content-center pt-10 pb-10"
                              >
                                <img
                                  class="iconshow-hover img-fluid"
                                  src="@/assets/images/header_icon/f1.png"
                                />
                              </div>
                            </swiper-slide>
                            <swiper-slide>
                              <div
                                class="d-flex justify-content-center pt-10 pb-10"
                              >
                                <img
                                  class="iconshow-hover img-fluid"
                                  src="@/assets/images/header_icon/f1.png"
                                />
                              </div>
                            </swiper-slide>
                            <swiper-slide>
                              <div
                                class="d-flex justify-content-center pt-10 pb-10"
                              >
                                <img
                                  class="iconshow-hover img-fluid"
                                  src="@/assets/images/header_icon/f1.png"
                                />
                              </div>
                            </swiper-slide>
                            <div
                              class="swiper-button-prev"
                              slot="button-prev"
                            ></div>
                            <div
                              class="swiper-button-next"
                              slot="button-next"
                            ></div>
                          </swiper>
                        </div>
                      </div>
                    </div>
                  </component>
                </div>
              </vs-sidebar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'path';
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { log } from 'util';

import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      // active: false,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      settings: {
        maxScrollbarLength: 250,
        wheelSpeed: .100
      },
      biometric_data: [
        {
          id: 1,
          header: this.$t('DOCUMENTIDENTITY'),
          sub_header: this.$t('ScannedDocumentInformation'),
          icon_url: 'id.png'
        },
        {
          id: 2,
          header: this.$t('DIGITALCERTIFICATE'),
          sub_header: this.$t('HardwareStoredCertificate'),
          icon_url: 'chip.png'
        },
        {
          id: 3,
          header: this.$t('FACERECOGNITION'),
          sub_header: this.$t('CapturedFaceRecognitionDetails'),
          icon_url: 'face.png'
        },
        {
          id: 4,
          header: this.$t('FINGERPRINTTEMPLATE'),
          sub_header: this.$t('CapturedFingerprintInformation'),
          icon_url: 'fingerprint.png'
        },
        {
          id: 5,
          header: this.$t('PALMSCAN'),
          sub_header: this.$t('CapturedPalmInformation'),
          icon_url: 'palm.png'
        },
        {
          id: 6,
          header: this.$t('VOICERECORD'),
          sub_header: this.$t('RegisteredVoiceFrequency'),
          icon_url: 'voice.png'
        },

        {
          id: 7,
          header: this.$t('IRISMAP'),
          sub_header: this.$t('CapturedIrisMap'),
          icon_url: 'eye.png'
        },
        {
          id: 8,
          header: this.$t('SIGNATUREGRAPH'),
          sub_header: this.$t('GraphometricSignatureInformation'),
          icon_url: 'signature.png'
        },
      ],
      showID: 4,
      show__button: false
    }
  },
  props: {
    active: {
      type: Boolean
    },
    sho_button: {
      type: Boolean
    }
  },
  methods: {
    onItemClick (id) {
      this.showID = 4
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
    swiper,
    swiperSlide,
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
