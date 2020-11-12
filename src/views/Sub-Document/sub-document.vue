<template>
  <div class="grid-demo__layout-container">
    <label-customizer />
    <!-- <identity-customizer/> -->
    <vs-row class="border-0 mb-6 align-items-center">
      <vs-spacer />
      <div
        class="vs-col vs-sm-12 vs-md-12 vs-lg-12 vs-xl-4 bg-transparent border-0 p-0"
      >
        <div class="file-path d-flex align-items-center">
          <img
            src="@/assets/images/documents_icon/pdf.png"
            width="45"
            class="img-fluid mr-3"
          />
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
          >Sign</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          @click="fingerPrintShow()"
          >Fingerprint</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Seal</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Graph</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Draw</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Bio</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Encrypt</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Protect</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
          type="filled"
          >Notary</vs-button
        >
        <vs-button
          color="primary"
          class="btn-gray w-auto mt-2 mb-2 flow-gray-btn fw-500 subdoc-btn"
          type="filled"
          >Verify</vs-button
        >
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
                        style="background-color: transparent !important"
                      />
                    </div>
                  </div>
                </div>
                <vs-divider class="mb-5 mt-0 green-divider" />
                <vs-row class="align-items-center mb-10">
                  <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-7">
                    <vs-button
                      class="btn green-btn mr-2 mb-2"
                      @click="clearSignature"
                      >Clear</vs-button
                    >
                    <vs-button
                      class="btn green-btn mr-2 mb-2"
                      @click="undoSignature"
                      >Undo</vs-button
                    >
                    <vs-button
                      class="btn green-btn mr-2 mb-2"
                      @click="saveAsJpeg"
                      >Save</vs-button
                    >
                    <vs-button
                      class="btn green-btn mr-2 mb-2"
                      @click="undoSignature"
                      >Advanced Options</vs-button
                    >
                  </div>
                  <div
                    class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-5 text-right signdetail-block"
                  >
                    <p class="text-dark">
                      <i>Geolocalization: 40.689263-74.044505</i>
                    </p>
                    <p class="text-dark">
                      <i>UTC {{ CurrentDate }}</i>
                    </p>
                    <p class="text-dark">
                      <i>Device Id: FDD76471-FCF9-4172-BAAF-D78924A4E62C</i>
                    </p>
                  </div>
                </vs-row>
              </div>
            </vs-popup>
            <vs-popup
              class="FingerPrint-popup"
              classContent="popup-example"
              background-color="rgba(255,255,255,.6)"
              :active.sync="fingerPrint_Pad"
            >
              <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12 mt-2">
                <div class="Signature_pad">
                  <div class="row">
                    <div class="wrapper position-relative">
                      <div
                        class="select-block d-flex justify-content-end position-absolute right-0 pt-15"
                      >
                        <h6 class="d-flex align-items-center">
                          <span class="pr-20 ">Scan Quality: Good</span>
                        </h6>
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
                      <!-- FIngerPrint Copy -->
                      <!-- <div id="content-capture" style="display : none;"> -->
                      <div id="status"></div>
                      <div id="imagediv"></div>
                      <div id="contentButtons">
                        <table width="70%" align="center">
                          <tr>
                            <td>
                              <!-- <input
                                type="button"
                                class="btn btn-primary"
                                id="clearButton"
                                value="Clear"
                                onclick="Javascript:onClear()"
                              /> -->
                              <vs-button
                                color="primary"
                                id="clearButton"
                                class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
                                type="filled"
                                @click="onClear()"
                              >
                                Clear
                              </vs-button>
                            </td>
                            <td
                              data-toggle="tooltip"
                              title="Will work with the .png format."
                            >
                              <!-- <input
                                type="button"
                                class="btn btn-primary"
                                id="save"
                                value="Save"
                              /> -->
                              <vs-button
                                color="primary"
                                id="save"
                                class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
                                type="filled"
                              >
                                Save
                              </vs-button>
                            </td>
                            <td>
                              <!-- <input
                                type="button"
                                class="btn btn-primary"
                                id="start"
                                value="Start"
                                onclick="Javascript:onStart()"
                              /> -->
                              <vs-button
                                color="primary"
                                id="start"
                                class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
                                type="filled"
                                @click="onStart()"
                              >
                                Start
                              </vs-button>
                            </td>
                            <td>
                              <!-- <input
                                type="button"
                                class="btn btn-primary"
                                id="stop"
                                value="Stop"
                                onclick="Javascript:onStop()"
                              /> -->
                              <vs-button
                                color="primary"
                                id="stop"
                                class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
                                type="filled"
                                @click="onStop()"
                              >
                                Stop
                              </vs-button>
                            </td>
                            <td>
                              <!-- <input
                                type="button"
                                class="btn btn-primary"
                                id="info"
                                value="Info"
                                onclick="Javascript:onGetInfo()"
                              /> -->

                              <vs-button
                                color="primary"
                                id="info"
                                class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1 fw-500 subdoc-btn"
                                type="filled"
                                @click=onGetInfo()
                              >
                                Info
                              </vs-button>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div id="imageGallery"></div>
                      <div id="deviceInfo"></div>

                      <div id="saveAndFormats">
                        <form
                          name="myForm"
                          style="border: solid grey; padding: 5px"
                        >
                          <b>Acquire Formats :</b><br />
                          <table>
                            <tr
                              data-toggle="tooltip"
                              title="Will save data to a .raw file."
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  name="Raw"
                                  value="1"
                                  onclick="checkOnly(this)"
                                />
                                RAW <br />
                              </td>
                            </tr>
                            <tr
                              data-toggle="tooltip"
                              title="Will save data to a Intermediate file"
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  name="Intermediate"
                                  value="2"
                                  onclick="checkOnly(this)"
                                />
                                Feature Set<br />
                              </td>
                            </tr>
                            <tr
                              data-toggle="tooltip"
                              title="Will save data to a .wsq file."
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  name="Compressed"
                                  value="3"
                                  onclick="checkOnly(this)"
                                />
                                WSQ<br />
                              </td>
                            </tr>
                            <tr
                              data-toggle="tooltip"
                              title="Will save data to a .png file."
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  name="PngImage"
                                  checked="true"
                                  value="4"
                                  onclick="checkOnly(this)"
                                />
                                PNG
                              </td>
                            </tr>
                          </table>
                        </form>
                        <br />
                        <input
                          type="button"
                          class="btn btn-primary"
                          id="saveImagePng"
                          value="Export"
                          onclick="Javascript:onImageDownload()"
                        />
                      </div>
                      <!-- </div> -->
                      <!--  -->
                    </div>
                  </div>
                </div>
                <vs-divider class="mb-5 mt-0 green-divider" />
                <vs-row class="align-items-center mb-10">
                  <!-- <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12">
                    <vs-button class="btn green-btn mr-2 mb-2" @click="clearSignature">Clear</vs-button>
                    <vs-button class="btn green-btn mr-2 mb-2" @click="undoSignature">Undo</vs-button>
                    <vs-button class="btn green-btn mr-2 mb-2" @click="saveAsJpeg">Save</vs-button>
                    <vs-button
                      class="btn green-btn mr-2 mb-2"
                      @click="undoSignature"
                    >Advanced Options</vs-button>
                  </div>-->

                  <div class="vs-xs-12 vs-sm-12 vs-md-12 vs-lg-12 text-right signdetail-block">
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
                        <div
                          class="d-flex pb-6 position-relative traking-wrap active"
                        >
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Income Document</b>
                            </h6>
                            <p class="mb-1 fw-600">
                              Uploaded by Roberto Minoletti
                            </p>
                            <p>
                              <i>UTC {{ CurrentDate }}</i>
                            </p>
                          </div>
                        </div>
                        <div
                          class="d-flex pb-6 position-relative traking-wrap active"
                        >
                          <div class="checkbox-block">
                            <i class="fas fa-check"></i>
                          </div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Flow Orchestrator</b>
                            </h6>
                            <p class="mb-1 fw-500">
                              Sent to Sign by Reberto Minoletti
                            </p>
                            <p>
                              <i>UTC {{ CurrentDate }}</i>
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
                            <p class="mb-1 fw-500">
                              Signed by Reberto Minoletti
                            </p>
                            <p>
                              <i>UTC {{ CurrentDate }}</i>
                            </p>
                          </div>
                        </div>
                        <div class="d-flex pb-6 position-relative traking-wrap">
                          <div class="checkbox-block">4</div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Identification</b>
                            </h6>
                            <p class="mb-1 fw-500">
                              Face Recognition by Reberto Minoletti
                            </p>
                            <p>
                              <i>UTC {{ CurrentDate }}</i>
                            </p>
                          </div>
                        </div>
                        <div class="d-flex pb-4 position-relative traking-wrap">
                          <div class="checkbox-block">5</div>
                          <div class="trak-detail">
                            <h6 class="mb-1">
                              <b>Document Management</b>
                            </h6>
                            <p class="mb-1 fw-500">
                              Stored in OpenKM by Reberto Minoletti
                            </p>
                            <p>
                              <i>UTC {{ CurrentDate }}</i>
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
          <div
            class="vs-xs-12 vs-sm-6 vs-md-12 vs-lg-12 barcode-view signature-info"
          >
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
import VuePdfJs from 'vue-pdfjs-demo/src/App.vue'
import Fingerprint from '../../../public/fingerprint.sdk.min.js'

