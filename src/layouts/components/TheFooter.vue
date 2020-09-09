<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template >
    <!-- <footer class="the-footer flex-wrap justify-between" :class="classes">
        <p class="text-white">{{copyrightText}} -->
          <div class="the-footer flex-wrap justify-between">
            <p class="text-white">{{copyRightText}}</p>
          </div>
        <!-- </p> -->
    <!-- </footer> -->
</template>
<script>
import copyRight from './copyright.js'
export default {
  name: 'the-footer',
  data() {
    return {
      copyRightText: copyRight[0].title,
    }
  },
}
</script>
