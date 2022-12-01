<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark">{{
          papers.name
        }}</span>
      </div>
    </div>
    <WebviewerVue
      :initial-doc="`http://127.0.0.1:8000/api/users/1/papers/11/view`"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WebviewerVue from '~/components/Webviewer.vue'
export default {
  name: 'PaperId',
  components: { WebviewerVue },
  data() {
    return {
      paper_id: null,
      papers: [],
      publicPath: '',
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getNewMessages']),
  },
  mounted() {
    this.paper_id = this.$route.params.paper_id
    this.publicPath = `http://127.0.0.1:8000/api/users/${this.getUser.id}/papers/${this.paper_id}/view`
    this.fetchPaper()
  },
  methods: {
    fetchPaper() {
      this.$axios
        .get(`users/${this.getUser.id}/papers/${this.paper_id}`)
        .then((res) => {
          this.papers = res.data
        })
    },
    getURL() {
      return `http://127.0.0.1:8000/api/users/${this.getUser.id}/papers/${this.paper_id}/view`
    },
  },
}
</script>

<style scoped></style>
