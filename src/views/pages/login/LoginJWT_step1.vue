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
        @change="getId($event.target)"/>
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
        @change="getactivationcode($event)"/>
    <!-- <span class="text-danger text-sm">{{ errors.first('password') }}</span> -->

    <div class="flex flex-wrap justify-between mb-3 LT-wrap">
      <!-- <vs-button class="btn-green" :disabled="!validateForm" @click="goto()">Next</vs-button> -->
    </div>
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
    getId(data){
      console.log('ID =>', data.id);
        this.$emit("getId", data.id);
    },
    getactivationcode(data){
      console.log('Activation Code =>', data.ActivationCoad)
        this.$emit("getActivatiobCode", data.ActivationCoad);
    },
    validateForm () {
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
  }
}

</script>
