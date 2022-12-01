<template>
  <d-container>
    <div class="card card-small mb-4 mt-2">
      <div class="card-body p-0 pb-3 text-center">
        <table class="table mb-0">
          <thead class="bg-light">
            <tr>
              <th scope="col" class="border-0">*</th>
              <th scope="col" class="border-0">Name</th>
              <th scope="col" class="border-0">Author</th>
              <th scope="col" class="border-0">Year</th>
              <th scope="col" class="border-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td>Fav</td>
              <td>
                {{ file.name }}
              </td>

              <td>
                {{ file.author }}
              </td>
              <td>
                {{ file.year }}
              </td>
              <td>
                <d-row align-h="center">
                  <d-button class="mr-1" size="sm" theme="info">Read</d-button>
                </d-row>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <VueAdsPagination
      :page="currentPage"
      :items-per-page="perPage"
      :total-items="totalRows"
    >
      <template slot="buttons" slot-scope="props">
        <VueAdsPageButton
          v-for="(button, key) in props.buttons"
          :key="key"
          v-bind="button"
          @page-change="
            () => {
              currentPage = button.page
              fetchBookings()
            }
          "
        />
      </template>
    </VueAdsPagination>
  </d-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PaperTable',
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
    }
  },
  methods: {
    ...mapMutations(['storeUser']),
    register() {
      this.$axios.post('users', this.registerForm).then((response) => {
        // if (response.status === 201) {
        this.storeUser(response.data)
        this.$router.push('/')
        // }
      })
    },
  },
}
</script>

<style>
.example2 {
  border: 1px solid;
}
</style>
