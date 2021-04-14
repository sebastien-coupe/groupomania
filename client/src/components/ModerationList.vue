<template>
  <div>
    <h1 class="fs-4">Liste des publications signalées</h1>
    <Loader v-if="isLoading" />
    <div v-else>
      <div v-if="reportedPosts.length">
        <div
          class="card shadow-sm mt-3"
          v-for="post in reportedPosts"
          :key="post.uuid"
        >
          <div class="d-sm-flex">
            <div class="card-body">
              <div>
                <span class="fs-5 fw-bold"
                  >{{ post.author.firstName }} {{ post.author.lastName }}</span
                >
                <span class="fst-italic text-secondary"> a publié:</span>
              </div>
              <p>{{ post.body }}</p>
              <img v-if="post.imageUrl" :src="post.imageUrl" alt="" />
            </div>
            <div class="d-grid gap-2 p-3">
              <button
                @click="deletePost(post.uuid)"
                class="btn btn-danger btn-sm d-block"
              >
                Supprimer
              </button>
              <button
                @click="restorePost(post.uuid)"
                class="btn btn-success btn-sm d-block"
              >
                Autoriser
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>Aucun post à modérer</div>
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