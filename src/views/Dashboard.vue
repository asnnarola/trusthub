<template>
  <div>
    <h1>Dashboard</h1>
    <!-- <div id="app" class="col-md-6 col-md-offset-3 mt-5">
      <p>
        <button @click="fetchFingerprint" class="btn btn-xs btn-default">
          Refresh
        </button>
        Your fp: <b>{{ fingerprint }}</b>
      </p>
      <table class="table">
        <tbody>
          <tr v-for="component in fpComponents" :key="component.index">
            <td>{{ component.key }}</td>
            <td>{{ component.value }}</td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>
// <script>
// import Fingerprint from 'fingerprintjs'
// export default {
//   data: {
//     fingerprint: '',
//     fpComponents: [],
//     fpOptions: {
//       excludeAdBlock: true
//     }
//   },
//   methods: {
//     fetchFingerprint () {
//       new Fingerprint2(this.fpOptions).get((result, components) => {
//         this.fingerprint = result;
//         this.fpComponents = components;
//         console.log(components); // an array of FP components
//       })
//     }
//   },
//   created () {
//     this.fetchFingerprint();
//   }
// }
// </script>
