<template>
  <div class="grid-demo__layout-container">
    <vs-row>
      <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-align="center" vs-w="2" class="sm:p-2 p-4">
        <vx-card class="box-shadow-none">
          <vs-button color="gray" class="mr-3 mb-6">New</vs-button>
          <vs-button color="gray" class="mr-3 mb-6">Upload</vs-button>
        </vx-card>
      </vs-col>
      <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-align="left" vs-w="10" class="sm:p-2 p-4">
        <vx-card>
        <vx-input-group class="mb-base">
          <vs-input icon-pack="feather" icon="icon-search" placeholder="Search" v-model="search" />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button color="warning">Button</vs-button>
            </div>
          </template>
        </vx-input-group>
        </vx-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-align="center" vs-w="2" class="sm:p-2 p-4">
        <nav class="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-shadow">
          <div class="navbar-wrapper">
            <div class="navbar-header">
              <ul>
                <li v-for="files in filesList" :key="files">
                  <!-- <a :href="/document/ + files.slug "> -->
                    {{files.title}}
                  <!-- </a> -->
                  <!-- <router-link tag="div" class="vx-logo cursor-pointer flex items-center" :to="'/document/' + files.slug"> -->
                  <!-- </router-link> -->
                  <!-- <ul>
                    <li v-for="file in files.sub-Files" :key="file">
                    {{file.title}}
                    </li>
                  </ul> -->
                </li>
              </ul>
            </div>
            <div class="navbar-container content">
              <div id="navbar-mobile" class="navbar-collapse">
              </div>
            </div>
          </div>
        </nav>
      </vs-col>
      <vs-col vs-offset="0" vs-type="flex" vs-justify="center" vs-align="left" vs-w="10" class="sm:p-2 p-4">
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import axios from '../axios.js'
  import subDocument from './Sub-Document/sub-document.vue'
export default {
  data() {
    return {
      filesList:[],
      search:''
    }
  },
  components:{
    subDocument
  },
  created() {
    return axios
    .get("/Documents")
    .then(document_res =>{
      this.filesList = document_res.data
      console.log('Respo =>', this.filesList);
    })
    console.log('I am here');
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
.content-area-reduced{
  .content-wrapper{
    .router-view{
      .router-content{
        .content-area__content{
          .grid-demo__layout-container{
            .vs-row{
              .box-shadow-none{
                box-shadow: none !important;
              }
            }
          }
        }
      }
    }
  }
}
// @import "@/assets/scss/vuexy/themes/_themeDark.scss
</style>
