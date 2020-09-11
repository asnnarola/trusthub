<template>
  <div class="grid-demo__layout-container">
    <identity-customizer />
    <!-- <label-customizer/> -->
    <vs-row class="border-0 mb-6 align-items-center">
      <vs-spacer />
      <div class="vs-col vs-sm-12 vs-md-12 vs-lg-4 bg-transparent border-0">1</div>
      <div
        class="vs-col vs-sm-12 vs-md-12 vs-lg-8 d-flex flex-wrap justify-content-end bg-transparent border-0"
      >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          @click="Pad_Show = !Pad_Show"
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
            <span class="Signature_pad" v-if="Pad_Show">
              <div class="row">
                <div class="col-12 mt-2">
                  <!-- <div class="wrapper">
                    <canvas id="signPad" class="signature-pad" width="400" height="200" />
                  </div> -->
                  <VueSignaturePad
                    id="signature"
                    width="100%"
                    height="500px"
                    ref="signaturePad"
                    :options="options"
                  />
                </div>
              </div>
              <div class="row">
                <div class="row">
                  <div class="col-3 mt-2">
                    <button class="btn btn-outline-secondary" @click="undo">Undo</button>
                  </div>
                  <div class="col-3 mt-2">
                    <button class="btn btn-outline-primary" @click="save">Save</button>
                  </div>
                  <div class="col-3 mt-2">
                    <button class="btn btn-outline-primary" @click="change">Change</button>
                  </div>
                  <div class="col-3 mt-2">
                    <button class="btn btn-outline-primary" @click="resume">Resume</button>
                  </div>
                </div>
                <!-- <div class="col-3 mt-2">
                  <button class="btn btn-outline-secondary" @click="saveAsPng">Save as PNG</button>
                </div>
                <div class="col-3 mt-2">
                  <button class="btn btn-outline-primary" @click="saveAsJpeg">Save as JPEG</button>
                </div>
                <div class="col-3 mt-2">
                  <button class="btn btn-outline-primary" @click="saveAsSvg">Sane as SVG</button>
                </div>
                <div class="col-3 mt-2">
                  <button class="btn btn-outline-primary" @click="draw">Draw</button>
                </div>
                <div class="col-3 mt-2">
                  <button class="btn btn-outline-primary" @click="erase">Erase</button>
                </div>
                <div class="col-3 mt-2">
                  <button class="btn btn-outline-primary" @click="clearSignature">Clear</button>
                </div>-->
              </div>
            </span>
            <span class="pdf">
              <!-- <pdf src="https://gahp.net/wp-content/uploads/2017/09/sample.pdf"></pdf> -->
              <!-- <pdf src="../../assets/files/test.pdf"></pdf> -->
              <vue-pdf-viewer
                height="700px"
                url="https://gahp.net/wp-content/uploads/2017/09/sample.pdf"
              ></vue-pdf-viewer>
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
                      <h6 class="mb-2">
                        <b>Process Sequenes</b>
                      </h6>
                      <h6 class="step-txt">
                        <b>Step by Step Process</b>
                      </h6>
                      <div class="traking-wrapper">
                        <div class="d-flex pb-6 position-relative traking-wrap active">
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
                        <div class="d-flex pb-6 position-relative traking-wrap active">
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
                        <div class="d-flex pb-6 position-relative traking-wrap">
                          <div class="checkbox-block">4</div>
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
                        <div class="d-flex pb-4 position-relative traking-wrap">
                          <div class="checkbox-block">5</div>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="vs-xs-12 vs-sm-6 vs-md-12 vs-lg-12 barcode-view signature-info">
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
import LabelCustomizer from '../../layouts/components/customizer/LabelsCustomizer.vue'
// import pdf from 'vue-pdf'
import filesList from '../Document_Files'
import VuePDFViewer from "vue-instant-pdf-viewer"
import SignaturePad from 'signature_pad'


export default {
  data () {
    return {
      Pad_Show: false,
      CurrentDate: new Date().toISOString(),
      id: this.$route.params.id,
      options: {
        penColor: "#c0f"
      },
      canvas: document.getElementById('signPad')
    }
  },
  mounted () {
    // const canvas = document.getElementById('signPad');
    console.log(this.canvas);
    var signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'rgb(255, 255, 255)'
    });
  },
  components: {
    IdentityCustomizer,
    LabelCustomizer,
    // 'pdf': pdf
    "vue-pdf-viewer": VuePDFViewer,
  },
  methods: {
    getFilePath () {
      filesList.forEach(file => {
        console.log('Files =>', file);
      });
    },
    undo () {
      this.$refs.signaturePad.undoSignature();
    },
    save () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      alert("Open DevTools see the save data.");
      console.log(isEmpty);
      console.log(data);
    },
    change () {
      this.options = {
        penColor: "#00f"
      };
    },
    resume () {
      this.options = {
        penColor: "#c0f"
      };
    }
  },
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
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

// @import "@/assets/scss/vuexy/themes/_themeDark.scss
</style>
