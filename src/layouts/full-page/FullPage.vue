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
        <a class="flex items-center btn-drop" type="filled" icon="expand_more" href.prevent >{{Language}}</a>
        <i class="fas fa-angle-down"></i>
        <vs-dropdown-menu class="language-dropdown">
          <vs-dropdown-item @click="onLanguageSelect('Spanish')">Spanish</vs-dropdown-item>
          <vs-dropdown-item @click="onLanguageSelect('English')">English</vs-dropdown-item>
          <vs-dropdown-item @click="onLanguageSelect('Italian')">Italian</vs-dropdown-item>
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
          image: 'argentine.jpg'
        },
        {
          id: 2,
          country: 'england',
          countryCode: 'UK',
          image: 'england.jpg'
        },
        {
          id: 3,
          country: 'Italy',
          countryCode: 'IT',
          image: 'italy.jpg'
        },
      ],
      bgImage: 'argentine.jpg',
      Language: 'Select Language'
    }
  },
  mounted () {
    axios.get('http://ip-api.com/json').then(res => {
      console.log('res => ', res,);
      if (res.status == 200) {
        this.backgroundImages.forEach(countryData => {
          if (res.data.country == countryData.country) {
            this.bgImage = countryData.image
          }
        });
      }
    })
  },
  methods: {
    onLanguageSelect(language){
      this.Language = language
      console.log('Language =>', language );
      if(this.Language == 'Spanish' ){
        this.$i18n.locale = 'es'
      } else if(this.Language == 'English' ) {
        this.$i18n.locale = 'en'
      }else if(this.Language == 'Italian' ){
        this.$i18n.locale = 'it'
      }
      localStorage.setItem('currentLanguage', this.$i18n.locale)
    }
  },
}
</script>
