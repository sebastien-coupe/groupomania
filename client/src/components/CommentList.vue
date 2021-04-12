<template>
  <div class="p-3">
    <CommentForm />
    <div class="mt-4">
      <Comment />
    </div>
  </div>
</template>

<script>
import CommentForm from '@/components/CommentForm';
import Comment from '@/components/CommentCard';

export default {
  name: 'CommentList',

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