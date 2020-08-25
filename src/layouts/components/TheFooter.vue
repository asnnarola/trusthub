<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
      {{txt}}
        <p class="text-white">aaa{{copyrightText}}
          <!-- <span>Copyright © 2020 - Gurucube Corp. - All Rights Reserved  |  Rev 4.7.4 &copy;</span> -->
        </p>
    </footer>
</template>

<script>
import copyright from './copyright.js'
export default {
  name: 'the-footer',
  data() {
    return {
      copyrightText:'ABCD',
    }
  },
  props: {
    classes: {
      type: String
    }
  },
}
</script>
