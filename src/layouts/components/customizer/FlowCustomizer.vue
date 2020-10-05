<template>
  <div id="theme-customizer" class="uploadmodal-wrapper">
    <!-- Open Customizer Button -->
    <vs-button
      @click.stop="active=!active"
      color="primary"
      type="filled"
      class="customizer-btn upload-btn flowmodel-btn"
    >
      <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />Flow
    </vs-button>

    <!-- Customizer Content -->
    <vs-sidebar
      click-not-close
      hidden-background
      position-right
      v-model="active"
      class="items-no-padding"
    >
      <vs-button
        @click.stop="active=!active"
        color="primary"
        type="filled"
        class="customizer-btn upload-btn closeupload-btn flowmodel-btn"
      >
        <img :src="require('../../../assets/images/sidebar_icon/menu-open.png')" />
        Flow
      </vs-button>
      <div class="h-full flow-wrapper">
        <div class="customizer-header pt-4 pb-4 flex items-center justify-between px-6">
          <div>
            <h4 class="text-white">FLOW</h4>
            <small class="text-white">
              <i>Signature Flow</i>
            </small>
          </div>
          <feather-icon icon="XIcon" @click.stop="active = false" class="cursor-pointer"></feather-icon>
        </div>
        <vs-divider class="mb-0 mt-0" />
        <component
          :is="scrollbarTag"
          class="scroll-area--customizer pt-4 pb-6"
          :settings="settings"
          :key="$vs.rtl"
        >
          <vs-collapse>
            <vs-collapse-item
              v-for="(user, index) in Users"
              :key="index"
              icon-pack="fas"
              icon-arrow="fa-caret-down"
            >
              <div slot="header" class>{{user.name}}</div>
              <div class="text-right mb-6 mt-6">
                <p>
                  <i>Signature Order : {{user.signatureOrder}}</i>
                </p>
                <p>
                  <i>Mandatory signed before : {{user.mandatorySignedBefore.toString()}}</i>
                </p>
                <p>
                  <i>Signature Option : {{user.signatureOption.toString()}}</i>
                </p>
                <p>
                  <i>Reason : {{user.reason}}</i>
                </p>
                <p>
                  <i>Dead Date : {{user.deadDate}}</i>
                </p>
                <p>
                  <i>Notified : {{user.notified}}</i>
                </p>
                <p>
                  <i>Status : {{user.status}}</i>
                </p>
              </div>
              <div class="justify-content-between d-sm-flex">
                <vs-button
                  color="primary"
                  class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1"
                  type="filled"
                >Stress</vs-button>
                <vs-button
                  color="primary"
                  class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1"
                  type="filled"
                >Replace</vs-button>
                <vs-button
                  color="primary"
                  class="btn-gray w-auto mt-2 mb-2 flow-gray-btn mr-1"
                  type="filled"
                >Modify</vs-button>
                <vs-button
                  color="primary"
                  class="btn-gray w-auto mt-2 mb-2 flow-gray-btn"
                  type="filled"
                >Remove</vs-button>
              </div>
            </vs-collapse-item>
          </vs-collapse>
        </component>
      </div>
    </vs-sidebar>
  </div>
</template>


<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  data () {
    return {
      active: false,
      Users: [
        {
          id: 1,
          name: 'Jhon Smith',
          signatureOrder: 4,
          mandatorySignedBefore: [1, 2, 3],
          signatureOption: ['Graph', 'Token', 'FEA'],
          reason: 'Approvation',
          deadDate: '12/7/2020',
          notified: 'no',
          status: 'waiting'
        },
        {
          id: 2,
          name: 'Andrea Addams',
          signatureOrder: 4,
          mandatorySignedBefore: [1, 2, 3],
          signatureOption: ['Graph', 'Token', 'FEA'],
          reason: 'Approvation',
          deadDate: '12/7/2020',
          notified: 'no',
          status: 'waiting'
        },
        {
          id: 3,
          name: 'Paul Anderson',
          signatureOrder: 4,
          mandatorySignedBefore: [1, 2, 3],
          signatureOption: ['Graph', 'Token', 'FEA'],
          reason: 'Approvation',
          deadDate: '12/7/2020',
          notified: 'no',
          status: 'waiting'
        },
        {
          id: 4,
          name: 'Lee Venderbrooler',
          signatureOrder: 4,
          mandatorySignedBefore: [1, 2, 3],
          signatureOption: ['Graph', 'Token', 'FEA'],
          reason: 'Approvation',
          deadDate: '12/7/2020',
          notified: 'no',
          status: 'waiting'
        },
        {
          id: 5,
          name: 'Robert Hoffman',
          signatureOrder: 4,
          mandatorySignedBefore: [1, 2, 3],
          signatureOption: ['Graph', 'Token', 'FEA'],
          reason: 'Approvation',
          deadDate: '12/7/2020',
          notified: 'no',
          status: 'waiting'
        },
        {
          id: 6,
          name: 'Albert Hainstain',
          signatureOrder: 4,
          mandatorySignedBefore: [1, 2, 3],
          signatureOption: ['Graph', 'Token', 'FEA'],
          reason: 'Approvation',
          deadDate: '12/7/2020',
          notified: 'no',
          status: 'waiting'
        },

      ],
      settings: {
        maxScrollbarLength: 250,
        wheelSpeed: .100
      },
    }
  },
  components: {
    VuePerfectScrollbar
  },
  computed: {
    rtl: {
      get () { return this.$vs.rtl },
      set (val) { this.$vs.rtl = val }
    },
    scrollbarTag () { return this.$store.state.is_touch_device ? 'div' : 'VuePerfectScrollbar' },
  },
  methods: {
    addLabels () {
      if (this.popup_label) {
        this.labels.push(this.popup_label)
        this.popup_label = ''
      }
    },
    remove (item) {
      this.labels.splice(this.labels.indexOf(item), 1)
    }
  },
}

</script>


<style lang="scss">
#theme-customizer {
  .vs-sidebar {
    position: fixed;
    z-index: 52000;
    width: 400px;
    max-width: 90vw;
    // @apply shadow-lg;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
}

.customizer-btn {
  position: fixed;
  top: 70%;
  right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 50000;

  .vs-icon {
    animation: spin 1.5s linear infinite;
  }
}

.scroll-area--customizer {
  height: calc(100% - 5rem);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
