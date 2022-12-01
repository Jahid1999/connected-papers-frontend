<template>
  <div id="webviewer" ref="viewer"></div>
</template>
<script>
import { ref, onMounted } from 'vue'
import WebViewer from '@pdftron/webviewer'
export default {
  name: 'WebViewer',
  props: {
    initialDoc: String,
  },
  setup(props) {
    const viewer = ref(null)
    onMounted(() => {
      const path = 'http://127.0.0.1:3001/webviewer'
      console.log(props.initialDoc)
      WebViewer(
        { path, initialDoc: props.initialDoc, extension: 'pdf' },
        viewer.value
      )
    })

    return {
      viewer,
    }
  },
}
</script>
<style>
#webviewer {
  height: 100vh;
}
</style>
