<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-sm-10 col-md-8">
        <PostForm @addPost="updateFeed" />
        <Loader v-if="isLoading" />
        <div v-else-if="hasFailed">
          <div class="alert alert-danger" role="alert">
            Impossible de récupérer les posts.
          </div>
        </div>
        <div v-else-if="!posts.length">
          <div class="alert alert-primary" role="alert">
            Pas encore de publications.
          </div>
        </div>
        <div v-else class="mt-5">
          <Post
            v-for="post in posts"
            :key="post.uuid"
            :post="post"
            @deletePost="deleteFromFeed"
            @reportPost="markReportedPost"
            @reloadPost="reloadPost"
            @addLike="addUserLike"
            @addDislike="addUserDislike"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/TheLoader';
import PostForm from '@/components/PostForm';
import Post from '@/components/PostCard';

import setHeaders from '@/helpers/setHeaders';

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
      hasFailed: false,
    };
  },

  methods: {
    addUserLike(uuid) {
      const currentUser = this.$store.getters.user.uuid;
      this.posts.map((post) => {
        if (post.uuid === uuid) {
          if (!post.votes.usersLiked.includes(currentUser)) {
            if (post.votes.usersDisliked.includes(currentUser)) {
              post.votes.usersDisliked = post.votes.usersDisliked.filter(
                (user) => user !== currentUser
              );
            }
            post.votes.usersLiked.push(currentUser);
          }
        }
      });
    },

    addUserDislike(uuid) {
      const currentUser = this.$store.getters.user.uuid;
      this.posts.map((post) => {
        if (post.uuid === uuid) {
          if (!post.votes.usersDisliked.includes(currentUser)) {
            if (post.votes.usersLiked.includes(currentUser)) {
              post.votes.usersLiked = post.votes.usersLiked.filter(
                (user) => user !== currentUser
              );
            }
            post.votes.usersDisliked.push(currentUser);
          }
        }
      });
    },

    updateFeed(data) {
      const newPost = {
        ...data,
        author: this.$store.getters.user,
        votes: {
          usersLiked: [],
          usersDisliked: [],
        },
      };

      this.posts = [newPost, ...this.posts];
    },

    deleteFromFeed(uuid) {
      this.posts = this.posts.filter((post) => post.uuid !== uuid);
    },

    markReportedPost(uuid) {
      this.posts.forEach((post) => {
        if (post.uuid === uuid) {
          post.hasBeenReported = true;
        }
      });
    },

    reloadPost(newPost) {
      const postIndex = this.posts.findIndex(
        (post) => post.uuid == newPost.uuid
      );
      const author = this.posts[postIndex].author;
      this.posts[postIndex] = { ...newPost, author };
    },
  },

  async mounted() {
    this.isLoading = true;

    const headers = setHeaders({ json: true });

    const response = await fetch(`${this.API_URL}/posts`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      this.isLoading = false;
      this.hasFailed = true;
    }

    const data = await response.json();

    this.posts = data.posts;

    this.isLoading = false;
  },
};
</script>

<style>
.alert {
  margin-top: 40px;
}
</style>
