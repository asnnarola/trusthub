<template>
  <div class="tab-wrapper-form">
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <vx-tooltip class="text-right" :text="userDetails.name" position="bottom">
      <p class="fw-500">
        <small>
          <i>{{ $t("Name") }}: {{ userDetails.name }}</i>
        </small>
      </p>
      </vx-tooltip>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">{{ $t("UserId") }}: </b>
          <b class="txt-green">{{ userDetails.userId }}</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i
            >{{ $t("RegistrationDate") }}: {{ userDetails.RegistrationDate }}</i
          >
        </small>
      </p>
    </div>
    <div v-if="isEmailverification">
      <p class="fw-500 txt-dark-gray">{{ $t("Register2EmailContent") }}</p>
      <!-- <p class="fw-500 txt-dark-gray">Fill the field below with the secret Code you recive by email, sms or card</p> -->

      <p class="mt-5 txt-gray">
        {{ $t("Register2Note") }}
      </p>
      <div class="text-right d-flex justify-end align-items-center">
        <div class="mt-6 countdown-txt" id="countdown">
          <h4>
            <b
              v-if="
                emailMinutes >= 0 && emailMinutes <= 15 && sendemail == false
              "
            >
              {{ emailMinutes }}:{{
                emailSecond < 10 ? "0" + emailSecond : emailSecond
              }}
            </b>
            <b v-else> 00:00 </b>
          </h4>
        </div>
        <vs-button
          class="ml-5 mt-6 btn-gray w-180px"
          :disabled="sendemail == false"
          @click="ReSendEmail"
          >{{ $t("ResendEmail") }}</vs-button
        >
      </div>
      <div>
        <p class="sub-trial-txt mt-3 text-right mb-10">
          <a class="f-size-14" @click="goSMSVerification">
            <b>
              <u>{{ $t("switchToSms") }}</u>
            </b>
          </a>
        </p>
      </div>
      <div>
        <p class="sub-trial-txt mt-3 mb-10">
          <b>
            {{ $t("Register2EmailWarning") }}
            <a class="f-size-14 txt-blue" @click="goSMSVerification">
              <u>{{ $t("SMS") }}</u>
            </a>
          </b>
        </p>
      </div>
    </div>
    <div v-if="isSMSverification">
      <p class="fw-500 txt-dark-gray">
        {{ $t("Register2SMSContent") }}
      </p>
      <!-- <p class="fw-500 txt-dark-gray">Fill the field below with the secret Code you recive by email, sms or card</p> -->
      <!-- <vs-input
        v-validate="'required|min:10|max:10'"
        data-vv-validate-on="blur"
        :label-placeholder="MobileNumber"
        name="mobile"
        :placeholder="MobileNumber"
        v-model="mobile"
        class="w-full"
      />
      <span class="text-danger text-sm">{{ errors.first("mobile") }}</span> -->
      <vue-phone-number-input v-model="mobile"  @update="updateMobilenumber($event)"/>

      <div class="xt-right d-flex justify-end align-items-center">
        <div class="mt-6 countdown-txt" id="countdown">
          <h4>
            <b v-if="smsMinutes >= 0 && smsMinutes <= 15 && sendsms == false">
              {{ smsMinutes }}:{{
                smsSecond < 10 ? "0" + smsSecond : smsSecond
              }}
            </b>
            <b v-else>00:00</b>
          </h4>
        </div>
        <vs-button
          class="ml-5 mt-6 btn-green w-180px"
          :disabled="
            sendsms == false && !this.errors.any() && this.mobile !== ''
          "
          @click="sendSMS()"
          >{{ $t("SendSMS") }}</vs-button
        >
      </div>
      <div>
        <p class="sub-trial-txt mt-3 text-right mb-10">
          <a class="f-size-14" @click="goEmailVerification">
            <b>
              <u>{{ $t("BackToEmail") }}</u>
            </b>
          </a>
        </p>
      </div>
      <div>
        <p class="sub-trial-txt mt-3 mb-10">
          <b>
            {{ $t("Register2SMSWarning") }}
          </b>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../../../axios.js'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
