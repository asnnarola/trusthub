<template>
  <div
    class="h-screen flex-column flex w-full bg-img vx-row no-gutter items-center justify-center login-wrapper"
    id="page-login"
  >
    <help-customizer :active ="active"/>
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 sm:m-0 m-4 login-subwrapper">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div
              class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between"
            >
              <div class="login-logo">
                <img
                  src="@/assets/images/login_icon/logo.png"
                  alt="login"
                  class="img-fluid"
                />

                <p class="attention-title">{{$t("ATTENTION")}}</p>
                <p class="attention-text" v-if="step.step1 == true">
                  {{$t('SignatureAttentionStep1')}}
                </p>
                <p class="attention-text" v-if="step.step2 == true">
                  {{$t('SignatureAttentionStep2')}}
                </p>
                <p class="attention-text" v-if="step.step3 == true">
                  {{$t('SignatureAttentionStep3')}}
                </p>
                <!-- <p>Selecting Different registration Options Will Produce different registration procedure with different users permissions inside of the platform</p>
                <p> Anyway you will be able to upgrade at any time merging properties.</p> -->
              </div>
              <!-- ProgressBar -->
              <div class="vs-row" v-if="ProgressBar2 === true">
                <div class="vs-sm-12 vs-md-12 vs-lg-12">
                  <div class="loading-bar">
                    <div class="loading-count">{{ percent }}%</div>
                    <div
                      class="percentage"
                      :style="{ width: percentage + '%' }"
                    ></div>
                  </div>
                  <div class="text-center" v-if="percent > 0 && percent < 99">{{$t('Loading')}}</div>
                  <div class="text-center" v-else-if="percent >= 100">{{$t('Completed')}}</div>
                </div>
              </div>
              <div class="appstore-wrapper d-flex mb-5 mr-10 justify-content-end">
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/Android-store.png"
                    alt="Android Store"
                    class="img-fluid"
                  />
                </router-link>
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/App-store.png"
                    alt="Apple Store"
                    class="img-fluid"
                  />
                </router-link>
                <router-link to="/">
                  <img
                    src="@/assets/images/login_icon/download-button.png"
                    alt="Download"
                    class="img-fluid"
                  />
                </router-link>
              </div>
            </div>

            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg right-wrapper"
            >
              <div
                class="px-8 pt-8 login-tabs-container tab-wrapper d-flex flex-column"
              >
                <div class="form-wrap">
                  <div
                    class="vx-card__title mb-4 d-flex justify-content-between"
                  >
                    <div class="wrapper-heading" >
                      <h4 class="mb-4">{{$t('Activation')}}</h4>
                      <p class="fw-500">
                        {{$t('certificateActivation')}}
                      </p>
                      <span class="fw-500 txt-gray" v-if="step.step1 == true">
                        {{$t('step1of3')}}
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step2 == true">
                        {{$t('step2of3')}}
                      </span>
                      <span class="fw-500 txt-gray" v-if="step.step3 == true">
                        {{$t('step3of3')}}
                      </span>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/help_new.png"
                        alt="login"
                        width="45"
                        class="img-fluid"
                        @click="openHelp()"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
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
                  class="txt-or text-center mt-4 mb-4"
                  v-if="step.step1 === true"
                >
                  <span>{{$t('AND')}}</span>
                  <div class="separte-border"></div>
                </div>
                <div
                  class="bottom-menu-icon mt-0 mb-2 position-relative"
                  v-if="step.step1 === true"
                >
                  <ul
                    class="d-flex flex-wrap align-items-center position-relative"
                  >
                    <li
                      class="starred-page"
                      v-for="img in Biometrical_Icon1"
                      :key="img.icon_url"
                    >
                      <router-link to="#">
                        <img
                          :src="
                            require('@/assets/images/header_icon/' +
                              img.icon_url)
                          "
                        />
                      </router-link>
                    </li>
                  </ul>
                  <ul
                    class="d-flex flex-wrap align-items-center position-relative"
                  >
                    <li
                      class="starred-page"
                      v-for="img in Biometrical_Icon2"
                      :key="img.icon_url"
                    >
                      <router-link to="#">
                        <img
                          :src="
                            require('@/assets/images/header_icon/' +
                              img.icon_url)
                          "
                        />
                      </router-link>
                    </li>
                  </ul>
                  <ul
                    class="d-flex flex-wrap align-items-center position-relative"
                  >
                    <li
                      class="starred-page"
                      v-for="img in Biometrical_Icon3"
                      :key="img.icon_url"
                    >
                      <router-link to="#">
                        <img
                          :src="
                            require('@/assets/images/header_icon/' +
                              img.icon_url)
                          "
                        />
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="vs-row">
                  <div class="vs-sm-12">
                    <div class="txt-wraper mt-2 mb-1" v-if="step.step1 == true">
                      <p>
                        {{$t('SignatureNotestep1')}}
                      </p>
                    </div>
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step2 == true">
                      <p>
                        {{$t('SignatureNotestep2')}}
                      </p>
                    </div>
                    <div class="txt-wraper mt-2 mb-2" v-if="step.step3 == true">
                      <p>
                        {{$t('SignatureNotestep3')}}
                      </p>
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
                        (step.step1 === true &&
                          (userId == '' || ActivationCode == '')) ||
                        (step.step2 == true &&
                          (password == '' || confirm_Password == ''))
                      "
                      >{{$t('Next')}}</vs-button
                    >
                  </div>
                </div>
                <div class="vs-row" :hidden="step.step0 == true">
                  <div class="vs-sm-12">
                    <div class="mt-4 mb-5">
                      <h6 v-if="step.step1 === true">
                        {{$t('SignatureWarningstep1')}}
                      </h6>
                      <h6 v-if="step.step2 === true">
                        {{$t('SignatureWarningstep2')}}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt position-relative">
        <p class="text-right mt-2 text-white">{{ copyRightText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginStep1 from '../login/LoginJWT_step1.vue'
import LoginStep2 from '../login/LoginJWT_step2'
import LoginStep3 from '../login/LoginJWT_step3.vue'
import HelpCustomizer from '../../../layouts/components/customizer/HelpCustomizer.vue'
import copyRight from '../../../layouts/components/copyright.js';

export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      ProgressBar2: false,
      step: {
        step1: true,
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
          id: 1,
          icon_url: 'id.png'
        },
        {
          id: 2,
          icon_url: 'chip.png'
        }
      ],
      Biometrical_Icon2: [
        {
          id: 1,
          icon_url: 'face.png'
        },
        {
          id: 2,
          icon_url: 'fingerprint.png'
        },
        {
          id: 3,
          icon_url: 'palm.png'
        },
        {
          id: 4,
          icon_url: 'voice.png'
        },
        {
          id: 5,
          icon_url: 'eye.png'
        }
      ],
      Biometrical_Icon3: [
        {
          id: 1,
          icon_url: 'signature.png'
        },
      ],
      active: false
    }
  },
  components: {
    LoginStep1,
    LoginStep2,
    LoginStep3,
    HelpCustomizer
  },
  created () {
    setInterval(() => {
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
        this.percentage = 0
        this.ProgressBar2 = true
        setTimeout(() => {
          this.step = {
            step1: false,
            step2: true,
            step3: false,
          }
          this.ProgressBar2 = false
        }, 3900);
      } else if (this.step.step2 == true) {
        this.percentage = 0
        this.ProgressBar2 = false
        this.step = {
          step1: false,
          step2: false,
          step3: true,
        }
      }
    },
    openHelp(){
      this.active == true ? this.active = false : this.active = true
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
  height: 15px;
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
    font-size: 12px;
    line-height: 15px;
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
