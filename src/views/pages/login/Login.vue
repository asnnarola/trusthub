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
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center">
            <div class="vx-col hidden lg:block lg:w-1/2 d-flex flex-column">
              <div class="login-logo">
                <img src="@/assets/images/sidebar_icon/logo-xl.png" alt="login" class="img-fluid" />
              </div>
              <div class="appstore-wrapper d-flex mb-10 mr-10 justify-content-end">
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
                      <h4 class="mb-4">Login</h4>
                      <p>Welcome back, please login to your account.</p>
                    </div>
                    <div class="msg-wrapper-icon">
                      <img
                        src="@/assets/images/sidebar_icon/message-gray.png"
                        alt="login"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <hr class="border-lightgray" />
                  <!-- <vs-tabs>
                  <vs-tab label="JWT">-->
                  <login-jwt></login-jwt>
                </div>
                <div class="txt-or text-center mb-2">
                  <span>OR</span>
                  <div class="separte-border"></div>
                </div>
                <div class="bottom-menu-icon">
                <ul class="d-flex flex-wrap">
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h1.png" />
                  </li>
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h2.png" />
                  </li>
                </ul>
                <ul class="d-flex flex-wrap">
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h3.png" />
                  </li>
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h4.png" />
                  </li>
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h5.png" />
                  </li>
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h6.png" />
                  </li>
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h7.png" />
                  </li>
                </ul>
                <ul class="d-flex flex-wrap">
                  <li class="starred-page">
                    <img src="@/assets/images/sidebar_icon/h8.png" />
                  </li>
                </ul>
                </div>
                <!-- </vs-tab>

                  <vs-tab label="Firebase">
                    <login-firebase></login-firebase>
                  </vs-tab>

                  <vs-tab label="Auth0">
                    <login-auth0></login-auth0>
                  </vs-tab>
                </vs-tabs>-->
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <div class="cpy-txt">
        <p class="text-right mt-2 txt-black"
        >Copyright © 2020  - Gurucube Corp. - All Rights Reserved | Rev 4.7.4</p>
      </div>
    </div>
  </div>
</template>


<script>
import LoginJwt from './LoginJWT.vue'
import LoginFirebase from './LoginFirebase.vue'
import LoginAuth0 from './LoginAuth0.vue'

export default {
  components: {
    LoginJwt,
    LoginFirebase,
    LoginAuth0
  },
  // created() {
  //   return axios
  //     .get('/Users')
  //     .then(res => {
  //       console.log('DATA =>', res.data)
  //       const Userlist = res.data;
  //       Userlist.forEach(element => {

  //       });
  //     })
  // },
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
</style>
