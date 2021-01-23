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
    <help-customizer :active="active" />

    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color recover-wrapper">
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
              class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper w-100"
            >
              <div
                class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column"
              >
                <div class="form-wrap mb-10">
                  <div
                    class="vx-card__title mb-4 d-flex justify-content-between"
                  >
                    <div class="wrapper-heading">
                      <h4 class="mb-4">{{$t('ResetYourPassword')}}</h4>
                      <p>{{$t('EnterNewPassword')}}</p>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/help_new.png"
                        alt="login"
                        width="45"
                        class="img-fluid"
                        @click="openHelp"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
                  <div class="tab-wrapper-form">
                    <div
                      class="password-inputcontrol d-flex justify-between align-items-center mt-6"
                    >
                      <div class="password-input">
                        <vs-input
                          ref="password"
                          :type="passwordType"
                          data-vv-validate-on="blur"
                          v-validate="'required|min:8|max: 24|verify_password'"
                          name="password"
                          :label-placeholder="Password"
                          :placeholder="Password"
                          v-model="password"
                          class="w-full mt-0"
                        />
                        <a
                          @click="passwordType = 'password'"
                          v-if="passwordType == 'text'"
                        >
                          <i class="fas fa-eye-slash hs-password show"></i>
                        </a>
                        <a
                          @click="passwordType = 'text'"
                          v-if="passwordType == 'password'"
                        >
                          <i class="fas fa-eye hs-password d-none"></i>
                        </a>
                      </div>
                      <div
                        class="flex flex-wrap justify-between RF-content generate-btn"
                      >
                        <vs-button class="btn-gray" @click="generatePassword">
                          {{ $t("Generate") }}
                        </vs-button>
                      </div>
                    </div>
                    <span class="text-danger text-sm">{{
                      errors.first("password")
                    }}</span>
                    <vs-input
                      type="password"
                      v-validate="'min:7|max:24|confirmed:password'"
                      data-vv-validate-on="blur"
                      data-vv-as="password"
                      name="confirm_password"
                      :label-placeholder="ConfirmPassword"
                      :placeholder="ConfirmPassword"
                      v-model="confirm_password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">{{
                      errors.first("confirm_password")
                    }}</span>
                    <p class="sub-trial-txt mt-1 text-right mt-2 mb-2">
                      <a class="fw-500" v-clipboard:copy="password">
                        <u>{{ $t("CopyPassword") }}</u>
                      </a>
                    </p>
                    <div class="form-group row mt-6">
                      <vue-recaptcha
                        @verify="onVerify"
                        sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ"
                      >
                      </vue-recaptcha>
                    </div>
                    <div class="flex flex-wrap justify-between mb-3 LT-wrap">
                      <router-link to="/login" class="mb-3 mr-4">
                        <u class="fw-500 txt-dark-gray">
                          {{$t('BackToLogin')}}
                        </u>
                      </router-link>
                      <!-- <vs-button type="border" to="/login" class="btn-green">Back To Login</vs-button> -->
                      <vs-button
                        class="mt-6 btn-green w-225px"
                        :disabled="!validateForm"
                        @click="resetPassword"
                      >
                      {{$t('ResetPassword')}}
                      </vs-button>
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
import VueRecaptcha from 'vue-recaptcha';
import HelpCustomizer from '../../layouts/components/customizer/HelpCustomizer.vue'
export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      password: '',
      confirm_password: '',
      key: this.$route.params.key,
      passwordType: 'password',
      robot: false,
      active: false,
      Password: this.$t('Password'),
      ConfirmPassword: this.$t('ConfirmPassword'),
      characters: [
        {
          name: "Lowercase",
          value: "abcdefghijklmnopqrstuvwxyz",
        },
        {
          name: "Uppercase",
          value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
        {
          name: "Numbers",
          value: "0123456789",
        },
        {
          name: "Special Characters",
          value: "!?#@$%&",
        },
      ],
    }
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
    HelpCustomizer,
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.password !== '' && this.confirm_password !== '' && this.key !== '' && this.robot !== false
    }
  },
  created () {
    this.$validator.extend('verify_password', {
      getMessage: field => `The password must contain at least: 2 uppercase letter, 2 lowercase letter, 2 number, and 2 special character`,
      validate: value => {
        var strongRegex = new RegExp("^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[0-9]){2})(?=(.*[!@#?\$%\^&\*]){2})(?=.{8,})");
        return strongRegex.test(value);
      }
    });
    setInterval(() => {
      this.Password = this.$t('Password'),
      this.ConfirmPassword = this.$t('ConfirmPassword')
    }, 1);
  },
  methods: {
    generatePassword () {
      let result1 = "";
      let result2 = "";
      let charactersVal = "";

      // Storang Password Logic
      for (var j = 0; j < this.characters.length; j++) {
        charactersVal = this.characters[j].value;
        for (var i = 0; i < 2; i++) {
          result1 += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length));
        }
      }

      // Set Remaining charactors Randomly
      for (var j = 0; j < this.characters.length; j++) {
        charactersVal += this.characters[j].value;
      }
      for (var i = 0; i < 4; i++) {
        result2 += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length));
      }
      this.password = result1 + result2;
      this.confirm_password = result1 + result2;
    },
    resetPassword () {
      if (!this.validateForm) return
      const payload = {
        userDetails: {
          password: this.password,
          key: this.key
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('auth/resetPassword', payload)
    },
    onVerify (response) {
      if (response) this.robot = true;
    },
    openHelp () {
      this.active == true ? this.active = false : this.active = true
    }
  },
}
</script>
<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";
</style>
