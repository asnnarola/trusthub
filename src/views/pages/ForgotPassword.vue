<!-- =========================================================================================
    File Name: ForgotPassword.vue
    Description: FOrgot Password Page
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
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column ">
              <div class="login-logo">
                <img src="@/assets/images/login_icon/logo.png" alt="login" class="img-fluid" />
              </div>
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper">
              <div class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column">
                <div class="form-wrap mb-10">
                  <div class="vx-card__title mb-4 d-flex justify-content-between">
                    <div class="wrapper-heading">
                      <h4 class="mb-4">Recover your password</h4>
                      <p>Please enter your email address and we'll send you instructions on how to reset your password.</p>
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
                  <div class="tab-wrapper-form">
                    <vs-input type="email" label-placeholder="Email" v-model="value1" class="w-full mb-8" />
                    <div class="flex flex-wrap justify-between mb-3 LT-wrap">
                      <router-link to="/login" class="mb-3"><u class="fw-500 txt-dark-gray">Return to Login Page</u></router-link>
                      <!-- <vs-button type="border" to="/login" class="btn-green">Back To Login</vs-button> -->
                      <vs-button class="btn-green">Password Recovery</vs-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 text-white">
        {{copyRightText}}</p>
      </div>
    </div>
  </div>

</template>

<script>
import copyRight from '../../layouts/components/copyright.js'
export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      value1: ''
    }
  }
}
</script>
<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";
</style>
