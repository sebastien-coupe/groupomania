<template>
  <div class="card shadow-sm">
    <div class="d-flex align-items-center p-3">
      <img
        class="thumbnail-sm d-block"
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt=""
      />
      <div class="d-block ms-3 lh-sm">
        <span class="fs-5 text-secondary">Quoi de neuf ?</span>
      </div>
      <div v-if="!showForm" class="ms-auto">
        <button @click="toggleForm" class="btn btn-primary btn-sm">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
    </div>
    <div v-if="showForm" class="card-body">
      <form @submit.prevent="submitForm">
        <textarea v-model="body" class="form-control" rows="6"></textarea>
        <div class="mt-2">
          <button
            @click.prevent="toggleImageInput"
            class="btn btn-outline-secondary btn-sm"
            title="Ajouter une image"
          >
            <i class="bi bi-card-image"></i>
          </button>
        </div>
        <div class="mt-2">
          <input
            v-if="imageInput"
            @change="preloadImage"
            ref="image"
            class="form-control form-control-sm"
            type="file"
            id="image"
          />
          <div v-if="imagePreview" class="mt-2">
            <img :src="imagePreview" class="w-25 rounded" alt="preview" />
          </div>
        </div>
        <div class="text-end mt-3">
          <button @click="clearForm" class="btn btn-danger btn-sm">
            Annuler
          </button>
          <button class="btn btn-success btn-sm ms-2">Publier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostForm',

  inject: ['API_URL'],

  emits: ['addPost'],

  data() {
    return {
      body: '',
      image: null,
      imagePreview: '',
      showForm: false,
      imageInput: false,
    };
  },

  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },

    toggleImageInput() {
      this.imageInput = !this.imageInput;
    },

    clearForm() {
      this.body = '';
      this.video = '';
      this.imagePreview = '';
      this.videoPreview = '';
      this.imageInput = false;
      this.toggleForm();
    },

    preloadImage() {
      let input = this.$refs.image;
      let file = input.files;

      if (file && file[0]) {
        this.image = file[0];

        let reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },

    async submitForm() {
      const data = new FormData();

      data.append('body', this.body);
      data.append('uid', this.$store.getters.user.uuid);

      if (this.image) {
        data.append('image', this.image);
      }
      const headers = new Headers();

      headers.append('Authorization', `Bearer ${this.$store.getters.token}`);

      const response = await fetch(`${this.API_URL}/posts`, {
        method: 'POST',
        body: data,
        headers,
      });

      const result = await response.json();

      this.$emit('addPost', result.post);

      this.clearForm();
    },
  },
};
</script>

<style>
.thumbnail-sm {
  width: 32px;
  border-radius: 50%;
}
</style>