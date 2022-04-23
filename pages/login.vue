<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="success" dark>Login</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              name="email"
              label="Email"
              type="email"
              v-model="form.email"
            />
            <v-text-field
              name="password"
              label="password"
              type="password"
              v-model="form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="onsubmit" dark>Login</v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Belum punya Akun?
        <v-btn to="/register" plain link>Register</v-btn>
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onsubmit() {
      console.log(this.form)
      this.$axios
        .$post('http://localhost:3001/auth/login', this.form)
        .then((response) => {
          console.log(response)
          this.$router.push('/product')
        })
    },
  },
}
</script>
