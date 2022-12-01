<template>
  <div>
    <div class="main-content-container container-fluid px-4">
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
    </div>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RootFolder',
  data() {
    return {
      data: [],
      addFolderModal: false,
      addFolderForm: {
        name: '',
        parent_id: 0,
        user_id: null,
      },
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getNewMessages']),
  },
  mounted() {
    this.fetchRootFolder()
  },

  methods: {
    ...mapMutations(['setZero']),

    fetchRootFolder() {
      this.$axios.get(`users/${this.getUser.id}/folders/0`).then((res) => {
        this.data = res.data
      })
    },
    addFolder() {
      this.addFolderForm.user_id = this.getUser.id
      this.addFolderForm.parent_id = 0
      this.$axios.post(`folders`, this.addFolderForm).then((res) => {
        this.addFolderModal = false
        this.fetchRootFolder()
      })
    },
  },
}
</script>

<style scoped></style>
