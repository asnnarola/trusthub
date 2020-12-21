<template>
  <div>
    <!-- <h1>Step 3</h1> -->
    <div class="activation-detail mt-4 mb-4 p-3 text-right">
      <p class="fw-500">
        <small>
          <i>{{$t('Name')}}: Jhon Doe</i>
        </small>
      </p>
      <p class="f-15">
        <i>
          <b class="txt-dark-gray">{{$t('UserId')}}:</b>
          <b class="txt-green">admin@admin.com</b>
        </i>
      </p>
      <p class="fw-500">
        <small>
          <i>{{$t('ConformationDate')}}: 23/8/2020 15:06</i>
        </small>
      </p>
      <p class="fw-500">
        <small>
          <i> {{$t('ConformationMethod')}}:SMS </i>
        </small>
      </p>
    </div>
    <div>
      <p class="fw-500 txt-dark-gray">
        {{$t('Register3TextContent')}}
      </p>
      <p class="mt-5 txt-gray">
        {{$t('Register3Warning')}}
      </p>
    </div>
    <div class="text-right">
      <vs-button class="mt-6 btn-green w-180px">{{$t ('Login')}}</vs-button>
      <p class="sub-trial-txt mt-3 text-right mb-10">
        <a class="f-size-14">
          <b>
            <u>{{$t('ActivateSignatureAccount')}}</u>
          </b>
        </a>
      </p>
    </div>
    <div>
      <p class="sub-trial-txt mt-3 mb-10">
        <b>{{$t('Register3Note')}}</b>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      step: {
        step1: true,
        step2: false,
        step3: false,
      },
    }
  },
}
</script>
