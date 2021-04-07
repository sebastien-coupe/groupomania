<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-sm-10 col-md-8">
        <Loader v-if="isLoading" />
        <Post v-else v-for="post in posts" :key="post.uuid" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/TheLoader';
import Post from '@/components/PostCard';

export default {
  name: 'Feed',

  inject: ['API_URL'],

  components: {
    Loader,
    Post,
  },

  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },

  async mounted() {
    this.isLoading = true;

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.$store.getters.token}`);

    const response = await fetch(`${this.API_URL}/posts`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) return;

    const data = await response.json();

    this.posts = data.posts;

    this.isLoading = false;
  },
};
</script>
