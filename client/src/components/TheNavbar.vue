<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Groupomania</router-link>

      <ul
        v-if="$store.getters.isAuthenticated"
        class="navbar-nav align-items-center ml-auto mb-lg-0"
      >
        <li class="nav-item profile">
          <router-link :to="{ path: 'Profile' }" class="nav-link">
            Mon Profil
          </router-link>
        </li>
        <li class="nav-item ms-2">
          <button class="btn btn-danger btn-sm" @click="logout">
            Déconnexion
          </button>
        </li>
      </ul>
      <ul v-else class="navbar-nav align-items-center ml-auto mb-lg-0">
        <li v-if="$route.path !== '/signin'" class="nav-item">
          <router-link :to="{ path: 'Signin' }" class="btn btn-primary btn-sm"
            >Connexion</router-link
          >
        </li>
        <li v-if="$route.path !== '/signup'" class="nav-item ms-2 ms-sm-4">
          <router-link :to="{ path: 'Signup' }" class="btn btn-primary btn-sm"
            >Inscription</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      await this.$router.push({ name: 'Signin' });
    },
  },
};
</script>

<style>
.profile {
  font-size: 0.875rem;
}
</style>