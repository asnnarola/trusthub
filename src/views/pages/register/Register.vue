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
    <help-customizer />
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
                <p class="attention-title">ATTENTION</p>
                <p class="attention-text">
                  Selecting Different registration Options Will Produce
                  different registration procedure with different users
                  permissions inside of the platform Anyway you will be able to
                  upgrade at any time merging properties.
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
              class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper"
            >
              <div
                class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column"
              >
                <div class="form-wrap">
                  <div
                    class="vx-card__title mb-4 d-flex justify-content-between"
                  >
                    <div class="wrapper-heading">
                      <h4 class="mb-4">{{step.step1 == true ? 'Create Account' : 'Account Created'}}</h4>
                      <p v-if="step.step1 == true">Fill The Below Form To Create a New Account</p>
                      <p v-if="step.step2 == true">Follow the instruction to Complete the Registration</p>
                      <p v-if="step.step3 == true">Account confirmation procedure completed</p>
                      <span class="fw-500 txt-gray" v-if="step.step1 == true">
                        Step 1 of 3
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step2 == true">
                        Step 2 of 3
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step3 == true">
                        Step 3 of 3
                      </span>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/help_new.png"
                        alt="login"
                        width="45"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
                  <register-jwt
                    v-if="step.step1 == true"
                    @gosetp="step = $event"
                  ></register-jwt>
                  <register-jwt2
                    v-if="step.step2 == true"
                    @gosetp="step = $event"
                  ></register-jwt2>
                  <register-jwt3
                    v-if="step.step3 == true"
                    @gosetp="step = $event"
                  ></register-jwt3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 text-white">
          {{ copyRightText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterJwt from './RegisterJWT.vue'
import RegisterJwt2 from './RegisterJWT2.vue'
import RegisterJwt3 from './RegisterJWT3.vue'
import copyRight from '../../../layouts/components/copyright.js'
import HelpCustomizer from '../../../layouts/components/customizer/HelpCustomizer.vue'
export default {
  components: {
    RegisterJwt,
    RegisterJwt2,
    RegisterJwt3,
    HelpCustomizer
  },
  data () {
    return {
      copyRightText: copyRight[0].title,
      step: {
        step1: true,
        step2: false,
        step3: false,
      },
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
