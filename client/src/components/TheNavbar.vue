<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Groupomania</router-link>

      <ul class="navbar-nav align-items-center ml-auto mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Log In</router-link>
        </li>
        <li class="nav-item ms-2 ms-sm-4">
          <router-link to="/" class="btn btn-primary btn-sm"
            >Sign Up</router-link
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