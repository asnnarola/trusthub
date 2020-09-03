<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center login-wrapper" id="page-register">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
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
                    <div class="wrapper-heading">
                      <h4 class="mb-4">Create Account</h4>
                      <p>Fill The Below Form To Create a New Account</p>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/message-gray.png"
                        alt="login" width="45"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
                  <register-jwt></register-jwt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 text-white">
          {{copyRightText}}
          </p>
      </div>
    </div>
  </div>
</template>


<script>
import RegisterJwt from './RegisterJWT.vue'
import RegisterFirebase from './RegisterFirebase.vue'
import RegisterAuth0 from './RegisterAuth0.vue'
import copyRight from '../../../layouts/components/copyright.js'
export default {
  components: {
    RegisterJwt,
    RegisterFirebase,
    RegisterAuth0
  },
  data() {
    return {
      copyRightText: copyRight[0].title,
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
