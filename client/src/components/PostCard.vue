<template>
  <div class="card shadow-sm">
    <div class="d-flex align-items-center px-3 pt-3">
      <img
        class="thumbnail d-block"
        :src="
          post.avatarUrl || 'http://localhost:3000/public/avatar_default.png'
        "
        alt=""
      />
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
    </div>

    <div class="card-body">
      <p class="card-text">
        {{ post.body }}
      </p>
      <div v-if="post.imageUrl">
        <img :src="post.imageUrl" alt="" class="img-fluid rounded" />
      </div>
    </div>
    <div class="d-flex align-items-center px-3 pb-3 pt-4">
      <!-- TODO: Make it dynamic -->
      <div>
        <button type="button" class="btn btn-light btn-sm">
          <i class="bi bi-arrow-up-short"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm ms-1">
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

  props: ['post'],

  methods: {
    formatDate(date) {
      return moment(date).fromNow();
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
