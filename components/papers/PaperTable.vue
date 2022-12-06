<template>
  <d-container>
    <d-row class="px-3 pt-2">
      <d-input-group>
        <d-input-group-addon prepend>
          <d-btn theme="secondary" disabled
            ><i class="bx bxs-search" style="font-size: 1.2rem"></i
          ></d-btn>
        </d-input-group-addon>
        <d-input v-model="query" placeholder="Enter Search Query" />
      </d-input-group>
    </d-row>
    <div class="card card-small mb-4 mt-2">
      <div class="card-body p-0 pb-3 text-center">
        <table class="table mb-0">
          <thead class="bg-light">
            <tr>
              <th scope="col" class="border-0">Favourite</th>
              <th scope="col" class="border-0">Name</th>
              <th scope="col" class="border-0">Author</th>
              <th scope="col" class="border-0">Year</th>
              <th scope="col" class="border-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file.id">
              <td>
                <img
                  v-if="file.is_fav == 0"
                  style="cursor: pointer"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAbhJREFUSEu9lYExQ1EQRU8qQAWoABWgAlSAClABKqADVBAdoAJUgA6ogDnmbWaT/Pfzf4bsTIa8/Hfv3t27+wcsIAYL4KAvyQ5wBVwC910T7EvyCGwD78D6f5Co4iEBHwO3XYj6KBHwEPgClgBV7f4lyRrwVgAPgGH5XxLJWqOrkmvgBHgCLFuougOO+pJsllJ4z+z9GKfAcimPmWdlF+UZzeDHsKQvQZ6VaMm9lqw+EqmPhdNqV0YOzCT5koA+9JkyskSRqcAqU6FhBfyuwtVy9lrOx4bRhyTaKOA2dSR5Vt1Lb24Sgb0zycaJj6b6e9dZsPlBMGWGmrv6EIXzTKrRbW0WDiIlr1TKZS+ey29ngIRT0UayX4Zu0lUZJFvZRH57MBltJPr/vKEENjRPuebQLNX+tZGEpeOyWdtcSQT23L/Rk+r0t5F8F9lbBVhV2jyHal01budq72okea2ryO+GgA6g4LEdVKMBDBOamq0aiUC+ASPcRQJn92gMHejaj/CNGbtsdFgjyXvM7B22vFICwPJJFKpiS4/VtEZixgJPZt/kUM9ClYSxz2YqqYHNdd71pTUXeFz6ARL/XhrDAlGCAAAAAElFTkSuQmCC"
                  @click="addFav(file.id)"
                />
                <img
                  v-else
                  style="cursor: pointer"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAVRJREFUSEu9leExBEEQRt9FgAyIABEgAjJABIgAERACEZCBkwEREAIRUK9q52pubmdMc66r9s9dT7/unm+/nbCCmKyAQRSyD9wA18Bjb4NRyBTYA96Brf+AOMVTVvgUuOsBRSax4HFW1KkOlgnZBN5GCgoR1ozeSW6Bs5FK98BJFLIDrA2H7N7HOAfWK8Wuht8Vg4/xCbyk/HwSJXn4U1eB/2cKzCFJnoE6zdRXwM3MvYyuQ9D2EigClPxHCUm1S6lGmQtiqKnrt6BRtbUkHAVdAEp9IVqQI+AhsKuNdAflmRZE/V8GIFUva0Gikq6+/S3IV2AKU5WrK+u+k9LW08HnwWJc5Zg77OZ2MmYreQd6lV/AFHqRhXP1KAwVmLzOXL+Yyctmh2vryn3M7nXaZH55M7qEoDSVuW5hLmoQO7Zw2X3tmtJUAt1CFyR45+303o/Wn6DfNbc4GscbJiIAAAAASUVORK5CYII="
                  @click="removeFav(file.id)"
                />
              </td>

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
                  <d-button
                    class="mr-1"
                    size="sm"
                    theme="info"
                    @click="
                      $router.push({
                        name: 'paper-details-paper_id',
                        params: { paper_id: file.id },
                      })
                    "
                  >
                    <i class="fa fa-eye" aria-hidden="true"></i> Read</d-button
                  >
                  <d-button
                    class="mr-1"
                    size="sm"
                    theme="primary"
                    @click="downloadDoc(file.id)"
                  >
                    <i class="bx bx-download"></i>
                  </d-button>
                  <d-button
                    v-if="!isFromPublic"
                    class="mr-1"
                    size="sm"
                    theme="danger"
                    @click="
                      deleteFileModal = true
                      fileToDelete = file.id
                    "
                  >
                    <i class="bx bx-trash" style="font-size: 1.2rem"></i>
                  </d-button>
                  <d-button
                    v-if="file.has_graph == 1"
                    class="mr-1"
                    size="sm"
                    theme="success"
                    @click="
                      $router.push({
                        name: 'graph-details-file_name',
                        params: { file_name: file.name },
                      })
                    "
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAa1JREFUSEu9leE1BTEQhb9XASqgBB2gAlSAClABKkAF6IAKUAEdoAJKcL53kj0jb3eTdR7zJ9nNZO7cmZtkxj/Y7B8wmApyAhwAr8Ap8NWS5BSQVeAzBD0CbpcNcgjchKD3wP6yQDZScFk7fwc2AUG2AUvofND6ynUOrAPXqf5mKwsBHA2cR32vgBXgAthKfs5NZm4liFldhpR0NpD9eAF2wuantOYosGwE0x6AvSEQszoOIDkJgbQ8Ojew346aILs9exeYWGszy/QNYpn851opWdXlmmNk80N5fT0pM4yByuaWCbg37+98ayBusISyGLJYyl+BxOaOqVQlCSCzSUwskwrpVDKCoo+ylnUziM6amzu9j1FJApB5qcIFdXkeHlMP7lJ2ldjdcr52VKDq6m6BsvGWyFs2WzwXNTBZZ4EItJY31E68oDKqmQ33prAS2nM4pL3viYF1drQE+WDmekdA/bwhvN9kLRv/OffNmVvLe6JaBLRX1llgA3ykYAYcfVdaQGJ/zgINL0EBq6/jFBDr/hZA/uRlNL7nx+ztTxOL1p7UlFVdn1KuarAhh2/M/V0avfy4SgAAAABJRU5ErkJggg=="
                    />
                    ></d-button
                  >
                  <d-button
                    v-if="file.has_graph == 0"
                    class="mr-1"
                    size="sm"
                    theme="warning"
                    outline
                    @click="
                      $router.push({
                        name: 'graph-details-file_name',
                        params: { file_name: file.name },
                      })
                    "
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAa1JREFUSEu9leE1BTEQhb9XASqgBB2gAlSAClABKkAF6IAKUAEdoAJKcL53kj0jb3eTdR7zJ9nNZO7cmZtkxj/Y7B8wmApyAhwAr8Ap8NWS5BSQVeAzBD0CbpcNcgjchKD3wP6yQDZScFk7fwc2AUG2AUvofND6ynUOrAPXqf5mKwsBHA2cR32vgBXgAthKfs5NZm4liFldhpR0NpD9eAF2wuantOYosGwE0x6AvSEQszoOIDkJgbQ8Ojew346aILs9exeYWGszy/QNYpn851opWdXlmmNk80N5fT0pM4yByuaWCbg37+98ayBusISyGLJYyl+BxOaOqVQlCSCzSUwskwrpVDKCoo+ylnUziM6amzu9j1FJApB5qcIFdXkeHlMP7lJ2ldjdcr52VKDq6m6BsvGWyFs2WzwXNTBZZ4EItJY31E68oDKqmQ33prAS2nM4pL3viYF1drQE+WDmekdA/bwhvN9kLRv/OffNmVvLe6JaBLRX1llgA3ykYAYcfVdaQGJ/zgINL0EBq6/jFBDr/hZA/uRlNL7nx+ztTxOL1p7UlFVdn1KuarAhh2/M/V0avfy4SgAAAABJRU5ErkJggg=="
                    />
                    ></d-button
                  >
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
    <d-modal v-if="deleteFileModal" @close="deleteFileModal = false">
      <d-modal-header style="background-color: red">
        <d-modal-title>Delete File</d-modal-title>
      </d-modal-header>
      <d-modal-body>
        <p>Do you want to delete the file?</p>
        <div class="row pb-2 mx-auto mt-2" @click="deleteDoc()">
          <d-button type="button" outline theme="danger">Delete</d-button>
        </div>
      </d-modal-body>
    </d-modal>
  </d-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'PaperTable',
  props: {
    files: {
      type: Array,
      required: true,
    },
    isFromPublic: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      query: '',
      filteredData: [],
      deleteFileModal: false,
      fileToDelete: null,
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  watch: {
    query(newQuery, oldQuery) {
      if (newQuery === '') this.files = this.filteredData
      else
        this.files = this.filteredData.filter((file) => {
          return (
            file.name.toLowerCase().includes(newQuery.toLowerCase()) ||
            file.author.toLowerCase().includes(newQuery.toLowerCase())
          )
        })
    },
  },
  mounted() {
    this.filteredData = this.files
  },
  methods: {
    ...mapMutations(['storeUser']),
    addFav(id) {
      this.$axios
        .post(`users/${this.getUser.id}/papers/${id}/favorite/add`, {})
        .then((response) => {
          this.files.forEach((file) => {
            if (file.id === id) {
              file.is_fav = 1
            }
          })
        })
    },
    removeFav(id) {
      this.$axios
        .post(`users/${this.getUser.id}/papers/${id}/favorite/remove`, {})
        .then((response) => {
          this.files.forEach((file) => {
            if (file.id === id) {
              file.is_fav = 0
            }
          })
        })
    },
    downloadDoc(id) {
      this.$axios
        .get(`users/${this.getUser.id}/papers/${id}/download`, {})
        .then((response) => {})
    },
    deleteDoc() {
      this.$axios.delete(`papers/${this.fileToDelete}`, {}).then((response) => {
        this.files = this.files.filter((file) => file.id !== this.fileToDelete)
        this.deleteFileModal = false
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
