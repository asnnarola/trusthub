<template>
  <div class="grid-demo__layout-container">
    <flow-customizer />
    <traking-customizer />
    <the-customizer />
    <vs-row class="border-0 filemanage-wrapper">
      <div class="vs-xs-12 vs-sm-12 vs-md-9 vs-lg-9">
        <vs-row class="h-100">
          <vs-col class="vs-xs-12 vs-sm-4 vs-md-4 vs-lg-3 p-0">
            <vx-card class="box-shadow-none left-treeheight">
              <div class="p-4 NH-btn">
                <vs-button
                  color="gray"
                  class="maxw-100 btn-gray border-radius-0 w-100 mr-3 mb-3"
                  @click="folderpopupActive = true"
                >
                  {{ $t("New") }}
                </vs-button>
                <vs-button
                  color="gray"
                  class="mr-3 maxw-100 btn-gray border-radius-0 w-100"
                  @click="uploadpopupActive = true"
                  :disabled="current_location == '/'"
                >
                  {{ $t("Upload") }}
                </vs-button>
              </div>
              <vs-popup
                background-color="rgba(255,255,255,.6)"
                class=""
                title="Background"
                :active.sync="folderpopupActive"
              >
                <h3>{{ isRename ? "Rename" : "Create " }}</h3>
                <vs-input
                  v-validate="'required'"
                  data-vv-validate-on="blur"
                  name="folderName"
                  label-placeholder="Folder Name"
                  v-model="folderName"
                  class="w-full"
                />
                <span class="text-danger text-sm">{{
                  errors.first("folderName")
                }}</span>

                <div class="flex flex-wrap justify-between mt-5 mb-3 LT-wrap">
                  <vs-button
                    class="btn-green"
                    :disabled="!validateForm"
                    @click="createFolder()"
                  >
                    {{ isRename ? "Rename" : "Creat" }}
                  </vs-button>
                  <vs-button class="btn-green" @click="folderClear()">
                    Cancle
                  </vs-button>
                </div>
              </vs-popup>
              <vs-popup
                background-color="rgba(255,255,255,.6)"
                class=""
                title="Background"
                :active.sync="uploadpopupActive"
              >
                <h3 class="mb-3">Upload Files</h3>
                <!-- <vs-upload
                  multiple
                  text="Upload Multiple"
                  @input="alert('hii')"
                /> -->
                <input
                  type="file"
                  name="uploadFiles"
                  multiple="multiple"
                  @change="setFiles($event)"
                  required
                />

                <div class="flex flex-wrap justify-between mt-5 mb-3 LT-wrap">
                  <vs-button
                    class="btn-green"
                    @click="uploadFiles()"
                    :disabled="files.length < 1"
                  >
                    Upload
                    <!-- :disabled="!validateForm" -->
                  </vs-button>
                  <vs-button class="btn-green" @click="uploadClear()">
                    Cancle
                  </vs-button>
                </div>
              </vs-popup>

              <div v-if="folderData && folderData.length">
                <v-treeview
                  v-model="folderData"
                  :treeTypes="treeTypes"
                  :openAll="openAll"
                  @selected="selected"
                  class="p-2 pb-0"
                ></v-treeview>
              </div>
              <div class="p-2 submenu-document">
                <div
                  class="doc-submenu-list"
                  v-for="data in hilightsData"
                  :key="data.id"
                >
                  <i :class="data.icon"></i>
                  <span
                    >{{ $t(data.i18n) || data.title }} ({{
                      data.children.length
                    }})</span
                  >
                </div>
              </div>
            </vx-card>
          </vs-col>
          <vs-col
            class="vs-xs-12 vs-sm-8 vs-md-8 vs-lg-9 p-0 d-flex flex-column"
          >
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
                    <vs-button
                      color="gray"
                      class="border-radius-0 maxw-100 btn-gray addonsearch-btn"
                      @click="onSearch()"
                    >
                      {{ $t("Search") }}
                      <!-- <span class="d-sm-block d-none">Search</span>
                      <span class="d-block d-sm-none"><i class="fas fa-search"></i></span>-->
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
                    :src="
                      require('../assets/images/documents_icon/' +
                        imageforList +
                        '.png')
                    "
                    @click="onListView()"
                  />
                </span>
                <span :class="onGrid == true ? 'active' : ''">
                  <img
                    class="p-2"
                    width="45px"
                    height="45px"
                    :src="
                      require('../assets/images/documents_icon/' +
                        imageforGrid +
                        '.png')
                    "
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
                  v-for="(subData, index) in subFilesdata"
                  :key="index"
                  @contextmenu.prevent="$refs.menu.open"
                  @mouseenter="onMouseenter(subData)"
                >
                  <span class="cursor-pointer">
                    <vx-tooltip :text="subData.text" position="bottom">
                      <div
                        class="file-icon text-center d-flex flex-column justify-content-center align-items-center"
                        v-if="subData.type === 'Folder'"
                        @click="getFiles(subData)"
                      >
                        <i class="fas fa-folder"></i>
                        <span>{{ subData.text }}</span>
                      </div>

                      <div
                        class="file-icon text-center d-flex flex-column justify-content-center align-items-center"
                        v-else
                        @click="getFiles(subData)"
                      >
                        <div
                          class="file-type d-flex align-items-center justify-content-center"
                        >
                          <img
                            v-if="subData.extension === 'pdf'"
                            src="../assets/images/documents_icon/pdf.png"
                            class="img-fluid"
                          />
                          <img
                            v-else-if="subData.extension === 'excel'"
                            src="../assets/images/file-icons/excel.png"
                            class="img-fluid"
                          />
                          <img
                            v-else-if="subData.extension === 'docx'"
                            src="../assets/images/file-icons/docx.png"
                            class="img-fluid"
                          />
                          <img
                            v-else-if="subData.extension === 'ppt'"
                            src="../assets/images/file-icons/ppt.png"
                            class="img-fluid"
                          />
                          <i v-else class="fas fa-file"></i>
                        </div>
                        <span>{{ subData.text }}</span>
                      </div>
                    </vx-tooltip>
                  </span>
                </li>
              </ul>
              <vue-context ref="menu" class="foldersubmenu-main">
                <li
                  @click="DownloadFile()"
                  :disabled="selectedFile.type == 'Folder'"
                >
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
                      <vs-dropdown-item
                        ><div class="typesfile-icon mr-2">
                          <i class="fas fa-external-link-alt"></i>
                        </div>
                        New Tab</vs-dropdown-item
                      >
                      <vs-dropdown-item
                        ><div class="typesfile-icon mr-2">
                          <i class="fas fa-info-circle"></i>
                        </div>
                        Info</vs-dropdown-item
                      >
                      <!-- <vs-dropdown-item>Cloud Convert</vs-dropdown-item> -->
                      <vs-dropdown-item
                        ><div class="typesfile-icon mr-2">
                          <img
                            src="../assets/images/file-icons/gd.png"
                            class="img-fluid"
                          />
                        </div>
                        Google Docs Editor</vs-dropdown-item
                      >
                      <vs-dropdown-item
                        ><div class="typesfile-icon mr-2">
                          <img
                            src="../assets/images/file-icons/docs_document.png"
                            class="img-fluid"
                          />
                        </div>
                        Google Docs Viewer</vs-dropdown-item
                      >
                      <vs-dropdown-item
                        ><div class="typesfile-icon mr-2">
                          <img
                            src="../assets/images/file-icons/Moffice.png"
                            class="img-fluid"
                          />
                        </div>
                        Office</vs-dropdown-item
                      >
                      <vs-dropdown-item
                        ><div class="typesfile-icon mr-2">
                          <img
                            src="../assets/images/file-icons/Moffice.png"
                            class="img-fluid"
                          />
                        </div>
                        Office Web Viewer</vs-dropdown-item
                      >
                      <!-- <vs-dropdown-item>Only Office</vs-dropdown-item>
                      <vs-dropdown-item>Zoho Editor</vs-dropdown-item> -->
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer icon-menu-btn">
                    <a class="flex items-center" href.prevent>
                      <i class="fas fa-ellipsis-v"></i>
                      Sign Options
                    </a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>Electronic Signature</vs-dropdown-item>
                      <vs-dropdown-item>Draw Signature</vs-dropdown-item>
                      <vs-dropdown-item>Graphometic Signature</vs-dropdown-item>
                      <vs-dropdown-item>Biometrical Signature</vs-dropdown-item>
                      <vs-dropdown-item>Electronic Seal</vs-dropdown-item>
                      <vs-dropdown-item>Time Stamp</vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>

                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center">Smart Contract</a>
                  </vs-dropdown>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center" href.prevent>Digest</a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>Option 1</vs-dropdown-item>
                      <vs-dropdown-item>Option 2</vs-dropdown-item>
                      <vs-dropdown-item>Option 3</vs-dropdown-item>
                      <vs-dropdown-item>Option 4</vs-dropdown-item>
                      <vs-dropdown-item>Option 5</vs-dropdown-item>
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
                      <vs-dropdown-item
                        ><i class="fas fa-link mr-2"></i> Web
                        Link</vs-dropdown-item
                      >
                      <vs-dropdown-item
                        ><i class="fas fa-user-plus mr-2"></i> With
                        Users</vs-dropdown-item
                      >
                      <vs-dropdown-item
                        ><i class="fas fa-envelope mr-2"></i>
                        Email</vs-dropdown-item
                      >
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li>
                  <i class="fas fa-comments"></i>
                  <span>Comment</span>``
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer icon-menu-btn">
                    <a class="flex items-center" href.prevent>
                      <i class="fas fa-tag"></i>
                      Label
                    </a>
                    <i class="fas fa-angle-right"></i>
                    <vs-dropdown-menu class="hoveropen-menu">
                      <vs-dropdown-item>No Label</vs-dropdown-item>
                      <vs-dropdown-item>Approved</vs-dropdown-item>
                      <vs-dropdown-item>Pending</vs-dropdown-item>
                      <vs-dropdown-item>Rejected</vs-dropdown-item>
                      <vs-dropdown-item>Custom label</vs-dropdown-item>
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
                      <vs-dropdown-item>Option 1</vs-dropdown-item>
                      <vs-dropdown-item>Option 2</vs-dropdown-item>
                      <vs-dropdown-item>Option 3</vs-dropdown-item>
                      <vs-dropdown-item>Option 4</vs-dropdown-item>
                      <vs-dropdown-item>Option 5</vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </li>
                <li class="hoverfile-menu">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center">Copy</a>
                  </vs-dropdown>
                </li>
                <li @click="RenameDocument()">
                  <vs-dropdown class="cursor-pointer">
                    <a class="flex items-center">Rename</a>
                  </vs-dropdown>
                </li>

                <li @click="RemoveDocument()">
                  <i class="fas fa-trash-alt"></i>
                  <span>Remove</span>
                </li>
              </vue-context>
            </div>
            <div
              v-if="onList && !onGrid"
              class="demo w-100 d-flex flex-wrap folder-main"
            >
              <vs-table class="w-100 list-folder-grid" :data="pagenationData">
                <template slot="thead">
                  <vs-th></vs-th>
                  <vs-th>Name</vs-th>
                  <vs-th>Stars</vs-th>
                  <vs-th>Signed</vs-th>
                  <vs-th>Owner</vs-th>
                  <vs-th>Size</vs-th>
                </template>
                <template
                  class="bg-white shadow overflow-hidden sm:rounded-md"
                  slot-scope="{ data }"
                >
                  <vs-tr
                    class="list-tr"
                    v-for="(tr, index) in data"
                    :key="index"
                    @contextmenu.prevent="$refs.menu.open"
                    @mouseenter="onMouseenter(tr)"
                  >
                    <vs-td :data="data[index].type">
                      <span
                        class="cursor-pointer"
                        @click="getFiles(tr)"
                        @contextmenu.prevent="$refs.menu.open"
                        @mouseenter="onMouseenter(tr)"
                      >
                        <div
                          class="file-icon text-center list-svg"
                          v-if="data[index].type === 'Folder'"
                        >
                          <i class="fas fa-folder"></i>
                        </div>
                        <div
                          class="file-icon text-center list-svg"
                          v-else
                          @click="getFiles(tr)"
                        >
                          <div class="file-type">
                            <img
                              v-if="data[index].extension === 'pdf'"
                              src="../assets/images/documents_icon/pdf.png"
                              class="img-fluid"
                            />
                            <img
                              v-else-if="data[index].extension === 'excel'"
                              src="../assets/images/file-icons/excel.png"
                              class="img-fluid"
                            />
                            <img
                              v-else-if="data[index].extension === 'docx'"
                              src="../assets/images/file-icons/docx.png"
                              class="img-fluid"
                            />
                            <img
                              v-else-if="data[index].extension === 'ppt'"
                              src="../assets/images/file-icons/ppt.png"
                              class="img-fluid"
                            />
                            <i v-else class="fas fa-file"></i>
                          </div>
                        </div>
                      </span>
                    </vs-td>
                    <vs-td :data="data[index].text" colspan="5">
                      <span
                        class="cursor-pointer"
                        @click="getFiles(tr)"
                        @contextmenu.prevent="$refs.menu.open"
                        @mouseenter="onMouseenter(tr)"
                      >
                        <div class="file-icon text-dark">
                          <span>{{ data[index].text }}</span>
                        </div>
                      </span>
                    </vs-td>
                  </vs-tr>
                  <!-- <vs-tr v-if="data.length <= 0">
                    <vs-td colspan="6">
                      No Data in select Folder
                    </vs-td>
                  </vs-tr> -->
                </template>
              </vs-table>
            </div>
            <div v-if="onList && !onGrid" class="pagination-block">
              <vs-pagination
                v-if="pagenationData.length > 0"
                :total="total"
                v-model="currentPage"
                :max="5"
                @change="onNext($event)"
              ></vs-pagination>
            </div>
            <!-- <div  v-if="pagenationData.length <=0 && onList && !onGrid"> -->
            <!-- <h4></h4>
            </div> -->

            <vs-row class="border-none mt-auto mb-4 pt-10">
              <div class="col vs-sm-12 vs-md-12 vs-lg-5 pl-5 process-content">
                <div
                  class="process-txt d-flex justify-content-between flex-wrap"
                >
                  <span class="text-dark fw-600">{{ $t("Storage") }}</span>
                  <span>250 MB of 500 MB</span>
                </div>
                <div
                  class="progressbar-block progressbar-doc d-flex flex-wrap justify-content-end align-items-center"
                >
                  <vs-progress
                    :height="12"
                    :percent="80"
                    color="warning"
                    class="rounded-0"
                  ></vs-progress>
                </div>
              </div>
              <div
                class="col vs-sm-12 vs-md-12 vs-lg-7 pl-6 pr-6 d-flex flex-wrap justify-content-end LTC-btn"
              >
                <vs-button class="btn-gray w-auto mb-4">{{
                  $t("Local")
                }}</vs-button>
                <vs-button class="btn-gray w-auto ml-2 mb-4">{{
                  $t("Trusthub")
                }}</vs-button>
                <div class="Cloudsmain-wrapper">
                  <vs-button
                    class="btn-gray w-auto ml-2 mb-4"
                    @click="
                      cloudModel_show == true
                        ? (cloudModel_show = false)
                        : (cloudModel_show = true)
                    "
                    >{{ $t("Cloud") }}</vs-button
                  >
                  <div :hidden="!cloudModel_show" class="cloud-wrapper">
                    <h5 class="w-100 fw-500 ml-3 mb-2 text-white text-left">
                      Alternative Clouds Accounts
                    </h5>
                    <ul>
                      <li
                        v-for="(item, index) in cloudModel"
                        :key="index"
                        @click="cloudModel_show = false"
                      >
                        <router-link to="#">
                          <img
                            class="img-fluid"
                            :src="
                              require('../assets/images/documents_icon/cloud_Modal_Icon/' +
                                item.image)
                            "
                          />
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
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
                      <!-- <pdf src="https://gahp.net/wp-content/uploads/2017/09/sample.pdf"></pdf> -->
                      <vue-pdf-viewer
                        class="abd_1"
                        width="100px"
                        height="384px"
                        url="http://www.africau.edu/images/default/sample.pdf"
                      ></vue-pdf-viewer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="vs-xs-12 vs-sm-6 vs-md-12 vs-lg-12 barcode-view signature-info"
          >
            <div class="row w-100">
              <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
                <div class="vs-row border-none w-100">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12">
                    <div class="doc-detail text-right mb-6 mt-6">
                      <p>
                        <i>{{ $t("Name") }}: Portable Document Format</i>
                      </p>
                      <p>
                        <i>{{ $t("Type") }}: pdf/A</i>
                      </p>
                      <p>
                        <i>{{ $t("Size") }}:253Kb</i>
                      </p>
                      <p>
                        <i>{{ $t("CreationDate") }}: 20/07/2020 15:55:22</i>
                      </p>
                      <p>
                        <i>{{ "LastModification" }}: 21/07/2020 18:14:59</i>
                      </p>
                      <p>
                        <i>{{ $t("Owner") }}: Reberto Minoletti</i>
                      </p>
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
  </div>
