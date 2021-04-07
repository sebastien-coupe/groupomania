<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-sm-10 col-md-8">
        <div class="card">
          <div class="d-flex align-items-center p-3">
            <img
              class="thumbnail-sm d-block"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt=""
            />
            <div class="d-block ms-3 lh-sm">
              <span class="fs-5 text-secondary">Quoi de neuf ?</span>
            </div>
            <div class="ms-auto">
              <button class="btn btn-primary btn-sm">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <form action="">
              <textarea class="form-control" rows="6"></textarea>
              <div class="mt-2">
                <label for="image" class="small">Ajouter une image ?</label>
                <input
                  class="form-control form-control-sm"
                  type="file"
                  id="image"
                />
              </div>
              <div class="mt-2">
                <label for="video" class="small">Ajouter une vidéo ?</label>
                <input
                  class="form-control form-control-sm"
                  type="text"
                  id="video"
                  placeholder="ex: https://youtu.be/CxwJrzEdw1U"
                />
              </div>
              <div class="text-end mt-3">
                <button class="btn btn-danger btn-sm">Annuler</button>
                <button class="btn btn-success btn-sm ms-2">Publier</button>
              </div>
            </form>
          </div>
        </div>
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

<style scoped>
.thumbnail-sm {
  width: 32px;
  border-radius: 50%;
}
</style>
