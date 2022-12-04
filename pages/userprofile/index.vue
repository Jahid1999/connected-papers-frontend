<template>
  <div
    v-if="user !== null && getUser"
    class="main-content-container container-fluid px-4"
  >
    <div class="page-header row no-gutters py-4">
      <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Personal Profile</span>
        <h3 class="page-title">Personal Profile of User</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div style="padding: 10px">
          <d-card>
            <d-card-header style="font-size: large; font-weight: 900"
              >Personal Information</d-card-header
            >
            <d-form
              style="padding: 20px; margin: 40px"
              @submit.prevent="updateUser"
            >
              <div class="row pa-2 ml-2">
                <span class="my-auto mr-2"><b> Name: </b></span>
                <d-form-input
                  v-model="userEditForm.name"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div class="row pb-2 ml-2">
                <span class="my-auto mr-2"><b> Email: </b></span>
                <d-form-input
                  v-model="userEditForm.email"
                  placeholder="Email must be unique"
                  required
                  disabled
                />
              </div>

              <div class="row pb-2 ml-2">
                <span class="my-auto mr-2"><b> Total Documents: </b></span>
                <d-form-input
                  v-model="userEditForm.total_doc_uploaded"
                  placeholder="Enter Total Number of Documents"
                  required
                  disabled
                />
              </div>
              <div class="row pb-2 ml-2">
                <span class="my-auto mr-2"><b> User Role: </b></span>
                <d-form-input
                  :value="
                    getUser.roles[0].name.toUpperCase().replace('_', '  ')
                  "
                  disabled
                ></d-form-input>
              </div>
              <div class="row pa-2 ml-2 mb-2">
                <span class="my-auto mr-2"><b> Password: </b></span>
                <d-form-input
                  v-model="userEditForm.password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>
              <div class="row pb-2 ml-2">
                <d-button type="submit">Update</d-button>
              </div>
            </d-form>
          </d-card>
        </div>
      </div>
      <div class="col-md-6">
        <div style="padding: 10px">
          <d-card>
            <d-card-header style="font-size: large; font-weight: 900"
              >Change Password</d-card-header
            >
            <d-form
              style="padding: 20px; margin: 40px"
              @submit.prevent="changePassword"
            >
              <div class="row pa-2 ml-2 mb-2">
                <span class="my-auto mr-2"><b> Current Password: </b></span>
                <d-form-input
                  v-model="changePasswordForm.old_password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>
              <div class="row pa-2 ml-2 mb-2">
                <span class="my-auto mr-2"><b> New Password: </b></span>
                <d-form-input
                  v-model="changePasswordForm.password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>
              <div class="row pa-2 ml-2 mb-2">
                <span class="my-auto mr-2"><b> Confirm New Password: </b></span>
                <d-form-input
                  v-model="changePasswordForm.confirm_password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>
              <div v-if="!password_matched" class="px-2">
                <p style="color: red">Password did't match!</p>
              </div>
              <div class="row pb-2 ml-2">
                <d-button theme="danger" type="submit"
                  >Change Password</d-button
                >
              </div>
            </d-form>
          </d-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data() {
    return {
      userEditForm: {
        name: '',
        id: null,
        email: '',
        total_doc_uploaded: null,
        password: '',
      },
      changePasswordForm: {
        old_password: '',
        password: '',
        confirm_password: '',
        email: '',
      },
      password_matched: true,
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  watch: {
    'changePasswordForm.password'() {
      if (
        this.changePasswordForm.password &&
        this.changePasswordForm.confirm_password
      ) {
        if (
          this.changePasswordForm.password !==
          this.changePasswordForm.confirm_password
        ) {
          this.password_matched = false
        } else {
          this.password_matched = true
        }
      }
    },
    'changePasswordForm.confirm_password'() {
      if (
        this.changePasswordForm.password &&
        this.changePasswordForm.confirm_password
      ) {
        if (
          this.changePasswordForm.password !==
          this.changePasswordForm.confirm_password
        ) {
          this.password_matched = false
        } else {
          this.password_matched = true
        }
      }
    },
  },

  mounted() {
    this.fetchUserByid()
  },
  methods: {
    fetchUserByid() {
      this.$axios.get(`users/${this.getUser.id}`).then((response) => {
        this.userEditForm.name = response.data.name
        this.userEditForm.email = response.data.email
        this.userEditForm.total_doc_uploaded = response.data.total_doc_uploaded
        this.userEditForm.id = response.data.id
      })
    },
    updateUser() {
      this.$axios
        .put('users', this.userEditForm)
        .then((res) => {
          this.fetchUserByid()
        })
        .catch((err) => {
          alert(err.toString())
          this.fetchUserByid()
        })
    },
    changePassword() {
      this.changePasswordForm.email = this.getUser.email
      this.$axios
        .put('users/password', this.changePasswordForm)
        .then((res) => {
          this.fetchUserByid()
        })
        .catch((err) => {
          alert(err.toString())
          this.fetchUserByid()
        })
    },
  },
}
</script>

<style scoped></style>
