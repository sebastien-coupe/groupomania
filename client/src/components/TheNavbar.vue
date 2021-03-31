<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Groupomania</router-link>

      <ul class="navbar-nav align-items-center ml-auto mb-lg-0">
        <li v-if="$route.path !== '/signin'" class="nav-item">
          <router-link to="/signin" class="btn btn-primary btn"
            >Connexion</router-link
          >
        </li>
        <li v-if="$route.path !== '/signup'" class="nav-item ms-2 ms-sm-4">
          <router-link to="/signup" class="btn btn-primary btn"
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
};
</script>