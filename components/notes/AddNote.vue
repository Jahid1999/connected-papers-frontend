<template>
  <div>
    <d-row align-h="start" class="mx-auto">
      <d-button size="sm" theme="primary" @click="addNoteModal = true">
        <i class="bx bx-plus mr-2"></i><b> Add Note</b>
      </d-button>
    </d-row>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddNote',
  props: {
    paper: {
      type: Object,
      required: true,
    },
  },
  // eslint-disable-next-line
  computed: {
    ...mapGetters(['getUser']),
  },
  // eslint-disable-next-line
  data() {
    return {
      addNoteModal: false,
      addNoteForm: {
        note: '',
        paper_id: null,
        user_id: null,
      },
    }
  },
  methods: {
    saveNote() {
      this.$axios.post('/classes/pupils/add', this.addNoteForm).then((res) => {
        if (res.status === 201) {
          this.addNoteModal = false
        }
      })
    },
  },
}
</script>

<style scoped></style>
