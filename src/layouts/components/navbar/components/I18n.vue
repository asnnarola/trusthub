<template>
  <div class="h-top-Right-icon">
    <vs-dropdown
      vs-custom-content
      vs-trigger-click
      class="cursor-pointer"
      v-for="item in iconsList"
      :key="item.id"
    >
      <!-- <img src="../../../../assets/images/header_icon/todo.png"> -->
      <span class="cursor-pointer feather-icon select-none relative">
      <img :src="require('../../../../assets/images/header_icon/' + item.icon)" />
      <span class="bg-white feather-icon-badge bg-primary h-6 w-6 absolute rounded-full text-xs flex items-center justify-center">{{ item.menu.length }}</span>
      </span>
      <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown topright-notify">
        <div class="notification-top text-center p-5 bg-primary text-white">
          <h3 class="text-white">{{ item.menu.length }} New</h3>
          <p class="opacity-75">{{item.title}} Notifications</p>
        </div>

        <component
          :is="scrollbarTag"
          ref="mainSidebarPs"
          class="scroll-area--nofications-dropdown p-0 mb-10"
          :settings="settings"
          :key="$vs.rtl"
        >
          <ul class="bordered-items">
            <li
              v-for="ntf in item.menu"
              :key="ntf.index"
              class="flex justify-between px-4 py-4 notification cursor-pointer"
            >
              <div class="flex items-start">
                <feather-icon
                  :icon="ntf.icon"
                  :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"
                ></feather-icon>
                <div class="mx-2">
                  <span
                    class="font-medium block notification-title"
                    :class="[`text-${ntf.category}`]"
                  >{{ ntf.title }}</span>
                  <small>{{ ntf.msg }}</small>
                </div>
              </div>
              <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
            </li>
          </ul>
        </component>

        <div
          class="checkout-footer fixed bottom-0 rounded-b-lg text-primary w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid d-theme-border-grey-light cursor-pointer"
        >
          <span class="text-white fw-500" @click="onTitleClick(item.title)">View All {{item.title}} Notifications</span>
        </div>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
      iconsList: [
        {
          id: 1,
          icon: 'todo.png',
          title: 'Todo',
          menu: [
            {
              index: 0,
              title: 'New Order Recieved',
              msg: 'call with peeter.',
              icon: 'PackageIcon',
              time: this.randomDate({ sec: 40 }),
              category: 'dark'
            },
            {
              index: 1,
              title: 'New Order Recieved',
              msg: 'Meeting with Jhon.',
              icon: 'PackageIcon',
              time: this.randomDate({ sec: 40 }),
              category: 'primary'
            },

            {
              index: 2,
              title: 'New Order Recieved',
              msg: 'Attend Viky birthday party',
              icon: 'PackageIcon',
              time: this.randomDate({ min: 10 }),
              category: 'success'
            },
            {
              index: 3,
              title: 'New Order Recieved',
              msg: 'Doctors Appoinment',
              icon: 'PackageIcon',
              time: this.randomDate({ min: 14 }),
              category: 'danger'
            },
            {
              index: 4,
              title: 'New Order Recieved',
              msg: 'Meeting with Samir',
              icon: 'PackageIcon',
              time: this.randomDate({ min: 20 }),
              category: 'warning'
            },
          ]
        },
        {
          id: 2,
          icon: 'chat.png',
          title: 'Chat',
          menu: [
            {
              index: 0,
              title: 'New Message',
              msg: 'can we meet tomorrow?',
              icon: 'MessageSquareIcon',
              time: this.randomDate({ sec: 10 }),
              category: 'primary'
            }, {
              index: 1,
              title: 'New Message',
              msg: 'Congreatulations For new Project.!!',
              icon: 'MessageSquareIcon',
              time: this.randomDate({ sec: 40 }),
              category: 'danger'
            }, {
              index: 2,
              title: 'New Message',
              msg: 'Are your going to meet me tonight?',
              icon: 'MessageSquareIcon',
              time: this.randomDate({ min: 5 }),
              category: 'success'
            }, {
              index: 3,
              title: 'New Message',
              msg: 'Hello Jhon',
              icon: 'MessageSquareIcon',
              time: this.randomDate({ min: 10 }),
              category: 'warning'
            }, {
              index: 4,
              title: 'New Message',
              msg: 'Can we going for Diner tonight?',
              icon: 'MessageSquareIcon',
              time: this.randomDate({ min: 16 }),
              category: 'dark'
            },
          ],
        },
        {
          id: 3,
          icon: 'mail.png',
          title: 'Mail',
          menu: [
            {
              index: 0,
              title: 'New Mail From Peter',
              msg: 'Cake sesame snaps cupcake',
              icon: 'MailIcon',
              time: this.randomDate({ sec: 54 }),
              category: 'primary'
            },
            {
              index: 1,
              title: 'New Mail From Jhon',
              msg: 'Cake sesame snaps cupcake',
              icon: 'MailIcon',
              time: this.randomDate({ min: 2 }),
              category: 'success'
            },
            {
              index: 2,
              title: 'New Mail From Peter',
              msg: 'Cake sesame snaps cupcake',
              icon: 'MailIcon',
              time: this.randomDate({ min: 4 }),
              category: 'warning'
            },
            {
              index: 3,
              title: 'New Mail From Peter',
              msg: 'Cake sesame snaps cupcake',
              icon: 'MailIcon',
              time: this.randomDate({ min: 6 }),
              category: 'danger'
            },
            {
              index: 4,
              title: 'New Mail From Peter',
              msg: 'Cake sesame snaps cupcake',
              icon: 'MailIcon',
              time: this.randomDate({ min: 10 }),
              category: 'dark'
            }
          ]
        },
        {
          id: 4,
          icon: 'calendar.png',
          title: 'Calendar',
          menu: [
            {
              index: 0,
              title: 'Bruce\'s Party',
              msg: 'Chocolate cake oat cake tiramisu',
              icon: 'CalendarIcon',
              time: this.randomDate({ min: 20 }),
              category: 'primary'
            },
            {
              index: 1,
              title: 'Meeting with Jhon',
              msg: 'Discussion about new project',
              icon: 'CalendarIcon',
              time: this.randomDate({ min: 40 }),
              category: 'success'
            },
            {
              index: 2,
              title: 'Company Day',
              msg: 'Attend Company Anual Function',
              icon: 'CalendarIcon',
              time: this.randomDate({ hr: 3 }),
              category: 'warning'
            },
            {
              index: 3,
              title: 'Doctors Appoinment',
              msg: 'Rutine Checkup',
              icon: 'CalendarIcon',
              time: this.randomDate({ hr: 5 }),
              category: 'danger'
            },
            {
              index: 4,
              title: 'Meeting with Mr.Selvm',
              msg: 'Discussion about the Project-D',
              icon: 'CalendarIcon',
              time: this.randomDate({ hr: 6 }),
              category: 'dark'
            },
          ]
        }
      ],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    onTitleClick(title) {
      // console.log('Title =>', title);
      if(title === 'Todo'){
        this.$router.push('/apps/todo/all').catch(() => { })
      }
      if(title === 'Chat'){
        this.$router.push('/apps/chat').catch(() => { })
      }
      if(title === 'Mail'){
        this.$router.push('/apps/email/inbox').catch(() => { })
      }
      if(title === 'Calendar'){
        this.$router.push('/apps/calendar/vue-simple-calendar').catch(() => { })
      }
    },
    elapsedTime (startTime) {
      const x = new Date(startTime)
      const now = new Date()
      let timeDiff = now - x
      timeDiff /= 1000

      const seconds = Math.round(timeDiff)
      timeDiff = Math.floor(timeDiff / 60)

      const minutes = Math.round(timeDiff % 60)
      timeDiff = Math.floor(timeDiff / 60)

      const hours = Math.round(timeDiff % 24)
      timeDiff = Math.floor(timeDiff / 24)

      const days = Math.round(timeDiff % 365)
      timeDiff = Math.floor(timeDiff / 365)

      const years = timeDiff

      if (years > 0) {
        return `${years + (years > 1 ? ' Years ' : ' Year ')}ago`
      } else if (days > 0) {
        return `${days + (days > 1 ? ' Days ' : ' Day ')}ago`
      } else if (hours > 0) {
        return `${hours + (hours > 1 ? ' Hrs ' : ' Hour ')}ago`
      } else if (minutes > 0) {
        return `${minutes + (minutes > 1 ? ' Mins ' : ' Min ')}ago`
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? ' sec ago' : 'just now')
      }

      return 'Just Now'
    },
    // Method for creating dummy notification time
    randomDate ({ hr, min, sec }) {
      const date = new Date()

      if (hr) date.setHours(date.getHours() - hr)
      if (min) date.setMinutes(date.getMinutes() - min)
      if (sec) date.setSeconds(date.getSeconds() - sec)

      return date
    }
  }
}

</script>

<style lang="scss">
// @import "@/assets/scss/style.scss";
</style>
