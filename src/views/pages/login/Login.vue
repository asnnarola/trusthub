<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
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
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between">
              <div class="login-logo">
                <img src="@/assets/images/login_icon/logo.png" alt="login" class="img-fluid" />
              </div>
              <!-- ProgressBar -->
              <div class="vs-row" v-if="ProgressBar1 === true">
                <div class="vs-sm-12 vs-md-12 vs-lg-12">
                  <div class="loading-bar">
                    <div class="loading-count">{{ percent }}%</div>
                    <div class="percentage" :style="{'width' : percentage + '%'}"></div>
                  </div>
                </div>
              </div>

              <div class="vs-row" v-if="ProgressBar2 === true">
                <div class="vs-sm-12 vs-md-12 vs-lg-12">
                  <div class="loading-bar">
                    <div class="loading-count">{{ percent }}%</div>
                    <div class="percentage" :style="{'width' : percentage + '%'}"></div>
                  </div>
                </div>
              </div>

              <!-- <div class="container" v-if="ProgressBar2 === true">
                <div>{{ percent }}</div>
                <div class="loading-bar">
                  <div class="percentage" :style="{'width' : percentage + '%'}"></div>
                </div>
              </div> -->
              <!-- End ProgressBar -->
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
                    <div class="wrapper-heading" v-if="step.step0 == true">
                      <h4 class="mb-4">Login</h4>
                      <p class="fw-500">Welcome back, please login to your account.</p>
                    </div>
                    <div class="wrapper-heading" v-else>
                      <h4 class="mb-4">Activation</h4>
                      <p class="fw-500">Welcome to the certificate activation process</p>
                      <span class="fw-500 txt-gray" v-if="step.step1 == true">Step 1 of 3</span>
                      <span class="fw-500 txt-gray" v-if="step.step2 == true">Step 2 of 3</span>
                      <span class="fw-500 txt-gray" v-if="step.step3 == true">Step 3 of 3</span>
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
                  <login-jwt
                    @showProgressBar="ProgressBar1 = $event"
                    @gosetp="step = $event"
                    v-if="step.step0 == true"
                  ></login-jwt>

                  <login-step1
                    @getId="userId = $event"
                    @getActivatiobCode="ActivationCode = $event"
                    v-if="step.step1 == true"
                  ></login-step1>

                  <login-step2
                    v-if="step.step2 == true"
                    @getPassword="password = $event"
                    @getConfirmPassword="confirm_Password = $event"
                  ></login-step2>

                  <login-step3 v-if="step.step3 == true"></login-step3>
                </div>
                <div
                  class="txt-or text-center mb-2"
                     :class="step.step1 === true ? 'mt-4 mb-4' : 'mb-2'"
                  v-if="step.step0 === true || step.step1 === true"
                >
                  <span>AND</span>
                  <div class="separte-border"></div>
                </div>
                <div
                  class="bottom-menu-icon mt-0 mb-2 position-relative"
                  v-if="step.step0 === true || step.step1 === true"
                >
                  <ul class="d-flex flex-wrap align-items-center position-relative">
                    <li class="starred-page" v-for="img in Biometrical_Icon1" :key="img.icon_url">
                      <router-link to="#">
                        <img :src="require('@/assets/images/header_icon/' + img.icon_url)" />
                      </router-link>
                    </li>
                  </ul>
                  <ul class="d-flex flex-wrap align-items-center position-relative">
                    <li class="starred-page" v-for="img in Biometrical_Icon2" :key="img.icon_url">
                      <router-link to="#">
                        <img :src="require('@/assets/images/header_icon/' + img.icon_url)" />
                      </router-link>
                    </li>
                  </ul>
                  <ul class="d-flex flex-wrap align-items-center position-relative">
                    <li class="starred-page" v-for="img in Biometrical_Icon3" :key="img.icon_url">
                      <router-link to="#">
                        <img :src="require('@/assets/images/header_icon/' + img.icon_url)" />
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="vs-row">
                  <div class="vs-sm-12">
                    <div class="txt-wraper mt-2 mb-1" v-if="step.step1 == true">
                      <p>Note: Additional identification procedure based on Id card,previously stored certificates, boimetrical parameters, graphometic signature or live operator could be required</p>
                    </div>
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step2 == true">
                      <p>Note: If you don't want to generate a new unique secure password, then use a strong password with at least 12 characters, at least two capital letters and at least one number and jolly character</p>
                    </div>
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step3 == true">
                      <p>Note: Be sure to have full access to the email account you declared during account creation. You will recive all resuming information and codes to revoke, suspend or renew your certificate in that inbox.</p>
                    </div>
                  </div>
                </div>
                <div class="vs-row">
                  <div class="vs-sm-12">
                    <vs-button
                      class="btn-green mxw-130 float-right"
                      @click="gotoNext()"
                      v-if="step.step1 == true || this.step.step2 == true"
                      :disabled="
                      (step.step1 === true && (userId == '' || ActivationCode == '')) ||
                      (step.step2 == true && (password == ''|| confirm_Password == '') )
                      "
                    >Next</vs-button>
                  </div>
                </div>
                <div class="vs-row" :hidden="step.step0 == true">
                  <div class="vs-sm-12">
                    <div class="mt-4 mb-5">
                      <h6
                        v-if="step.step1 === true"
                      >Warning: Activation procedure can be performed only if you have exclusive control of codes and complete access to the required tools</h6>
                      <h6
                        v-if="step.step2 === true"
                      >Warning: Accordingly with international security policies, weeks password will not been accepted.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 text-white">{{copyRightText}}&copy;</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginJwt from './LoginJWT.vue';
