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
      <vue-recaptcha
        @verify="onVerify"
         @expired="onCaptchaExpired"
         ref="recaptcha"
        sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ"
      >
      </vue-recaptcha>
    </div>
    <div class="flex flex-wrap justify-between my-5 RF-content">
      <vs-checkbox
        v-model="checkbox_remember_me"
        @change="onRememberme()"
        class="mb-3 fw-500"
        >{{ $t("RememberME") }}</vs-checkbox
      >
      <!-- <router-link to="/pages/forgot-password">Forgot Password?</router-link> -->
      <div class="text-right">
        <a class="fw-500 text-dark" href="/forgot-password">
          {{ $t("ForgotPassword") }}
        </a>
        <br />
        <!-- <a class="fw-500" href="/forgot-password-signature"> -->
        <span v-for="(item, index) in optionsLoginType" :key="index">
          <a class="fw-500 text-dark"  :href="item.id == 1 ?'/forgot-password' : '#'">
            <!-- <u>{{ $t("ForgotSignaturePassword") }}</u> -->
              <u>{{ item.shortText }} </u>
          </a>
          <span class="pl-1 pr-1" v-if="item.id != 3">|</span>
        </span>
      </div>
    </div>
    <div class="mb-2"></div>
    <div class="vx-row">
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-12 mb-4">
        <div
          class="login-socail-wrapper d-flex justify-content-between flex-wrap align-items-end"
        >
          <div
            class="loginoption-wrapper d-flex flex-column justify-content-start text-left"
          >
            <p>{{ $t("SelectLogin") }}</p>
            <div class="loginoption-input">
              <v-select
                name="documentType"
                v-model="selectedLoginType"
                :options="optionsLoginType"
                placeholder="Select Login Option"
                class="loginoption-select"
                @input="onLoginChange"
              />
              <!-- {{selectedLoginType}} -->
              <vs-button
                class="btn-green loginoption-btn"
                :disabled="!validateForm"
                @click="onLogin"
                >Login</vs-button
              >
            </div>
          </div>
          <div class="socailbtn-wrapper">
            <vs-button
              class="loginsocail-btn"
              @click="AuthProvider('facebook')"
            >
              <img
                class="black-icon"
                src="@/assets/images/login_icon/fb-icon.png"
              />
              <img
                class="gray-icon"
                src="@/assets/images/login_icon/fb-icon-gray.png"
              />
            </vs-button>
            <vs-button class="loginsocail-btn" @click="onTwitter()">
              <img
                class="black-icon"
                src="@/assets/images/login_icon/tw-icon.png"
              />
              <img
                class="gray-icon"
                src="@/assets/images/login_icon/tw-icon-gray.png"
              />
            </vs-button>
            <vs-button
              class="loginsocail-btn"
              @click="AuthProvider('linkedin')"
            >
              <img
                class="black-icon"
                src="@/assets/images/login_icon/in-icon.png"
              />
              <img
                class="gray-icon"
                src="@/assets/images/login_icon/in-icon-gray.png"
              />
            </vs-button>
          </div>
        </div>
      </div>
    </div>

    <p class="sub-trial-txt morelogin-txt text-right">
      <a class="f-size-14 fw-500" @click="login_option_show = true">
        <u>{{ $t("MoreLogin") }}</u>
      </a>
    </p>
    <p class="sub-trial-txt mt-2 pb-4 text-right">
      <a class="f-size-14 fw-500" href="/register">
        <u>{{ $t("FreeTrial") }}</u>
      </a>
    </p>
    <vs-popup
      class="Signature-popup morelogin-popup"
      classContent="popup-example"
      title
      :active.sync="login_option_show"
    >
      <swiper
        :options="swiperOption"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
        :key="$vs.rtl"
      >
        <swiper-slide v-for="(data, index) in MoreLoginOption" :key="index">
          <!-- <div class="d-flex flex-wrap slideuser-warpper justify-content-center pr-4 align-items-center"> -->
          <div>
            <img
              class="img-fluid"
              :src="require('@/assets/images/more_login_option/' + data.image)"
            />
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </vs-popup>

    <!-- 2FA OTP Model -->
    <vs-popup
      class="Signature-popup otp-modal"
      classContent="popup-example"
      title
      :active.sync="Auth_Show"
    >
      <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12 mt-2">
        <div class="Signature_pad pl-5 pr-5">
          <div class="row">
            <div class="wrapper position-relative">
              <div class="select-block d-flex justify-content-between">
                <div class="content-left pr-6">
                  <h6 class="text-white mb-1 f-15">
                    <b>OTP</b>
                  </h6>
                  <p class="text-white f-13">
                    Fill the soft token Provided by the related App
                  </p>
                </div>
                <div class="content-right">
                  <h5>
                    <a  class="txt-dark-gray"
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=it"
                      ><b><u>Google Authenticator</u></b></a
                    >
                  </h5>
                </div>
              </div>
              <!-- <div>
                <vs-input
                  v-validate="'required|min:1|max:1'"
                  data-vv-validate-on="blur"
                  name="otp.val1"
                  v-model="otp.val1"
                  class="w-full"
                />
                <vs-input
                  v-validate="'required|min:1|max:1'"
                  data-vv-validate-on="blur"
                  name="otp.val2"
                  v-model="otp.val2"
                  class="w-full"
                />
                <vs-input
                  v-validate="'required|min:1|max:1'"
                  data-vv-validate-on="blur"
                  name="otp.val3"
                  v-model="otp.val3"
                  class="w-full"
                />
                <vs-input
                  v-validate="'required|min:1|max:1'"
                  data-vv-validate-on="blur"
                  name="otp.val4"
                  v-model="otp.val4"
                  class="w-full"
                />
                <vs-input
                  v-validate="'required|min:1|max:1'"
                  data-vv-validate-on="blur"
                  name="otp.val5"
                  v-model="otp.val5"
                  class="w-full"
                />
                <vs-input
                  v-validate="'required|min:1|max:1'"
                  data-vv-validate-on="blur"
                  name="otp.val6"
                  v-model="otp.val6"
                  class="w-full"
                />
              </div> -->
              <div class="otp-wrapper d-flex align-items-center justify-content-center mt-8 mb-8">
              <v-otp-input
                ref="otpInput2"
                input-classes="otp-input"
                separator=" "
                :num-inputs="6"
                :should-auto-focus="true"
                input-type="password"
                @on-complete="handleOnComplete"
              />
              <!-- <div>a</div> -->
              </div>
                <!-- @on-change="handleOnChange" -->
              <p class="text-center mb-1 fw-500">Place Your OTP</p>
            </div>
          </div>
        </div>
        <vs-divider class="mb-5 mt-0 green-divider pl-5 pr-5" />
        <vs-row class="align-items-center pl-5 pr-5">
          <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-7">
            <vs-button class="btn green-btn mr-2 mb-2" @click="handleClearInput('otpInput2')">Clear</vs-button>
            <vs-button
              class="btn green-btn mr-2 mb-2"
              @click="OTPverification()"
            >
              Login
            </vs-button>
            <!-- @click="undoSignature" -->
          </div>
        </vs-row>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import axios from '../../../axios';