export default {
  data () {
    return {
      isEmailverification: true,
      isSMSverification: false,
      MobileNumber: this.$t('MobileNumber'),
      step: {
        step1: true,
        step2: false,
        step3: false,
      },
      mobile: '',
      number:'',
      resultsMobile:null,
      userDetails: {
        name: this.$store.state.RegisterUser.displayName + ' ' + this.$store.state.RegisterUser.lastName,
        userId: this.$store.state.RegisterUser.email,
        RegistrationDate: this.$store.state.RegisterUser.createdDate
      },
      uid: this.$store.state.RegisterUser.uid,
      emailMinutes: 14,
      emailSecond: 60,
      smsMinutes: 14,
      smsSecond: 60,
      sendsms: true,
      sendemail: false
    }
  },
  mounted: function () {
    setInterval(() => {
      if (this.emailMinutes >= 0) {
        this.emailSecond--
        if (this.emailSecond == 0) {
          this.emailMinutes--
          this.emailSecond = 60
        }
      } else {
        this.sendemail = true
      }
    }, 1000);

    // setInterval(() => {
    //   if (this.isSMSverification == true) {
    //     if (this.smsMinutes >= 0) {
    //       this.smsSecond--
    //       if (this.smsSecond == 0) {
    //         this.smsMinutes--
    //         this.smsSecond = 60
    //       }
    //     }
    //   }
    // }, 1000);
  },
  methods: {
    goSMSVerification () {
      this.isEmailverification = false
      this.isSMSverification = true
    },
    goEmailVerification () {
      this.isEmailverification = true
      this.isSMSverification = false
    },
    // goTostep3 () {
    //   this.step = {
    //     step1: false,
    //     step2: false,
    //     step3: true,
    //   }
    //   this.$emit("gosetp", this.step);
    // }
    ReSendEmail () {
      const token = localStorage.getItem('accessToken')
      this.emailMinutes = 14,
        this.emailSecond = 60,
        axios.post('/auth/users/' + this.uid + '/resend/signup-confirmation', { confirmationMode: 'email' }, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
          .then(res => {
            console.log('res =>', res);
            if (res.status == 200) {
              this.sendemail = false
              this.$vs.notify({
                title: 'Sucess',
                text: res.data.successCode,
                iconPack: 'feather',
                icon: 'icon-mail',
                color: 'success'
              })
              setInterval(() => {
                if (this.emailMinutes >= 0) {
                  this.emailSecond--
                  if (this.emailSecond == 0) {
                    this.emailMinutes--
                    this.emailSecond = 60
                  }
                } else {
                  this.sendemail = true
                }
              }, 1000);
            } else {
              this.$vs.notify({
                title: 'Error',
                text: 'Email Resending Failed ..!!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            }
          }).catch(error => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: 'Something is wrong' + error.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          })

    },
    updateMobilenumber(e){
      this.resultsMobile = e;
      console.log('MobileData=>', this.resultsMobile);
      this.number = this.resultsMobile.formattedNumber
      console.log(this.mobile);
    },
    sendSMS () {
      if(!this.resultsMobile.isValid) {
        this.$vs.notify({
              title: 'Error',
              text: 'Please Enter a valid mobile number ..!!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
        reture
      }
      console.log(this.mobile);
      const token = localStorage.getItem('accessToken')
      // const mobile = '+' + this.$store.state.userCountryDetails.calling_code + this.mobile
      this.smsMinutes = 14,
        this.smsSecond = 60,
        console.log(this.number);
        axios.
        post(
          '/auth/users/' + this.uid + '/resend/signup-confirmation',
          { confirmationMode: 'sms', mobile: this.number },
          {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          console.log('res =>', res);
          if (res.status == 200) {
            this.sendsms = false
            this.$vs.notify({
              title: 'Sucess',
              text: res.data.successCode,
              iconPack: 'feather',
              icon: 'icon-mail',
              color: 'success'
            })
            setInterval(() => {
              if (this.smsMinutes >= 0) {
                this.smsSecond--
                if (this.smsSecond == 0) {
                  this.smsMinutes--
                  this.smsSecond = 60
                }
              } else {
                this.sendsms = true
              }
            }, 1000);
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'SMS Sending Failed ..!!',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        }).catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.response.data.errorMsg,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    }
  },
  components: {
    'vue-phone-number-input': VuePhoneNumberInput
  },
}
</script>
