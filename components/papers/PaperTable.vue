<template>
  <d-container>
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
                    theme="success"
                    @click="downloadDoc(file.id)"
                  >
                    <i class="bx bx-download mr-1"></i>
                  </d-button>
                  <d-button
                    class="mr-1"
                    size="sm"
                    theme="danger"
                    @click="deleteDoc(file.id)"
                  >
                    <i class="bx bx-trash mr-1"></i>
                  </d-button>
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
import { mapMutations, mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters(['getUser']),
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
    deleteDoc(id) {
      this.$axios.delete(`papers/${id}`, {}).then((response) => {
        this.files = this.files.filter((file) => file.id !== id)
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
