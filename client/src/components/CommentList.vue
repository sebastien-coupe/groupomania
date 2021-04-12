<template>
  <div class="p-3">
    <CommentForm :postId="postId" />
    <div class="mt-4">
      <div v-if="!comments.length">
        <div class="alert alert-secondary mt-2 mb-0" role="alert">
          Pas encore de commentaires.
        </div>
      </div>
      <div v-else>
        <Comment
          v-for="comment in comments"
          :key="comment.uuid"
          :postId="postId"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommentForm from '@/components/CommentForm';
import Comment from '@/components/CommentCard';

export default {
  name: 'CommentList',

  props: ['comments', 'postId'],

  components: {
    CommentForm,
    Comment,
  },
};
</script>

<style>
.comment-avatar {
  width: 32px;
  border-radius: 50%;
}
</style>