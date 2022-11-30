<template>
  <div>
    <div class="main-content-container container-fluid px-4">
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RootFolder',
  data() {
    return {
      data: [],
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
  },
}
</script>

<style scoped></style>
