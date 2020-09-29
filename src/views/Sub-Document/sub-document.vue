<template>
  <div class="grid-demo__layout-container">
    <identity-customizer />
    <!-- <label-customizer/> -->
    <vs-row class="border-0 mb-6 align-items-center">
      <vs-spacer />
      <div class="vs-col vs-sm-12 vs-md-12 vs-lg-12 vs-xl-4 bg-transparent border-0 p-0">
        <div class="file-path d-flex align-items-center">
          <img src="@/assets/images/documents_icon/pdf.png" width="45" class="img-fluid mr-3" />
          <p>\ inbound \ Rental contract assurance.pdf</p>
        </div>
      </div>
      <div
        class="vs-col vs-sm-12 vs-md-12 vs-lg-12 vs-xl-8 d-flex flex-wrap justify-content-end bg-transparent border-0 pr-0 pt-0 pb-0 pl-2 docsign-btn"
      >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          @click="signpadShow()"
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
      <div class="vs-xs-12 vs-sm-12 vs-md-8 vs-lg-9">
        <vs-row class="h-100 border-0">
          <vx-card class="box-shadow-none serach-wrapper pdfviewer-wrapper">
            <vs-popup
              class="Signature-popup"
              classContent="popup-example"
              title
              :active.sync="Pad_Show"
            >
              <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12 mt-2">
                <div class="Signature_pad pl-10 pr-10">
                  <div class="row">
                    <div class="wrapper position-relative">
                      <div
                        class="select-block d-flex justify-content-end position-absolute right-0 pt-6"
                      >
                        <div class="mr-10 selectlabel-check active">
                          <h6 class="d-flex align-items-center">
                            <i class="pr-3">DSV</i>
                            <span>
                              <i class="fas fa-check"></i>
                            </span>
                          </h6>
                        </div>
                        <div class="selectlabel-check">
                          <h6 class="d-flex align-items-center">
                            <i class="pr-3">SSV</i>
                            <span>
                              <i class="fas fa-check"></i>
                            </span>
                          </h6>
                        </div>
                      </div>
                      <canvas
                        id="signPad"
                        ref="signPad"
                        class="signature-pad w-100"
                        style="background-color: transparent !important;"
                      />
                    </div>
                  </div>
                </div>
                <vs-divider class="mb-5 mt-0 green-divider" />
                <vs-row class="align-items-center mb-10">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-7">
                    <vs-button class="btn green-btn mr-2 mb-2" @click="clearSignature">Clear</vs-button>
                    <vs-button class="btn green-btn mr-2 mb-2" @click="undoSignature">Undo</vs-button>
                    <vs-button class="btn green-btn mr-2 mb-2" @click="saveAsJpeg">Save</vs-button>
                    <vs-button
                      class="btn green-btn mr-2 mb-2"
                      @click="undoSignature"
                    >Advanced Options</vs-button>
                  </div>
                  <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-5 text-right signdetail-block">
                    <p class="text-dark">
                      <i>Geolocalization: 40.689263-74.044505</i>
                    </p>
                    <p class="text-dark">
                      <i>UTC {{CurrentDate}}</i>
                    </p>
                    <p class="text-dark">
                      <i>Device Id: FDD76471-FCF9-4172-BAAF-D78924A4E62C</i>
                    </p>
                  </div>
                </vs-row>
              </div>
            </vs-popup>
            <div class="pdfview-content">
              <!-- <div>
                <button id="prev">Previous</button>
                <button id="next">Next</button>
                &nbsp; &nbsp;
                <span>
                  Page:
                  <span id="page_num"></span> /
                  <span id="page_count"></span>
                </span>
              </div>
              <canvas  id="the-canvas"></canvas> -->
              <!-- <vue-pdf-viewer class="abd_1" width="100px" height="500px" url="http://www.africau.edu/images/default/sample.pdf"></vue-pdf-viewer> -->
              <VuePdfJs class="gray" :url="pdfUrl" />
              <!-- <WebViewer initialDoc="http://www.africau.edu/images/default/sample.pdf"/> -->
              <!-- <vue-pdf-reader url="http://www.africau.edu/images/default/sample.pdf">
              </vue-pdf-reader> -->

              <!-- <vue-pdf-viewer url="https://gahp.net/wp-content/uploads/2017/09/sample.pdf"></vue-pdf-viewer> -->

            </div>
          </vx-card>
        </vs-row>
      </div>
      <div class="vs-xs-12 vs-sm-12 vs-md-4 vs-lg-3 pl-6 docreport-filesmain">
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
                    <div class="doc-detail docsign-block text-right mb-6 mt-6">
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
import filesList from '../Document_Files'
import VuePDFViewer from "vue-instant-pdf-viewer"
import SignaturePad from 'signature_pad'
import WebViewer from './web-viewer.vue'
import VuePdfJs  from 'vue-pdfjs-demo/src/App.vue'

