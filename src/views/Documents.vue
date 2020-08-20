<template>
  <div class="grid-demo__layout-container">
    <vs-row>
      <vs-col
        vs-offset="0"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2"
        class="sm:p-2 p-4"
      >
        <vx-card class="box-shadow-none">
          <vs-button color="gray" class="border-radius-0 w-100 mr-3 mb-6">New</vs-button>
          <vs-button color="gray" class="mr-3 border-radius-0 w-100">Upload</vs-button>
        </vx-card>
      </vs-col>
      <vs-col
        vs-offset="0"
        vs-type="flex"
        vs-justify="center"
        vs-align="left"
        vs-w="10"
        class="sm:p-2 p-4"
      >
        <vx-card class="box-shadow-none serach-wrapper">
          <vx-input-group class="mb-base serach-box">
            <vs-input icon-pack="feather" class="border-0" icon="icon-search" placeholder="Search" v-model="search" />
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button color="gray" class="border-radius-0">Search</vs-button>
              </div>
            </template>
          </vx-input-group>
          <div>
            <vs-button color="gray">List</vs-button>
            <vs-button color="gray">Gride</vs-button>
          </div>
        </vx-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-offset="0"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2"
        class="sm:p-2 p-4"
      >
        <nav
          class="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-shadow"
        >
          <div class="navbar-wrapper">
            <div class="navbar-header">
              <ul>
                <li v-for="file in files" :key="file.id">
                  <div class="tree-view d-flex align-items-center cursor-pointer" @click="getFiles(file)" >
                    <img src="../assets/images/documents_icon/folder_img.png" />

                    <span>{{file.title}}</span>
                  </div>
                  <ul v-if="file.isOpen == true && file.sub_Files.length > 0">
                    <li v-for="data in file.sub_Files" :key="data.id">
                      <div class="pl-3 tree-view d-flex align-items-center cursor-pointer" @click="getFiles(data)">

                        <img
                          src="../assets/images/documents_icon/folder_img.png"
                          v-if="data.sub_Files.length > 0"
                        />
                        {{data.title}}
                      </div>
                    </li>
                  </ul>
                  <span
                    v-if="file.isOpen == true && file.sub_Files.length <= 0"
                  >There is no any files in this folder.</span>
                </li>
              </ul>
            </div>
            <div class="navbar-container content">
              <div id="navbar-mobile" class="navbar-collapse"></div>
            </div>
          </div>
        </nav>
      </vs-col>
      <vs-col
        vs-offset="0"
        vs-type="flex"
        vs-align="left"
        vs-w="10"
        class="sm:p-2 p-4"
      >
        <div v-if="subFilesdata.length" class="w-100 d-flex flex-wrap folder-main">
          <div class="folder-wrapper" v-for="subData in subFilesdata" :key="subData.id">
            <span @click="getFiles(subData)" class="cursor-pointer">
              <div class="file-icon text-center"  v-if="subData.sub_Files.length > 0">
                <img src="../assets/images/documents_icon/folder_img.png" class="img-fluid"/>

                <span>{{subData.title}}</span>
              </div>
              <div class="file-icon text-center"  v-else>
                <img src="../assets/images/documents_icon/folder_img.png" />
                <span>{{subData.title}}</span>
              </div>
            </span>
          </div>
        </div>
        <!-- <div>{{subFilesdata}}</div> -->
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from '../axios.js'
import subDocument from './Sub-Document/sub-document.vue'
import filesList from './Document_Files.js'
export default {
  data () {
    return {
      files: filesList,
      subFilesdata: [],
      search: ''
    }
  },
  methods: {
    getFiles (file) {
      file.isOpen = !file.isOpen
      this.subFilesdata = file.sub_Files
      console.log('Files =>>>', this.subFilesdata);
    }
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
@import "@/assets/scss/style.scss";
.content-area-reduced {
  .content-wrapper {
    .router-view {
      .router-content {
        .content-area__content {
          .grid-demo__layout-container {
            .vs-row {
              .box-shadow-none {
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
