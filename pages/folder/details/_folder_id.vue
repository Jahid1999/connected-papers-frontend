<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark">{{
          data.name
        }}</span>
      </div>
    </div>
    <div class="row">
      <div v-for="folder in data.folders" :key="folder.id">
        <div
          class="card card-small mb-4 mt-2 mr-2"
          style="cursor: pointer"
          @click="
            $router.push({
              name: 'folder-details-folder_id',
              params: { folder_id: folder.id },
            })
          "
        >
          <div class="card-body my-auto">
            <div class="d-flex">
              <i class="bx bx-folder mr-2 mt-1"></i> {{ folder.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="file in data.files" :key="file.id">
        <div
          class="card card-small mb-4 mt-2 mr-2"
          style="cursor: pointer"
          @click="
            $router.push({
              name: 'folder-details-folder_id',
              params: { folder_id: folder.id },
            })
          "
        >
          <div class="card-body my-auto">
            <div class="d-flex">
              <i class="bx bx-file-pdf mr-2 mt-1"></i> {{ file.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FolderId',
  data() {
    return {
      folder_id: null,
      data: [],
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getNewMessages']),
  },
  mounted() {
    this.folder_id = this.$route.params.folder_id
    this.fetchFolder()
  },
  methods: {
    fetchFolder() {
      this.$axios
        .get(`users/${this.getUser.id}/folders/${this.folder_id}`)
        .then((res) => {
          this.data = res.data
        })
    },
    getReportURL(query) {
      return `http://127.0.0.1:8000/${query}`
    },
  },
}
</script>

<style scoped></style>
