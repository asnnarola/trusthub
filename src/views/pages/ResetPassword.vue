<!-- =========================================================================================
    File Name: ResetPassword.vue
    Description: Reset Password Page
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
            <div class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column">
              <div class="login-logo">
                <img
                  src="@/assets/images/login_icon/logo.png"
                  alt="login"
                  class="img-fluid"
                />
              </div>
            </div>

            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper"
            >
              <div
                class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column"
              >
                <div class="form-wrap mb-10">
                  <div
                    class="vx-card__title mb-4 d-flex justify-content-between"
                  >
                    <div class="wrapper-heading">
                      <h4 class="mb-4">Reset your password</h4>
                      <p>Please enter your new password</p>
                    </div>
                    <!-- <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/message-gray.png"
                        alt="login"
                        width="45"
                        class="img-fluid"
                      />
                    </div> -->
                  </div>
                  <hr class="border-lightgray" />
                  <div class="tab-wrapper-form">
                    <vs-input
                      ref="password"
                      type="password"
                      data-vv-validate-on="blur"
                      v-validate="'required|min:8|max: 24|verify_password'"
                      name="password"
                      label-placeholder="Password"
                      placeholder="Password"
                      v-model="password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">{{
                      errors.first("password")
                    }}</span>

                    <vs-input
                      type="password"
                      v-validate="'min:6|max:10|confirmed:password'"
                      data-vv-validate-on="blur"
                      data-vv-as="password"
                      name="confirm_password"
                      label-placeholder="Confirm Password"
                      placeholder="Confirm Password"
                      v-model="confirm_password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">{{
                      errors.first("confirm_password")
                    }}</span>

                    <div class="flex flex-wrap justify-between mb-3 LT-wrap">
                      <router-link to="/login" class="mb-3 mr-4"
                        ><u class="fw-500 txt-dark-gray"
                          >Return to Login Page</u
                        ></router-link
                      >
                      <!-- <vs-button type="border" to="/login" class="btn-green">Back To Login</vs-button> -->
                      <vs-button
                        class="mt-6 btn-green w-225px"
                        :disabled="!validateForm"
                        @click="resetPassword"
                        >Reset Password </vs-button
                      >
                      <!-- <vs-button class="btn-green">Reset Password</vs-button> -->
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
          {{ copyRightText }}
        </p>
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
      password: '',
      confirm_password: '',
      key: this.$route.params.key,
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.password !== '' && this.confirm_password !== '' && this.key !== ''
    }
  },
  created() {
    this.$validator.extend('verify_password', {
      getMessage: field => `The password must contain at least: 2 uppercase letter, 2 lowercase letter, 2 number, and 2 special character`,
      validate: value => {
        var strongRegex = new RegExp("^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[0-9]){2})(?=(.*[!@#?\$%\^&\*]){2})(?=.{8,})");
        return strongRegex.test(value);
      }
    });
  },
  methods: {
    resetPassword(){
      if (!this.validateForm) return
      const payload = {
        userDetails: {
          password: this.password,
          key: this.key
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('auth/resetPassword', payload)
    }
  },
}
</script>
<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";
</style>
