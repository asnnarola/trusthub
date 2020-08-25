<template>
  <div>
    <p>Fill the field below with the secret Code you recive by email, sms or card</p>
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
    gotodashboard(){
      this.$router.push('/dashboard').catch(() => {})
    }
  }
}

</script>
