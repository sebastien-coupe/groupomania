<template>
  <div class="comment-form">
    <div class="p-3 rounded-3 bg-light border">
      <div class="d-flex align-items-center">
        <span>Ajouter un commentaire:</span>
        <button class="btn btn-success btn-sm ms-auto">Commenter</button>
      </div>
      <form @submit.prevent="" class="mt-3">
        <textarea
          class="form-control"
          rows="2"
          placeholder="Commentez"
        ></textarea>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
};
</script>
