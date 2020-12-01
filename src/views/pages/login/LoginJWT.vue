<template>
  <div class="tab-wrapper-form">
    <vs-input
      v-validate="'required|email|min:3'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first("email") }}</span>

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
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>

    <div class="flex flex-wrap justify-between my-5 RF-content">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3 fw-500"
        >Remember Me</vs-checkbox
      >
      <!-- <router-link to="/pages/forgot-password">Forgot Password?</router-link> -->
      <div class="text-right">
        <a class="fw-500" href="/forgot-password">
          <u>Forgot Password</u>
        </a>
        <br />
        <a class="fw-500" href="/forgot-password-signature">
          <u>Forgot Signature Password</u>
        </a>
      </div>
    </div>
      <div class="mb-2">
        <p>Select Your Login Option</p>
      </div>
    <div class="flex flex-wrap justify-between mb-3 LT-wrap loginoption-btnwrapper position-relative">
      <!-- <vs-button class="btn-green" :disabled="!validateForm" @click="loginJWT">Login</vs-button> -->
      <vs-button class="btn-green" :disabled="!validateForm" @click="loginJWT()"
        >Trusthub</vs-button
      >
      <vs-button class="btn-green">PKI</vs-button>
      <vs-button class="btn-green">ABIS</vs-button>
      <vs-button class="btn-green">IAM</vs-button>
      <vs-button
        class="btn-green btn-more"
        @click="
          loginModel_show == true
            ? (loginModel_show = false)
            : (loginModel_show = true)
        "
      >
        <i class="fas fa-ellipsis-v"></i>
      </vs-button>

      <!-- Mdel -->
      <div :hidden="!loginModel_show" class="cloud-wrapper accessmng-modal">
        <h6 class="text-white mb-4"><b>Alternative Access Management</b></h6>
        <ul class="accessmng-block">
          <li
            v-for="(item, index) in loginModel"
            :key="index"
            @click="loginModel_show = false"
          >
            {{item.label}}
          </li>
        </ul>
      </div>
      <!-- /Mdel -->

      <!-- <vs-button class="btn-gray Trusthub-btn" type="border">Trusthub</vs-button> -->
    </div>
    <div class="text-right">
      <p class="sub-trial-txt mt-2 pb-4">
        <a class="f-size-14 fw-500" href="/register">
          <u>Subscribe Free Trial Account</u>
        </a>
      </p>
      <vs-button class="loginsocail-btn"><i class="fab fa-facebook-square"></i></vs-button>
      <vs-button class="loginsocail-btn"><i class="fab fa-twitter-square"></i></vs-button>
      <vs-button class="loginsocail-btn"><i class="fab fa-linkedin"></i></vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false,
      showProgressBar: false,
      step: {},
      loginModel_show: false,
      loginModel: [
        {
          label: 'label 1'
        },
        {
          label: 'label 2'
        },
        {
          label: 'label 3'
        },
        {
          label: 'label 4'
        },
        {
          label: 'label 5'
        },
      ]
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    async goStep1 () {
      this.showProgressBar = true;
      this.$emit("showProgressBar", this.showProgressBar);
      await setTimeout(() => {
        //   this.step = {
        //     step0: false,
        //     step1: true,
        //     step2: false,
        //     step3: false,
        //   }
        //   this.showProgressBar = false;
        //   this.$emit("showProgressBar", this.showProgressBar);
        //   this.$emit("gosetp", this.step);
        this.$router.push('/dashboard').catch(() => { })
      }, 3900);
      // this.$router.push('/dashboard').catch(() => { })
      // this.$emit("startProgressBar",this.startProgressBar() )
    },
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
        .then(() => {
          const token = localStorage.getItem('accessToken')
          console.log('Token =>', token);
          if (token) {
            this.goStep1()
            this.$vs.loading.close()
          } else {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: 'Invalid Username or Password',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        })
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

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>>

</style>
