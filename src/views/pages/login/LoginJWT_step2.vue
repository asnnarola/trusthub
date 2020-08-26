<template>
  <div class="tab-wrapper-form">
    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Password"
        v-model="password"
        class="w-full mt-6"
        @input="getPassword()"/>
    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required|min:6|max:10'"
        type="password"
        name="re-password"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Confirm Password"
        v-model="re_password"
        class="w-full mt-6"
        @input="getConfirmPassword()"/>
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <div class="flex flex-wrap justify-between my-5 RF-content">
      <vs-button class="btn-gray" :disabled="!validateForm">Generate </vs-button>
      <a href="#" class="fw-500"><u>Copy Password?</u></a>
    </div>
    <div class="flex flex-wrap justify-between mb-3 LT-wrap">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      re_password: '',
      password: '',
      ActivationCoad: '123456',
      checkbox_remember_me: false,
      // checkConfirmPassword: false,
      step: {}
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== '' && this.password === this.re_password
    }
  },
  created() {
    this.$emit("getPassword", this.password);
    this.$emit("getConfirmPassword", this.re_password);
  },
  methods: {
    getPassword(){
      this.$emit("getPassword", this.password);
    },
    getConfirmPassword(){
      this.$emit("getConfirmPassword", this.re_password);
    }
  }
}
</script>
