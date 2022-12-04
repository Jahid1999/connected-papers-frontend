<style src="vue-d3-network/dist/vue-d3-network.css"></style>
<template>
  <div id="app">
    <d3-network
      :net-nodes="nodes"
      :net-links="links"
      :options="options"
    ></d3-network>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'

export default {
  components: {
    D3Network,
  },
  props: {
    filename: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      nodes: [
        { id: 1, name: 'TBar', _color: 'red' },
        { id: 2, name: 'my node 2' },
        { id: 3, _color: 'orange' },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
      ],
      links: [
        { sid: 1, tid: 2, _color: 'red' },
        { sid: 1, tid: 3, _color: 'f0f' },
        { sid: 1, tid: 4, _color: 'rebeccapurple' },
        { sid: 1, tid: 5, _svgAttrs: { 'stroke-width': 8, opacity: 1 } },
        { sid: 1, tid: 6 },
        { sid: 1, tid: 7 },
        { sid: 1, tid: 8 },
        { sid: 1, tid: 9 },
      ],
      options: {
        force: 5000,
        nodeSize: 40,
        nodeLabels: true,
        linkWidth: 2,
      },
    }
  },
}
</script>
