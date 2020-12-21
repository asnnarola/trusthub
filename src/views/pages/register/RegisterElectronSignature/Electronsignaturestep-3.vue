<template>
  <div>
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <p class="fw-500">
        <small>
          <i>{{$t('Name')}}: Jhon Doe</i>
        </small>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">{{$t('UserId')}}:</b>
          <b class="txt-green">admin@admin.com</b>
        </i>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">{{$t('MobilePhone')}}:</b>
          <b class="txt-green">+549118175868</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('Country')}}: Argentina</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('DNI')}}: 9494277</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('CUIT')}}:55-9494277-5</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('Sex')}}: M</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('BirthPlace')}}: Madrid</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('BirthDate')}}: 13/6/1964</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('RegistrationDate')}}: 23/8/2021 15:06</i>
        </small>
      </p>
    </div>
    <div v-if="isEmailverification">
      <p class="fw-500 txt-dark-gray">
        {{$t('ElectronStep3text')}}
      </p>
      <div class="text-right d-flex justify-end align-items-center">
        <div class="mt-6 countdown-txt" id="countdown">
          <h4>
            <b>
              {{ time_email }}
            </b>
          </h4>
        </div>
        <vs-button class="ml-5 mt-6 btn-gray w-180px" @click="goTostep4()">
          {{$t('ResendEmail')}}
        </vs-button>
      </div>
      <div>
        <p class="sub-trial-txt mt-3 text-right mb-10">
          <a class="f-size-14" @click="goSMSVerification">
            <b>
              <u>{{$t('switchToSms')}}</u>
            </b>
          </a>
        </p>
      </div>
    </div>
    <div v-if="isSMSverification">
      <div class="xt-right d-flex justify-end align-items-center">
        <div class="mt-6 countdown-txt" id="countdown">
          <h4>
            <b>
              {{ time_sms }}
            </b>
          </h4>
        </div>
        <vs-button class="ml-5 mt-6 btn-green w-180px" @click="goTostep4()">{{$t('SendSMS')}}</vs-button>
      </div>
      <div>
        <p class="sub-trial-txt mt-3 text-right mb-10">
          <a class="f-size-14" @click="goEmailVerification">
            <b>
              <u>{{$t('BackToEmail')}}</u>
            </b>
          </a>
        </p>
      </div>
      <div>
        <p class="sub-trial-txt mt-3 mb-10">
          <b>{{$t('ElectronStep3Warning')}}</b>
        </p>
      </div>
    </div>
    <!-- <div class="text-right">
      <vs-button
        class="mt-6 btn-green w-225px"
        @click="goTostep4()"
      >
        Next
      </vs-button>
    </div> -->
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      step:{},
      isEmailverification: true,
      isSMSverification: false,
      date_email: moment(60 * 10 * 1000).subtract(25,'minutes'),
      date_sms: moment(60 * 10 * 1000).subtract(25,'minutes'),
    }
  },
  computed: {
    time_email: function () {
      return this.date_email.format('mm:ss');
    },
    time_sms: function () {
      return this.date_sms.format('mm:ss');
    }
  },
  mounted: function () {
    setInterval(() => {
      this.date_email = moment(this.date_email.subtract(1, 'seconds'))
    }, 1000);
  },
  methods: {
    goSMSVerification () {
      this.isEmailverification = false
      this.isSMSverification = true
      setInterval(() => {
      // this.date_email = moment(this.date_email.subtract(1, 'seconds'))
      this.date_sms = moment(this.date_sms.subtract(1, 'seconds'))
    }, 1000);
    },
    goEmailVerification () {
      setInterval(() => {
        this.date_email = moment(this.date_email.subtract(1, 'seconds'))
        // this.date_sms = moment(this.date_sms.subtract(1, 'seconds'))
      }, 1000);
      this.isEmailverification = true
      this.isSMSverification = false
    },
    goTostep4(){
      this.step = {
        step1: false,
        step2: false,
        step3: false,
        step4: true,
        step5 : false
      }
        this.$emit("gosetp", this.step);
    }
  },
}
</script>
