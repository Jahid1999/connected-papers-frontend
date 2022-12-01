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
          <div class="card-header text-center">
            <b style="font-weight: 900">Notes</b>
          </div>
          <div class="card-body my-auto">
            {{ note }}
          </div>
          <div class="card-footer">
            <div>
              <d-row v-if="notes.length == 0" align-h="start" class="mx-auto">
                <d-button
                  size="sm"
                  theme="primary"
                  @click="addNoteModal = true"
                >
                  <i class="bx bx-plus mr-2"></i><b> Add Note</b>
                </d-button>
              </d-row>
              <d-row v-else align-h="start" class="mx-auto">
                <d-button size="sm" theme="primary" @click="initEditNote()">
                  <i class="bx bx-edit mr-2"></i><b> Edit Note</b>
                </d-button>
              </d-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <d-modal v-if="addNoteModal" @close="addNoteModal = false">
      <d-modal-header>
        <d-modal-title>Add Note</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-form-textarea
          v-model="addNoteForm.note"
          class="form-control"
          placeholder="Note"
          required
          :rows="6"
          :max-rows="10"
        />
        <div class="row pb-2 ml-2 mt-2" @click="saveNote">
          <d-button type="button" theme="success">Save</d-button>
        </div>
      </d-modal-body>
    </d-modal>

    <d-modal v-if="editNoteModal" @close="editNoteModal = false">
      <d-modal-header>
        <d-modal-title>Edit Note</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <d-form-textarea
          v-model="editNoteForm.note"
          class="form-control"
          placeholder="Note"
          required
          :rows="6"
          :max-rows="10"
        />
        <div class="row pb-2 ml-2 mt-2" @click="editNote">
          <d-button type="button" theme="success">Save</d-button>
        </div>
      </d-modal-body>
    </d-modal>
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
      note: '',
      addNoteModal: false,
      addNoteForm: {
        note: '',
        paper_id: null,
        user_id: null,
      },
      editNoteModal: false,
      editNoteForm: {
        note: '',
        paper_id: null,
        user_id: null,
        id: null,
      },
    }
  },
  computed: {
    ...mapGetters(['getUser']),
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
        this.note = this.notes[0].note
      })
    },
    saveNote() {
      this.addNoteForm.user_id = this.getUser.id
      this.addNoteForm.paper_id = this.paper_id
      this.$axios.post(`/notes`, this.addNoteForm).then((res) => {
        this.addNoteModal = false
        this.fetchNotes()
      })
    },
    editNote() {
      this.editNoteForm.id = this.notes[0].id
      this.editNoteForm.user_id = this.getUser.id
      this.editNoteForm.paper_id = this.paper_id
      this.$axios.put(`/notes`, this.editNoteForm).then((res) => {
        this.editNoteModal = false
        this.fetchNotes()
      })
    },
    initEditNote() {
      this.editNoteModal = true
      this.editNoteForm.note = this.note
    },
  },
}
</script>

<style scoped></style>
