<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="success" dark>Register</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="fullname"
              label="Nama"
              type="text"
              :rules="rules.fullname"
              v-model="form.fullname"
            />
            <v-text-field
              name="email"
              label="Email"
              type="email"
              :rules="rules.email"
              v-model="form.email"
              @keyup="checkEmail"
            />
            <v-text-field
              name="password"
              label="Password"
              type="password"
              :rules="rules.password"
              v-model="form.password"
            />
            <v-text-field
              name="retype_password"
              label="Re-password"
              type="password"
              :rules="rules.retype_password"
              v-model="form.retype_password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="isDisable" @click="onsubmit" dark>
            <span v-if="!isDisable">Register</span>
            <v-progress-circular
              v-else
              color="success"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
      <p>Sudah punya Akun? <v-btn to="/login" plain>Login</v-btn></p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      emailExist: false,
      isDisable: false,
      form: {
        fullname: '',
        email: '',
        password: '',
        retype_password: '',
      },
      rules: {
        fullname: [(v) => !!v || 'Nama Harus Diisi'],
        email: [
          (v) => !!v || 'Email Harus Diisi',
          (v) => /.+@.+/.test(v) || 'Email Ga Valid',
          (v) => !!this.emailExist || 'Email Sudah Terdaftar',
        ],
        password: [
          (v) => !!v || 'Password Harus Diisi',
          (v) => v.length >= 6 || 'Password harus lebih dari 6 karakter',
        ],
        retype_password: [
          (v) => v === this.form.password || 'Password Ga sama',
        ],
      },
    }
  },
  methods: {
    checkEmail() {
      this.$axios
        .$post('http://localhost:3001/auth/check-email', this.form)
        .then((response) => {
          this.emailExist = false
          console.log(response)
        })
        .catch((error) => {
          this.emailExist = true
          console.log(error)
        })
    },
    onsubmit() {
      console.log(this.form)
      this.isDisable = true
      this.$axios
        .$post('http://localhost:3001/auth/register', this.form)
        .then((response) => {
          this.$router.push('/login')
          this.isDisable = false
        })
        .catch((error) => {
          this.isDisable = false
        })
    },
  },
}
</script>
