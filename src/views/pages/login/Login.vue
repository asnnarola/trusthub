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
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column">
              <div class="login-logo">
                <img src="@/assets/images/login_icon/logo.png" alt="login" class="img-fluid" />
              </div>
              <div class="appstore-wrapper d-flex mb-5 mr-10 justify-content-end">
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/Android-store.png"
                    alt="login"
                    class="img-fluid"
                  />
                </router-link>
                <router-link to="/">
                  <img src="@/assets/images/login_icon/App-store.png" alt="login" class="img-fluid" />
                </router-link>
              </div>
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper">
              <div class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column">
                <div class="form-wrap">
                  <div class="vx-card__title mb-4 d-flex justify-content-between">
                    <div class="wrapper-heading" v-if="step.step0 == true">
                      <h4 class="mb-4">Login</h4>
                      <p>Welcome back, please login to your account.</p>
                    </div>
                    <div class="wrapper-heading" v-else>
                      <h4 class="mb-4">Activation</h4>
                      <p>Welcome to the certificate activation process</p>
                      <span v-if="step.step1 == true">Step 1 of 3</span>
                      <span v-if="step.step2 == true">Step 2 of 3</span>
                      <span v-if="step.step3 == true">Step 3 of 3</span>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/message-gray.png"
                        alt="login"
                        width="45"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
                  <!-- <vs-tabs>
                  <vs-tab label="JWT">-->
                  <login-jwt @gosetp="step = $event" v-if="step.step0 == true"></login-jwt>
                  <login-step1
                    @getId="userId = $event"
                    @getActivatiobCode="ActivationCode = $event"
                    v-if="step.step1 == true"
                  ></login-step1>
                  <login-step2 v-if="step.step2 == true"></login-step2>
                  <login-step3 v-if="step.step3 == true"></login-step3>
                </div>
                <div class="txt-or text-center mb-2"  v-if="step.step0 === true || step.step1 === true">
                  <span>AND</span>
                  <div class="separte-border"></div>
                </div>
                <div class="bottom-menu-icon mt-0 mb-2"  v-if="step.step0 === true || step.step1 === true">
                  <ul class="d-flex flex-wrap align-items-center">
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/id.png" />
                    </li>
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/chip.png" />
                    </li>
                  </ul>
                  <ul class="d-flex flex-wrap align-items-center">
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/face.png" />
                    </li>
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/fingerprint.png" />
                    </li>
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/palm.png" />
                    </li>
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/voice.png" />
                    </li>
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/eye.png" />
                    </li>
                  </ul>
                  <ul class="d-flex flex-wrap align-items-center">
                    <li class="starred-page">
                      <img src="@/assets/images/header_icon/signature.png" />
                    </li>
                  </ul>
                </div>
                <div class="vs-row">
                  <div class="vs-sm-12">
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step1 == true">
                      <p>Note: Additional identification procedure based on Id card,previously stored certificates, boimetrical parameters, graphometic signature or live operator could be required</p>
                    </div>
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step2 == true">
                      <p>Note: If you don't want to generate a new unique secure password, then use a strong password with at least 12 characters, at least two capital letters and at least one number and jolly character</p>
                    </div>
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step3 == true">
                      <p>Note: Be sure to have full access to the email account you declared during account creation. You will recive all resuming information and codes to revoke, suspend or renew your certificate in that inbox.</p>
                    </div>
                  </div>
                </div>
                <div class="vs-row">
                  <div class="vs-sm-12">
                    <vs-button
                      class="btn-green mxw-130 float-right"
                      @click="gotoNext()"
                      v-if="step.step1 == true || this.step.step2 == true"
                    >Next</vs-button>
                  </div>
                </div>
                <div class="vs-row" :hidden="step.step0 == true">
                  <div class="vs-sm-12">
                    <div class="mt-4 mb-5">
                      <h6 v-if="step.step1 === true">Warning: Activation procedure can be performed only if you have exclusive control of codes and complete access to the required tools</h6>
                      <h6 v-if="step.step2 === true">Warning: Accordingly with international security policies, weeks password will not been accepted.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 text-white">{{copyRightText}}&copy;</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginJwt from './LoginJWT.vue';
import LoginStep1 from './LoginJWT_step1.vue'
import LoginStep2 from './LoginJWT_step2.vue'
import LoginStep3 from './LoginJWT_step3.vue'
import copyRight from '../../../layouts/components/copyright.js';

export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      step: {
        step0: true,
        step1: false,
        step2: false,
        step3: false,
      },
      userId: '',
      ActivationCode: ''
    }
  },
  components: {
    LoginJwt,
    LoginStep1,
    LoginStep2,
    LoginStep3
  },
  methods: {
    gotoNext () {
      if (this.step.step1 == true) {
        this.step = {
          step0: false,
          step1: false,
          step2: true,
          step3: false,
        }
      } else if (this.step.step2 == true) {
        console.log('AB here');
        this.step = {
          step0: false,
          step1: false,
          step2: false,
          step3: true,
        }
      }
      console.log('Data =>', this.userId, this.ActivationCode);
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
</style>
