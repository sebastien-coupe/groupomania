<template>
  <div class="p-3">
    <Comment />
  </div>
</template>

<script>
import Comment from '@/components/CommentCard';

export default {
  name: 'CommentList',

  components: {
    Comment,
  },
};
</script>