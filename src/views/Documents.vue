<template>
  <div class="grid-demo__layout-container">
    <vs-row class="border-0 filemanage-wrapper">
      <div class="vs-xs-12 vs-sm-12 vs-md-9 vs-lg-9">
        <vs-row class="h-100">
          <vs-col class="vs-xs-12 vs-sm-4 vs-md-4 vs-lg-3 p-0">
            <vx-card class="box-shadow-none left-treeheight">
              <div class="p-4 NH-btn">
                <vs-button color="gray" class="border-radius-0 w-100 mr-3 mb-3">New</vs-button>
                <vs-button
                  color="gray"
                  class="mr-3 border-radius-0 w-100"
                  @click="popupActive=true"
                >Upload</vs-button>

                <vs-popup
                  class="holamundo"
                  title="Lorem ipsum dolor sit amet"
                  :active.sync="popupActive"
                >
                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <vs-input class="w-full" label="Type" v-model="popup_type" />
                    </div>
                  </div>

                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <vs-input class="w-full" label="Category" v-model="popup_category" />
                    </div>
                  </div>

                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <vs-input class="w-full" label="Folder" v-model="popup_folder" />
                    </div>
                  </div>

                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <vs-input class="w-full" label="Template" v-model="popup_template" />
                    </div>
                  </div>

                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <vs-input class="w-full" label="Labels" v-model="popup_label" />
                      <vs-button class="mr-3 mb-2">ADD</vs-button>
                    </div>
                  </div>

                  <div class="vx-row">
                    <div class="vx-col w-full">
                      <vs-button class="mr-3 mb-2">Submit</vs-button>
                      <vs-button color="warning" type="border" class="mb-2">Reset</vs-button>
                    </div>
                  </div>

                  <div class="vx-row">
                    <vs-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      @on-success="successUpload"
                    />
                  </div>
                </vs-popup>
              </div>
              <v-treeview
                v-model="treeData"
                :treeTypes="treeTypes"
                :openAll="openAll"
                @selected="selected"
                class="p-2 pb-0"
              ></v-treeview>
              <!-- :contextItems="contextItems" -->
              <!-- @contextSelected="contextSelected" -->

              <div class="p-2 submenu-document">
                <div class="doc-submenu-list" v-for="data in hilightsData" :key="data.id">
                  <i :class="data.icon"></i>
                  <span>{{data.title}} ({{data.children.length}})</span>
                </div>
              </div>
            </vx-card>
          </vs-col>
          <vs-col class="vs-xs-12 vs-sm-8 vs-md-8 vs-lg-9 p-0 d-flex flex-column">
            <vx-card class="box-shadow-none serach-wrapper p-2">
              <vx-input-group class="mb-base serach-box">
                <vs-input
                  icon-pack="feather"
                  class="border-0"
                  icon="icon-search"
                  placeholder="Search"
                  v-model="search"
                />
                <template slot="append">
                  <div class="append-text btn-addon">
                    <vs-button color="gray" class="border-radius-0 addonsearch-btn"> Search
                      <!-- <span class="d-sm-block d-none">Search</span>
                      <span class="d-block d-sm-none"><i class="fas fa-search"></i></span> -->
                      </vs-button>
                  </div>
                </template>
              </vx-input-group>
              <div class="d-flex listgrid-wrapper">
                <span :class="onList === true ? 'active' : ''">
                  <img
                    class="mr-3 pr-2 p-2"
                    width="45px"
                    height="45px"
                    :src="require('../assets/images/documents_icon/' + imageforList + '.png')"
                    @click="onListView()"
                  />
                </span>
                <span :class="onGrid == true ? 'active' : ''">
                  <img
                    class="p-2"
                    width="45px"
                    height="45px"
                    :src="require('../assets/images/documents_icon/' + imageforGrid + '.png')"
                    @click="onGridView()"
                  />
                </span>
              </div>
            </vx-card>

            <div class="frc-wrapper">
              <ul
                class="demo w-100 d-flex flex-wrap folder-main"
                v-if="subFilesdata.length && !onList && onGrid"
              >
                <li
                  class="folder-wrapper"
                  v-for="(subData,index) in subFilesdata"
                  :key="index"
                  @contextmenu.prevent="$refs.menu.open"
                >
                  <span class="cursor-pointer">
                    <div
                      class="file-icon text-center d-flex flex-column justify-content-center align-items-center"
                      v-if="subData.children.length > 0"
                      @click="getFiles(subData)"
                    >
                      <i class="fas fa-folder"></i>
                      <span>{{subData.text}}</span>
                    </div>
                    <div
                      class="file-icon text-center d-flex flex-column justify-content-center align-items-center"
                      v-else
                    >
                      <i class="fas fa-file"></i>
                      <span>{{subData.text}}</span>
                    </div>
                  </span>
                </li>
              </ul>
              <vue-context ref="menu" class="foldersubmenu-main">
                <li>
                  <i class="fas fa-download"></i>
                  <span>Download</span>
                </li>
                <li>
                  <i class="far fa-eye"></i>
                  <span>Preview</span>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center" href.prevent>Open With</a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>New Tab</vs-dropdown-item>
                      <vs-dropdown-item>Media Info</vs-dropdown-item>
                      <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Office</vs-dropdown-item>
                      <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Only Office</vs-dropdown-item>
                      <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer icon-menu-btn">
                    <a class="flex items-center" href.prevent>
                      <i class="fas fa-share-alt"></i>
                      Share
                    </a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>New Tab</vs-dropdown-item>
                      <vs-dropdown-item>Media Info</vs-dropdown-item>
                      <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Office</vs-dropdown-item>
                      <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Only Office</vs-dropdown-item>
                      <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li>
                  <i class="fas fa-comments"></i>
                  <span>Comment</span>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer icon-menu-btn">
                    <a class="flex items-center" href.prevent>
                      <i class="fas fa-tag"></i>
                      Label
                    </a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>New Tab</vs-dropdown-item>
                      <vs-dropdown-item>Media Info</vs-dropdown-item>
                      <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Office</vs-dropdown-item>
                      <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Only Office</vs-dropdown-item>
                      <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li>
                  <i class="fas fa-star"></i>
                  <span>Add star</span>
                </li>

                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer icon-menu-btn">
                    <a class="flex items-center" href.prevent>
                      <i class="fas fa-ellipsis-v"></i>
                      More Options
                    </a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>New Tab</vs-dropdown-item>
                      <vs-dropdown-item>Media Info</vs-dropdown-item>
                      <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                      <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Office</vs-dropdown-item>
                      <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                      <vs-dropdown-item>Only Office</vs-dropdown-item>
                      <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center">Copy</a>
                  </vs-dropdown>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center">Rename</a>
                  </vs-dropdown>
                </li>

                <li>
                  <i class="fas fa-trash-alt"></i>
                  <span>Remove</span>
                </li>
              </vue-context>
            </div>
            <div
              v-if="subFilesdata.length && onList && !onGrid"
              class="demo w-100 d-flex flex-wrap folder-main"
            >
              <!-- @click="closeMenu(subFilesdata[subdataIndex])" -->
              <vs-table class="w-100 list-folder-grid" :data="subFilesdata">
                <template slot="thead">
                  <vs-th></vs-th>
                  <vs-th>Name</vs-th>
                  <vs-th>Stars</vs-th>
                  <vs-th>Signed</vs-th>
                  <vs-th>Owner</vs-th>
                  <vs-th>Size</vs-th>
                </template>
                <template slot-scope="{data}" class="bg-white shadow overflow-hidden sm:rounded-md">
                  <!-- <vs-tr :data="tr"> -->
                  <tr
                    class="list-tr"
                    v-for="(tr,index) in subFilesdata"
                    :key="index"
                    @contextmenu.prevent="$refs.menu.open"
                  >
                    <vs-td>
                      <span class="cursor-pointer" @click="getFiles(t)">
                        <div class="file-icon text-center list-svg" v-if="tr.type === 'Folder'">
                          <i class="fas fa-folder"></i>
                        </div>
                        <div class="file-icon text-center list-svg" v-else @click="getFiles(tr)">
                          <i class="fas fa-file"></i>
                        </div>
                      </span>
                    </vs-td>
                    <vs-td :data="tr.text">
                      <span class="cursor-pointer" @click="getFiles(tr)">
                        <div class="file-icon text-dark">
                          <span>{{tr.text}}</span>
                        </div>
                      </span>
                    </vs-td>
                    <vs-td colspan="4"></vs-td>
                  </tr>
                  <!-- </vs-tr> -->
                  <vue-context ref="menu1" class="foldersubmenu-main">
                    <li>
                      <i class="fas fa-download"></i>
                      <span>Download</span>
                    </li>
                    <li>
                      <i class="far fa-eye"></i>
                      <span>Preview</span>
                    </li>
                    <li class="hoverfile-menu">
                      <vs-dropdown class="cursor-pointer">
                        <a class="flex items-center" href.prevent>Open With</a>
                        <i class="fas fa-angle-right"></i>
                        <vs-dropdown-menu class="hoveropen-menu">
                          <vs-dropdown-item>New Tab</vs-dropdown-item>
                          <vs-dropdown-item>Media Info</vs-dropdown-item>
                          <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Office</vs-dropdown-item>
                          <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Only Office</vs-dropdown-item>
                          <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </li>
                    <li class="hoverfile-menu">
                      <vs-dropdown class="cursor-pointer icon-menu-btn">
                        <a class="flex items-center" href.prevent>
                          <i class="fas fa-share-alt"></i>
                          Share
                        </a>
                        <i class="fas fa-angle-right"></i>
                        <vs-dropdown-menu class="hoveropen-menu">
                          <vs-dropdown-item>New Tab</vs-dropdown-item>
                          <vs-dropdown-item>Media Info</vs-dropdown-item>
                          <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Office</vs-dropdown-item>
                          <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Only Office</vs-dropdown-item>
                          <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </li>
                    <li>
                      <i class="fas fa-comments"></i>
                      <span>Comment</span>
                    </li>
                    <li class="hoverfile-menu">
                      <vs-dropdown class="cursor-pointer icon-menu-btn">
                        <a class="flex items-center" href.prevent>
                          <i class="fas fa-tag"></i>
                          Label
                        </a>
                        <i class="fas fa-angle-right"></i>
                        <vs-dropdown-menu class="hoveropen-menu">
                          <vs-dropdown-item>New Tab</vs-dropdown-item>
                          <vs-dropdown-item>Media Info</vs-dropdown-item>
                          <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Office</vs-dropdown-item>
                          <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Only Office</vs-dropdown-item>
                          <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </li>
                    <li>
                      <i class="fas fa-star"></i>
                      <span>Add star</span>
                    </li>

                    <li class="hoverfile-menu">
                      <vs-dropdown class="cursor-pointer icon-menu-btn">
                        <a class="flex items-center" href.prevent>
                          <i class="fas fa-ellipsis-v"></i>
                          More Options
                        </a>
                        <i class="fas fa-angle-right"></i>
                        <vs-dropdown-menu class="hoveropen-menu">
                          <vs-dropdown-item>New Tab</vs-dropdown-item>
                          <vs-dropdown-item>Media Info</vs-dropdown-item>
                          <vs-dropdown-item>Cloud Convert</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Editor</vs-dropdown-item>
                          <vs-dropdown-item>Google Docs Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Office</vs-dropdown-item>
                          <vs-dropdown-item>Office Web Viewer</vs-dropdown-item>
                          <vs-dropdown-item>Only Office</vs-dropdown-item>
                          <vs-dropdown-item>Zoho Editor</vs-dropdown-item>
                        </vs-dropdown-menu>
                      </vs-dropdown>
                    </li>
                    <li class="hoverfile-menu">
                      <vs-dropdown class="cursor-pointer">
                        <a class="flex items-center">Copy</a>
                      </vs-dropdown>
                    </li>
                    <li class="hoverfile-menu">
                      <vs-dropdown class="cursor-pointer">
                        <a class="flex items-center">Rename</a>
                      </vs-dropdown>
                    </li>

                    <li>
                      <i class="fas fa-trash-alt"></i>
                      <span>Remove</span>
                    </li>
                  </vue-context>
                </template>
              </vs-table>
            </div>

            <vs-row class="border-none mt-auto mb-4 pt-10">
              <div class="col vs-sm-12 vs-md-12 vs-lg-5 pl-5 process-content">
                <div class="process-txt d-flex justify-content-between flex-wrap">
                  <span class="text-dark fw-600">Storage</span>
                  <span>250 MB of 500 MB</span>
                </div>
                <div
                  class="progressbar-block progressbar-doc d-flex flex-wrap justify-content-end align-items-center"
                >
                  <vs-progress :height="12" :percent="80" color="warning" class="rounded-0"></vs-progress>
                </div>
              </div>
              <div
                class="col vs-sm-12 vs-md-12 vs-lg-7 pl-6 pr-6 d-flex flex-wrap justify-content-end LTC-btn"
              >
                <vs-button class="btn-gray w-auto mb-4">Local</vs-button>
                <vs-button class="btn-gray w-auto ml-2 mb-4">Trusthub</vs-button>
                <vs-dropdown
                  vs-custom-content
                  vs-trigger-click
                  class="cursor-pointer w-auto vs-button ml-2 mb-4 btn-gray"
                >
                  Cloud
                  <vs-dropdown-menu class="cloud-wrapper">
                    <h5 class="w-100 fw-500 ml-3 mb-2 text-white">Alternative Clouds Accounts</h5>
                    <ul>
                      <li v-for="(item, index) in cloudModel" :key="index">
                        <router-link to="#">
                          <img
                            class="img-fluid"
                            :src="require('../assets/images/documents_icon/cloud_Modal_Icon/' + item.image )"
                          />
                        </router-link>
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </vs-row>
          </vs-col>
        </vs-row>
      </div>
      <div class="vs-xs-12 vs-sm-12 vs-md-3 vs-lg-3 pl-6 docreport-filesmain">
        <div class="row border-none d-sm-flex d-md-block w-100">
          <div class="vs-xs-12 vs-sm-6 vs-md-12 vs-lg-12 pdfdoc-view">
            <div class="row border-none w-100">
              <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
                <div class="vs-row border-none w-100">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12">
                    <div class="doc-detail">
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="vs-xs-12 vs-sm-6 vs-md-12 vs-lg-12 barcode-view">
            <div class="row w-100">
              <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
                <div class="vs-row border-none w-100">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12">
                    <div class="doc-detail">
                      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
                <div class="vs-row border-none w-100">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12">
                    <div class="doc-detail d-flex justify-content-end p-4 pb-3">
                      <div class="barcode-wrapper text-right">
                        <img
                          src="../assets/images/documents_icon/QR_code.png"
                          class="img-fluid pl-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-row>
    <!-- <VueDocPreview value="../assets/images/documents_icon/project.docx" type="office" /> -->
  </div>
