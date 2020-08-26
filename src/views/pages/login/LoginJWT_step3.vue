<template>
  <div>
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <p class="fw-500">
        <small>
          <i>Name: Jhon Doe</i>
        </small>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">Certificate Serial:</b>
          <b class="txt-green">DGTX3-94942774-2020-8-23</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i>Expiration Date: 23/8/2020 15:06</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>Eail: admin@admin.com</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>
            Revocation Code:
            <span class="txt-green fw-600">q289rqqc21</span>
          </i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i>
            PUK Code:
            <span class="txt-green fw-600">50y9-9c2f-bw4e</span>
          </i>
        </small>
      </p>
    </div>
    <p class="fw-500 txt-dark-gray">Fill the field below with the secret Code you recive by email, sms or card</p>
    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required'"
      type="text"
      name="pin_code"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="PIN Code"
      v-model="pin"
      class="w-full"
    />

    <vs-button
      class="btn-green mxw-130 float-right mt-6"
      @click="gotodashboard()"
      :disabled="!pin"
    >Activate</vs-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pin: ''
    }
  },
  methods: {
    gotodashboard () {
      this.$router.push('/dashboard').catch(() => { })
    }
  }
}

</script>
