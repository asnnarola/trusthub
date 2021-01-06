<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center login-wrapper"
    id="page-register"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 sm:m-0 m-4 login-subwrapper">
    <help-customizer :active ="active"/>
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
                <p class="attention-title">{{$t("ATTENTION")}}</p>
                <p class="attention-text" v-if="step.step1 == true">
                  {{$t('AttentionElectronStep1')}}
                </p>
                <p class="attention-text" v-if="step.step2 == true">
                  {{$t('AttentionElectronStep2')}}
                </p>
                <p class="attention-text" v-if="step.step2 == true">
                  {{$t('AttentionElectronStep2_2')}}
                </p>
                <p class="attention-text" v-if="step.step3 == true">
                  {{$t('AttentionElectronStep3')}}
                </p>
                <p class="attention-text" v-if="step.step4 == true">
                  {{$t('AttentionElectronStep4')}}
                </p>
                <p class="attention-text" v-if="step.step5 == true">
                  {{$t('AttentionElectronStep5')}}
                </p>
              </div>
              <div
                class="appstore-wrapper d-flex mb-5 mr-10 justify-content-end"
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
                      <h4 class="mb-4" v-if="step.step1 == true || step.step2 == true">
                        {{$t('CreateAccount')}}
                      </h4>
                      <h4 class="mb-4" v-if="step.step3 == true">{{$t('AccountCreated')}}</h4>
                      <h4 class="mb-4" v-if="step.step4 == true || step.step5 == true">
                        {{$t('Activation')}}
                      </h4>
                      <p v-if="step.step1 == true">{{$t('Electronheader1')}}</p>
                      <p v-if="step.step2 == true">{{$t('Electronheader2')}}</p>
                      <p v-if="step.step3 == true">{{$t('Electronheader3')}}</p>
                      <p v-if="step.step4 == true || step.step5 == true">{{$t('Electronheader4')}}</p>
                      <span class="fw-500 txt-gray" v-if="step.step1 == true">
                        {{$t('step1of5')}}
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step2 == true">
                        {{$t('step2of5')}}
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step3 == true">
                        {{$t('step3of5')}}
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step4 == true">
                        {{$t('step4of5')}}
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step5 == true">
                        {{$t('step5of5')}}
                      </span>
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
                  <Electronsignaturestep1
                    v-if="step.step1 == true"
                    @gosetp="step = $event"
                    @RegisterData="RegisterData = $event"
                  ></Electronsignaturestep1>
                  <Electronsignaturestep2
                    v-if="step.step2 == true"
                    :RegisterData = "RegisterData"
                    @gosetp="step = $event"
                  ></Electronsignaturestep2>
                  <Electronsignaturestep3
                    v-if="step.step3 == true"
                    @gosetp="step = $event"
                  ></Electronsignaturestep3>
                  <Electronsignaturestep4
                    v-if="step.step4 == true"
                    @gosetp="step = $event"
                  ></Electronsignaturestep4>
                  <Electronsignaturestep5
                    v-if="step.step5 == true"
                    @gosetp="step = $event"
                  ></Electronsignaturestep5>
                  <div
              class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between"
            >
              <div class="login-logo footer-attention-txt">
                <p class="attention-title">{{$t("ATTENTION")}}</p>
                <p class="attention-text" v-if="step.step1 == true">
                  {{$t('AttentionElectronStep1')}}
                </p>
                <p class="attention-text" v-if="step.step2 == true">
                  {{$t('AttentionElectronStep2')}}
                </p>
                <p class="attention-text" v-if="step.step2 == true">
                  {{$t('AttentionElectronStep2_2')}}
                </p>
                <p class="attention-text" v-if="step.step3 == true">
                  {{$t('AttentionElectronStep3')}}
                </p>
                <p class="attention-text" v-if="step.step4 == true">
                  {{$t('AttentionElectronStep4')}}
                </p>
                <p class="attention-text" v-if="step.step5 == true">
                  {{$t('AttentionElectronStep5')}}
                </p>
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
        </div>
      </vx-card>
      <div class="cpy-txt position-relative">
        <p class="text-right mt-2 text-white">
          {{ copyRightText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Electronsignaturestep1 from './Electronsignaturestep-1'
import Electronsignaturestep2 from './Electronsignaturestep-2'
import Electronsignaturestep3 from './Electronsignaturestep-3'
import Electronsignaturestep4 from './Electronsignaturestep-4'
import Electronsignaturestep5 from './Electronsignaturestep-5'

import copyRight from '../../../../layouts/components/copyright.js'
import HelpCustomizer from '../../../../layouts/components/customizer/HelpCustomizer.vue'
export default {
  components: {
    Electronsignaturestep1,
    Electronsignaturestep2,
    Electronsignaturestep3,
    Electronsignaturestep4,
    Electronsignaturestep5,
    HelpCustomizer
  },
  data () {
    return {
      copyRightText: copyRight[0].title,
      step: {
        step1: true,
        step2: false,
        step3: false,
        step4: false,
        step5: false,
      },
      RegisterData:{},
      active : false
    }
  },
  methods:{
    openHelp(){
      this.active == true ? this.active = false : this.active = true
    }
  },
  created() {
    // if (this.step.step2 == true) {
      // setInterval(() => {
      //     console.log('Data=>',this.RegisterData.email, this.step);
      // }, 1);
    // }
    this.$i18n.locale = localStorage.getItem('currentLanguage')
    if(this.$router.currentRoute.fullPath === '/electron-signature-register'){
      this.step =  {
        step1 : true,
        step2 : false,
        step3 : false,
        step4 : false,
        step : false,
      }
    } else if (this.$router.currentRoute.params) {
      console.log('===>>>',this.$router.currentRoute.params);
      this.step =  {
        step1 : false,
        step2 : false,
        step3 : false,
        step4: true,
        step5: false,
      }
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
