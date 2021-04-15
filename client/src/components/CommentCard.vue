<template>
  <div class="comment">
    <div class="d-flex align-items-start">
      <div class="avatar-thumbnail-sm d-none d-sm-block mt-2 flex-shrink-0">
        <img :src="comment.author.avatarUrl" alt="" class="avatar-image" />
      </div>
      <div class="flex-grow-1 ms-sm-3">
        <div class="py-2 px-3 rounded-3 bg-light shadow-sm">
          <div class="d-flex align-items-center justify-content-between">
            <span class="fw-bold"
              >{{ comment.author.firstName }}
              {{ comment.author.lastName }}</span
            >
            <button
              v-if="comment.author.uuid === $store.getters.user.uuid"
              @click="removeComment(comment.uuid)"
              class="btn btn-outline-danger btn-sm small"
            >
              Supprimer
            </button>
          </div>
          <p class="w-100 mb-0 mt-2">
            {{ comment.body }}
          </p>
        </div>
        <span class="text-secondary ms-3 small fst-italic"
          >Publié {{ formatDate(comment.createdAt) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import setHeaders from '@/helpers/setHeaders';

import moment from 'moment';
moment.locale('fr');

export default {
  name: 'Comment',

  inject: ['API_URL'],

  emits: ['deletedComment'],

  props: ['comment'],

  methods: {
    formatDate(date) {
      return moment(date).fromNow();
    },

    async removeComment(uuid) {
      const headers = setHeaders();

      const response = await fetch(`${this.API_URL}/comments/${uuid}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        console.log('Impossible de supprimer le commentaire');
        return;
      }

      const result = await response.json();

      this.$emit('deletedComment', result.uuid);
    },
  },
};
</script>

<style>
.comment {
  margin-top: 10px;
}
</style>