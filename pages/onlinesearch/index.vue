<template>
  <div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark"
          >Search From Google Scholar</span
        >
        <h3 class="page-title text-dark">Search Online</h3>
      </div>
    </div>

    <d-row>
      <d-input-group>
        <d-input-group-addon prepend>
          <d-btn theme="secondary" disabled
            ><i class="bx bxs-search" style="font-size: 1.2rem"></i
          ></d-btn>
        </d-input-group-addon>
        <d-input v-model="query" placeholder="Enter Search Query" />
        <d-input-group-addon append>
          <d-btn :disabled="is_seraching" theme="success" @click="search()"
            >Search</d-btn
          >
        </d-input-group-addon>
      </d-input-group>
    </d-row>

    <div v-if="results">
      <div
        v-for="paper in results.organic_results"
        :key="paper.position"
        class="card card-small mb-4 mt-2 mr-2"
      >
        <div class="card-body my-auto">
          <div class="row">
            <div class="col-11">
              <a v-if="paper.link" target="_blank" :href="paper.link">
                {{ paper.title }}
              </a>
              <b v-else style="font-weight: 900">{{ paper.title }}</b>
              ( <small>{{ paper.publication_info.summary }}</small> ) <br />
              <small>{{ paper.snippet }}</small>
            </div>
            <div
              v-if="paper.resources && paper.resources[0].link"
              class="col-1 my-auto mx-auto"
            >
              <a
                class="btn btn-info btn-sm"
                target="_blank"
                :href="paper.resources[0].link"
                ><i class="bx bx-download" style="font-size: 1.2rem"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: () => ({
    query: '',
    is_seraching: false,
    results: null,
  }),
  computed: {},

  methods: {
    search() {
      this.is_seraching = true
      this.$axios.get(`search/${this.query}`).then((res) => {
        this.results = res.data
      })
    },
    getReportURL(query) {
      return `http://127.0.0.1:8000/${query}`
    },
  },
}
</script>

<style scoped></style>
