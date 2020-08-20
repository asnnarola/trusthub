<template>
  <div class="grid-demo__layout-container">
    <h1>Documents</h1>
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
          <vs-button color="gray" class="mr-3 mb-6">New</vs-button>
          <vs-button color="gray" class="mr-3 mb-6">Upload</vs-button>
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
        <vx-card>
          <vx-input-group class="mb-base">
            <vs-input icon-pack="feather" icon="icon-search" placeholder="Search" v-model="search" />
            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button color="gray">Search</vs-button>
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
                <li v-for="file in files" :key="file" @click="subFileShow = !subFileShow">
                  <span @click="getData(file.id)" style="cursor:pointer">{{file.title}}</span>
                  <ul v-if="subFileShow">
                    <li v-for="data in file.sub_Files" :key="data">{{data.title}}</li>
                  </ul>
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
        vs-justify="center"
        vs-align="left"
        vs-w="10"
        class="sm:p-2 p-4"
      >
        <template>
          <vs-table :data="subFilesdata">
            <template slot="thead">
              <vs-th>Name</vs-th>
              <vs-th>Stars</vs-th>
              <vs-th>Signed</vs-th>
              <vs-th>Owner</vs-th>
              <vs-th>Size</vs-th>
            </template>

            {{data}}
            <!-- <template slot-scope="{data}">
              <vs-tr :key="file" v-for="(tr, file) in data">

                <vs-td :data="data[file].title">
                  {{ data[file].title }}
                </vs-td>

                <vs-td :data="data[file].author">
                  {{ data[file].author }}
                </vs-td>

                <vs-td :data="data[file].slug">
                  {{ data[file].slug }}
                </vs-td>
              </vs-tr>
            </template>-->
          </vs-table>
        </template>
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
      subFileShow: false,
      subFilesdata: [],
      search: ''
    }
  },
  components: {
    subDocument
  },
  created () {
    console.log('Files =>', this.files);
    // return axios
    // .get("/Documents")
    // .then(document_res =>{
    //   this.filesList = document_res.data
    //   console.log('Respo =>', this.filesList);
    // })
  },
  methods: {
    getData (id) {
      console.log('IDD =>', id);
      return axios.get('/Documents/' + id)
        .then(data_res => {
          this.subFilesdata = data_res.data
          console.log('Data =>', this.subFilesdata);
        })
    }
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
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
