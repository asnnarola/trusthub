<template>
  <div class="tab-wrapper-form">
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <p class="fw-500">
        <small>
          <i>{{$t('Name')}}: Jhon Doe</i>
        </small>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">{{$t('CertificateSerial')}}:</b>
          <b class="txt-green">DGTX3-94942774-2020-8-23</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('ExpirationDate')}}: 23/8/2020 15:06</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('Email')}}: admin@admin.com</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>
            {{$t('RevocationCode')}}:
            <span class="txt-green fw-600">q289rqqc21</span>
          </i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>
            {{$t('PUKCode')}}:
            <span class="txt-green fw-600">50y9-9c2f-bw4e</span>
          </i>
        </small>
      </p>
    </div>
    <p class="fw-500 txt-dark-gray f-13">
      {{$t('ElectronStep5Text')}}
    </p>
    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required'"
      type="text"
      name="pin_code"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      :label-placeholder="PINCode"
      v-model="pin"
      class="w-full"
    />
  <div class="vs-row">
    <vs-button
      class="btn-green mxw-130 float-right mt-6"
      @click="gotodashboard()"
      :disabled="!pin"
      >Activate</vs-button
    >
    </div>
  <div class="vs-row">
    <p class="pt-4 txt-dark-gray pb-4">
      Note : Be sure to have full access to the email account you declared
      during account creation. You will receive all resuming information and
      codes to revoke, suspend or renew your certificate in that inbox
    </p>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pin: '',
      PINCode:this.$t('PINCode')
    }
  },
  created() {
    setInterval(() => {
      this.PINCode = this.$t('PINCode')
    }, 1);
  },
  methods: {
    gotodashboard () {
      this.$router.push('/dashboard').catch(() => { })
    }
  }
}

</script>
