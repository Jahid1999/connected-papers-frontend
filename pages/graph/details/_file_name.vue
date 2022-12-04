<style src="vue-d3-network/dist/vue-d3-network.css"></style>
<template>
  <div id="app" class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Connected Papers</span>
        <h3 class="page-title">{{ filename }}</h3>
      </div>
    </div>
    <div class="row">
      <div v-if="paper_id" class="col-md-5">
        <WebviewerVue
          :initial-doc="`http://127.0.0.1:8000/api/users/1/papers/${paper_id}/view`"
        />
      </div>
      <div class="col-md-7">
        <div class="text-center border" style="background-color: aliceblue">
          <h4 class="my-auto">Graph</h4>
        </div>
        <d3-network
          :net-nodes="nodes"
          :net-links="links"
          :options="options"
        ></d3-network>
      </div>
    </div>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
import WebviewerVue from '~/components/Webviewer.vue'

export default {
  components: {
    D3Network,
    WebviewerVue,
  },
  data() {
    return {
      filename: '',
      nodes: [],
      links: [],
      options: {
        force: 8000,
        nodeSize: 40,
        nodeLabels: true,
        linkWidth: 2,
      },
      paper_id: null,
    }
  },
  mounted() {
    this.filename = this.$route.params.file_name
    this.fetchGraph()
  },
  methods: {
    fetchGraph() {
      this.$axios.get(`graph/${this.filename}`).then((res) => {
        this.paper_id = res.data.paper_id
        this.nodes.push({
          id: 1,
          name: res.data.graph_data.source,
          _color: 'red',
        })
        res.data.graph_data.papers.forEach((paper, idx) => {
          this.nodes.push({ id: idx + 2, name: paper })
          let width = 0
          if (res.data.graph_data.scores[idx] < 0.2) {
            width = 1
          } else if (res.data.graph_data.scores[idx] < 0.4) {
            width = 2
          } else if (res.data.graph_data.scores[idx] < 0.5) {
            width = 3
          } else if (res.data.graph_data.scores[idx] < 0.8) {
            width = 5
          } else if (res.data.graph_data.scores[idx] < 0.95) {
            width = 6
          } else if (res.data.graph_data.scores[idx] >= 0.95) {
            width = 10
          }

          this.links.push({
            sid: 1,
            tid: idx + 2,
            _svgAttrs: { 'stroke-width': width, opacity: 1 },
          })
        })
      })
    },
  },
}
</script>
