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
    <hr />
    <paper-table-vue v-if="data.files" :files="data.files" />
    <WebviewerVue initial-doc="http://127.0.0.1:8000/api/papers" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaperTableVue from '~/components/papers/PaperTable.vue'
import WebviewerVue from '~/components/Webviewer.vue'
export default {
  name: 'FolderId',
  components: { PaperTableVue, WebviewerVue },
  data() {
    return {
      folder_id: null,
      data: [],
      publicPath:
        '/home/abdullah-al-jahid/Desktop/Codes/spl3/public/files/user_1/Smells.pdf',
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
