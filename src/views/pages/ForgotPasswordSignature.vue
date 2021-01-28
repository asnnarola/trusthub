<template>
  <div
    class="h-screen flex-column flex w-full bg-img vx-row no-gutter items-center justify-center login-wrapper"
    id="page-login"
  >
    <help-customizer :active="active" />
    <div
      class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/4 sm:m-0 m-4 login-subwrapper"
    >
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
                <p class="attention-title">{{ $t("ATTENTION") }}</p>
                <p class="f-13 attention-text">
                  {{ $t("SignatureAttentionStep1") }}
                </p>
              </div>

              <!-- <div class="vs-row">
                <div class="vs-sm-12 vs-md-12 vs-lg-12 header-loading-bar">
                  <div class="loading-bar">
                    <div class="loading-count">{{ percent }}%</div>
                    <div
                      class="percentage"
                      :style="{ width: percentage + '%' }"
                    ></div>
                  </div>
                  <div class="text-center" v-if="percent > 0 && percent < 99">
                    Loading....
                  </div>
                  <div class="text-center" v-else-if="percent >= 100">
                    Completed
                  </div>
                </div>
              </div> -->

              <div
                class="appstore-wrapper d-flex mb-5 mr-10 justify-content-end"
              >
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
                      <h4 class="mb-4">
                        {{ $t("SignaturePasswordRecovery") }}
                      </h4>
                      <p>{{ $t("ForgotSignaturePasswordNote") }}</p>
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
                      type="email"
                      :label-placeholder="UserId"
                      v-model="userId"
                      class="w-full mb-8"
                    />
                    <vs-input
                      type="text"
                      :label-placeholder="PUKCode"
                      v-model="pukCode"
                      class="w-full mb-8"
                    />
                  </div>
                  <!-- <div class="vs-row">
                    <div class="vs-sm-12 vs-md-12 vs-lg-12 footer-loadingbar">
                      <div class="loading-bar">
                        <div class="loading-count">{{ percent }}%</div>
                        <div
                          class="percentage"
                          :style="{ width: percentage + '%' }"
                        ></div>
                      </div>
                      <div
                        class="text-center"
                        v-if="percent > 0 && percent < 99"
                      >
                        Loading....
                      </div>
                      <div class="text-center" v-else-if="percent >= 100">
                        Completed
                      </div>
                    </div>
                  </div> -->
                  <div class="txt-or text-center mb-4 mt-4">
                    <span class="txt-gray">{{ $t("AND_OR") }}</span>
                    <div class="separte-border"></div>
                  </div>
                  <div class="bottom-menu-icon mt-0 mb-2">
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
                      <div class="txt-wraper mt-3 mb-2">
                        <p>{{ $t("SignaturePasswordNote") }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="form-group row mt-6">
                    <vue-recaptcha
                      @verify="onVerify"
                      sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ"
                      @expired="onCaptchaExpired"
                      ref="recaptcha"
                    >
                    </vue-recaptcha>
                  </div>
                  <div class="vs-row">
                    <div class="vs-sm-12 mt-3 mb-5">
                      <router-link to="/login" class="mt-3 mr-4">
                        <u class="fw-500 txt-dark-gray">
                          {{ $t("ReturnLoginPage") }}
                        </u>
                      </router-link>
                      <vs-button
                        class="btn-green mxw-250 mt-2 float-right mb-5"
                        >{{ $t("PasswordRecovery") }}</vs-button
                      >
                    </div>
                  </div>
                  <div class="vs-row">
                    <div class="vs-sm-12">
                      <div class="mt-5">
                        <h6>{{ $t("SignaturePasswordWarning") }}</h6>
                      </div>
                    </div>
                  </div>
                  <div
                    class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between"
                  >
                    <div class="login-logo footer-attention-txt">
                      <p>{{ $t("ATTENTION") }}</p>
                      <p class="f-13">
                        {{ $t("SignatureAttentionStep1") }}
                      </p>
                    </div>
                    <div
                      class="appstore-wrapper d-flex mr-10 justify-content-end footer-appstore-wrapper"
                    >
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
import copyRight from '../../layouts/components/copyright.js'
import HelpCustomizer from '../../layouts/components/customizer/HelpCustomizer.vue'
import VueRecaptcha from 'vue-recaptcha';

export default {
  data () {
    return {
      copyRightText: copyRight[0].title,
      userId: '',
      pukCode: '',
      UserId: this.$t('UserId'),
      PUKCode: this.$t('PUKCode'),
      robot: false,
      active: false,
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
        }],
      Biometrical_Icon3: [
        {
          icon_url: 'signature.png'
        },
      ],
      percentage: 0
    }
  },
  components: {
    HelpCustomizer,
    'vue-recaptcha': VueRecaptcha,
  },
  computed: {
    percent () {
      return this.percentage.toFixed();
    }
  },
  methods: {
    openHelp () {
      this.active == true ? this.active = false : this.active = true
    },
    onVerify (response) {
      if (response) this.robot = true;
    },
    onCaptchaExpired () {
      this.robot = false
      this.$refs.recaptcha.reset();
      console.log(this.robot);
    },
  },
  created () {
    setInterval(() => {
      this.UserId = this.$t('UserId')
      this.PUKCode = this.$t('PUKCode')
    }, 1);
    // var intval = setInterval(() => {
    //   if (this.percentage < 100)
    //     this.percentage += .1;
    //   else
    //     clearInterval(intval);
    // }, 10);
  }
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

.header-loading-bar {
  @media screen and (max-width: 991px) {
    display: none;
  }
}

.footer-loadingbar {
  @media screen and (min-width: 992px) {
    display: none;
  }
  @media screen and (max-width: 991px) {
    display: block;
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
