<!-- =========================================================================================
  File Name: FullPage.vue
  Description: Full page layout
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="layout--full-page">
    <img
      class="bg-chang-img"
      :src="require('@/assets/images/country_bg/' + bgImage)"
    />
    <div class="selectlanguage-dropdown">
      <vs-dropdown vs-custom-content vs-trigger-click>
        <a
          class="flex items-center btn-drop"
          type="filled"
          icon="expand_more"
          href.prevent
          >{{ Language }}</a
        >
        <i class="fas fa-angle-down"></i>
        <vs-dropdown-menu class="language-dropdown">
          <vs-dropdown-item @click="onLanguageSelect('Spanish')">
            Spanish
          </vs-dropdown-item>
          <vs-dropdown-item @click="onLanguageSelect('English')">
            English
          </vs-dropdown-item>
          <vs-dropdown-item @click="onLanguageSelect('Italian')">
            Italian
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import axios from '../../axios.js'
export default {
  data () {
    return {
      backgroundImages: [
        {
          id: 1,
          country: 'argentine',
          countryCode: 'AR',
          image: 'argentine.jpg',
          language: 'Spanish',
          language_code: 'es'
        },
        {
          id: 2,
          country: 'england',
          countryCode: 'UK',
          image: 'england.jpg',
          language: 'English',
          language_code: 'en'
        },
        {
          id: 3,
          country: 'Europe',
          countryCode: 'EU',
          image: 'italy.jpg',
          language: 'Italian',
          language_code: 'it'
        },
      ],
      bgImage: 'argentine.jpg',
      Language: 'Select Language'
    }
  },
  mounted () {
    let currentIp = ''
    axios.get('https://api.ipify.org/?format=json').then(res => {
      currentIp = res.data.ip
      console.log(currentIp);
      axios.get(`https://api.ipdata.co/${res.data.ip}?api-key=test`).then(res => {
        if (res.status == 200) {
          console.log(res.data);
          this.$store.state.userCountryDetails = res.data
          this.Language = res.data.languages[0].name
          if (!localStorage.getItem('selectedLanguage')) {
            if (this.Language == 'Spanish') {
              this.$store.state.selectedLanguage = this.Language
              localStorage.setItem('selectedLanguage', this.Language)
              this.$i18n.locale = 'es'
            } else if (this.Language == 'English') {
              this.$store.state.selectedLanguage = this.Language
              localStorage.setItem('selectedLanguage', this.Language)
              this.$i18n.locale = 'en'
            } else if (this.Language == 'Italian') {
              this.$store.state.selectedLanguage = this.Language
              localStorage.setItem('selectedLanguage', this.Language)
              this.$i18n.locale = 'it'
            } else {
              this.Language = 'English'
              this.$store.state.selectedLanguage = this.Language
              localStorage.setItem('selectedLanguage', this.Language)
              this.$i18n.locale = 'en'
            }
          } else {
            this.Language = localStorage.getItem('selectedLanguage')
          }
          localStorage.setItem('currentLanguage', this.$i18n.locale)
          this.backgroundImages.forEach(countryData => {
            if (res.data.country_name == countryData.country) {
              this.bgImage = countryData.image
            }
          });
        }
      })

    })
  },
  methods: {
    onLanguageSelect (language) {
      this.Language = language
      if (this.Language == 'Spanish') {
        console.log('Language =>', language);
        this.$store.state.selectedLanguage = this.Language
        localStorage.setItem('selectedLanguage', this.Language)
        this.$i18n.locale = 'es'
      } else if (this.Language == 'English') {
        console.log('Language =>', language);
        this.$store.state.selectedLanguage = this.Language
        localStorage.setItem('selectedLanguage', this.Language)
        this.$i18n.locale = 'en'
      } else if (this.Language == 'Italian') {
        console.log('Language =>', language);
        this.$store.state.selectedLanguage = this.Language
        localStorage.setItem('selectedLanguage', this.Language)
        this.$i18n.locale = 'it'
      }
      localStorage.setItem('currentLanguage', this.$i18n.locale)
    }
  },
}
</script>
