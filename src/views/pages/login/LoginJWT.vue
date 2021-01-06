<template>
  <div class="tab-wrapper-form">
    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      :label-placeholder="Email_Label"
      v-model="email"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>

    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required|min:8|max: 24|verify_password'"
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      :label-placeholder="Password_Label"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <div class="form-group row mt-6">
      <vue-recaptcha @verify="onVerify" sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ">
      </vue-recaptcha>
    </div>
    <div class="flex flex-wrap justify-between my-5 RF-content">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3 fw-500"
        >{{$t('RememberME')}}</vs-checkbox
      >
      <!-- <router-link to="/pages/forgot-password">Forgot Password?</router-link> -->
      <div class="text-right">
        <a class="fw-500" href="/forgot-password">
          <u>{{$t('ForgotPassword')}}</u>
        </a>
        <br />
        <a class="fw-500" href="/forgot-password-signature">
          <u>{{$t('ForgotSignaturePassword')}}</u>
        </a>
      </div>
    </div>
      <div class="mb-2">
        <p>{{$t ('SelectLogin')}}</p>
      </div>
    <div class="flex flex-wrap justify-between mb-3 LT-wrap loginoption-btnwrapper position-relative">
      <!-- <vs-button class="btn-green" :disabled="!validateForm" @click="loginJWT">Login</vs-button> -->
      <vs-button class="btn-green" :disabled="!validateForm" @click="loginJWT()">
        Trusthub
      </vs-button>
      <vs-button class="btn-green">PKI</vs-button>
      <vs-button class="btn-green">ABIS</vs-button>
      <vs-button class="btn-green">IAM</vs-button>
      <vs-button
        class="btn-green btn-more"
        @click="
          loginModel_show == true
            ? (loginModel_show = false)
            : (loginModel_show = true)
        "
      >
        <i class="fas fa-ellipsis-v"></i>
      </vs-button>

      <!-- Mdel -->
      <div :hidden="!loginModel_show" class="cloud-wrapper accessmng-modal">
        <h6 class="text-white"><b>{{$t('AlternativeAccess')}}</b></h6>
        <ul class="accessmng-block">
          <li
            v-for="(item, index) in loginModel"
            :key="index"
            @click="loginModel_show = false"
          >
          </li>
        </ul>
      </div>
      <!-- /Mdel -->

      <!-- <vs-button class="btn-gray Trusthub-btn" type="border">Trusthub</vs-button> -->
    </div>
    <div class="text-right">
      <p class="sub-trial-txt mt-2 pb-4">
        <a class="f-size-14 fw-500" href="/register">
          <u>{{$t('FreeTrial')}}</u>
        </a>
      </p>
      <vs-button class="loginsocail-btn" @click="AuthProvider('facebook')">
        <img class="black-icon"  src="@/assets/images/login_icon/fb-icon.png">
        <img class="gray-icon" src="@/assets/images/login_icon/fb-icon-gray.png">
      </vs-button>
      <vs-button class="loginsocail-btn" @click="AuthProvider('twitter')">
        <img class="black-icon" src="@/assets/images/login_icon/tw-icon.png">
        <img class="gray-icon" src="@/assets/images/login_icon/tw-icon-gray.png">
      </vs-button>
      <vs-button class="loginsocail-btn" @click="AuthProvider('linkedin')">
        <img class="black-icon" src="@/assets/images/login_icon/in-icon.png">
        <img class="gray-icon" src="@/assets/images/login_icon/in-icon-gray.png">
      </vs-button>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import axios from '../../../axios';
export default {
  data () {
    return {
      email: '',
      password: '',
      Email_Label: this.$t('Email'),
      Password_Label: this.$t('Password'),
      robot: false,
      checkbox_remember_me: false,
      showProgressBar: false,
      step: {},
      loginModel_show: false,
      loginModel: [
        {
          label: 'label 1'
        },
        {
          label: 'label 2'
        },
        {
          label: 'label 3'
        },
        {
          label: 'label 4'
        },
        {
          label: 'label 5'
        },
      ]
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
    setInterval(() => {
      this.Email_Label =  this.$t('Email')
      this.Password_Label = this.$t('Password')
    }, 1);
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
    // facebookLogin
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== '' && this.robot !== false
    },
    // isLoading(){
    //   return this.$vs.loading({color: 'yellow'})
    // }
  },
  methods: {
    async goStep1 () {
      this.showProgressBar = true;
      this.$emit("showProgressBar", this.showProgressBar);
      await setTimeout(() => {
        this.$router.push('/dashboard').catch(() => { })
      }, 3900);
    },
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
    loginJWT () {
      if (!this.checkLogin()) return
      if (!this.robot) return

      // Loading
      // this.isLoading
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
          language:localStorage.getItem('selectedLanguage')
        }
      }
      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => {
          const token = localStorage.getItem('accessToken')
          if (token) {
            this.goStep1()
            this.$vs.loading.close()
          } else {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: 'Invalid Username or Password',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/register').catch(() => { })
    },
    onVerify (response) {
      if (response) this.robot = true;
    },
    // SocialLogin
      AuthProvider(provider) {
        // window.open('https://api.twitter.com/oauth/authenticate','_self')
        var self = this
        this.$auth.authenticate(provider).then(response =>{
          // self.SocialLogin(provider,response)
          console.log(response);
        }).catch(err => {
          console.log({err:err})
        })
      },
      // SocialLogin(provider,response){
      //     this.$http.post('/sociallogin/'+provider,response).then(response => {
      //         console.log(response.data)
      //     }).catch(err => {
      //         console.log({err:err})
      //     })
      // },
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
