<template>
  <div>
    <!-- <h1>Step 3</h1> -->
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <p class="fw-500">
        <small>
          <i>{{ $t("Name") }}:{{userData.name}}{{userData.lastName}}</i>
        </small>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">{{ $t("UserId") }}:</b>
          <b class="txt-green">{{userData.email}}</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i>{{ $t("ConformationDate") }}: {{userData.confirmationDate}}</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i> {{ $t("ConformationMethod") }}:{{userData.confirmationMethod}} </i>
        </small>
      </p>
    </div>
    <div>
      <p class="fw-500 txt-dark-gray">
        {{ $t("Register3TextContent") }}
      </p>
      <p class="mt-5 txt-gray">
        {{ $t("Register3Warning") }}
      </p>
    </div>
    <div class="text-right">
      <vs-button class="mt-6 btn-green w-180px" to="/login">{{
        $t("Login")
      }}</vs-button>
      <p class="sub-trial-txt mt-3 text-right mb-10">
        <a class="f-size-14" href="/signature-activation">
          <b>
            <u>{{ $t("ActivateSignatureAccount") }}</u>
          </b>
        </a>
      </p>
    </div>
    <div>
      <p class="sub-trial-txt mt-3 mb-10">
        <b>{{ $t("Register3Note") }}</b>
      </p>
    </div>
  </div>
</template>
<script>
import axios from '../../../axios.js'
export default {
  data () {
    return {
      step: {
        step1: true,
        step2: false,
        step3: false,
      },
      userData: {
        confirmationDate:"",
        confirmationMethod:"",
        email:"",
        lastName:"",
        name:""
      },
      uid: localStorage.getItem('registerUserid'),
      code: this.$route.params.id
    }
  },
  created () {
    console.log(this.code, this.uid);
    // axios.put(, params:)
    axios({
      method: 'put',
      url: '/auth/users/' + this.uid + '/activate-account',
      params: { code: this.code }
    })
    .then(res => {
        console.log('res =>', res);
        if(res.status == 200){
      this.userData = res.data
          this.$vs.notify({
            title: 'Sucess',
            text: 'Your Account is Activate..!!',
            iconPack: 'feather',
            icon: 'icon-mail',
            color: 'success'
          })
        } else{
          this.$vs.notify({
            title: 'Error',
            text: 'Activation Failed ..!!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      }).catch(error => {
        this.$vs.loading.close()
        this.$vs.notify({
          title: 'Error',
          text: 'Something is wrong'+ error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })


  },
}
</script>
