<template>
  <div
    class="h-screen flex-column flex w-full bg-img vx-row no-gutter items-center justify-center login-wrapper"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/4 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column justify-content-between">
              <div class="login-logo">
                <img src="@/assets/images/login_icon/logo.png" alt="login" class="img-fluid" />
              </div>

              <div class="vs-row" >
                <div class="vs-sm-12 vs-md-12 vs-lg-12">
                  <div class="loading-bar">
                    <div class="loading-count">{{ percent }}%</div>
                    <div class="percentage" :style="{'width' : percentage + '%'}"></div>
                  </div>
                </div>
              </div>

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
                <div class="form-wrap mb-10">
                  <div class="vx-card__title mb-4 d-flex justify-content-between">
                    <div class="wrapper-heading">
                      <h4 class="mb-4">Signature Password Recovery</h4>
                      <p>Welcome to the signature password recovery procedure.</p>
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
                  <div class="tab-wrapper-form">
                    <vs-input
                      type="email"
                      label-placeholder="User Id"
                      v-model="userId"
                      class="w-full mb-8"
                    />
                    <vs-input
                      type="text"
                      label-placeholder="PUK Code"
                      v-model="pukCode"
                      class="w-full mb-8"
                    />
                  </div>
                  <div class="txt-or text-center mb-4 mt-4">
                    <span>AND</span>
                    <div class="separte-border"></div>
                  </div>
                  <div class="bottom-menu-icon mt-0 mb-2">
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
                      <div class="txt-wraper mt-3 mb-2">
                        <p>Note: Additional identification procedure based on Id card, previously stored certificates biometrical parameters, graphometic signature or live operator could be required.</p>
                      </div>
                    </div>
                  </div>
                  <div class="vs-row">
                    <div class="vs-sm-12">
                      <vs-button class="btn-green mxw-250 float-right mb-5">Password Recovery</vs-button>
                    </div>
                  </div>
                  <div class="vs-row" >
                    <div class="vs-sm-12">
                      <div class="mt-5">
                        <h6>Warning: Recovery procedure can be performed only if you have exclusive control of codes and complete access to the required tools</h6>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 text-white">{{copyRightText}}</p>
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
      userId: '',
      pukCode: '',
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
  computed: {
    percent() {
      return this.percentage.toFixed();
    }
  },
  created() {
    var intval = setInterval(() => {
      if(this.percentage < 100)
        this.percentage += .1;
      else
        clearInterval(intval);
    }, 10);
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
