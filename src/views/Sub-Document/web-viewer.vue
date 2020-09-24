<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import WebViewer from '@pdftron/webviewer';

export default {
  name: 'WebViewer',
  props: { initialDoc: { type: String } },
  mounted () {
    WebViewer({
      path: `${process.env.BASE_URL}webviewer`,
      initialDoc: this.initialDoc, // replace with your own PDF file
    }, this.$refs.viewer).then((instance) => {
      console.log('RES =>', instance);
    });
  },
};
</script>
<style>
#webviewer {
  height: 800px;
}
</style>
