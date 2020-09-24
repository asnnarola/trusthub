<template>
  <div class="the-navbar__user-meta flex items-center justify-content-end" v-if="activeUserInfo">
    <div class="carousel-example w-100" v-if="activeUserInfo.userRole === 'operator' || activeUser.userRole === 'operator'" >
      <swiper :class="subUserData.length < 2 ? 'swiper-nopad' : ''" :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl">
        <swiper-slide :class="subUserData.length < 2 ? 'user_2' : ''">
          <div class="d-flex flex-wrap">
            <div class="text-right leading-tight hidden sm:block text-white">
              <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
              <small class="text-transform-capitalize">{{ activeUserInfo.userRole }}</small>
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
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <!-- @click="$router.push('/profile').catch(() => {})"> -->
                    <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                    <span class="ml-2">Profile</span>
                  </li>

                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <!-- @click="$router.push('/apps/email').catch(() => {})"> -->
                    <feather-icon icon="settings" svgClasses="w-4 h-4" />
                    <span class="ml-2">Settings</span>
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="$router.push('/apps/todo').catch(() => {})"
                  >
                    <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
                    <span class="ml-2">Sync</span>
                  </li>

                  <!-- <vs-divider class="m-1" /> -->

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="logout"
                  >
                    <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                    <span class="ml-2">Logout</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </swiper-slide>

        <swiper-slide v-for="data in subUserData" :key="data.uid" :class="subUserData.length < 2 ? 'user_2' : ''">
          <div class="d-flex flex-wrap">
            <div class="text-right leading-tight hidden sm:block text-white">
              <p class="font-semibold">{{ data.displayName }}</p>
              <small class="text-transform-capitalize">{{ data.userRole }}</small>
            </div>
            <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
              <div class="con-img ml-3">
                <img
                  v-if="activeUserInfo.photoURL"
                  key="onlineImg"
                  :src="data.photoURL"
                  alt="user-img"
                  width="40"
                  height="40"
                  class="rounded-full shadow-md cursor-pointer block"
                />
              </div>

              <vs-dropdown-menu class="vx-navbar-dropdown">
                <ul style="min-width: 9rem">
                  <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                    <!-- @click="$router.push('/profile').catch(() => {})"> -->
                    <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                    <span class="ml-2">Profile</span>
                  </li>

                  <!-- <vs-divider class="m-1" /> -->

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="logout"
                  >
                    <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                    <span class="ml-2">Logout</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" v-if="subUserData.length > 2" slot="button-prev"></div>
        <div class="swiper-button-next" v-if="subUserData.length > 2" slot="button-next"></div>
      </swiper>
    </div>
    <div class="carousel-example" v-else>
      <div class="d-flex flex-wrap">
        <div class="text-right leading-tight hidden sm:block text-white">
          <p class="font-semibold">{{ activeUserInfo.displayName }}</p>
          <small class="text-transform-capitalize">{{ activeUserInfo.userRole }}</small>
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
              <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                <!-- @click="$router.push('/profile').catch(() => {})"> -->
                <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Profile</span>
              </li>

              <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                <!-- @click="$router.push('/apps/email').catch(() => {})"> -->
                <feather-icon icon="settings" svgClasses="w-4 h-4" />
                <span class="ml-2">Settings</span>
              </li>

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="$router.push('/apps/todo').catch(() => {})"
              >
                <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Sync</span>
              </li>

              <!-- <vs-divider class="m-1" /> -->

              <li
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                @click="logout"
              >
                <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
                <span class="ml-2">Logout</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      activeUser:JSON.parse(localStorage.getItem('userInfo')),
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
          1450: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
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
      console.log('User Info =>', this.$store.state.AppActiveUser);
      return this.$store.state.AppActiveUser
    },
    subUserData () {
      console.log('Sub Data =>>', this.activeUserInfo.subUsers)
      if (this.activeUserInfo.userRole === 'operator') {
        return this.activeUserInfo.subUsers
      } else {
        return []
      }

    }
  },
  methods: {
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
        this.$router.push('/login').catch(() => { })
      }

      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change('admin')
      localStorage.removeItem('userInfo')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/login').catch(() => { })
    }
  }
}
</script>
