<template>
  <v-app>
    <v-navigation-drawer
      disable-resize-watcher
      v-model="sideDrawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-backburger</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- navigation bottom -->
    <v-bottom-navigation color="green" horizontal fixed app height="10vh">
      <v-app-bar-nav-icon
        @click.stop="sideDrawer = !sideDrawer"
        v-ripple="false"
        plain
      />
      <v-btn v-for="(item, i) in bottomMenu" :key="i" :to="item.to">
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      sideDrawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-application-brackets',
          title: 'Application',
          to: '/inspire',
        },
        {
          icon: 'mdi-account-switch-outline',
          title: 'Account',
          to: '/mantab',
        },
        {
          icon: 'mdi-bell',
          title: 'Notification',
          to: '/xxx',
        },
      ],
      bottomMenu: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-application-brackets',
          title: 'Application',
          to: '/inspire',
        },
        {
          icon: 'mdi-account-switch-outline',
          title: 'Account',
          to: '/mantab',
        },

        {
          icon: 'mdi-folder-star-multiple',
          title: 'product',
          to: '/product',
        },
        {
          icon: 'mdi-bell',
          title: 'Notification',
          to: '/notifikasi',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Aplikasi ',
    }
  },
  methods: {
    isWelcomeScreen() {
      if (!localStorage.welcomeScreen) {
        if (
          this.$router.currentRoute.path != '/register' &&
          this.$router.currentRoute.path != '/login'
        ) {
          this.$router.push('/register')
        }
      }
    },
  },
  watch: {
    $route() {
      this.isWelcomeScreen()
    },
  },
  mounted() {
    // localStorage.setItem('welcomeScreen', true)
    this.isWelcomeScreen()
  },
}
</script>
