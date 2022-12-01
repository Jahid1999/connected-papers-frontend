<template>
  <div class="main-content-container container-fluid px-4">
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle text-dark">{{
          data.name
        }}</span>
      </div>
    </div>
    <d-row align-h="end" class="mx-auto">
      <d-button size="sm" theme="success" @click="addFolderModal = true">
        <i class="bx bx-plus mr-2"></i><b> Create Folder</b>
      </d-button>
    </d-row>
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
    <d-row align-h="start" class="mx-auto">
      <d-button size="sm" theme="success" @click="addFileModal = true">
        <i class="bx bx-plus mr-2"></i><b> Upload File</b>
      </d-button>
    </d-row>
    <paper-table-vue v-if="data.files" :files="data.files" />

    <d-modal v-if="addFolderModal" @close="addFolderModal = false">
      <d-modal-header>
        <d-modal-title>Create Folder</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-form-input
          v-model="addFolderForm.name"
          class="form-control"
          placeholder="Folder name"
          required
          type="text"
        />
        <div class="row pb-2 mx-auto mt-2" @click="addFolder">
          <d-button type="button" outline theme="success">Create</d-button>
        </div>
      </d-modal-body>
    </d-modal>
    <d-modal v-if="addFileModal" @close="addFileModal = false">
      <d-modal-header>
        <d-modal-title>Upload File</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-form-input
          v-model="addFileForm.name"
          class="form-control"
          placeholder="File name"
          required
          type="text"
        />
        <d-form-input
          v-model="addFileForm.author"
          class="form-control mt-2"
          placeholder="Author"
          required
          type="text"
        />
        <d-form-input
          v-model="addFileForm.year"
          class="form-control mt-2"
          placeholder="2022"
          required
          type="text"
        />
        <input id="file" ref="file" type="file" @change="handleFileUpload()" />
        <div class="row pb-2 mx-auto mt-2" @click="addFile">
          <d-button type="button" outline theme="success">Upload</d-button>
        </div>
      </d-modal-body>
    </d-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PaperTableVue from '~/components/papers/PaperTable.vue'
export default {
  name: 'FolderId',
  components: { PaperTableVue },
  data() {
    return {
      folder_id: null,
      data: [],
      addFolderModal: false,
      addFolderForm: {
        name: '',
        parent_id: null,
        user_id: null,
      },
      addFileModal: false,
      addFileForm: {
        name: '',
        folder_id: null,
        user_id: null,
        author: '',
        year: '',
        file: null,
      },
      file: '',
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
    addFolder() {
      this.addFolderForm.user_id = this.getUser.id
      this.addFolderForm.parent_id = this.folder_id
      this.$axios.post(`folders`, this.addFolderForm).then((res) => {
        this.addFolderModal = false
        this.fetchFolder()
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    addFile() {
      const formData = new FormData()

      formData.append('file', this.file)
      formData.append('name', this.addFileForm.name)
      formData.append('folder_id', this.folder_id)
      formData.append('user_id', this.getUser.id)
      formData.append('author', this.addFileForm.author)
      formData.append('year', this.addFileForm.year)

      this.$axios
        .post(`papers`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.addFileModal = false
          this.fetchFolder()
        })
    },
  },
}
</script>

<style scoped></style>
