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
        class="w-full mt-6" />
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
        class="w-full mt-6" />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
    <div class="flex flex-wrap justify-between my-5 RF-content">
      <vs-button class="btn-gray" :disabled="!validateForm">Generate </vs-button>
      <a href="#"><u>Copy Password?</u></a>
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
      step: {}
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
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
    loginJWT () {

      if (!this.checkLogin()) return
      // Loading
      this.$vs.loading()
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password
        }
      }

      this.$store.dispatch('auth/loginJWT', payload)
        .then(() => { this.$vs.loading.close() })
        .catch(error => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/register').catch(() => { })
    }
  }
}

</script>
