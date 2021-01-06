<template>
  <div class="clearfix tab-wrapper-form">
    <br />
    <div class="vx-row">
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-12">
        <v-select
          name="country"
          v-model="selectedCountry"
          :options="optionsCountry"
          :placeholder="Country"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
        />
      </div>
    </div>
    <div class="vx-row">
      <div
        class="vx-col vs-sm-12 vs-md-12 vs-lg-4 mb-2 mt-3 documenttype-input"
      >
        <v-select
          name="documentType"
          v-model="selectedDocumentType"
          :options="optionsDocumentType"
          :placeholder="DocumentType"
          class="mt-6"
        />
      </div>
      <div
        class="vx-col vs-sm-12 vs-md-12 vs-lg-5 mb-2 pl-0 mt-3 documentnumber-input"
      >
        <vs-input
          type="text"
          data-vv-validate-on="blur"
          v-validate="'required'"
          name="documentNumber"
          label-placeholder="Document Number"
          :placeholder="DocumentNumber"
          v-model="documentnumber"
          class="w-full mt-6"
        />

        <span class="text-danger text-sm">{{
          errors.first("documentNumber")
        }}</span>
      </div>
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-3 mb-2 pl-0 mt-3 gender-input">
        <v-select
          class="mt-6"
          name="sex"
          :placeholder="Sex"
          v-model="selectedSex"
          :options="optionsSex"
        />
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-7">
        <vs-input
          type="text"
          data-vv-validate-on="blur"
          v-validate="'required'"
          name="identificationCode"
          :label-placeholder="IdentificationCode"
          :placeholder="IdentificationCode"
          v-model="identificationcode"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{
          errors.first("identificationCode")
        }}</span>
      </div>
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-5">
        <vs-input
          type="text"
          data-vv-validate-on="blur"
          v-validate="'required'"
          name="mobile"
          :label-placeholder="MobilePhone"
          :placeholder="MobilePhone"
          v-model="mobile"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{ errors.first("mobile") }}</span>
      </div>
    </div>
    <div class="vx-row mt-2">
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-3">
        <datepicker
          placeholder="Select Date"
          class="w-full mt-6"
          v-model="birthdate"
        ></datepicker>
      </div>
      <div class="vx-col vs-sm-12 vs-md-12 vs-lg-9">
        <vs-input
          type="text"
          data-vv-validate-on="blur"
          v-validate="'required'"
          name="birthplace"
          :label-placeholder="BirthPlace"
          :placeholder="BirthPlace"
          v-model="birthplace"
          class="w-full mt-6"
        />
        <span class="text-danger text-sm">{{
          errors.first("birthplace")
        }}</span>
      </div>
    </div>
    <div
      class="joiningcode-inputcontrol d-flex justify-between align-items-center mt-2"
    >
      <div class="joiningcode-input">
        <vs-input
          type="text"
          data-vv-validate-on="blur"
          v-validate="'required'"
          name="joiningcode"
          :label-placeholder="CompanyJoiningCode"
          :placeholder="CompanyJoiningCode"
          v-model="joiningcode"
          class="w-full mt-6"
        />
      </div>
      <div class="flex flex-wrap justify-between RF-content verify-btn">
        <vs-button class="mt-6 btn-gray"> {{$t('Verify')}} </vs-button>
      </div>
    </div>
    <div class="form-group row mt-6">
      <vue-recaptcha @verify="onVerify" sitekey="6LczcvwZAAAAADaEiDNCSCRjShHTr6oFSnTeJ6jJ">
      </vue-recaptcha>
    </div>
    <span class="text-danger text-sm">{{ errors.first("joiningcode") }}</span>
    <p class="txt-gray mt-4">
      {{$t('ElectronStep2Note')}}
    </p>

    <div class="text-right">
      <vs-button class="mt-2 mb-6 btn-green w-225px" @click="goTostep3()">
        {{$t('Next')}}
      </vs-button>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import VueRecaptcha from 'vue-recaptcha';
import vSelect from 'vue-select'
export default {
  data () {
    return {
      step: {},
      optionsCountry: [
        { id: 1, label: 'Country 1' },
        { id: 3, label: 'Country 3' },
        { id: 2, label: 'Country 2' },
      ],
      // RegisterData:{},
      selectedCountry: '',
      robot: false,

      Country: this.$t('Country'),
      DocumentType: this.$t('DocumentType'),
      DocumentNumber: this.$t('DocumentNumber'),
      Sex: this.$t('Sex'),
      IdentificationCode: this.$t('IdentificationCode'),
      MobilePhone: this.$t('MobilePhone'),
      BirthPlace: this.$t('BirthPlace'),
      CompanyJoiningCode: this.$t('CompanyJoiningCode'),
      optionsDocumentType: [
        { id: 1, label: 'Document type 1' },
        { id: 3, label: 'Document type 3' },
        { id: 2, label: 'Document type 2' },
      ],
      selectedDocumentType: '',
      optionsSex: [
        { id: 1, label: 'Male' },
        { id: 2, label: 'Female' },
      ],
      selectedSex: '',
      documentnumber: '',
      identificationcode: '',
      mobile: '',
      birthdate: '',
      birthplace: '',
      joiningcode: ''
    }
  },
  components: {
    Datepicker,
    vSelect,
    'vue-recaptcha': VueRecaptcha,
  },
  methods: {
    goTostep3 () {
      this.step = {
        step1: false,
        step2: false,
        step3: true,
        step4: false,
        step5: false
      }
      this.$emit("gosetp", this.step);
    },
    onVerify (response) {
      if (response) this.robot = true;
    },
  },
  mounted() {
    console.log(this.RegisterData);
    setInterval(() => {
      this.Country= this.$t('Country')
      this.DocumentType= this.$t('DocumentType')
      this.DocumentNumber= this.$t('DocumentNumber')
      this.Sex= this.$t('Sex')
      this.IdentificationCode= this.$t('IdentificationCode')
      this.MobilePhone= this.$t('MobilePhone')
      this.BirthPlace= this.$t('BirthPlace')
      this.CompanyJoiningCode= this.$t('CompanyJoiningCode')
    }, 1);
  },
  props:{
    RegisterData:{}
  }
}
</script>
