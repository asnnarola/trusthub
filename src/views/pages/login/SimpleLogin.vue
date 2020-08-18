<template>
  <div>
    <vs-input
        v-validate="'required|email|min:3'"
        data-vv-validate-on="blur"
        name="email"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Email"
        v-model="email"
        class="w-full"/>
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

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
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <!-- <div class="flex flex-wrap justify-between my-5">
        <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
        <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div> -->
    <div class="flex flex-wrap justify-between mb-3">
      <!-- <vs-button  type="border" @click="registerUser">Register</vs-button> -->
      <vs-button :disabled="!validateForm" @click="onLogin()">Login</vs-button>
    </div>
  </div>
</template>
<script>
import axios from '../../../axios.js'
export default {
  data () {
    return {
      email: '',
      password: '',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  methods: {
    onLogin(){
      const payload ={
        email:this.email,
        password: this.password
      }
      return axios
      .get('/Users')
      .then(res => {
        console.log('DATA =>', res.data)
        const Userlist = res.data;
        for (let i = 0; i < Userlist.length; i++) {
          const element = Userlist[i];
          if(element.email === payload.email && element.password === payload.password){
            console.log('Login Successfull');
            i = Userlist.length;
            axios.get('/Users/' + element.id).then(user_res => console.log('User => ', user_res))
          }else{
            console.log('Login Fail');
          }
        }
      })
    }
   },
  created() {
  },
}
</script>
