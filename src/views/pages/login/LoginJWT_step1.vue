<template>
  <div class="tab-wrapper-form">
    <vs-input
        v-validate="'required'"
        data-vv-validate-on="blur"
        type="text"
        name="id"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        label-placeholder="Id"
        v-model="id"
        class="w-full"
        @input="getId()"/>
    <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span> -->
    <vs-input
        data-vv-validate-on="blur"
        v-validate="'required'"
        type="text"
        name="activationcode"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        label-placeholder="Activation Code"
        v-model="ActivationCoad"
        class="w-full mt-6"
        @input="getactivationcode()"/>
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 'admin@admin.com',
      ActivationCoad:'123456',
      step:{}
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  },
  created() {
    this.$emit("getActivatiobCode", this.ActivationCoad);
    this.$emit("getId", this.id);
  },
  methods: {
    getId(){
        this.$emit("getId", this.id);
    },
    getactivationcode(){
        this.$emit("getActivatiobCode", this.ActivationCoad);
    },
  },
}

</script>