import vSelect from 'vue-select'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      email: '',
      password: '',
      login_option_show: false,
      Email_Label: this.$t('Email'),
      Password_Label: this.$t('Password'),
      robot: false,
      checkbox_remember_me: false,
      showProgressBar: false,
      step: {},
      loginModel_show: false,
      otp: '',
      // otp: {
      //   val1: '',
      //   val2: '',
      //   val3: '',
      //   val4: '',
      //   val5: '',
      //   val6: ''
      // },
      Auth_Show: false,
      MoreLoginOption: [
        {
          id: 1,
          lable: 'spid',
          image: 'spid.png'
        },
        {
          id: 2,
          lable: 'cie',
          image: 'cie.png'
        },
        {
          id: 3,
          lable: 'sid',
          image: 'sid.png'
        }
      ],
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        // spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          2500: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1425: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 30,
          }
        }
      },
      selectedLoginType: { "id": 1, "label": "TrustHub UUID" },
      optionsLoginType: [
        { id: 1, label: 'TrustHub UUID', shortText: 'Trusthub' },
        { id: 2, label: 'Signature User', shortText: 'Sign' },
        { id: 3, label: 'Advanced IAM', shortText: 'IAM' },
      ],
      isLogin: false
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
      if (this.selectedLoginType.id == 1) {
        this.Email_Label = this.$t('Email')
      } else if (this.selectedLoginType.id == 3) {
        this.Email_Label = this.$t('UserName')
      }
      this.Password_Label = this.$t('Password')
    }, 1);
    // const RememberMe = this.$cookies.get('remember')
    // console.log('RememberMe',RememberMe);
    if (this.$cookies.get('remember') == 'true') {
      this.email = this.$cookies.get("username")
      this.checkbox_remember_me = true
      console.log(this.email, this.checkbox_remember_me);
    } else {
      this.$cookies.remove("username");
      this.$cookies.remove("password");
      this.$cookies.remove("remember");
    }
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
    vSelect,
    swiper,
    swiperSlide,
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
    onLogin () {
      if (this.selectedLoginType.id == 1) {
        this.loginJWT()
      } else if (this.selectedLoginType.id == 2) {
        console.log('Signature Login');
      } else if (this.selectedLoginType.id == 3) {
        this.loginIAM()
      }
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
    onLoginChange () {
      console.log('Event', this.selectedLoginType.id);
      if (this.selectedLoginType.id == 1) {
        this.Email_Label = this.$t('Email')
      } else if (this.selectedLoginType.id == 3) {
        this.Email_Label = this.$t('UserName')
      }
    },
    // SelcetLogin (i) {
    //   this.selectedLoginType = this.optionsLoginType[i]
    //   console.log('Event', this.selectedLoginType.id);
    //   if (this.selectedLoginType.id == 1) {
    //     this.Email_Label = this.$t('Email')
    //   } else if (this.selectedLoginType.id == 3) {
    //     this.Email_Label = this.$t('UserName')
    //   }
    // },
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
          language: localStorage.getItem('selectedLanguage')
        }
      }
      return axios.post("auth/authenticate", payload.userDetails).then(res => {
        console.log(res);
        if (res.status == 200) {
          console.log();
          if (res.data.accessToken != '') {
            localStorage.setItem('accessToken', res.data.accessToken)
            this.$store.commit('UPDATE_USER_INFO', res.data.userData, { root: true })
            this.$store.commit('SET_BEARER', res.data.accessToken)
            this.goStep1()
            if (this.checkbox_remember_me === true) {
              this.$cookies.set("username", this.email);
              this.$cookies.set("password", this.password);
              this.$cookies.set("remember", this.checkbox_remember_me);
            }
          } else {
            this.Auth_Show = true
            this.$vs.loading.close()
            // this.$vs.notify({
            //   title: 'Error',
            //   text: 'Invalid Username or Password',
            //   iconPack: 'feather',
            //   icon: 'icon-alert-circle',
            //   color: 'danger'
            // })
          }
        }
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
    loginIAM () {
      if (!this.checkLogin()) return
      if (!this.robot) return
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
        }
      }
      this.$store.dispatch('auth/loginIAM', payload)
        .then(() => {
          const token = localStorage.getItem('accessToken')
          if (token) {
            this.goStep1()
            this.$vs.loading.close()
            if (this.checkbox_remember_me === true) {
              this.$cookies.set("username", this.email);
              this.$cookies.set("password", this.password);
              this.$cookies.set("remember", this.checkbox_remember_me);
            }
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
    OTPverification () {
      const payload = {
         "userEmail": this.email,
        "code": this.otp
      }
      console.log(this.otp);
      return axios.post("google-authenticator/code/validate/key", payload).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.Auth_Show = false
          if (res.data.accessToken != '') {
            localStorage.setItem('accessToken', res.data.accessToken)
            this.$store.commit('UPDATE_USER_INFO', res.data.userData, { root: true })
            this.$store.commit('SET_BEARER', res.data.accessToken)
            this.goStep1()
            if (this.checkbox_remember_me === true) {
              this.$cookies.set("username", this.email);
              this.$cookies.set("password", this.password);
              this.$cookies.set("remember", this.checkbox_remember_me);
            }
          } else {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: 'Something is Wrong Login Failed',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        }
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
    handleOnComplete(value) {
      console.log("OTP completed: ", value, this.email);
      this.otp = value
    },
    // handleOnChange(value) {
    //   console.log("OTP changed: ", value);
    // },
    handleClearInput(ref) {
      this.$refs[ref].clearInput();
    },


    onRememberme () {
      console.log(this.checkbox_remember_me);
      this.checkbox_remember_me === true ? this.$cookies.set("remember", this.checkbox_remember_me) : this.$cookies.remove("remember");
    },
    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/register').catch(() => { })
    },
    onVerify (response) {
      // console.log('res=>', response);
      if (response) this.robot = true;
    },
    onCaptchaExpired() {
      this.robot = false
      this.$refs.recaptcha.reset();
      console.log(this.robot);
    },
    // SocialLogin
    AuthProvider (provider) {
      // window.open('https://api.twitter.com/oauth/authenticate','_self')
      this.$auth.authenticate(provider).then(response => {
        this.SocialLogin(provider, response)
      }).catch(err => {
        console.log({ err: err })
      })
    },
    SocialLogin (provider, response) {
      let providerID = 0
      if (provider == 'twitter') {
        providerID = 4
      } else if (provider == 'facebook') {
        providerID = 2
      } else if (provider == 'linkedin') {
        providerID = 3
      }
      const payload = {
        authCode: response.code,
        provider: providerID
      }
      console.log('==>', payload);
      axios.post('/auth/social-users', payload)
        .then(res => {
          console.log('res', res);
          if (res.status == 200) {
            this.goStep1()
            this.$vs.loading.close()
            localStorage.setItem('accessToken', res.data.accessToken)
            this.$store.commit('UPDATE_USER_INFO', res.data.userData, { root: true })
            this.$store.commit('SET_BEARER', res.data.accessToken)
          }
          // if (this.checkbox_remember_me === true) {
          //   this.$cookies.set("username", this.email);
          //   this.$cookies.set("password", this.password);
          //   this.$cookies.set("remember", this.checkbox_remember_me);
          // }
        })
        .catch(err => {
          console.log('err', err);
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

    onTwitter () {
      console.log('Twitter call...');
      window.open("https://beta.trusthub.cloud:8080/auth/social/twitter")
      // window.open("http://192.168.1.243:8081//auth/social/twitter")
      // axios
      //   .get('auth/social/twitter')
      //   .then(res => {
      //     console.log('res', res);
      //     // window.open(res.request.responseURL,'_blank ')
      //   })
      //   .catch(err => { console.log('err', err); })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
.otp-input {
  max-width: 60px;
  min-width: 45px;
  width: 100%;
  height: 85px;
  padding: 5px;
  margin: 0 5px;
  font-size: 30px;
  border-radius: 2px;
  border: 1px solid transparent;
  text-align: center;
  background:#ffffffcf url('../../../assets/images/login_icon/otp-bg.png');
  background-size: 80% 7px;
  background-position: center 90%;
  background-repeat: no-repeat;
  // src\assets\images\login_icon\otp-bg.png
  color:#333;
  &.error {
    border: 1px solid red !important;
  }
  &.active{
    background:#fff url('../../../assets/images/login_icon/otp-green-bg.png');
    background-size: 80% 7px;
    background-position: center 90%;
    background-repeat: no-repeat;
  }
  @media screen and (max-width:575px){
      max-width: 60px;
      min-width: 36px;
      height: 60px;
      font-size: 24px;
      background-size: 80% 4px;
      background-position: center 95%;
  }
  @media screen and (max-width:425px){
    height:50px;
  }
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
