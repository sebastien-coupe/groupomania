<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-sm-10 col-md-8">
        <PostForm @addPost="updateFeed" />
        <Loader v-if="isLoading" />
        <Post v-else v-for="post in posts" :key="post.uuid" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/TheLoader';
import PostForm from '@/components/PostForm';
import Post from '@/components/PostCard';

export default {
  name: 'Feed',

  inject: ['API_URL'],

  components: {
    Loader,
    PostForm,
    Post,
  },

  data() {
    return {
      posts: [],
      isLoading: false,
    };
  },

  methods: {
    updateFeed(data) {
      const newPost = {
        ...data,
        author: this.$store.getters.user,
      };

      this.posts = [newPost, ...this.posts];
    },
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

    console.log(this.posts);

    this.isLoading = false;
  },
};
</script>
