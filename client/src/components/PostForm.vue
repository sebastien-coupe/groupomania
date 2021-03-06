<template>
  <div class="card shadow-sm">
    <div class="d-flex align-items-center p-3">
      <div class="avatar-thumbnail-sm">
        <img
          class="avatar-image d-block"
          :src="$store.getters.user.avatarUrl"
          alt=""
        />
      </div>
      <div class="d-block ms-3 lh-sm">
        <span class="fs-5 text-secondary">Quoi de neuf ?</span>
      </div>
      <div v-if="!showForm" class="ms-auto">
        <button
          @click="toggleForm"
          class="btn btn-primary btn-sm"
          title="Ajouter une publication"
        >
          <i class="bi bi-pencil"></i>
          <span class="visually-hidden">Ajouter une publication</span>
        </button>
      </div>
    </div>
    <div v-if="showForm" class="card-body">
      <form @submit.prevent="submitForm">
        <div class="d-flex align-items-center">
          <button
            @click.prevent="toggleImageInput"
            class="btn btn-primary btn-sm"
            :class="imageInput ? 'active' : ''"
            title="Ajouter une image"
          >
            <i class="bi bi-card-image"></i>
            <span class="visually-hidden">Ajouter une image</span>
          </button>
          <button @click="clearForm" class="btn btn-danger btn-sm ms-auto">
            Annuler
          </button>
          <button
            type="submit"
            :disabled="!body.length"
            class="btn btn-success btn-sm ms-2"
          >
            Publier
          </button>
        </div>
        <textarea
          v-model="body"
          @focus="error = false"
          class="form-control mt-3"
          rows="6"
        ></textarea>
        <span v-if="error" class="small text-danger"
          >Du contenu est requis</span
        >
        <div class="mt-3">
          <input
            v-if="imageInput"
            @change="preloadImage"
            ref="imageFile"
            class="form-control form-control-sm"
            type="file"
            id="image"
          />
          <div v-if="imagePreview" class="mt-2">
            <img :src="imagePreview" class="w-25 rounded" alt="preview" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import setHeaders from '@/helpers/setHeaders';

export default {
  name: 'PostForm',

  inject: ['API_URL'],

  emits: ['addPost'],

  data() {
    return {
      body: '',
      image: '',
      imagePreview: '',
      showForm: false,
      imageInput: false,
      error: false,
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
      this.image = '';
      this.imagePreview = '';
      this.videoPreview = '';
      this.imageInput = false;
      this.toggleForm();
    },

    preloadImage() {
      let input = this.$refs.imageFile;
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
      if (!this.validateForm()) return;

      const data = new FormData();

      data.append('body', this.body);
      data.append('uid', this.$store.getters.user.uuid);

      if (this.image) {
        data.append('image', this.image);
      }
      const headers = setHeaders();

      const response = await fetch(`${this.API_URL}/posts`, {
        method: 'POST',
        body: data,
        headers,
      });

      const result = await response.json();

      this.$emit('addPost', result.post);

      this.clearForm();
    },

    validateForm() {
      if (!this.body) {
        this.error = true;
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
.avatar-thumbnail-sm {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
}
</style>