<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <section class="flex-grow-1">
      <div class="container">
        <div class="mt-4">
          <router-view />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/TheNavbar';

export default {
  components: {
    Navbar,
  },
};
</script>
