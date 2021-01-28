<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex-column flex w-full bg-img vx-row no-gutter items-center justify-center login-wrapper"
    id="page-login"
  >
    <help-customizer :active="active" />
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 sm:m-0 m-4 login-subwrapper">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div
              class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between"
            >
              <div class="login-logo">
                <img
                  src="@/assets/images/login_icon/logo.png"
                  alt="login"
                  class="img-fluid"
                />
                <p class="attention-title">{{ $t("ATTENTION") }}</p>
                <p class="attention-text">{{ $t("AttentionLoginTest") }}</p>
                <!-- <p>Selecting Different registration Options Will Produce different registration procedure with different users permissions inside of the platform</p>
                <p> Anyway you will be able to upgrade at any time merging properties.</p> -->
              </div>
              <!-- ProgressBar -->
              <div class="vs-row" v-if="ProgressBar1 === true">
                <div class="vs-sm-12 vs-md-12 vs-lg-12 header-loading-bar">
                  <div class="loading-bar">
                    <div class="loading-count">{{ percent }}%</div>
                    <div
                      class="percentage"
                      :style="{ width: percentage + '%' }"
                    ></div>
                  </div>
                  <div class="text-center" v-if="percent > 0 && percent < 99">
                    {{ $t("Loading") }}
                  </div>
                  <div class="text-center" v-else-if="percent >= 100">
                    {{ $t("Completed") }}
                  </div>
                </div>
              </div>
              <div
                class="appstore-wrapper d-flex mb-4 mr-10 justify-content-end"
              >
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/Android-store.png"
                    alt="Android Store"
                    class="img-fluid"
                  />
                </router-link>
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/App-store.png"
                    alt="Apple Store"
                    class="img-fluid"
                  />
                </router-link>
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/download-button.png"
                    alt="Download"
                    class="img-fluid"
                  />
                </router-link>
              </div>
            </div>

            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper w-100"
            >
              <div
                class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column"
              >
                <div class="form-wrap">
                  <div
                    class="vx-card__title mb-4 d-flex justify-content-between"
                  >
                    <div class="wrapper-heading">
                      <h4 class="mb-4">{{ $t("Login") }}</h4>
                      <p class="fw-500">
                        {{ $t("Loginheader") }}
                      </p>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/help_new.png"
                        alt="login"
                        width="45"
                        class="img-fluid"
                        @click="openHelp()"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
                  <login-jwt
                    @showProgressBar="ProgressBar1 = $event"
                  ></login-jwt>
                </div>
                <div class="vs-row" v-if="ProgressBar1 === true">
                  <div class="vs-sm-12 vs-md-12 vs-lg-12 footer-loadingbar">
                    <div class="loading-bar">
                      <div class="loading-count">{{ percent }}%</div>
                      <div
                        class="percentage"
                        :style="{ width: percentage + '%' }"
                      ></div>
                    </div>
                    <div class="text-center" v-if="percent > 0 && percent < 99">
                      {{ $t("Loading") }}
                    </div>
                    <div class="text-center" v-else-if="percent >= 100">
                      {{ $t("Completed") }}
                    </div>
                  </div>
                </div>
                <div class="txt-or text-center mb-2">
                  <span class="fw-500">{{ $t("AND_OR") }}</span>
                  <div class="separte-border"></div>
                </div>
                <vs-popup
                  class="Signature-popup"
                  classContent="popup-example"
                  title
                  :active.sync="Pad_Show"
                >
                  <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12 mt-2">
                    <div class="Signature_pad pl-5 pr-5">
                      <div class="row">
                        <div class="wrapper position-relative">
                          <div
                            class="select-block d-flex justify-content-between pt-6"
                          >
                            <div class="content-left">
                              <h6 class="text-white mb-1 f-15">
                                <b>{{ $t("GraphometricLogin") }}</b>
                              </h6>
                              <p class="text-white f-13">
                                {{ $t("GraphicSignaturHeading") }}
                              </p>
                            </div>
                            <div class="content-right">
                              <h5
                                class="txt-dark-gray"
                                v-if="
                                  min >= 0 && min <= 15 && signaturTime == false
                                "
                              >
                                <b
                                  >0{{ min }}:{{
                                    second >= 10 ? second : "0" + second
                                  }}</b
                                >
                              </h5>
                              <h5 class="txt-dark-gray" v-else>00:00</h5>
                            </div>
                          </div>
                          <div class="signpad-block">
                            <div class="signpad-arrow1 position-absolute">
                              <img
                                width="25px"
                                height="25px"
                                src="@/assets/images/login_icon/arrow-green.png"
                                class="img-fluid"
                              />
                            </div>
                            <div class="signpad-arrow2 position-absolute">
                              <img
                                width="25px"
                                height="25px"
                                src="@/assets/images/login_icon/arrow-green.png"
                                class="img-fluid active"
                              />
                            </div>
                            <div class="signpad-arrow3 position-absolute">
                              <img
                                width="25px"
                                height="25px"
                                src="@/assets/images/login_icon/arrow-green.png"
                                class="img-fluid"
                              />
                            </div>
                            <div class="signpad-arrow4 position-absolute">
                              <img
                                width="25px"
                                height="25px"
                                src="@/assets/images/login_icon/arrow-green.png"
                                class="img-fluid"
                              />
                            </div>
                          </div>
                          <canvas
                            id="signPad"
                            ref="signPad"
                            class="signature-pad w-100"
                            style="background-color: transparent !important"
                            @mousemove="onCanvasChange($event)"
                          />
                          <div class="dash-line"></div>
                          <p class="text-center mb-1 fw-500">
                            {{ $t("Makeyoursignature") }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <vs-divider class="mb-5 mt-0 green-divider pl-5 pr-5" />
                    <vs-row class="align-items-center pl-5 pr-5">
                      <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-7">
                        <vs-button
                          class="btn green-btn mr-2 mb-2"
                          @click="clearSignature"
                          >{{ $t("Clear") }}</vs-button
                        >
                        <vs-button
                          class="btn green-btn mr-2 mb-2"
                          @click="undoSignature"
                          >{{ $t("Undo") }}</vs-button
                        >
                        <vs-button class="btn green-btn mr-2 mb-2">
                          {{ $t("Login") }}
                        </vs-button>
                        <!-- @click="undoSignature" -->
                      </div>
                      <div
                        class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-5 text-right signdetail-block"
                      >
                        <p class="text-white f-13">
                          <i
                            >{{ $t("Geolocalization") }}: 40.689263-74.044505</i
                          >
                        </p>
                        <p class="text-white f-13">
                          <i>UTC {{ CurrentDate }}</i>
                        </p>
                        <p class="text-white f-13">
                          <i>Device Id: FDD76471-FCF9-4172-BAAF-D78924A4E62C</i>
                        </p>
                      </div>
                    </vs-row>
                  </div>
                </vs-popup>
                <div class="bottom-menu-icon mt-0 mb-4' position-relative">
                  <ul
                    class="d-flex flex-wrap align-items-center position-relative"
                  >
                    <li
                      class="starred-page"
                      v-for="img in Biometrical_Icon1"
                      :key="img.icon_url"
                    >
                      <router-link to="#">
                        <img
                          :src="
                            require('@/assets/images/header_icon/' +
                              img.icon_url)
                          "
                        />
                      </router-link>
                    </li>
                  </ul>
                  <ul
                    class="d-flex flex-wrap align-items-center position-relative"
                  >
                    <li
                      class="starred-page"
                      v-for="img in Biometrical_Icon2"
                      :key="img.icon_url"
                      @click="onBiometricalclick(img.lable)"
                    >
                      <router-link to="#">
                        <img
                          :src="
                            require('@/assets/images/header_icon/' +
                              img.icon_url)
                          "
                        />
                      </router-link>
                    </li>
                  </ul>
                  <ul
                    class="d-flex flex-wrap align-items-center position-relative"
                  >
                    <li
                      class="starred-page"
                      v-for="img in Biometrical_Icon3"
                      :key="img.icon_url"
                      @click="onBiometricalclick(img.lable)"
                    >
                      <router-link to="#">
                        <img
                          :src="
                            require('@/assets/images/header_icon/' +
                              img.icon_url)
                          "
                        />
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div
                  class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between"
                >
                  <div class="login-logo footer-attention-txt">
                    <p class="attention-title">{{ $t("ATTENTION") }}</p>
                    <p class="attention-text">{{ $t("AttentionLoginTest") }}</p>
                  </div>
                  <div
                    class="appstore-wrapper d-flex mb-5 mr-10 justify-content-end footer-appstore-wrapper"
                  >
                    <router-link to="/">
                      <img
                        src="@/assets/images/login_icon/Android-store.png"
                        alt="Android Store"
                        class="img-fluid"
                      />
                    </router-link>
                    <router-link to="/">
                      <img
                        src="@/assets/images/login_icon/App-store.png"
                        alt="Apple Store"
                        class="img-fluid"
                      />
                    </router-link>
                    <router-link to="/">
                      <img
                        src="@/assets/images/login_icon/download-button.png"
                        alt="Download"
                        class="img-fluid"
                      />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt position-relative">
        <p class="text-right mt-2 text-white">{{ copyRightText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginJwt from './LoginJWT.vue';
import HelpCustomizer from '../../../layouts/components/customizer/HelpCustomizer.vue'
import copyRight from '../../../layouts/components/copyright.js';
import SignaturePad from 'signature_pad'
import axios from '../../../axios';


export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      ProgressBar1: false,
      active: false,
      userId: '',
      ActivationCode: '',
      password: '',
      confirm_Password: '',
      percentage: 0,
      min: 4,
      second: 60,
      Biometrical_Icon1: [
        {
          id: 1,
          icon_url: 'id.png',
          lable: 'id'
        },
        {
          id: 2,
          icon_url: 'chip.png',
          lable: 'chip'
        }
      ],
      Biometrical_Icon2: [
        {
          id: 1,
          icon_url: 'face.png',
          lable: 'face'
        },
        {
          id: 2,
          icon_url: 'fingerprint.png',
          lable: 'finger print'
        },
        {
          id: 3,
          icon_url: 'palm.png',
          lable: 'palm'
        },
        {
          id: 4,
          icon_url: 'voice.png',
          lable: "voice"
        },
        {
          id: 5,
          icon_url: 'eye.png',
          lable: 'eye'
        }
      ],
      Biometrical_Icon3: [
        {
          id: 1,
          icon_url: 'signature.png',
          lable: 'signature'
        },
      ],
      otp: {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
        val5: '',
        val6: ''
      },
      location: null,
      errorStr: null,
      // Signature
      Pad_Show: false,
      Auth_Show: false,
      signaturTime: false,
      CurrentDate: new Date().toISOString(),
      signaturePad: SignaturePad,
    }

  },
  components: {
    LoginJwt,
    HelpCustomizer
  },
  created () {
    if (this.$router.currentRoute.query.token) {
      console.log('===>>>', this.$router.currentRoute.query.token);
      const token = this.$router.currentRoute.query.token
      axios({
        method: 'get',
        url: 'users/me',
        headers: { Authorization: 'Bearer ' + token }
      }).then(res => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem('accessToken', token)
          this.$store.commit('UPDATE_USER_INFO', res.data, { root: true })
          this.$store.commit('SET_BEARER', token)
          this.$i18n.locale = localStorage.getItem('currentLanguage')
          const accessToken = localStorage.getItem('accessToken')
          if (accessToken) {
            this.$router.push('/dashboard').catch(() => { })
          }
        }
      })
    } else {


      this.$i18n.locale = localStorage.getItem('currentLanguage')
      const token = localStorage.getItem('accessToken')
      if (token) {
        this.$router.push('/dashboard').catch(() => { })
      }
      setInterval(() => {
        if (this.ProgressBar1 === true) {
          var intval = setInterval(() => {
            if (this.percentage < 100)
              this.percentage += .1;
            else
              clearInterval(intval);
          }, 10);
        }
      }, 0);
    }
  },
  computed: {
    percent () {
      return this.percentage.toFixed();
    },
  },
  methods: {
    openHelp () {
      this.active == true ? this.active = false : this.active = true
    },
    // Signature Pad
    async signpadShow () {
      this.Pad_Show = true
      setInterval(() => {
        if (this.min >= 0) {
          this.second--
          if (this.second == 0) {
            this.min--
            this.second = 60
          }
        } else {
          this.signaturTime = true
        }
      }, 1000);
      // setInterval(() => {
      //   if(this.min >= 0){
      //   this.second--
      //   if (this.second == 0) {
      //     this.min--
      //     if(this.min < 0 && this.second == 0){
      //       this.min = 0,
      //       this.second = 0
      //       clearInterval()
      //     }
      //     this.second = 60
      //   }
      // }
      // }, 1000);
      const canvas = await document.getElementById('signPad')
      console.log(this.$refs.signPad);
      console.log(document.getElementById('signPad'));
      this.signaturePad = new SignaturePad(this.$refs.signPad, {
        backgroundColor: 'transparent'
      });
      console.log(this.signaturePad.toData().length)
      window.onresize = this.resizeCanvas(canvas);
    },
    authShow () {
      this.Auth_Show = true
    },
    resizeCanvas (canvas) {
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
    },
    undoSignature () {
      var data = this.signaturePad.toData();
      console.log(data.length);
      if (data) {
        data.pop();
        this.signaturePad.fromData(data);
      }
    },
    clearSignature () {
      this.min = 4;
      this.second = 60;
      var data = this.signaturePad.toData();
      console.log(data.length);
      this.signaturePad.clear();
      this.signaturTime = false
      setInterval(() => {
        if (this.min >= 0) {
          this.second--
          if (this.second == 0) {
            this.min--
            this.second = 60
          }
        } else {
          this.signaturTime = true
        }
      }, 1000);
    },
    onBiometricalclick (lable) {
      console.log(lable);
      if (lable == 'signature') {
        this.signpadShow()
        // this.authShow()
      }
      if (lable == 'finger print') {
        this.authShow()
      }
    },
    onCanvasChange (e) {
      // console.log('Event =>', e);
      var data = this.signaturePad.toData();
      // console.log(data.length);
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";

.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}

// progress bar
.container {
  text-align: right;
  font-size: 8rem;
  color: #555;
}

.loading-bar {
  position: relative;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
  height: 15px;
  overflow: hidden;
  background: #fff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 1px solid #ddd;
  // box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: 0.4), 0 -1px 1px #fff,
  //   0 1px 0 #fff;
  .loading-count {
    z-index: 11;
    position: relative;
    font-weight: 500;
    color: #6d6c6c;
    font-size: 12px;
    line-height: 15px;
  }
  .percentage {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    display: block;
    height: 100%;
    background-color: #f9c201;
    background-size: 30px 30px;
    // background-image: linear-gradient(135deg, rgba($color: #fff, $alpha: .15) 25%, transparent 25%,
    //   transparent 50%, rgba($color: #fff, $alpha: .15) 50%,
    //   rgba($color: #fff, $alpha: .15) 75%, transparent 75%,
    //   transparent);
    animation: animate-stripes 4s linear infinite;
  }
}
.header-loading-bar {
  @media screen and (max-width: 991px) {
    display: none;
  }
}
.footer-loadingbar {
  @media screen and (min-width: 992px) {
    display: none;
  }
  @media screen and (max-width: 991px) {
    display: block;
  }
}

@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}
</style>
