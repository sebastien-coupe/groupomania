<template>
  <div class="comment">
    <div class="d-flex align-items-start">
      <div class="comment-avatar overflow-hidden">
        <img
          src="http://localhost:3000/public/avatar_default.png"
          alt=""
          class="w-100 h-100 mt-2"
        />
      </div>
      <div class="flex-grow-1 ms-3">
        <div class="py-2 px-3 rounded-3 bg-light">
          <span class="fw-bold">Jonas Kahnwald</span>
          <p class="w-100 mb-0">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus,
            odit.
          </p>
        </div>
        <span class="text-secondary ms-3 small fst-italic"
          >Publié il y a 1 jour</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
};
</script>

<style>
.comment-avatar {
  width: 32px;
  border-radius: 50%;
}

.comment + .comment {
  margin-top: 10px;
}
</style>