</template>


<script>
import VTreeview from 'v-treeview'
import VueDocPreview from 'vue-doc-preview'
import VueContext from 'vue-context';
import pdf from 'vue-pdf'
import VuePDFViewer from "vue-instant-pdf-viewer";
import 'vue-context/src/sass/vue-context.scss';
import filesdata from './Document_Files.js'
import TheCustomizer from '@/layouts/components/customizer/TheCustomizer.vue'
import TrakingCustomizer from '@/layouts/components/customizer/TrakingCustomizer.vue'
import FlowCustomizer from '@/layouts/components/customizer/FlowCustomizer.vue'
import _ from 'underscore'
import axios from '../axios.js'
export default {
  data: function () {
    return {
      folderpopupActive: false,
      uploadpopupActive: false,
      isRename: false,
      folderName: '',
      // folderLocation: '',
      cloudModel_show: false,
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
          children: [],
          i18n: 'in'
        },
        {
          id: 2,
          title: 'Out',
          icon: "fas fa-sign-out-alt",
          children: [],
          i18n: 'out'
        },
        {
          id: 3,
          title: 'Stared',
          icon: "fas fa-star",
          children: [],
          i18n: 'stared'
        },
        {
          id: 4,
          title: 'Shared Links',
          icon: "fas fa-share-alt",
          children: [],
          i18n: 'SharedLinks'
        },
        {
          id: 5,
          title: 'Trash',
          icon: "fas fa-trash-alt",
          children: [],
          i18n: 'Trash'
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
            "FOLDER",
            "File"
          ]
        },
        {
          type: "Folder",
          icon: "fas fa-folder",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FOLDER",
          icon: "fas fa-folder",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "File",
          icon: "fas fa-file",
          valid_children: ["Basic", "Top-up"]
        },
      ],
      folderData: [],
      docList: [],
      current_parentID: null,
      current_location: '/',
      selectedFile: [],
      files: [],
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
      ],
      endData: 0,
      pageData: 10,
      startData: 0,
      currentPage: 1,
      pagenationData: [],
      displayTableData: [],
      total: 0
    }
  },
  async mounted () {
    // this.$i18n.locale ='en'
    // axios.get('http://ip-api.com/json').then(res => {
    //   console.log('res => ', res, this.$i18n.locale);
    // })
    this.startData = this.currentPage * this.startData
    this.endData = this.currentPage * this.endData
    await this.getDocuments()
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.folderName !== ''
    },
    isLoading () {
      return this.$vs.loading({ color: 'yellow' })
    }
  },
  methods: {
    getFiles (file) {
      if (file.type === 'Folder') {
        this.subFilesdata = file.children
        console.log('Folder Data =>', this.subFilesdata);
        this.current_parentID = file.id
        this.current_location = file.location
        if (this.onList == true) {
          let tot = Math.floor(this.subFilesdata.length / this.pageData)
          if (tot < this.subFilesdata.length / this.pageData) {
            this.total = tot + 1
          } else {
            this.total = tot
          }
          this.onNext()
        }
      }
      if (file.type == 'File') {
        console.log('File=>', JSON.stringify(file));
        localStorage.setItem('activefile', JSON.stringify(file))
        this.$router.push('/document/' + file.id).catch(() => { })
      }
    },
    onNext (e) {
      if (e === undefined) {
        this.currentPage = 1
      } else {
        this.currentPage = e
      }
      this.startData = (this.currentPage * this.pageData) - this.pageData
      this.endData = this.currentPage * this.pageData
      this.pagenationData = []
      console.log(e);
      console.log('startData', this.startData);
      console.log('endData', this.endData);
      for (let i = this.startData; i < this.endData; i++) {
        const element = this.subFilesdata[i];
        console.log(element);
        if (element != undefined) {
          this.pagenationData.push(element)
        }
      }
      this.startData = this.endData
      console.log(this.pagenationData);
      console.log('startData', this.startData);
      console.log('endData', this.endData);
      console.log('subFilesdata', this.subFilesdata.length);
    },
    onMouseenter (data) {
      console.log('Sub Data =>', data);
      this.selectedFile = data
    },
    selected (node) {
      this.current_parentID = node.model.id
      this.current_location = node.model.location
      this.subFilesdata = node.model.children
      if (this.onList == true) {
        let tot = Math.floor(this.subFilesdata.length / this.pageData)
        if (tot < this.subFilesdata.length / this.pageData) {
          this.total = tot + 1
        } else {
          this.total = tot
        }
        this.onNext()
      }
    },
    onListView () {
      this.onList = true;
      this.onGrid = false;
      let tot = Math.floor(this.subFilesdata.length / this.pageData)
      if (tot < this.subFilesdata.length / this.pageData) {
        this.total = tot + 1
      } else {
        this.total = tot
      }
      console.log(this.total, this.subFilesdata.length / this.pageData, tot, this.onList);
      if (this.onList == true) {
        this.onNext()
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
    },
    getDocuments () {
      //  setTimeout(() => {
      //    this.folderData = this.$store.getters['document/Documents']
      //  }, 1000);

      const token = localStorage.getItem('accessToken')
      axios({
        method: 'get',
        url: 'folders',
        headers: { Authorization: 'Bearer ' + token }
      }).then(res => {
        console.log('Token =>', token);
        this.folderData = res.data
        this.subFilesdata = res.data
        this.current_parentID = null
        this.current_location = '/'
        this.selectedFile = []
      })
    },
    createFolder () {
      if (!this.validateForm) return
      // Loading
      if (this.isRename) {
        this.isLoading
        const payload = {
          folderDetails: {
            newName: this.folderName,
            id: this.selectedFile.id,
          }
        }
        if (this.selectedFile.type == 'File') {
          this.$store.dispatch('document/renameFile', payload)
            .then(() => {
              this.$vs.loading.close()
              this.isRename = false
              this.folderClear()
              this.getDocuments()
            })
            .errors((err) => {
              console.log('Error =>', err);
            })
        } else if (this.selectedFile.type == 'Folder') {
          this.$store.dispatch('document/renameFolder', payload)
            .then(() => {
              this.$vs.loading.close()
              this.isRename = false
              this.folderClear()
              this.getDocuments()
            })
            .errors((err) => {
              console.log('Error =>', err);
            })
        }
      } else if (!this.isRename) {
        this.isLoading
        const payload = {
          folderDetails: {
            name: this.folderName,
            path: this.current_location,
            parentId: this.current_parentID
          }
        }
        this.$store.dispatch('document/createFolder', payload)
          .then(() => {
            this.$vs.loading.close()
            this.folderClear()
            this.getDocuments()
          })
          .errors((err) => {
            console.log('Error =>', err);
          })
      }
    },
    folderClear () {
      this.folderpopupActive = false
      this.folderName = ''
    },
    setFiles (e) {
      this.files = []
      console.log('Event ', e.target.files);
      e.target.files.forEach(file => {
        this.files.push(file)
      });
      console.log('Event ', this.files);
    },
    uploadFiles () {
      const formData = new FormData();
      formData.append('uploadLocation', this.current_location);
      formData.append('parentId', this.current_parentID);
      this.files.forEach(file => {
        formData.append('files', file);
      });
      this.$store.dispatch('document/uploadFiles', formData)
        .then(() => {
          this.$vs.loading.close()
          this.getDocuments()
          this.uploadClear()
        })
        .catch((err) => {
          console.log('Error =>', err)
        })
    },
    uploadClear () {
      this.uploadpopupActive = false
      this.files = []
    },
    RemoveDocument () {
      if (this.selectedFile.type == 'Folder') {
        this.isLoading
        this.$store.dispatch('document/deleteFolder', this.selectedFile.id)
          .then(() => {
            this.$vs.loading.close()
            this.getDocuments()
          })
          .catch((err) => {
            console.log('Error =>', err)
          })
      } else if (this.selectedFile.type == 'File') {
        this.isLoading
        this.$store.dispatch('document/deleteFile', this.selectedFile.id)
          .then(() => {
            this.$vs.loading.close()
            this.getDocuments()
          })
          .catch((err) => {
            console.log('Error =>', err)
          })
      }
    },
    DownloadFile () {
      console.log(this.selectedFile)
      this.isLoading
      const token = localStorage.getItem('accessToken')
      axios({
        method: 'get',
        url: 'files/download-file',
        headers: { Authorization: 'Bearer ' + token },
        params: { fileId: this.selectedFile.id },
        responseType: 'arraybuffer',
      })
        .then((res) => {
          console.log('res =>', res);
          let blob = new Blob([res.data], { type: 'application/pdf' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          this.$vs.loading.close()
          // this.getDocuments()
        })
        .catch((err) => {
          console.log('Error =>', err)
        }
        )
    },
    RenameDocument () {
      this.folderpopupActive = true
      this.isRename = true
      this.folderName = this.selectedFile.text
    },
    onSearch () {
      // this.isLoading
      const dataparam = {
        id: this.current_parentID,
        value: this.search
      }
      const token = localStorage.getItem('accessToken')
      return axios({
        method: 'get',
        url: 'folders/search/',
        headers: { Authorization: 'Bearer ' + token },
        params: { name: this.search, parentId: this.current_parentID }
      })
        .then(res => {
          this.subFilesdata = res.data
        })
    },
  },
  components: {
    pdf,
    "vue-pdf-viewer": VuePDFViewer,
    VTreeview,
    VueContext,
    VueDocPreview,
    TheCustomizer,
    FlowCustomizer,
    TrakingCustomizer
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
