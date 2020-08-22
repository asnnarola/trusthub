<template>
  <div class="grid-demo__layout-container">
    <vs-row class="border-0">
      <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-9">
        <vs-row>
          <vs-col class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-3 p-0">
            <vx-card class="box-shadow-none">
              <div class="p-4 NH-btn">
                <vs-button color="gray" class="border-radius-0 w-100 mr-3 mb-3">New</vs-button>
                <vs-button color="gray" class="mr-3 border-radius-0 w-100">Upload</vs-button>
              </div>
              <v-treeview
                v-model="treeData"
                :treeTypes="treeTypes"
                @selected="selected"
                :openAll="openAll"
                :contextItems="contextItems"
                @contextSelected="contextSelected"
                class="p-2 pb-0"
              ></v-treeview>

              <div class="p-2 submenu-document">
                <div class="doc-submenu-list" v-for="data in hilightsData" :key="data.id">
                  <i :class="data.icon"></i>
                  <span>{{data.title}}</span>
                </div>
              </div>
            </vx-card>
          </vs-col>
          <vs-col class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-9 p-0">
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
                    <vs-button color="gray" class="border-radius-0 addonsearch-btn">Search</vs-button>
                  </div>
                </template>
              </vx-input-group>
              <div class="d-flex">
                <img
                  class="mr-3 pr-2 p-2"
                  width="45px"
                  height="45px"
                  src="../assets/images/documents_icon/sorting-active.png"
                />
                <img
                  class="p-2"
                  width="45px"
                  height="45px"
                  src="../assets/images/documents_icon/grid-icon.png"
                />
              </div>
            </vx-card>
            <div v-if="subFilesdata.length" class="w-100 d-flex flex-wrap folder-main">
              <div class="folder-wrapper" v-for="subData in subFilesdata" :key="subData.id">
                <span @click="getFiles(subData)" class="cursor-pointer">
                  <div class="file-icon text-center" v-if="subData.children.length > 0">
                    <img src="../assets/images/documents_icon/folder_img.png" class="img-fluid" />
                    <span>{{subData.text}}</span>
                  </div>
                  <div class="file-icon text-center" v-else>
                    <img src="../assets/images/documents_icon/folder_img.png" />
                    <span>{{subData.text}}</span>
                  </div>
                </span>
              </div>
            </div>
          </vs-col>
        </vs-row>
      </div>
      <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-3 pl-6">
        <div class="row border-none">
          <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
            <div class="vs-row border-none">
              <div class="vs-xs-12 vs-sm-12 vs-md-12">
                <div class="doc-detail">
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                </div>
              </div>
            </div>
          </div>
          <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
            <div class="vs-row border-none">
              <div class="vs-xs-12 vs-sm-12 vs-md-12">
                <div class="doc-detail">
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                </div>
              </div>
            </div>
          </div>
          <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
            <div class="vs-row border-none">
              <div class="vs-xs-12 vs-sm-12 vs-md-12">
                <div class="doc-detail">
                  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <vs-col vs-offset="0" vs-align="left" vs-w="2" class="sm p-0"></vs-col> -->
    </vs-row>
  </div>
</template>

<script>
import axios from '../axios.js'
import subDocument from './Sub-Document/sub-document.vue'
import filesList from './Document_Files.js'
import VTreeview from 'v-treeview'
export default {
  data () {
    return {
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
      openAll: false,
      treeTypes: [
        {
          type: "#",
          max_children: 6,
          max_depth: 4,
          valid_children: [
            "Folder",
            "In",
            "Out",
            "Stared",
            "Trash",
            "Shared",
            "File"
          ]
        },
        {
          type: "Folder",
          icon: "fas fa-folder",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "In",
          icon: "fas fa-sign-in-alt",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "Out",
          icon: "fas fa-sign-out-alt",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "Stared",
          icon: "fas fa-star",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "Trash",
          icon: "fas fa-trash-alt",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "Shared",
          icon: "fal fa-share-alt",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "File",
          icon: "fas fa-file",
          valid_children: ["Basic", "Top-up"]
        },
      ],
      treeData: filesList,
      contextItems: [],
      selectedNode: null
    }
  },
  methods: {
    getFiles (file) {
      console.log('Files =>>>', this.subFilesdata);
      file.isOpen = !file.isOpen
      this.subFilesdata = file.children
    },
    getTypeRule (type) {
      var typeRule = this.treeTypes.filter(t => t.type == type)[0];
      return typeRule;
    },
    contextSelected (command) {
      switch (command) {
        case "Create Basic":
          var node = {
            text: "New Basic Plan",
            type: "Basic",
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Create Top-up":
          var node = {
            text: "New Top-up",
            type: "Top-up",
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Rename":
          this.selectedNode.editName();
          break;
        case "Remove":
          break;
      }
    },
    selected (node) {
      this.subFilesdata = node.model.children
      console.log('Node =>', this.subFilesdata);
      this.selectedNode = node;
      this.contextItems = [];
      var typeRule = this.getTypeRule(this.selectedNode.model.type);
      typeRule.valid_children.map(function (type, key) {
        var childType = this.getTypeRule(type);
        var item = {
          title: "Create " + type,
          icon: childType.icon,
          type: childType
        };
        this.contextItems.push(item);
      }, this);

      this.contextItems.push({ title: "Rename", icon: "far fa-edit" });
      this.contextItems.push({ title: "Remove", icon: "far fa-trash-alt" });
    }
  },
  components: {
    VTreeview
  }
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
