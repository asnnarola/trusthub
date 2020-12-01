<template>
  <div class="tab-wrapper-form">
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <p class="fw-500">
        <small>
          <i>Name: Jhon Doe</i>
        </small>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">Email:</b>
          <b class="txt-green">admin@admin.com</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i>Registration Date: 23/8/2020 15:06</i>
        </small>
      </p>
      <!-- <p class="fw-500">
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
      </p> -->
    </div>
    <p class="fw-500 txt-dark-gray">
      Your account has been sucessfully created using the above informations. Anyway it still disabled and can not be used to login the platform until you will click the confirmation link received by mail.
    </p>
    <!-- <p class="fw-500 txt-dark-gray">Fill the field below with the secret Code you recive by email, sms or card</p> -->
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
        class="mt-6 btn-green w-225px"
        @click="goTostep3()"
        >Subscribe</vs-button
      >
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: {
        step1: true,
        step2: false,
        step3: false,
      },
    }
  },
  methods: {
    goTostep3(){
      this.step = {
        step1: false,
        step2: false,
        step3: true,
      }
        this.$emit("gosetp", this.step);
    }
  },
}
</script>
