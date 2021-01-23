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
      :label-placeholder="Id_Label"
      v-model="id"
      class="w-full"
      @input="getId()"
    />
    <!-- <span class="text-danger text-sm">{{ errors.first('email') }}</span> -->
    <vs-input
      data-vv-validate-on="blur"
      v-validate="'required'"
      type="text"
      name="activationcode"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      :label-placeholder="ActivationCode_Label"
      v-model="ActivationCoad"
      class="w-full mt-6"
      @input="getactivationcode()"
    />
    <span class="text-danger text-sm">{{ errors.first("password") }}</span>
    <div class="txt-or text-center mt-4 mb-6">
      <span class="txt-gray">{{$t('AND_OR')}}</span>
      <div class="separte-border"></div>
    </div>
    <div class="bottom-menu-icon mt-0 mb-2 position-relative">
      <ul class="d-flex flex-wrap align-items-center position-relative">
        <li
          class="starred-page"
          v-for="img in Biometrical_Icon1"
          :key="img.icon_url"
        >
          <router-link to="#">
            <img
              :src="require('@/assets/images/header_icon/' + img.icon_url)"
            />
          </router-link>
        </li>
      </ul>
      <ul class="d-flex flex-wrap align-items-center position-relative">
        <li
          class="starred-page"
          v-for="img in Biometrical_Icon2"
          :key="img.icon_url"
        >
          <router-link to="#">
            <img
              :src="require('@/assets/images/header_icon/' + img.icon_url)"
            />
          </router-link>
        </li>
      </ul>
      <ul class="d-flex flex-wrap align-items-center position-relative">
        <li
          class="starred-page"
          v-for="img in Biometrical_Icon3"
          :key="img.icon_url"
        >
          <router-link to="#">
            <img
              :src="require('@/assets/images/header_icon/' + img.icon_url)"
            />
          </router-link>
        </li>
      </ul>
    </div>
    <div class="mt-6">
      <span class="txt-gray">
      {{$t('ElectronStep4Note')}}
      </span>
    </div>
    <div class="text-right">
      <vs-button
        class="mt-6 btn-green w-225px"
        @click="goTostep5()"
      >
        {{$t('Next')}}
      </vs-button>
    </div>
    <div class="vs-sm-12">
      <div class="mt-4 mb-5">
        <h6>
          {{$t('ElectronStep4Warning')}}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      Id_Label: this.$t('Id'),
      ActivationCode_Label: this.$t('ActivationCode'),
      ActivationCoad:'',
      step: {},
          Biometrical_Icon1: [
        {
          id: 1,
          icon_url: 'id.png'
        },
        {
          id: 2,
          icon_url: 'chip.png'
        }
      ],
      Biometrical_Icon2: [
        {
          id: 1,
          icon_url: 'face.png'
        },
        {
          id: 2,
          icon_url: 'fingerprint.png'
        },
        {
          id: 3,
          icon_url: 'palm.png'
        },
        {
          id: 4,
          icon_url: 'voice.png'
        },
        {
          id: 5,
          icon_url: 'eye.png'
        }
      ],
      Biometrical_Icon3: [
        {
          id: 1,
          icon_url: 'signature.png'
        },
      ],
    }
  },
  computed: {
    validateForm() {
  return !this.errors.any() && this.email !== '' && this.password !== ''
}
  },
created() {
  this.getId()
  this.getactivationcode()
  setInterval(() => {
    this.Id_Label =  this.$t('Id')
    this.ActivationCode_Label =  this.$t('ActivationCode')
  }, 1);
},
methods: {
  getId(){
    this.id = this.$router.currentRoute.params.id
  },
  getactivationcode(){
    this.ActivationCoad = this.$router.currentRoute.params.code
  },
  goTostep5(){
      this.step = {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5 : true
      }
        this.$emit("gosetp", this.step);
    }
},
}

</script>
