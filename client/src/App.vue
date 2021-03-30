<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar v-if="isAuthenticated" />
    <section class="d-flex flex-column flex-grow-1">
      <router-view />
    </section>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/TheNavbar';
import Footer from '@/components/TheFooter';

export default {
  data() {
    return {
      // To refactor using vuex
      isAuthenticated: false,
    };
  },
  components: {
    Navbar,
    Footer,
  },
};
</script>