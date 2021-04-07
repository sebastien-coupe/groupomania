<template>
  <div id="loader" class="d-flex justify-content-center py-4">
    <i class="bi bi-dot"></i>
    <i class="bi bi-dot"></i>
    <i class="bi bi-dot"></i>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style>
#loader .bi {
  font-size: 48px;
  line-height: 1;
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

#loader .bi:nth-child(2) {
  animation-delay: 0.2s;
}

#loader .bi:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>