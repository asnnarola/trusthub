<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="clearfix">
    <div class="vx-row mt-2">
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vs-input
          v-validate="'required|alpha_dash|min:3'"
          data-vv-validate-on="blur"
          :label-placeholder="FirstName"
          name="FirstName"
          :placeholder="FirstName"
          v-model="firstName"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("FirstName") }}</span>
      </div>
      <div class="vx-col sm:w-1/2 w-full mb-2">
        <vs-input
          v-validate="'required|alpha_dash|min:3'"
          data-vv-validate-on="blur"
          :label-placeholder="LastName"
          name="LastName"
          :placeholder="LastName"
          v-model="lastName"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first("LastName") }}</span>
      </div>
    </div>
    <vs-input
      v-validate="'required|email'"
      data-vv-validate-on="blur"
      name="email"
      type="email"
      :label-placeholder="Email"
      :placeholder="Email"
      v-model="email"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>
    <div class="password-inputcontrol d-flex justify-between align-items-center mt-6">
      <div class="password-input">
        <vs-input
          ref="password"
          :type="passwordType"
          data-vv-validate-on="blur"
          v-validate="'required|min:7|max: 25'"
          name="password"
          :label-placeholder="Password"
          :placeholder="Password"
          v-model="password"
          class="w-full mt-0"
        />
        <a @click="passwordType ='password'" v-if="passwordType == 'text'">
          <i class="fas fa-eye-slash hs-password"></i>
        </a>
        <a @click="passwordType ='text'" v-if="passwordType == 'password'">
          <i class="fas fa-eye hs-password d-none"></i>
        </a>
      </div>
      <div class="flex flex-wrap justify-between RF-content generate-btn">
        <vs-button class="btn-gray" @click="generatePassword">{{$t('Generate')}} </vs-button>
      </div>
    </div>
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>
    <vs-input
      type="password"
      v-validate="'min:7|max:25|confirmed:password'"
      data-vv-validate-on="blur"
      data-vv-as="password"
      name="confirm_password"
      :label-placeholder="ConfirmPassword"
      :placeholder="ConfirmPassword"
      v-model="confirm_password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{
      errors.first("confirm_password")
    }}</span>
    <div class="d-flex flex-wrap justify-between">
      <vs-checkbox v-model="isTermsConditionAccepted" class="mt-1">
        {{$t('AcceptTermsConditions')}}
      </vs-checkbox>
      <p class="sub-trial-txt mt-1 text-right mb-10">
        <a class="fw-500" v-clipboard:copy="password"><u>{{$t('CopyPassword?')}}</u></a>
      </p>
    </div>
    <!-- <vs-button  type="border" to="/login" class="mt-6 mb-10 btn-green">Login</vs-button> -->
    <ul class="demo-alignment checkbox-register d-flex justify-content-between align-items-center flex-wrap">
      <li class="d-flex flex-wrap mr-2 checkbox-reg-txt" v-for="account in differentAccount" :key="account.id">
        {{account.label}}<vs-checkbox
          class="checkbox-reginput"
          color="warning"
          v-model="account.vlue"
          :checked = "account.value == true"
          @change="onChecked($event, account.id)"
          :disabled = "account.id  == 4"
        />
      </li>
    </ul>
    <div class="text-right">
      <vs-button
        class="mt-6 btn-green w-225px"
        @click="registerUserJWt"
        >{{$t('Subscribe')}}</vs-button
      >
        <!-- :disabled="!validateForm" -->
    </div>
    <div>
      <p class="sub-trial-txt mt-3 text-right mb-10">
        <a class="f-size-14" href="/login">
          <u>{{$t('LoginToExisting')}}</u>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password: '',
      passwordType: 'password',
      FirstName : this.$t('FirstName'),
      LastName : this.$t('LastName'),
      Email : this.$t('Email'),
      Password : this.$t('Password'),
      ConfirmPassword : this.$t('ConfirmPassword'),
      step: {},
      //     step0: false,
      //     step1: true,
      //     step2: false,
      //     step3: false,
      isTermsConditionAccepted: true,
      characters: [
          {
              name: "Lowercase",
              value: "abcdefghijklmnopqrstuvwxyz",
          },
          {
              name: "Uppercase",
              value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          },
          {
              name: "Numbers",
              value: "0123456789",
          },
          {
              name: "Special Characters",
              value: "!?#@$%&",
          },
        ],
        differentAccount:[
        {
          id: 1,
          label: 'Basics',
          value: false
        },
        {
          id: 2,
          label: 'Electron Signatur',
          value: true
        },
        {
          id: 3,
          label: 'Qualified Certificate',
          value: false
        },
        {
          id: 4,
          label: 'ABIS',
          value: false
        }
      ],
        gLength:12
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.password !== '' && this.confirm_password !== '' && this.isTermsConditionAccepted === true
    }
  },
  methods: {
    checkLogin () {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {

        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    },
    generatePassword() {
      // console.log('Data =>', this.characters);
      let result = "";
          let charactersVal = "";
          for (var j = 0; j < this.characters.length; j++) {
              charactersVal += this.characters[j].value;
          }
          for ( var i = 0; i < this.gLength; i++ ) {
            result += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length));
          }
          this.password = result;
          // console.log('Password =>', charactersVal.length, this.password);
    },
    copyPassword(){
      let textToCopy = this.password;
      try {
        navigator.clipboard.writeText(textToCopy);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    registerUserJWt () {
      // If form is not validated or user is already login return
      // if (!this.validateForm || !this.checkLogin()) return
      this.step = {
        step1: false,
        step2: true,
        step3: false,
        step4: false,
        step5: false,

      }
      this.$emit("gosetp", this.step);

      // const payload = {
      //   userDetails: {
      //     displayName: this.firstName + this.lastName,
      //     email: this.email,
      //     password: this.password,
      //     confirmPassword: this.confirm_password
      //   },
      //   notify: this.$vs.notify
      // }
      // this.$store.dispatch('auth/registerUserJWT', payload)
    },
    onChecked(e, id){
      console.log('==>', e.target.checked, id);
      if(e.target.checked == true && id == 1){
        this.differentAccount = [
         {
            id: 1,
            label: 'Basics',
            value: true
          },
          {
            id: 2,
            label: 'Electron Signatur',
            value: false
          },
          {
            id: 3,
            label: 'Qualified Certificate',
            value: false
          },
          {
            id: 4,
            label: 'ABIS',
            value: false
          }
        ]
        this.$router.push('/register').catch(() => { })
      } else if(e.target.checked == true && id == 2){
        this.differentAccount = [
         {
            id: 1,
            label: 'Basics',
            value: false
          },
          {
            id: 2,
            label: 'Electron Signatur',
            value: true
          },
          {
            id: 3,
            label: 'Qualified Certificate',
            value: false
          },
          {
            id: 4,
            label: 'ABIS',
            value: false
          }
        ]
      } else if(e.target.checked == true && id == 3){
        this.differentAccount = [
         {
            id: 1,
            label: 'Basics',
            value: false
          },
          {
            id: 2,
            label: 'Electron Signatur',
            value: false
          },
          {
            id: 3,
            label: 'Qualified Certificate',
            value: true
          },
          {
            id: 4,
            label: 'ABIS',
            value: false
          }
        ]
        this.$router.push('/signature-activation').catch(() => { })
      }
    }
  },
  created() {
    setInterval(() => {
      this.FirstName = this.$t('FirstName')
      this.LastName = this.$t('LastName')
      this.Email = this.$t('Email')
      this.Password = this.$t('Password')
      this.ConfirmPassword = this.$t('ConfirmPassword')
    }, 1);
  },
}
</script>
