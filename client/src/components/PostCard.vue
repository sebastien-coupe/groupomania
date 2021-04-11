<template>
  <div class="card shadow-sm">
    <div class="d-flex align-items-center px-3 pt-3">
      <img class="thumbnail d-block" :src="post.author.avatarUrl" alt="" />
      <div class="d-block ms-3 lh-sm">
        <span class="d-block fw-bolder"
          ><a href="#" class="text-decoration-none text-body"
            >{{ post.author.firstName }} {{ post.author.lastName }}</a
          ></span
        >
        <!-- To be formatted -->
        <span class="d-block text-secondary small mt-1"
          >Publié {{ formatDate(post.createdAt) }}</span
        >
      </div>
      <div class="ms-auto">
        <button @click="togglePostActions" class="btn btn-link btn-sm">
          <i v-if="showPostActions" class="bi bi-x"></i>
          <i v-else class="bi bi-three-dots"></i>
        </button>
      </div>
    </div>
    <div v-if="showPostActions" class="py-3">
      <div class="d-flex justify-content-center bg-light">
        <div v-if="post.author.uuid === $store.getters.user.uuid" class="py-3">
          <button @click="deleteItem(post)" class="btn btn-danger btn-sm">
            Supprimer
          </button>
          <button class="btn btn-primary btn-sm ms-2">Modifier</button>
        </div>
        <div v-else class="py-3">
          <button class="btn btn-primary btn-sm">Signaler</button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text">
        {{ post.body }}
      </p>
      <div v-if="post.imageUrl" class="rounded bg-dark overflow-hidden">
        <img :src="post.imageUrl" alt="" class="d-block img-fluid mx-auto" />
      </div>
    </div>
    <div class="d-flex align-items-center px-3 pb-3 pt-4">
      <!-- TODO: Make it dynamic -->
      <div>
        <button type="button" class="btn btn-outline-success btn-sm">
          <i class="bi bi-arrow-up-short"></i>
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm ms-1">
          <i class="bi bi-arrow-down-short"></i>
        </button>
      </div>
      <div class="ms-3 small text-secondary text-success">+32 votes</div>
      <div class="ms-auto">
        <a href="#" class="text-decoration-none small">3 commentaires</a>
      </div>
      <!-- END TODO -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';
moment.locale('fr');

export default {
  name: 'Post',

  emits: ['deletePost'],

  inject: ['API_URL'],

  props: ['post'],

  data() {
    return {
      showPostActions: false,
    };
  },

  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },

    togglePostActions() {
      this.showPostActions = !this.showPostActions;
    },

    async deleteItem(post) {
      if (post.author.uuid !== this.$store.getters.user.uuid) return;

      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${this.$store.getters.token}`);

      const response = await fetch(`${this.API_URL}/posts/${post.uuid}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        console.log('Impossible de supprimer la publication.');
        return;
      }

      const result = await response.json();

      this.$emit('deletePost', result.uuid);
    },
  },
};
</script>

<style>
.card + .card {
  margin-top: 40px;
}

.thumbnail {
  width: 48px;
  border-radius: 50%;
}
</style>
