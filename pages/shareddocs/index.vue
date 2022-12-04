<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark">
          Publicly Available Documents</span
        >
      </div>
    </div>
    <paper-table-vue v-if="papers" :files="papers" :is-from-public="true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaperTableVue from '~/components/papers/PaperTable.vue'
export default {
  name: 'Favorites',
  components: { PaperTableVue },
  data() {
    return {
      papers: [],
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchFavs()
  },
  methods: {
    fetchFavs() {
      this.$axios.get(`papers`).then((res) => {
        this.papers = res.data
      })
    },
  },
}
</script>

<style scoped></style>
