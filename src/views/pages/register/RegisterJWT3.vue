<template>
  <div>
    <h1>Step 3</h1>
    <vs-button
        class="mt-6 btn-green w-225px"
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
}
</script>