// var pdfjsLib = window['pdfjs-dist/build/pdf'];
// pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';



var test = null;

var state = document.getElementById('content-capture');

var myVal = ""; // Drop down selected value of reader
var disabled = true;
var startEnroll = false;

var currentFormat = Fingerprint.SampleFormat.PngImage;
var deviceTechn = {
               0: "Unknown",
               1: "Optical",
               2: "Capacitive",
               3: "Thermal",
               4: "Pressure"
            }

var deviceModality = {
               0: "Unknown",
               1: "Swipe",
               2: "Area",
               3: "AreaMultifinger"
            }

var deviceUidType = {
               0: "Persistent",
               1: "Volatile"
            }

var FingerprintSdkTest = (function () {
    function FingerprintSdkTest() {
        var _instance = this;
        this.operationToRestart = null;
        this.acquisitionStarted = false;
        this.sdk = new Fingerprint.WebApi;
        this.sdk.onDeviceConnected = function (e) {
            // Detects if the deveice is connected for which acquisition started
            showMessage("Scan your finger");
        };
        this.sdk.onDeviceDisconnected = function (e) {
            // Detects if device gets disconnected - provides deviceUid of disconnected device
            showMessage("Device disconnected");
        };
        this.sdk.onCommunicationFailed = function (e) {
            // Detects if there is a failure in communicating with U.R.U web SDK
            showMessage("Communinication Failed")
        };
        this.sdk.onSamplesAcquired = function (s) {
            // Sample acquired event triggers this function
                sampleAcquired(s);
        };
        this.sdk.onQualityReported = function (e) {
            // Quality of sample aquired - Function triggered on every sample acquired
                document.getElementById("qualityInputBox").value = Fingerprint.QualityCode[(e.quality)];
        }

    }

    FingerprintSdkTest.prototype.startCapture = function () {
        if (this.acquisitionStarted) // Monitoring if already started capturing
            return;
        var _instance = this;
        showMessage("");
        this.operationToRestart = this.startCapture;
        this.sdk.startAcquisition(currentFormat, myVal).then(function () {
            _instance.acquisitionStarted = true;
            //Disabling start once started
            disableEnableStartStop();

        }, function (error) {
            showMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.stopCapture = function () {
        if (!this.acquisitionStarted) //Monitor if already stopped capturing
            return;
        var _instance = this;
        showMessage("");
        this.sdk.stopAcquisition().then(function () {
            _instance.acquisitionStarted = false;

            //Disabling stop once stoped
            disableEnableStartStop();

        }, function (error) {
            showMessage(error.message);
        });
    };

    FingerprintSdkTest.prototype.getInfo = function () {
        var _instance = this;
        return this.sdk.enumerateDevices();
    };

    FingerprintSdkTest.prototype.getDeviceInfoWithID = function (uid) {
        var _instance = this;
        return  this.sdk.getDeviceInfo(uid);
    };


    return FingerprintSdkTest;
})();

function showMessage(message){
    var _instance = this;
    //var statusWindow = document.getElementById("status");
    x = state.querySelectorAll("#status");
    if(x.length != 0){
        x[0].innerHTML = message;
    }
}

window.onload = function () {
    localStorage.clear();
    test = new FingerprintSdkTest();
    readersDropDownPopulate(true); //To populate readers for drop down selection
    disableEnable(); // Disabling enabling buttons - if reader not selected
    enableDisableScanQualityDiv("content-reader"); // To enable disable scan quality div
    disableEnableExport(true);
};


function onStart() {
    assignFormat();
    if(currentFormat == ""){
        alert("Please select a format.")
    }else{
        test.startCapture();

    }
}

function onStop() {
    test.stopCapture();
}

function onGetInfo() {
    var allReaders = test.getInfo();
    allReaders.then(function (sucessObj) {
        populateReaders(sucessObj);
    }, function (error){
        showMessage(error.message);
    });
}
function onDeviceInfo(id, element){
    var myDeviceVal = test.getDeviceInfoWithID(id);
    myDeviceVal.then(function (sucessObj) {
            var deviceId = sucessObj.DeviceID;
            var uidTyp = deviceUidType[sucessObj.eUidType];
            var modality = deviceModality[sucessObj.eDeviceModality];
            var deviceTech = deviceTechn[sucessObj.eDeviceTech];
            //Another method to get Device technology directly from SDK
            //Uncomment the below logging messages to see it working, Similarly for DeviceUidType and DeviceModality
            //console.log(Fingerprint.DeviceTechnology[sucessObj.eDeviceTech]);
            //console.log(Fingerprint.DeviceModality[sucessObj.eDeviceModality]);
            //console.log(Fingerprint.DeviceUidType[sucessObj.eUidType]);
            var retutnVal = //"Device Info -"
                 "Id : " +  deviceId
                +"<br> Uid Type : "+ uidTyp
                +"<br> Device Tech : " +  deviceTech
                +"<br> Device Modality : " +  modality;

            document.getElementById(element).innerHTML = retutnVal;

        }, function (error){
            showMessage(error.message);
        });

}
function onClear() {
         var vDiv = document.getElementById('imagediv');
         vDiv.innerHTML = "";
         localStorage.setItem("imageSrc", "");
         localStorage.setItem("wsq", "");
         localStorage.setItem("raw", "");
         localStorage.setItem("intermediate", "");

         disableEnableExport(true);
}

function toggle_visibility(ids) {
    document.getElementById("qualityInputBox").value = "";
    onStop();
    enableDisableScanQualityDiv(ids[0]); // To enable disable scan quality div
    for (var i=0;i<ids.length;i++) {
       var e = document.getElementById(ids[i]);
        if(i == 0){
            e.style.display = 'block';
            state = e;
            disableEnable();
        }
       else{
            e.style.display = 'none';
       }
   }
}


$("#save").on("click",function(){
    if(localStorage.getItem("imageSrc") == "" || localStorage.getItem("imageSrc") == null || document.getElementById('imagediv').innerHTML == ""){
        alert("Error -> Fingerprint not available");
    }else{
        var vDiv = document.getElementById('imageGallery');
        if(vDiv.children.length < 5){
            var image = document.createElement("img");
            image.id = "galleryImage";
            image.className = "img-thumbnail";
            image.src = localStorage.getItem("imageSrc");
            vDiv.appendChild(image);

            localStorage.setItem("imageSrc"+vDiv.children.length,localStorage.getItem("imageSrc"));
        }else{
            document.getElementById('imageGallery').innerHTML = "";
            $("#save").click();
        }
    }
});

function populateReaders(readersArray) {
        var _deviceInfoTable = document.getElementById("deviceInfo");
        _deviceInfoTable.innerHTML = "";
        if(readersArray.length != 0){
            _deviceInfoTable.innerHTML += "<h4>Available Readers</h4>"
            for (i=0;i<readersArray.length;i++){
                _deviceInfoTable.innerHTML +=
                "<div id='dynamicInfoDivs' align='left'>"+
                    "<div data-toggle='collapse' data-target='#"+readersArray[i]+"'>"+
                        "<img src='images/info.png' alt='Info' height='20' width='20'> &nbsp; &nbsp;"+readersArray[i]+"</div>"+
                        "<p class='collapse' id="+'"' + readersArray[i] + '"'+">"+onDeviceInfo(readersArray[i],readersArray[i])+"</p>"+
                    "</div>";
            }
        }
    };

function sampleAcquired(s){
            if(currentFormat == Fingerprint.SampleFormat.PngImage){
            // If sample acquired format is PNG- perform following call on object recieved
            // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
                localStorage.setItem("imageSrc", "");
                var samples = JSON.parse(s.samples);
                localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
                if(state == document.getElementById("content-capture")){
                    var vDiv = document.getElementById('imagediv');
                    vDiv.innerHTML = "";
                    var image = document.createElement("img");
                    image.id = "image";
                    image.src = localStorage.getItem("imageSrc");
                    vDiv.appendChild(image);
                }

                disableEnableExport(false);
            }

            else if(currentFormat == Fingerprint.SampleFormat.Raw){
                // If sample acquired format is RAW- perform following call on object recieved
                // Get samples from the object - get 0th element of samples and then get Data from it.
                // Returned data is Base 64 encoded, which needs to get decoded to UTF8,
                // after decoding get Data key from it, it returns Base64 encoded raw image data
                localStorage.setItem("raw", "");
                var samples = JSON.parse(s.samples);
                var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
                var decodedData = JSON.parse(Fingerprint.b64UrlToUtf8(sampleData));
                localStorage.setItem("raw", Fingerprint.b64UrlTo64(decodedData.Data));

                var vDiv = document.getElementById('imagediv').innerHTML = '<div id="animateText" style="display:none">RAW Sample Acquired <br>'+Date()+'</div>';
                setTimeout('delayAnimate("animateText","table-cell")',100);

                disableEnableExport(false);
            }

            else if(currentFormat == Fingerprint.SampleFormat.Compressed){
                // If sample acquired format is Compressed- perform following call on object recieved
                // Get samples from the object - get 0th element of samples and then get Data from it.
                // Returned data is Base 64 encoded, which needs to get decoded to UTF8,
                // after decoding get Data key from it, it returns Base64 encoded wsq image
                localStorage.setItem("wsq", "");
                var samples = JSON.parse(s.samples);
                var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
                var decodedData = JSON.parse(Fingerprint.b64UrlToUtf8(sampleData));
                localStorage.setItem("wsq","data:application/octet-stream;base64," + Fingerprint.b64UrlTo64(decodedData.Data));

                var vDiv = document.getElementById('imagediv').innerHTML = '<div id="animateText" style="display:none">WSQ Sample Acquired <br>'+Date()+'</div>';
                setTimeout('delayAnimate("animateText","table-cell")',100);

                disableEnableExport(false);
            }

            else if(currentFormat == Fingerprint.SampleFormat.Intermediate){
                // If sample acquired format is Intermediate- perform following call on object recieved
                // Get samples from the object - get 0th element of samples and then get Data from it.
                // It returns Base64 encoded feature set
                localStorage.setItem("intermediate", "");
                var samples = JSON.parse(s.samples);
                var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
                localStorage.setItem("intermediate", sampleData);

                var vDiv = document.getElementById('imagediv').innerHTML = '<div id="animateText" style="display:none">Intermediate Sample Acquired <br>'+Date()+'</div>';
                setTimeout('delayAnimate("animateText","table-cell")',100);

                disableEnableExport(false);
            }

            else{
                alert("Format Error");
                //disableEnableExport(true);
            }
}

function readersDropDownPopulate(checkForRedirecting){ // Check for redirecting is a boolean value which monitors to redirect to content tab or not
    myVal = "";
    var allReaders = test.getInfo();
    allReaders.then(function (sucessObj) {
        var readersDropDownElement = document.getElementById("readersDropDown");
        readersDropDownElement.innerHTML ="";
        //First ELement
        var option = document.createElement("option");
        option.selected = "selected";
        option.value = "";
        option.text = "Select Reader";
        readersDropDownElement.add(option);
        for (i=0;i<sucessObj.length;i++){
            var option = document.createElement("option");
            option.value = sucessObj[i];
            option.text = sucessObj[i];
            readersDropDownElement.add(option);
        }

    //Check if readers are available get count and  provide user information if no reader available,
    //if only one reader available then select the reader by default and sennd user to capture tab
    checkReaderCount(sucessObj,checkForRedirecting);

    }, function (error){
        showMessage(error.message);
    });
}

function checkReaderCount(sucessObj,checkForRedirecting){
   if(sucessObj.length == 0){
    alert("No reader detected. Please insert a reader.");
   }else if(sucessObj.length == 1){
        document.getElementById("readersDropDown").selectedIndex = "1";
        if(checkForRedirecting){
            toggle_visibility(['content-capture','content-reader']);
            enableDisableScanQualityDiv("content-capture"); // To enable disable scan quality div
            setActive('Capture','Reader'); // Set active state to capture
        }
   }

    selectChangeEvent(); // To make the reader selected
}

function selectChangeEvent(){
    var readersDropDownElement = document.getElementById("readersDropDown");
    myVal = readersDropDownElement.options[readersDropDownElement.selectedIndex].value;
    disableEnable();
    onClear();
    document.getElementById('imageGallery').innerHTML = "";

    //Make capabilities button disable if no user selected
    if(myVal == ""){
        $('#capabilities').prop('disabled', true);
    }else{
        $('#capabilities').prop('disabled', false);
    }
}

function populatePopUpModal(){
    var modelWindowElement = document.getElementById("ReaderInformationFromDropDown");
    modelWindowElement.innerHTML = "";
    if(myVal != ""){
        onDeviceInfo(myVal,"ReaderInformationFromDropDown");
    }else{
        modelWindowElement.innerHTML = "Please select a reader";
    }
}

//Enable disable buttons
function disableEnable(){

    if(myVal != ""){
        disabled = false;
        $('#start').prop('disabled', false);
        $('#stop').prop('disabled', false);
        showMessage("");
        disableEnableStartStop();
    }else{
        disabled = true;
        $('#start').prop('disabled', true);
        $('#stop').prop('disabled', true);
        showMessage("Please select a reader");
        onStop();
    }
}


// Start-- Optional to make GUi user frindly
//To make Start and stop buttons selection mutually exclusive
$('body').click(function(){disableEnableStartStop();});

function disableEnableStartStop(){
     if(!myVal == ""){
        if(test.acquisitionStarted){
            $('#start').prop('disabled', true);
            $('#stop').prop('disabled', false);
        }else{
            $('#start').prop('disabled', false);
            $('#stop').prop('disabled', true);
        }
    }
}

// Stop-- Optional to make GUI user freindly


function enableDisableScanQualityDiv(id){
    if(id == "content-reader"){
        document.getElementById('Scores').style.display = 'none';
    }else{
        document.getElementById('Scores').style.display = 'block';
    }
}


function setActive(element1,element2){
    document.getElementById(element2).className = "";

    // And make this active
   document.getElementById(element1).className = "active";

}



// For Download and formats starts

function onImageDownload(){
    if(currentFormat == Fingerprint.SampleFormat.PngImage){
        if(localStorage.getItem("imageSrc") == "" || localStorage.getItem("imageSrc") == null || document.getElementById('imagediv').innerHTML == "" ){
           alert("No image to download");
        }else{
            //alert(localStorage.getItem("imageSrc"));
            downloadURI(localStorage.getItem("imageSrc"), "sampleImage.png", "image/png");
        }
    }

    else if(currentFormat == Fingerprint.SampleFormat.Compressed){
         if(localStorage.getItem("wsq") == "" || localStorage.getItem("wsq") == null || document.getElementById('imagediv').innerHTML == "" ){
           alert("WSQ data not available.");
        }else{
            downloadURI(localStorage.getItem("wsq"), "compressed.wsq","application/octet-stream");
        }
    }

    else if(currentFormat == Fingerprint.SampleFormat.Raw){
         if(localStorage.getItem("raw") == "" || localStorage.getItem("raw") == null || document.getElementById('imagediv').innerHTML == "" ){
           alert("RAW data not available.");
        }else{

            downloadURI("data:application/octet-stream;base64,"+localStorage.getItem("raw"), "rawImage.raw", "application/octet-stream");
        }
    }

    else if(currentFormat == Fingerprint.SampleFormat.Intermediate){
         if(localStorage.getItem("intermediate") == "" || localStorage.getItem("intermediate") == null || document.getElementById('imagediv').innerHTML == "" ){
           alert("Intermediate data not available.");
        }else{

            downloadURI("data:application/octet-stream;base64,"+localStorage.getItem("intermediate"), "FeatureSet.bin", "application/octet-stream");
        }
    }

    else{
        alert("Nothing to download.");
    }
}


function downloadURI(uri, name, dataURIType) {
    if (IeVersionInfo() > 0){
    //alert("This is IE " + IeVersionInfo());
    var blob = dataURItoBlob(uri,dataURIType);
    window.navigator.msSaveOrOpenBlob(blob, name);

    }else {
        //alert("This is not IE.");
        var save = document.createElement('a');
        save.href = uri;
        save.download = name;
        var event = document.createEvent("MouseEvents");
            event.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
            );
        save.dispatchEvent(event);
    }
}

dataURItoBlob = function(dataURI, dataURIType) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: dataURIType});
}


