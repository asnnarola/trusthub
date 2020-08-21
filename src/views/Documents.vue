<template>
  <div class="grid-demo__layout-container">
    <vs-row>
      <vs-col
        vs-offset="0"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="2"
        class="sm:p-4 p-4"
      >
        <vx-card class="box-shadow-none">
          <vs-button color="gray" class="border-radius-0 w-100 mr-3 mb-3">New</vs-button>
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
          <div class="d-flex">
            <img class="mr-3" src="../assets/images/documents_icon/sorting-active.png" />
            <img src="../assets/images/documents_icon/grid-icon.png" />
          </div>
        </vx-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-offset="0"
        vs-type="flex"
        vs-align="center"
        vs-w="2"
        class="sm:p-2 p-4"
      >
        <!-- <nav
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
        </nav> -->

        <v-treeview
        v-model="treeData"
        :treeTypes="treeTypes"
        @selected="selected"
        :openAll="openAll"
        :contextItems="contextItems"
        @contextSelected="contextSelected">
        </v-treeview>
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
              <div class="file-icon text-center"  v-if="subData.children.length > 0">
                <img src="../assets/images/documents_icon/folder_img.png" class="img-fluid"/>
                <span>{{subData.text}}</span>
              </div>
              <div class="file-icon text-center"  v-else>
                <img src="../assets/images/documents_icon/folder_img.png" />
                <span>{{subData.text}}</span>
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
import VTreeview from 'v-treeview'
export default {
  data () {
    return {
      subFilesdata: [],
      search: '',
      openAll: false,
      treeTypes: [
        {
          type: "#",
          max_children: 6,
          max_depth: 4,
          valid_children: [
            "FMM_EMPLOYEE",
            "FMM_SPOUSE",
            "FMM_CHILD",
            "FMM_SIBLING",
            "FMM_PARENT",
            "FMM_PARENT_IN_LAW"
          ]
        },
        {
          type: "FMM_EMPLOYEE",
          icon: "fas fa-folder",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_SPOUSE",
          icon: "fas fa-folder",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_CHILD",
          icon: "fas fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_SIBLING",
          icon: "fas fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_PARENT",
          icon: "fas fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_PARENT_IN_LAW",
          icon: "fas fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "Basic",
          icon: "fas fa-hospital",
          valid_children: ["Top-up"]
        },
        {
          type: "Top-up",
          icon: "fas fa-plus-square",
          valid_children: []
        }
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
    getTypeRule(type) {
      var typeRule = this.treeTypes.filter(t => t.type == type)[0];
      return typeRule;
    },
    contextSelected(command) {
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
    selected(node) {
      this.subFilesdata = node.model.children
      console.log('Node =>',this.subFilesdata);
      this.selectedNode = node;
      this.contextItems = [];
      var typeRule = this.getTypeRule(this.selectedNode.model.type);
      typeRule.valid_children.map(function(type, key) {
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
