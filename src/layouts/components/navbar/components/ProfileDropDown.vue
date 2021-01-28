<template>
  <div
    class="the-navbar__user-meta flex items-center justify-content-end"
    v-if="activeUserInfo"
  >
    <div class="carousel-example w-100">
      <div
        class="d-flex flex-wrap slideuser-warpper single-user justify-content-center pr-4 align-items-center"
      >
        <div
          class="text-right leading-tight hidden sm:block text-white slideuser-name"
        >
          <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
          <small class="text-transform-capitalize">{{
            activeUserInfo.userRole
          }}</small>
        </div>
        <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
          <div class="con-img ml-3">
            <img
              v-if="activeUserInfo.photoURL"
              key="onlineImg"
              :src="activeUserInfo.photoURL"
              alt="user-img"
              width="40"
              height="40"
              class="rounded-full shadow-md cursor-pointer block"
            />
          </div>

          <vs-dropdown-menu class="vx-navbar-dropdown">
            <ul style="min-width: 9rem">
              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <!-- @click="$router.push('/profile').catch(() => {})"> -->
                <!-- <feather-icon icon="UserIcon" svgClasses="w-4 h-4" /> -->
                <i class="fas fa-user"></i>
                <span class="ml-2">Profile</span>
              </li>

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <!-- @click="$router.push('/apps/email').catch(() => {})"> -->
                <!-- <feather-icon icon="settings" svgClasses="w-4 h-4" /> -->
                <i class="fas fa-cog"></i>
                <span class="ml-2">Settings</span>
              </li>

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push('/apps/todo').catch(() => {})"
              >
                <!-- <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" /> -->
                <i class="fas fa-qrcode"></i>
                <span class="ml-2">Sync</span>
              </li>

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="update2FA()"
              >
                <!-- <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" /> -->
                <vs-switch color="success" v-model="tglSwitch" />
                <span class="ml-2">2FA</span>
              </li>

              <vs-divider class="m-1" />

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="logout"
              >
                <!-- <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" /> -->
                <i class="fas fa-sign-out-alt"></i>
                <span class="ml-2">Logout</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </div>
    <vs-popup
      class="Signature-popup qr-code-modal"
      classContent="popup-example"
      title
      :active.sync="Auth_Show"
    >
      <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12 mt-2">
        <div class="Signature_pad pl-5 pr-5">
          <div class="row">
            <div class="wrapper position-relative">
              <div class="select-block d-flex justify-content-between">
                <div class="content-left">
                <p class="text-white f-13">
                    Please Scane this QR code to link <br>with the Google Authenticator App
                  </p>
                </div>
                <div class="content-right">
                  <h5>
                    <a class="txt-dark-gray" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=it"><b>Google Authenticator</b></a>
                  </h5>
                </div>
              </div>
                  <div class="mt-5">
                  <vs-divider/>
                  <div class="d-flex align-items-center justify-content-center">
                    <img :src="qrCode" />
                  </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import firebase from 'firebase/app'
import 'firebase/auth'
import axios from '../../../../axios.js'

export default {
  data () {
    return {
      tglSwitch: false,
      Auth_Show: false,
      qrCode: '',
      activeUser: JSON.parse(localStorage.getItem('userInfo')),
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        // spaceBetween: 30,
        // pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true
        // },
        breakpoints: {
          1425: {
            slidesPerView: 2,
            spaceBetween: 2
          },
          1300: {
            slidesPerView: 1,
            spaceBetween: 25
          },
          991: {
            slidesPerView: 1,
            spaceBetween: 25
          },
          767: {
            slidesPerView: 1,
            spaceBetween: 20
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    activeUserInfo () {
      // console.log('User Info =>', this.$store.state.AppActiveUser);
      return this.$store.state.AppActiveUser
    },
    subUserData () {
      console.log('Sub Data =>>', this.activeUserInfo)
      if (this.activeUserInfo.userRole === 'operator') {
        return this.activeUserInfo.subUsers
      } else {
        return []
      }
    },
    windowWidth () { return this.$store.state.windowWidth }
  },
  created () {
    if (this.activeUserInfo.g2FA == 'GOOGLE_AUTHENTICATOR') {
      console.log(this.activeUserInfo.g2FA);
      this.tglSwitch = true
    } else {
      console.log(this.activeUserInfo.g2FA);
      this.tglSwitch = false
    }
  },
  methods: {
    update2FA () {
      this.Auth_Show = false
      this.qrCode = ''
      const params = {
        "google2FA": this.activeUserInfo.g2FA == 'GOOGLE_AUTHENTICATOR' ? "FREE OTP" : "Google authenticator"
      }
      const token = localStorage.getItem('accessToken')
      return axios({
        method: 'put',
        url: 'users/' + this.activeUserInfo.uid + '/google-2fa',
        data: params,
        headers: { Authorization: 'Bearer ' + token },
      }).then(res => {
        if (res.status == 200) {
          this.$store.commit('UPDATE_USER_INFO', res.data, { root: true })
          console.log(res.data.g2FA);
          if (res.data.g2FA === 'GOOGLE_AUTHENTICATOR') {
            this.Auth_Show = true
            this.qrCode = 'http://beta.trusthub.cloud:8080/google-authenticator/code/generate/' + res.data.email
          // }
          // if (res.data.g2FA == 'GOOGLE_AUTHENTICATOR') {
            console.log(res.data.g2FA);
            this.tglSwitch = true
          } else {
            console.log(res.data.g2FA);
            this.tglSwitch = false
          }
        } else {
          this.$vs.notify({
              title: 'Error',
              text: 'Request Fail',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
        }
      })
      .catch(error => {
        console.log(error.response.data);
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
    removeUser (data) {
      this.activeUserInfo.subUsers.splice(data, 1)
    },
    logout () {
      // if user is logged in via auth0
      if (this.$auth.profile) this.$auth.logOut()

      // if user is logged in via firebase
      const firebaseCurrentUser = firebase.auth().currentUser

      if (firebaseCurrentUser) {
        firebase.auth().signOut().then(() => {
          this.$router.push('/login').catch(() => { })
        })
      }
      // If JWT login
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken')
        this.$cookies.remove("password")
        this.$router.push('/login').catch(() => { })
      }

      // Change role on logout. Same value as initialRole of acj.js
      // this.$acl.change('admin')
      localStorage.removeItem('userInfo')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/login').catch(() => { })
    }
  }
}
</script>
