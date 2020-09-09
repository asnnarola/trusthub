<template>
  <div class="grid-demo__layout-container">
    <identity-customizer />
    <vs-row class="border-0 mb-6 align-items-center">
      <vs-spacer />
      <div class="vs-col vs-sm-12 vs-md-12 vs-lg-4 bg-transparent border-0">1</div>
      <div class="vs-col vs-sm-12 vs-md-12 vs-lg-8 d-flex flex-wrap justify-content-end bg-transparent border-0">
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Sign</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Seal</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Graph</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Draw</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Bio</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Encrypt</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Protect</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
        >Notary</vs-button>
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn fw-500 subdoc-btn"
          type="filled"
        >Verify</vs-button>
      </div>
    </vs-row>
    <vs-row class="border-0 filemanage-wrapper">
      <div class="vs-xs-12 vs-sm-12 vs-md-9 vs-lg-9">
        <vs-row class="h-100">
          <vx-card class="box-shadow-none serach-wrapper p-2">
            <span class="pdf">
              <pdf src="../../assets/files/test.pdf"></pdf>
              <!-- <vue-pdf-viewer height="500px" url="https://bitcoin.org/bitcoin.pdf"></vue-pdf-viewer> -->
            </span>
          </vx-card>
        </vs-row>
      </div>
      <div class="vs-xs-12 vs-sm-12 vs-md-3 vs-lg-3 pl-6 docreport-filesmain">
        <div class="row border-none d-sm-flex d-md-block w-100">
          <div class="vs-xs-12 vs-sm-6 vs-md-12 vs-lg-12 pdfdoc-view">
            <div class="row border-none w-100">
              <div class="vs-xs-12 vs-sm-12 vs-md-12 mb-4">
                <div class="vs-row border-none w-100">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12">
                    <div class="doc-detail process-seq-wrapper">
                      <h5 class="mb-2"><b>Process Sequenes</b></h5>
                      <h6 class="step-txt"><b>Step by Step Process</b></h6>
                      <div class="traking-wrapper">
                        <!-- <vs-checkbox color="warning" v-model="chkbox1"> -->
                        <div class="d-flex pb-6 position-relative traking-wrap">
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Income Document</b>
                            </h6>
                            <p class="mb-1 fw-600">Uploaded by Roberto Minoletti</p>
                            <p>
                              <i>UTC {{CurrentDate}}</i>
                            </p>
                          </div>
                        </div>
                        <!-- </vs-checkbox> -->
                        <!-- <vs-checkbox color="warning" v-model="chkbox2"> -->
                        <div class="d-flex pb-6 position-relative traking-wrap">
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Flow Orchestrator</b>
                            </h6>
                            <p class="mb-1 fw-500">Sent to Sign by Reberto Minoletti</p>
                            <p>
                              <i>UTC {{CurrentDate}}</i>
                            </p>
                          </div>
                        </div>
                        <!-- </vs-checkbox> -->
                        <!-- <vs-checkbox color="warning" v-model="chkbox3"> -->
                        <div class="d-flex pb-6 position-relative traking-wrap">
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Signature Process</b>
                            </h6>
                            <p class="mb-1 fw-500">Signed by Reberto Minoletti</p>
                            <p>
                              <i>UTC {{CurrentDate}}</i>
                            </p>
                          </div>
                        </div>
                        <!-- </vs-checkbox> -->
                        <!-- <vs-checkbox color="warning" v-model="chkbox4"> -->
                        <div class="d-flex pb-6 position-relative traking-wrap">
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Identification</b>
                            </h6>
                            <p class="mb-1 fw-500">Face Recognition by Reberto Minoletti</p>
                            <p>
                              <i>UTC {{CurrentDate}}</i>
                            </p>
                          </div>
                        </div>
                        <!-- </vs-checkbox> -->
                        <!-- <vs-checkbox color="warning" v-model="chkbox5"> -->
                        <div class="d-flex pb-4 position-relative traking-wrap">
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Document Management</b>
                            </h6>
                            <p class="mb-1 fw-500">Stored in OpenKM by Reberto Minoletti</p>
                            <p>
                              <i>UTC {{CurrentDate}}</i>
                            </p>
                          </div>
                        </div>
                        <!-- </vs-checkbox> -->
                      </div>
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
                    <div class="doc-detail text-right mb-6 mt-6">
                      <p>
                        <i>Name: Portable Document Format</i>
                      </p>
                      <p>
                        <i>Type: pdf/A</i>
                      </p>
                      <p>
                        <i>Size:253Kb</i>
                      </p>
                      <p>
                        <i>Creation Date: 20/07/2020 15:55:22</i>
                      </p>
                      <p>
                        <i>Last Modification: 21/07/2020 18:14:59</i>
                      </p>
                      <p>
                        <i>Owner: Reberto Minoletti</i>
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
                          src="../../assets/images/documents_icon/QR_code.png"
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
import IdentityCustomizer from '../../layouts/components/customizer/IdentityCustomizer.vue'
import pdf from 'vue-pdf'
// import VuePDFViewer from "vue-instant-pdf-viewer";
export default {
  data () {
    return {
      CurrentDate: new Date().toISOString(),
      id: this.$route.params.id
    }
  },
  components: {
    IdentityCustomizer,
    'pdf': pdf
    // "vue-pdf-viewer": VuePDFViewer,
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
