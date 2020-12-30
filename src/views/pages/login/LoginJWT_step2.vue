<template>
  <div class="tab-wrapper-form">
    <div class="password-jwt2">
      <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:8|max:24|verify_password'"
        :type="passwordType"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        :label-placeholder="Password"
        :placeholder="Password"
        v-model="password"
        class="w-full mt-6"
        @input="getPassword()"
      />
      <a @click="passwordType = 'password'" v-if="passwordType == 'text'">
        <i class="fas fa-eye-slash hs-password show"></i>
      </a>
      <a @click="passwordType = 'text'" v-if="passwordType == 'password'">
        <i class="fas fa-eye hs-password d-none"></i>
      </a>
    </div>
    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required|min:6|max:10'"
      type="password"
      name="re-password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      :label-placeholder="ConfirmPassword"
      :placeholder="ConfirmPassword"
      v-model="re_password"
      class="w-full mt-6"
      @input="getConfirmPassword()"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>
    <div class="flex flex-wrap justify-between my-5 RF-content">
      <vs-button class="btn-gray" @click="generatePassword()"> {{$t('Generate')}}</vs-button>
      <a href="#" class="fw-500" v-clipboard:copy="password"><u>{{$t('CopyPassword')}}</u></a>
    </div>
    <div class="flex flex-wrap justify-between mb-3 LT-wrap"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      re_password: '',
      password: '',
      passwordType: 'password',
      ActivationCoad: '123456',
      Password : this.$t('Password'),
      ConfirmPassword : this.$t('ConfirmPassword'),
      checkbox_remember_me: false,
      // checkConfirmPassword: false,
      step: {},
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
      gLength: 12
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== '' && this.password === this.re_password
    }
  },
  created () {
    this.$validator.extend('verify_password', {
        getMessage: field => `The password must contain at least: 2 uppercase letter, 2 lowercase letter, 2 number, and 2 special character`,
        validate: value => {
            var strongRegex = new RegExp("^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[0-9]){2})(?=(.*[!@#?\$%\^&\*]){2})(?=.{8,})");
            return strongRegex.test(value);
        }
    });
    this.$emit("getPassword", this.password);
    this.$emit("getConfirmPassword", this.re_password);
    setInterval(() => {
      this.Password = this.$t('Password')
      this.ConfirmPassword = this.$t('ConfirmPassword')
    }, 1);
  },
  methods: {

    generatePassword () {
      // console.log('Data =>', this.characters);
      let result1 = "";
      let result2 = "";
      let charactersVal = "";

      // Storang Password Logic
      for (var j = 0; j < this.characters.length; j++) {
        charactersVal = this.characters[j].value;
        for (var i = 0; i < 2; i++) {
          result1 += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length));
        }
      }

      // Set Remaining charactors Randomly
      for (var j = 0; j < this.characters.length; j++) {
        charactersVal += this.characters[j].value;
      }
      for (var i = 0; i < 4; i++) {
        result2 += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length));
      }
      this.password = result1 + result2;
    },
    getPassword () {
      this.$emit("getPassword", this.password);
    },
    getConfirmPassword () {
      this.$emit("getConfirmPassword", this.re_password);
    }
  }
}
</script>
