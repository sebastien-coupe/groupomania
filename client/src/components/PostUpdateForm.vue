<template>
  <form v-if="showForm" @submit.prevent="updatePost">
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
      <button @click="toggleUpdateForm" class="btn btn-danger btn-sm ms-auto">
        Annuler
      </button>
      <button @click="submitForm" class="btn btn-success btn-sm ms-2">
        Enregister
      </button>
    </div>
    <textarea
      v-model="body"
      @focus="error = false"
      class="form-control mt-3"
      rows="6"
    ></textarea>
    <span v-if="error" class="small text-danger">Du contenu est requis</span>
    <div class="mt-3">
      <input
        v-if="imageInput"
        @change="preloadImage"
        ref="imageFile"
        class="form-control form-control-sm"
        type="file"
        id="image"
      />
      <div v-if="!imagePreview && post.imageUrl && !deleteImage" class="mt-2">
        <div class="position-relative w-25">
          <img
            :src="post.imageUrl"
            class="d-block w-100 rounded"
            alt="preview"
          />
          <div class="image-action">
            <button
              @click="removeImage"
              class="btn btn-danger btn-sm m-auto"
              title="Supprimer l'image"
            >
              <i class="bi bi-x-circle"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="imagePreview" class="mt-2">
        <img
          :src="imagePreview"
          class="w-25 rounded update-preview"
          alt="preview"
        />
      </div>
    </div>
  </form>
</template>

<script>
import setHeaders from '@/helpers/setHeaders';

export default {
  name: 'UpdateForm',

  inject: ['API_URL'],

  props: ['post'],

  data() {
    return {
      showForm: true,
      image: '',
      imageInput: false,
      imagePreview: '',
      body: this.post.body,
      deleteImage: false,
      error: false,
    };
  },

  methods: {
    toggleUpdateForm() {
      this.showForm = false;
      this.$emit('closeForm');
    },

    toggleImageInput() {
      this.imageInput = !this.imageInput;
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

    removeImage() {
      this.deleteImage = true;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      const data = new FormData();

      data.append('body', this.body);
      data.append('uid', this.$store.getters.user.uuid);
      data.append('delImg', this.deleteImage);

      if (this.image) {
        data.append('image', this.image);
      }
      const headers = setHeaders();

      const response = await fetch(`${this.API_URL}/posts/${this.post.uuid}`, {
        method: 'PUT',
        body: data,
        headers,
      });

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      this.$emit('updatePost', result.post);
      this.toggleUpdateForm();
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
.image-action {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.image-action:hover {
  opacity: 1;
}
</style>