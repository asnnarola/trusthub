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
    <help-customizer :active="active" />
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4 login-subwrapper">
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
                      <h4 class="mb-4">{{ $t("RecoverYourPassword") }}</h4>
                      <p>
                        {{ $t("ForgotPasswordNote") }}
                      </p>
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
                    <vs-input
                      v-validate="'required|email'"
                      data-vv-validate-on="blur"
                      name="email"
                      type="email"
                      :label-placeholder="Email"
                      :placeholder="Email"
                      v-model="email"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">{{
                      errors.first("email")
                    }}</span>

                    <div class="form-group row mt-6">
                      <vue-recaptcha
                        @verify="onVerify"
                        sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ"
                      >
                      </vue-recaptcha>
                    </div>

                    <div class="flex flex-wrap justify-between mt-5 LT-wrap">
                      <router-link to="/login" class="mb-3 mr-4">
                        <u class="fw-500 txt-dark-gray">{{
                          $t("BackToLogin")
                        }}</u>
                      </router-link>
                      <!-- <vs-button type="border" to="/login" class="btn-green">Back To Login</vs-button> -->
                      <vs-button class="btn-green" @click="forgotPassword" :disabled="!validateEmail">{{
                        $t("PasswordRecovery")
                      }}</vs-button>
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
import copyRight from '../../layouts/components/copyright.js'
import HelpCustomizer from '../../layouts/components/customizer/HelpCustomizer.vue'
import axios from '../../axios.js'
import VueRecaptcha from 'vue-recaptcha';
export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      email: '',
      Email: this.$t('Email'),
      robot: false,
      active: false
    }
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
    HelpCustomizer,
  },
  computed: {
    validateEmail () {
      return !this.errors.any() && this.email !== '' && this.robot !== false
    }
  },
  methods: {
    forgotPassword () {
      console.log('validEmail', this.validateEmail);
      if (!this.validateEmail) {
        if(this.email || !this.robot ){
          this.$vs.notify({
              title: 'Error',
              text: 'Invalid Data Please Enter Valid Data',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
        } else if(!this.email){
          this.$vs.notify({
              title: 'Error',
              text: 'Enter your Registerd Email',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
        } else if(!this.robot){
          this.$vs.notify({
              title: 'Error',
              text: 'Invalid Captcha',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
        }
        return
      }
      const payload = {
        userDetails: {
          email: this.email,
          language: localStorage.getItem('selectedLanguage')
        },
        notify: this.$vs.notify
      }
      return axios
      .post("auth/forgot-password", payload.userDetails)
        .then((res) => {
          console.log('=> 3', res);
          if (res&&res.status == 200) {
          this.$vs.notify({
              title: 'Sucess',
              text: res.data.successCode,
              iconPack: 'feather',
              icon: 'icon-mail',
              color: 'success'
            })
            this.$router.push('/login').catch(() => { })
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Registration Failed ..!!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
          this.$vs.loading.close()
        })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.response.data.errorMsg,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    onVerify (response) {
      if (response) this.robot = true;
    },
    openHelp () {
      this.active == true ? this.active = false : this.active = true
    }
  },
  created () {
    setInterval(() => {
      this.Email = this.$t('Email')
    }, 1);
  },
}
</script>
<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";
</style>