// var pdfjsLib = window['pdfjs-dist/build/pdf'];
// pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

export default {
  data () {
    return {
      Pad_Show: false,
      CurrentDate: new Date().toISOString(),
      id: this.$route.params.id,
      options: {
        penColor: "#c0f"
      },
      signaturePad: SignaturePad,
      pdfUrl: 'http://www.africau.edu/images/default/sample.pdf',
    }
  },

  // mounted () {
  //   var pdfDoc = null,
  //     pageNum = 1,
  //     pageRendering = false,
  //     pageNumPending = null,
  //     scale = 0.8,
  //     canvas = document.getElementById('the-canvas'),
  //     ctx = canvas.getContext('2d');

  //   /**
  //    * Get page info from document, resize canvas accordingly, and render page.
  //    * @param num Page number.
  //    */
  //   function renderPage (num) {
  //     pageRendering = true;
  //     // Using promise to fetch the page
  //     pdfDoc.getPage(num).then(function (page) {
  //       var viewport = page.getViewport({ scale: scale });
  //       canvas.height = viewport.height;
  //       canvas.width = viewport.width;

  //       // Render PDF page into canvas context
  //       var renderContext = {
  //         canvasContext: ctx,
  //         viewport: viewport
  //       };
  //       var renderTask = page.render(renderContext);

  //       // Wait for rendering to finish
  //       renderTask.promise.then(function () {
  //         pageRendering = false;
  //         if (pageNumPending !== null) {
  //           // New page rendering is pending
  //           renderPage(pageNumPending);
  //           pageNumPending = null;
  //         }
  //       });
  //     });

  //     // Update page counters
  //     document.getElementById('page_num').textContent = num;
  //   }

  //   /**
  //    * If another page rendering in progress, waits until the rendering is
  //    * finised. Otherwise, executes rendering immediately.
  //    */
  //   function queueRenderPage (num) {
  //     if (pageRendering) {
  //       pageNumPending = num;
  //     } else {
  //       renderPage(num);
  //     }
  //   }

  //   /**
  //    * Displays previous page.
  //    */
  //   function onPrevPage () {
  //     if (pageNum <= 1) {
  //       return;
  //     }
  //     pageNum--;
  //     queueRenderPage(pageNum);
  //   }
  //   document.getElementById('prev').addEventListener('click', onPrevPage);

  //   /**
  //    * Displays next page.
  //    */
  //   function onNextPage () {
  //     if (pageNum >= pdfDoc.numPages) {
  //       return;
  //     }
  //     pageNum++;
  //     queueRenderPage(pageNum);
  //   }
  //   document.getElementById('next').addEventListener('click', onNextPage);

  //   /**
  //    * Asynchronously downloads PDF.
  //    */
  //   pdfjsLib.getDocument(this.pdfUrl).promise.then(function (pdfDoc_) {
  //     pdfDoc = pdfDoc_;
  //     document.getElementById('page_count').textContent = pdfDoc.numPages;

  //     // Initial/first page rendering
  //     renderPage(pageNum);
  //   });
  // },
  components: {
    IdentityCustomizer,
    LabelCustomizer,
    "vue-pdf-viewer": VuePDFViewer,
    "VuePdfJs": VuePdfJs ,
    WebViewer
  },
  methods: {
    getFilePath () {
      filesList.forEach(file => {
        console.log('Files =>', file);
      });
    },
    async signpadShow () {
      this.Pad_Show = true
      const canvas = await document.getElementById('signPad')
      console.log(this.$refs.signPad);
      console.log(document.getElementById('signPad'));
      this.signaturePad = new SignaturePad(this.$refs.signPad, {
        backgroundColor: 'transparent'
      });
    },
    // saveAsPng () {
    //   if (this.signaturePad.isEmpty()) {
    //     return alert("Please provide a signature first.");
    //   }
    //   var data = this.signaturePad.toDataURL('image/png');
    //   console.log(data);
    // },
    saveAsJpeg () {
      if (this.signaturePad.isEmpty()) {
        return alert("Please provide a signature first.");
      }
      var data = this.signaturePad.toDataURL('image/jpeg');
      console.log(data);
    },

    // saveAsSvg () {
    //   if (this.signaturePad.isEmpty()) {
    //     return alert("Please provide a signature first.");
    //   }
    //   var data = this.signaturePad.toDataURL('image/svg+xml');
    //   console.log(data);
    //   // console.log(atob(data.split(',')[1]));
    // },
    undoSignature () {
      var data = this.signaturePad.toData();
      if (data) {
        data.pop();
        this.signaturePad.fromData(data);
      }
    },
    clearSignature () {
      this.signaturePad.clear();
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
@import "@/assets/scss/style.scss";
// @import '~vue-pdf-reader/dist/vue-pdf-reader.min.css';
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
