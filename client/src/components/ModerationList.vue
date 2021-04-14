<template>
  <div>
    <h1 class="fs-4">Liste des publications signalées</h1>
    <Loader v-if="isLoading" />
    <div v-else>
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2" v-if="reportedPosts.length">
          <div
            class="card shadow-sm mt-4"
            v-for="post in reportedPosts"
            :key="post.uuid"
          >
            <div class="card-header p-3">
              <div class="d-flex flex-column flex-sm-row align-items-sm-center">
                <div class="d-block">
                  <span class="d-block fst-italic text-secondary small"
                    >Publication de:</span
                  >
                  <span class="d-block fs-5 fw-bold"
                    >{{ post.author.firstName }}
                    {{ post.author.lastName }}</span
                  >
                </div>
                <div class="text-end mt-4 mt-sm-0 ms-sm-auto">
                  <button
                    @click="deletePost(post.uuid)"
                    class="btn btn-danger btn-sm"
                  >
                    Supprimer
                  </button>
                  <button
                    @click="restorePost(post.uuid)"
                    class="ms-3 btn btn-success btn-sm"
                  >
                    Autoriser
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p>{{ post.body }}</p>
              <img
                v-if="post.imageUrl"
                :src="post.imageUrl"
                class="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
        <div v-else>Aucun post à modérer</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/TheLoader';
import setHeaders from '@/helpers/setHeaders';

export default {
  name: 'ModerationList',

  inject: ['API_URL'],

  props: ['reportedPosts'],

  emits: ['removeFromReportedPosts'],

  components: {
    Loader,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async deletePost(uuid) {
      const headers = setHeaders();

      const response = await fetch(`${this.API_URL}/posts/${uuid}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      this.$emit('removeFromReportedPosts', result.uuid);
    },

    async restorePost(uuid) {
      const headers = setHeaders();

      const response = await fetch(`${this.API_URL}/posts/${uuid}/restore`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      this.$emit('removeFromReportedPosts', result.uuid);
    },
  },
};
</script>

<style>
</style>