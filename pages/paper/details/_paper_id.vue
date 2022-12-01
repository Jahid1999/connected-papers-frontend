<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark">
          {{ paper_name }}</span
        >
      </div>
    </div>
    <div class="row">
      <div class="col-md-9">
        <WebviewerVue
          :initial-doc="`http://127.0.0.1:8000/api/users/1/papers/${$route.params.paper_id}/view`"
        />
      </div>
      <div class="col-md-3">
        <div class="card card-small mb-4 mt-2 mr-2">
          <div class="card-header text-center"><b>Notes</b></div>
          <div class="card-body my-auto">
            <div class="d-flex">
              {{ notes[0].note }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
      paper_name: '',
      notes: [],
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getNewMessages']),
  },
  mounted() {
    this.paper_id = this.$route.params.paper_id
    this.fetchPaper()
    this.fetchNotes()
  },
  methods: {
    fetchPaper() {
      this.$axios
        .get(`users/${this.getUser.id}/papers/${this.paper_id}`)
        .then((res) => {
          this.papers = res.data
          this.paper_name = this.papers[0].name
        })
    },
    getURL() {
      return `http://127.0.0.1:8000/api/users/${this.getUser.id}/papers/${this.paper_id}/view`
    },
    fetchNotes() {
      this.$axios.get(`papers/${this.paper_id}/notes`).then((res) => {
        this.notes = res.data
      })
    },
  },
}
</script>

<style scoped></style>