function IeVersionInfo() {
  var sAgent = window.navigator.userAgent;
  var IEVersion = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (IEVersion > 0)
    return parseInt(sAgent.substring(IEVersion+ 5, sAgent.indexOf(".", IEVersion)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./))
    return 11;

  // Quick and dirty test for Microsoft Edge
  else if (document.documentMode || /Edge/.test(navigator.userAgent))
    return 12;

  else
    return 0; //If not IE return 0
}


$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// function checkOnly(stayChecked)
// {
//     disableEnableExport(true);
//     onClear();
//     onStop();
// with(document.myForm)
//   {
//   for(i = 0; i < elements.length; i++)
//     {
//     if(elements[i].checked == true && elements[i].name != stayChecked.name)
//       {
//       elements[i].checked = false;
//       }
//     }
//     //Enable disable save button
//     for(i = 0; i < elements.length; i++)
//     {
//     if(elements[i].checked == true)
//       {
//         if(elements[i].name =="PngImage"){
//             disableEnableSaveThumbnails(false);
//         }else{
//             disableEnableSaveThumbnails(true);
//         }
//       }
//     }
//   }
// }

function assignFormat(){
    currentFormat = Fingerprint.SampleFormat.PngImage;
    // with(document.myForm){
    //     for(i = 0; i < elements.length; i++){
    //         if(elements[i].checked == true){
    //             if(elements[i].name == "Raw"){
    //                 currentFormat = Fingerprint.SampleFormat.Raw;
    //             }
    //             if(elements[i].name == "Intermediate"){
    //                 currentFormat = Fingerprint.SampleFormat.Intermediate;
    //             }
    //             if(elements[i].name == "Compressed"){
    //                 currentFormat = Fingerprint.SampleFormat.Compressed;
    //             }
    //             if(elements[i].name == "PngImage"){
    //                 currentFormat = Fingerprint.SampleFormat.PngImage;
    //             }
    //         }
    //     }
    // }
}


