<template>
  <div class="grid-demo__layout-container">
    <h1>Documents</h1>
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
                  <span @click="getData(files.id)" style="cursor:pointer">
                    {{files.title}}
                  </span>
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
        <template>
          <vs-table :data="subFilesdata">
            <template slot="thead">
              <vs-th>Title</vs-th>
              <vs-th>author</vs-th>
              <vs-th>slug</vs-th>
            </template>

            <template slot-scope="{data}">
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
            </template>
          </vs-table>
        </template>
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
      subFilesdata:[],
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
  },
  methods: {
    getData(id){
      console.log('IDD =>', id );
      return axios.get('/Documents/' + id)
      .then(data_res => {
        this.subFilesdata = data_res.data
        console.log('Data =>',this.subFilesdata);
      })
    }
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
