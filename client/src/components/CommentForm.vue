<template>
  <div class="comment-form">
    <div class="p-3 rounded-3 bg-light border">
      <form @submit.prevent="submitComment">
        <div class="d-flex align-items-center">
          <span>Ajouter un commentaire:</span>
          <button class="btn btn-success btn-sm ms-auto">Commenter</button>
        </div>
        <textarea
          @focus="error = false"
          class="form-control mt-3"
          v-model="body"
          rows="2"
          placeholder="Commentez"
        ></textarea>
        <span v-if="error" class="small text-danger"
          >Le commentaire ne peut pas être vide</span
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',

  emits: ['addComment'],

  inject: ['API_URL'],

  props: ['postId'],

  data() {
    return {
      body: '',
      error: false,
    };
  },

  methods: {
    setHeaders() {
      const headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${this.$store.getters.token}`);

      return headers;
    },

    clearForm() {
      this.body = '';
    },

    async submitComment() {
      if (!this.validateForm()) return;

      const headers = this.setHeaders();

      const comment = {
        body: this.body,
        uid: this.$store.getters.user.uuid,
      };

      const response = await fetch(
        `${this.API_URL}/posts/${this.postId}/comments`,
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers,
        }
      );

      if (!response.ok) {
        console.log("Impossible d'ajouter un commentaire");
        return;
      }

      this.clearForm();

      const result = await response.json();

      this.$emit('addComment', result.comment);
    },

    validateForm() {
      if (this.body.length === 0) {
        this.error = true;
        return false;
      }

      return true;
    },
  },
};
</script>