</template>


<script>
import VTreeview from 'v-treeview'
import VueDocPreview from 'vue-doc-preview'
import VueContext from 'vue-context';
// import 'vue-context/dist/css/vue-context.css'
import 'vue-context/src/sass/vue-context.scss';
import subDocument from './Sub-Document/sub-document.vue'
import filesList from './Document_Files.js'
import LoginJWTVue from './pages/login/LoginJWT.vue'

export default {
  data () {
    return {
      popupActive: false,
      popup_type: '',
      popup_category: '',
      popup_folder: '',
      popup_template: '',
      popup_label: '',
      // subdataIndex: '-1',
      items: [
        'Cras justo odio',
        'Dapibus ac facilisis in',
        'Morbi leo risus',
        'Porta ac consectetur ac',
        'Vestibulum at eros',
      ],
      subFilesdata: [],
      hilightsData: [
        {
          id: 1,
          title: 'in',
          icon: "fas fa-sign-in-alt",
          children: []
        },
        {
          id: 2,
          title: 'Out',
          icon: "fas fa-sign-out-alt",
          children: []
        },
        {
          id: 3,
          title: 'Stared',
          icon: "fas fa-star",
          children: []
        },
        {
          id: 4,
          title: 'Shared Links',
          icon: "fas fa-share-alt",
          children: []
        },
        {
          id: 5,
          title: 'Trash',
          icon: "fas fa-trash-alt",
          children: []
        },
      ],
      search: '',
      onGrid: true,
      imageforGrid: 'grid',
      imageforList: 'list',
      onList: false,
      openAll: false,
      treeTypes: [
        {
          type: "#",
          max_children: 6,
          max_depth: 4,
          valid_children: [
            "Folder",
            "File"
          ]
        },
        {
          type: "Folder",
          icon: "fas fa-folder",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "File",
          icon: "fas fa-file",
          valid_children: ["Basic", "Top-up"]
        },
      ],
      treeData: filesList,
      // contextItems: [],
      selectedNode: null,
      cloudModel: [
        {
          image: 'cloud1.jpg'
        },
        {
          image: 'cloud2.jpg'
        },
        {
          image: 'cloud3.jpg'
        },
        {
          image: 'cloud4.jpg'
        },
        {
          image: 'cloud5.jpg'
        },
        {
          image: 'cloud6.jpg'
        },
        {
          image: 'cloud7.jpg'
        },
        {
          image: 'cloud8.jpg'
        },
        {
          image: 'cloud9.jpg'
        },
        {
          image: 'cloud10.jpg'
        },
        {
          image: 'cloud11.jpg'
        },
        {
          image: 'cloud12.jpg'
        },
        {
          image: 'cloud13.jpg'
        },
        {
          image: 'cloud14.jpg'
        },
        {
          image: 'cloud15.jpg'
        },
        {
          image: 'cloud16.jpg'
        },
        {
          image: 'cloud17.jpg'
        },
        {
          image: 'cloud18.jpg'
        },
        {
          image: 'cloud19.jpg'
        },
        {
          image: 'cloud20.jpg'
        },
      ]
    }
  },
  methods: {
    successUpload () {
      this.$vs.notify({ color: 'success', title: 'Upload Success', text: 'Lorem ipsum dolor sit amet, consectetur' })
    },

    getFiles (file) {
      console.log('==>', file.type);
      if (file.type === 'Folder') {
        this.subFilesdata = file.children
      }
    },
    selected (node) {
      this.subFilesdata = node.model.children
    },
    onListView () {
      if (this.onList == true) {
        return;
      } else {
        this.onList = true;
        this.onGrid = false;
      }
    },
    onGridView () {
      if (this.onGrid == true) {
        return
      } else {
        this.onList = false;
        this.onGrid = true;
      }
    }
  },
  components: {
    VTreeview,
    VueContext,
    VueDocPreview,
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
@import "@/assets/scss/style.scss";
.content-area-reduced {
  .content-wrapper {
    min-height: calc(var(--vh, 1vh) * 100 - 3.5rem);
    height: 100%;
    .router-view {
      padding: 5rem 2.2rem 2.2rem;
      min-height: calc(var(--vh, 1vh) * 100 - 3.5rem);
      height: 100%;
      .router-content {
        min-height: calc(var(--vh, 1vh) * 100 - 16rem);
        height: 100%;
        .content-area__content {
          height: 100%;
          min-height: calc(var(--vh, 1vh) * 100 - 11.85rem);
          .grid-demo__layout-container {
            height: 100%;
            min-height: calc(var(--vh, 1vh) * 100 - 11.85rem);
            .vs-row {
              &.filemanage-wrapper {
                height: 100%;
                min-height: calc(var(--vh, 1vh) * 100 - 11.85rem);
                .progressbar-block {
                  .vs-progress--foreground {
                    border-radius: 0;
                  }
                }
              }
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
