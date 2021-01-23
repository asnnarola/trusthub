<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix tab-wrapper-form">
    <div class="vx-row mt-2">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vs-input
          v-validate="'required|alpha_dash|min:3|max:24'"
          data-vv-validate-on="blur"
          :label-placeholder="FirstName"
          name="FirstName"
          :placeholder="FirstName"
          v-model="firstName"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("FirstName") }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vs-input
          v-validate="'required|alpha_dash|min:3|max:24'"
          data-vv-validate-on="blur"
          :label-placeholder="LastName"
          name="LastName"
          :placeholder="LastName"
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
      :label-placeholder="Email"
      :placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>
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
        <a @click="passwordType = 'password'" v-if="passwordType == 'text'">
          <i class="fas fa-eye-slash hs-password show"></i>
        </a>
        <a @click="passwordType = 'text'" v-if="passwordType == 'password'">
          <i class="fas fa-eye hs-password d-none"></i>
        </a>
      </div>
      <div class="flex flex-wrap justify-between RF-content generate-btn">
        <vs-button class="btn-gray" @click="generatePassword">
          {{ $t("Generate") }}
        </vs-button>
      </div>
    </div>
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>
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
      <vue-recaptcha @verify="onVerify" sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ">
      </vue-recaptcha>
    </div>
    <div class="d-flex flex-wrap justify-between mt-2">
      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-1 mb-2 ml-0">
        {{ $t("AcceptTermsConditions") }}
      </vs-checkbox>
    </div>
    <!-- <vs-button  type="border" to="/login" class="mt-6 mb-10 btn-green">Login</vs-button> -->
    <ul
      class="demo-alignment checkbox-register d-flex justify-content-between align-items-center flex-wrap"
    >
      <li
        class="d-flex flex-wrap mr-2 checkbox-reg-txt"
        v-for="account in differentAccount"
        :key="account.id"
      >
        {{ $t(account.i18n)||account.label
        }}<vs-checkbox
          class="checkbox-reginput"
          color="warning"
          v-model="account.vlue"
          :checked="account.value == true"
          @change="onChecked($event, account.id)"
          :disabled="account.id == 4"
        />
      </li>
    </ul>
    <div class="text-right">
      <vs-button
        class="mt-6 btn-green w-180px"
        @click="registerUserJWt"
        :disabled="!validateForm"
      >
        {{ $t("Subscribe") }}
      </vs-button>
    </div>
    <div>
      <p class="sub-trial-txt mt-3 text-right mb-10">
        <a class="f-size-14" href="/login">
          <u>{{ $t("LoginToExisting") }}</u>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../../../axios.js'
import VueRecaptcha from 'vue-recaptcha';

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      language: "",
      country: "",
      countryIsoCode: "",
      currency: "",
      countryIsoCode: "",
      provider: "",

      passwordType: 'password',
      FirstName: this.$t('FirstName'),
      LastName: this.$t('LastName'),
      Email: this.$t('Email'),
      Password: this.$t('Password'),
      ConfirmPassword: this.$t('ConfirmPassword'),
      robot: false,
      // basic: false,
      // electronSignatur: false,
      // qualifiedCertificate: false,
      // abis: false,
      step: {},
      isTermsConditionAccepted: true,
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
      differentAccount: [
        {
          id: 1,
          label: 'Basic',
          value: true,
          i18n: 'Basic'
        },
        {
          id: 2,
          label: 'Electronic Signature',
          value: false,
          i18n: 'ElectronSignature'
        },
        {
          id: 3,
          label: 'Qualified Certificate',
          value: false,
          i18n:'QualifiedCertificate'
        },
        {
          id: 4,
          label: 'ABIS',
          value: false,
          i18n: 'ABIS'
        }
      ]
    }
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true && this.robot !== false
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
    registerUserJWt () {
      // If form is not validated or user is already login return
      // if (!this.validateForm || !this.checkLogin()) return
      console.log('User Country Details =>', this.$store.state.selectedLanguage)
      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          provider: "local",
          confirmPassword: this.confirm_password,
          country: {
            country: this.$store.state.userCountryDetails.country_name,
            countryIsoCode: this.$store.state.userCountryDetails.country_code
          },
          currency: {
            currency: this.$store.state.userCountryDetails.currency.name,
            currencyIsoCode: this.$store.state.userCountryDetails.currency.code
          },
          language: localStorage.getItem('selectedLanguage')
        },
        notify: this.$vs.notify
      }
      console.log('Data =>', payload.userDetails);
      axios
        .post("auth/register", payload.userDetails)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.step = {
              step1: false,
              step2: true,
              step3: false,
            }
            this.$emit("gosetp", this.step);
            this.$store.state.RegisterUser = res.data.userData
            localStorage.setItem('registerUserid',res.data.userData.uid)
            this.$vs.notify({
              title: 'Sucess',
              text: 'Registration SucessFuly Check your Email for Account Activation',
              iconPack: 'feather',
              icon: 'icon-mail',
              color: 'success'
            })
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Registration Failed ..!!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        }).catch(error => {
          console.log(error.response.data.errorMsg);
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.response.data.errorMsg,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
      // this.$store.dispatch('auth/registerUserJWT', payload.userDetails)
    },
    onChecked (e, id) {
      console.log('==>', e.target.checked, id);
      if (e.target.checked == true && id == 1) {
        this.differentAccount = [
          {
            id: 1,
            label: 'Basics',
            value: true
          },
          {
            id: 2,
            label: 'Electron Signatur',
            value: false
          },
          {
            id: 3,
            label: 'Qualified Certificate',
            value: false
          },
          {
            id: 4,
            label: 'ABIS',
            value: false
          }
        ]
      } else if (e.target.checked == true && id == 2) {
        this.differentAccount = [
          {
            id: 1,
            label: 'Basics',
            value: false
          },
          {
            id: 2,
            label: 'Electron Signatur',
            value: true
          },
          {
            id: 3,
            label: 'Qualified Certificate',
            value: false
          },
          {
            id: 4,
            label: 'ABIS',
            value: false
          }
        ]
        this.$router.push('/electron-signature-register').catch(() => { })
      } else if (e.target.checked == true && id == 3) {
        this.differentAccount = [
          {
            id: 1,
            label: 'Basics',
            value: false
          },
          {
            id: 2,
            label: 'Electron Signatur',
            value: false
          },
          {
            id: 3,
            label: 'Qualified Certificate',
            value: true
          },
          {
            id: 4,
            label: 'ABIS',
            value: false
          }
        ]
        this.$router.push('/signature-activation').catch(() => { })
      }
    },
    onVerify (response) {
      if (response) this.robot = true;
    },
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
      this.FirstName = this.$t('FirstName'),
      this.LastName = this.$t('LastName'),
      this.Email = this.$t('Email'),
      this.Password = this.$t('Password'),
      this.ConfirmPassword = this.$t('ConfirmPassword')
    }, 1);
  },
}
</script>
