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
          <v-btn color="success" @click="onsubmit" dark>Register</v-btn>
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
    onsubmit() {
      console.log(this.form)
      this.$axios
        .$post('http://localhost:3001/auth/register', this.form)
        .then((response) => {
          {
            console.log(response)
          }
        })
    },
  },
}
</script>
