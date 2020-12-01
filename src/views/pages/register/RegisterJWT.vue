<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <div class="vx-row mt-2">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vs-input
          v-validate="'required|alpha_dash|min:3'"
          data-vv-validate-on="blur"
          label-placeholder="First Name"
          name="FirstName"
          placeholder="First Name"
          v-model="firstName"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("FirstName") }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vs-input
          v-validate="'required|alpha_dash|min:3'"
          data-vv-validate-on="blur"
          label-placeholder="Last Name"
          name="LastName"
          placeholder="Last Name"
          v-model="lastName"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("LastName") }}</span>
      </div>
    </div>
    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      label-placeholder="Email"
      placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>
    <div class="password-inputcontrol d-flex justify-between align-items-center mt-6">
      <div class="password-input">
        <vs-input
          ref="password"
          type="password"
          data-vv-validate-on="blur"
          v-validate="'required|min:6|max:10'"
          name="password"
          label-placeholder="Password"
          placeholder="Password"
          v-model="password"
          class="w-full mt-0"
        />
        <i class="fas fa-eye-slash hs-password"></i>
        <!-- <i class="fas fa-eye hs-password d-none"></i> -->
      </div>
      <div class="flex flex-wrap justify-between RF-content generate-btn">
        <vs-button class="btn-gray">Generate </vs-button>
      </div>
    </div>
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>
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
    <div class="d-flex flex-wrap justify-between">
      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-1"
        >I accept the terms & conditions.</vs-checkbox
      >
      <p class="sub-trial-txt mt-1 text-right mb-10">
        <a href="#" class="fw-500"><u>Copy Password?</u></a>
      </p>
    </div>
    <!-- <vs-button  type="border" to="/login" class="mt-6 mb-10 btn-green">Login</vs-button> -->
    <ul class="demo-alignment checkbox-register d-flex justify-content-between align-items-center flex-wrap">
      <li class="d-flex flex-wrap mr-2 checkbox-reg-txt">
        Basic<vs-checkbox class="checkbox-reginput" color="warning" v-model="basic" />
      </li>
      <li class="d-flex flex-wrap mr-2 checkbox-reg-txt">
        Electron Signature<vs-checkbox class="checkbox-reginput" color="warning" v-model="electronSignatur" />
      </li>
      <li class="d-flex flex-wrap mr-2 checkbox-reg-txt">
       Qualified Certificate <vs-checkbox class="checkbox-reginput" color="warning" v-model="qualifiedCertificate" />
      </li>
      <li class="d-flex flex-wrap mr-0 checkbox-reg-txt">
       ABIS <vs-checkbox class="checkbox-reginput" color="warning" v-model="abis" />
      </li>
    </ul>
    <div class="text-right">
      <vs-button
        class="mt-6 btn-green w-225px"
        @click="registerUserJWt"
        :disabled="!validateForm"
        >Subscribe</vs-button
      >
    </div>
    <div>
      <p class="sub-trial-txt mt-3 text-right mb-10">
        <a class="f-size-14" href="/login">
          <u>Login To An Existing Account</u>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      basic: false,
      electronSignatur: false,
      qualifiedCertificate: false,
      abis: false,
      step: {},
      //     step0: false,
      //     step1: true,
      //     step2: false,
      //     step3: false,

      isTermsConditionAccepted: true
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    registerUserJWt () {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return
      this.step = {
        step1: false,
        step2: true,
        step3: false,
      }
      this.$emit("gosetp", this.step);

      // const payload = {
      //   userDetails: {
      //     displayName: this.firstName + this.lastName,
      //     email: this.email,
      //     password: this.password,
      //     confirmPassword: this.confirm_password
      //   },
      //   notify: this.$vs.notify
      // }
      // this.$store.dispatch('auth/registerUserJWT', payload)
    }
  }
}
</script>
