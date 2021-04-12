<template>
  <div class="comment">
    <div class="d-flex align-items-start">
      <div class="comment-avatar d-none d-sm-block overflow-hidden mt-2">
        <img
          src="http://localhost:3000/public/avatar_default.png"
          alt=""
          class="w-100 h-100"
        />
      </div>
      <div class="flex-grow-1 ms-sm-3">
        <div class="py-2 px-3 rounded-3 bg-light shadow-sm">
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
.comment {
  margin-top: 10px;
}
</style>