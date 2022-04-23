<template>
  <v-row>
    <v-col cols="10" offset="1" md="4" offset-md="4">
      <v-card class="mb-2">
        <v-toolbar color="success" dark>Login</v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field name="email" label="Email" type="email" />
            <v-text-field name="password" label="password" type="password" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark>Login</v-btn>
        </v-card-actions>
      </v-card>
      <p>
        Belum punya Akun?
        <v-btn to="/register" plain link>Register</v-btn>
      </p>
    </v-col>
  </v-row>
</template>