function disableEnableExport(val){
    if(val){
        $('#saveImagePng').prop('disabled', true);
    }else{
        $('#saveImagePng').prop('disabled', false);
    }
}


function disableEnableSaveThumbnails(val){
    if(val){
        $('#save').prop('disabled', true);
    }else{
        $('#save').prop('disabled', false);
    }
}


function delayAnimate(id,visibility)
{
   document.getElementById(id).style.display = visibility;
}

// For Download and formats ends
export default {
  data () {
    return {
      Pad_Show: false,
      fingerPrint_Pad: false,
      CurrentDate: new Date().toISOString(),
      id: this.$route.params.id,
      signaturePad: SignaturePad,
      pdfUrl: localStorage.getItem('activefilePath'),
    }
  },
  components: {
    IdentityCustomizer,
    LabelCustomizer,
    "vue-pdf-viewer": VuePDFViewer,
    "VuePdfJs": VuePdfJs,
    WebViewer
  },
  methods: {
    getFilePath () {
      filesList.forEach(file => {
        // console.log('Files =>', file);
      });
    },

    // checkOnly(stayChecked) {
    //   disableEnableExport(true);
    //   this.onClear();
    //   this.onStop();
    //   with(document.myForm){
    //     for(i = 0; i < elements.length; i++) {
    //       if(elements[i].checked == true && elements[i].name != stayChecked.name){
    //         elements[i].checked = false;
    //       }
    //     }
    //     //Enable disable save button
    //     for(i = 0; i < elements.length; i++) {
    //       if(elements[i].checked == true) {
    //         if(elements[i].name =="PngImage"){
    //           disableEnableSaveThumbnails(false);
    //         }else{
    //           disableEnableSaveThumbnails(true);
    //         }
    //       }
    //     }
    //   }
    // },

    onClear() {
      var vDiv = document.getElementById('imagediv');
      vDiv.innerHTML = "";
      localStorage.setItem("imageSrc", "");
      localStorage.setItem("wsq", "");
      localStorage.setItem("raw", "");
      localStorage.setItem("intermediate", "");
      disableEnableExport(true);
    },
    onStart() {
      assignFormat();
      if(currentFormat == ""){
          alert("Please select a format.")
      }else{
          test.startCapture();
      }
    },
    async signpadShow () {
      this.Pad_Show = true
      const canvas = await document.getElementById('signPad')
      console.log(this.$refs.signPad);
      console.log(document.getElementById('signPad'));
      this.signaturePad = new SignaturePad(this.$refs.signPad, {
        backgroundColor: 'transparent'
      });
      window.onresize = this.resizeCanvas(canvas);
    },

    async fingerPrintShow () {
      this.fingerPrint_Pad = true
    },
    resizeCanvas (canvas) {
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
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
  created () {
    localStorage.setItem('docId', this.id)
  },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
@import "@/assets/scss/style.scss";
// @import '~vue-pdf-reader/dist/vue-pdf-reader.min.css';
#imagediv {
	padding:0px;
	width: 500px;
	margin: 0 auto;
	height: 500px;
	overflow: hidden;
    border: 1px solid rgba(51, 122, 183, 0.39);
    display: table;
}

#imagediv img {
	width: 100%;
	height: 500px;
}

#imagediv div{
	text-align: center;
	vertical-align: middle;
	height: 500px;
	background: #d3d3d3;
	display: table-cell;
}


#image {
	width: 100%;
}

#imageGallery {
	padding:0px;
	margin: 0 auto;
	width: 100%;
	height: 100px;
	overflow: hidden;
}

#imageGallery img{
	float: left;
	width:20%;
	height: 100%
}

#deviceInfo {
	padding:5px;
	margin: 0 auto;
	width: 100%;
	height: 100px;
	text-align: center;
}

#dynamicInfoDivs{
	position: relative;
	left: 30%;
}

#Scores {
	margin: 0 auto;
	width: 500px;
    text-align:center;
    border: 2px solid black;
}

#status {
    min-height: 22px;
	text-align: center;
	margin-bottom: 5px;
	color: red;
}

#contentButtons{
	padding: 5px;
  	text-align: center;
  	margin-bottom: 5px;
}

#readerDivButtons {
	padding: 5px;
  	text-align: center;
  	margin-bottom: 5px;
}

#modalContent{
	width: 350px;
	margin: 0 auto;
	padding : 5px;
	text-align: left;
	vertical-align: center;
}

#saveAndFormats{
	position:relative;
	left:500px;
	top:-750px;
	width:135px;
}

// @import "@/assets/scss/vuexy/themes/_themeDark.scss
</style>
