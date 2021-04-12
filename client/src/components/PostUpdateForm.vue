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
    <textarea v-model="body" class="form-control mt-3" rows="6"></textarea>
    <div class="mt-3">
      <input
        v-if="imageInput"
        @change="preloadImage"
        ref="imageFile"
        class="form-control form-control-sm"
        type="file"
        id="image"
      />
      <div v-if="!imagePreview && post.imageUrl" class="mt-2">
        <img :src="post.imageUrl" class="w-25 rounded" alt="preview" />
      </div>
      <div v-if="imagePreview" class="mt-2">
        <img :src="imagePreview" class="w-25 rounded" alt="preview" />
      </div>
    </div>
  </form>
</template>

<script>
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

    async submitForm() {
      const data = new FormData();

      data.append('body', this.body);
      data.append('uid', this.$store.getters.user.uuid);

      if (this.image) {
        data.append('image', this.image);
      }
      const headers = new Headers();

      headers.append('Authorization', `Bearer ${this.$store.getters.token}`);

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
  },
};
</script>

<style>
</style>