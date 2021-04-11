<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Groupomania</router-link>
      <ul
        v-if="$store.getters.isAuthenticated"
        class="navbar-nav align-items-center ml-auto mb-lg-0"
      >
        <li class="nav-item profile">
          <router-link
            v-if="$route.path === '/me'"
            :to="{ name: 'Feed' }"
            class="nav-link"
          >
            Mon fil d'actualités
          </router-link>
          <router-link v-else :to="{ name: 'Me' }" class="nav-link">
            <div class="d-flex align-items-center">
              <img :src="avatar" class="avatar rounded" alt="avatar" />
              <span class="ms-2">Mon compte</span>
            </div>
          </router-link>
        </li>
        <li class="nav-item ms-2">
          <button class="btn btn-danger btn-sm" @click="logout">
            <i class="bi bi-box-arrow-right d-block d-sm-none"></i>
            <span class="d-none d-sm-block">Déconnexion</span>
          </button>
        </li>
      </ul>
      <ul v-else class="navbar-nav align-items-center ml-auto mb-lg-0">
        <li v-if="$route.path !== '/signin'" class="nav-item">
          <router-link :to="{ name: 'Signin' }" class="btn btn-primary btn-sm"
            >Connexion</router-link
          >
        </li>
        <li v-if="$route.path !== '/signup'" class="nav-item ms-2 ms-sm-4">
          <router-link :to="{ name: 'Signup' }" class="btn btn-primary btn-sm"
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

  inject: ['API_URL'],

  data() {
    return {
      avatar: '',
    };
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      await this.$router.push({ name: 'Signin' });
    },
  },

  mounted() {
    this.avatar = this.$store.getters.user.avatarUrl;
  },
};
</script>

<style>
.profile {
  font-size: 0.875rem;
}

.avatar {
  width: 18px;
  height: 18px;
}
</style>