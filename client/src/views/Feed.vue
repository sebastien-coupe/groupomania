<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-sm-10 col-md-8">
        <div v-if="isLoading" class="loader d-flex justify-content-center py-4">
          <i class="bi bi-dot"></i>
          <i class="bi bi-dot"></i>
          <i class="bi bi-dot"></i>
        </div>
        <div v-for="post in posts" :key="post.uuid" class="card shadow-sm">
          <div class="d-flex align-items-center px-3 pt-3">
            <img
              class="thumbnail d-block"
              :src="
                post.avatarUrl ||
                'http://localhost:3000/public/avatar_default.png'
              "
              alt=""
            />
            <div class="d-block ms-3 lh-sm">
              <span class="d-block fw-bolder"
                ><a href="#" class="text-decoration-none text-body"
                  >{{ post.author.firstName }} {{ post.author.lastName }}</a
                ></span
              >
              <span class="d-block text-secondary small">{{
                post.author.role || 'Admin'
              }}</span>
            </div>
          </div>

          <div class="card-body">
            <p class="card-text">
              {{ post.body }}
            </p>
          </div>
          <div class="d-flex align-items-center px-3 pb-3 pt-4">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feed',

  inject: ['API_URL'],

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

<style>
.card + .card {
  margin-top: 40px;
}

.thumbnail {
  width: 48px;
  border-radius: 50%;
}

.loader .bi {
  font-size: 48px;
  line-height: 1;
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.loader .bi:nth-child(2) {
  animation-delay: 0.2s;
}

.loader .bi:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
