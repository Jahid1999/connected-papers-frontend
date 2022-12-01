<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark">
          Favorite Documents</span
        >
      </div>
    </div>
    <paper-table-vue v-if="favs" :files="favs" />
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
      favs: [],
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
      this.$axios.get(`users/${this.getUser.id}/favorites`).then((res) => {
        this.favs = res.data
      })
    },
  },
}
</script>

<style scoped></style>
