<template>
  <div>
    <d-row align-h="start" class="mx-auto">
      <d-button size="sm" theme="primary" @click="addNoteModal = true">
        <i class="bx bx-plus mr-2"></i><b> Edit Note</b>
      </d-button>
    </d-row>
    <d-modal v-if="addNoteModal" @close="addNoteModal = false">
      <d-modal-header>
        <d-modal-title>Edit Note</d-modal-title>
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
  name: 'EditNote',
  props: {
    paper: {
      type: Array,
      required: true,
    },
    note: {
      type: Array,
      required: true,
    },
  },
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
        id: null,
      },
    }
  },
  mounted() {
    this.addNoteForm.note = this.note[0].note
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