import LoginStep1 from './LoginJWT_step1.vue'
import LoginStep2 from './LoginJWT_step2.vue'
import LoginStep3 from './LoginJWT_step3.vue'
import copyRight from '../../../layouts/components/copyright.js';

export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      ProgressBar1: false,
      ProgressBar2: false,
      step: {
        step0: true,
        step1: false,
        step2: false,
        step3: false,
      },
      userId: '',
      ActivationCode: '',
      password: '',
      confirm_Password: '',
      percentage: 0,
      Biometrical_Icon1: [
        {
          icon_url: 'id.png'
        },
        {
          icon_url: 'chip.png'
        }
      ],
      Biometrical_Icon2: [
        {
          icon_url: 'face.png'
        },
        {
          icon_url: 'fingerprint.png'
        },
        {
          icon_url: 'palm.png'
        },
        {
          icon_url: 'voice.png'
        },
        {
          icon_url: 'eye.png'
        }
      ],
      Biometrical_Icon3: [
        {
          icon_url: 'signature.png'
        },
      ],
    }
  },
  components: {
    LoginJwt,
    LoginStep1,
    LoginStep2,
    LoginStep3
  },
  created () {
    setInterval(() => {
      if (this.ProgressBar1 === true) {
        var intval = setInterval(() => {
          if (this.percentage < 100)
            this.percentage += .1;
          else
            clearInterval(intval);
        }, 10);
      }

      if (this.ProgressBar2 === true) {
        var intval = setInterval(() => {
          if (this.percentage < 100)
            this.percentage += .1;
          else
            clearInterval(intval);
        }, 10);
      }
    }, 0);
  },
  computed: {
    percent () {
      return this.percentage.toFixed();
    },
  },
  methods: {
    gotoNext () {
      if (this.step.step1 == true) {
        this.ProgressBar1 = false
        this.percentage = 0
        this.ProgressBar2 = true
        setTimeout(() => {
          this.step = {
            step0: false,
            step1: false,
            step2: true,
            step3: false,
          }
        }, 3900);
      } else if (this.step.step2 == true) {
        this.ProgressBar1 = false
        this.percentage = 0
        this.ProgressBar2 = false
        console.log('AB here');
        this.step = {
          step0: false,
          step1: false,
          step2: false,
          step3: true,
        }
      }
      console.log('Data =>', this.userId, this.ActivationCode);
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/scss/vuexy/login/index.scss";
.login-tabs-container {
  min-height: 505px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}

// progress bar
.container {
  text-align: right;
  font-size: 8rem;
  color: #555;
}

.loading-bar {
  position: relative;
  width: 88%;
  margin-left: auto;
  margin-right: auto;
  height: 25px;
  overflow: hidden;
  background: #fff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 1px solid #ddd;
  // box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: 0.4), 0 -1px 1px #fff,
  //   0 1px 0 #fff;
  .loading-count {
    z-index: 11;
    position: relative;
    font-weight: 500;
    color: #6d6c6c;
  }
  .percentage {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    display: block;
    height: 100%;
    background-color: #f9c201;
    background-size: 30px 30px;
    // background-image: linear-gradient(135deg, rgba($color: #fff, $alpha: .15) 25%, transparent 25%,
    //   transparent 50%, rgba($color: #fff, $alpha: .15) 50%,
    //   rgba($color: #fff, $alpha: .15) 75%, transparent 75%,
    //   transparent);
    animation: animate-stripes 4s linear infinite;
  }
}

@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}
</style>
