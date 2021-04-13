<template>
  <div class="container">
    <router-link
      :to="{ name: 'Feed' }"
      class="d-inline-flex align-items-center text-decoration-none"
    >
      <i class="bi bi-arrow-left fs-5"></i><span class="ms-2">Retour</span>
    </router-link>
    <ul class="nav nav-tabs mt-3" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Mon profil
        </button>
      </li>
      <li v-if="user.isAdmin" class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Modération
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active bg-white border border-top-0 p-3"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <form @submit.prevent="updateProfile">
          <div class="row align-items-start">
            <div class="col-4">
              <div class="d-flex justify-content-center mt-3">
                <div class="avatar-container">
                  <img
                    :src="avatarPreview || user.avatarUrl"
                    alt="avatar"
                    id="avatar"
                  />
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="mb-3">
                <label for="lastName" class="form-label"
                  >Utiliser un avatar personalisé</label
                >
                <input
                  @change="preloadImage"
                  ref="newAvatar"
                  class="form-control"
                  type="file"
                  id="image"
                />
                <div class="form-text">
                  Formats: jpg, jpeg, png Max: 180x180px
                </div>
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Nom</label>
                <input
                  v-model="user.lastName"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">Prénom</label>
                <input
                  v-model="user.firstName"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  @keyup="compare"
                  v-model="user.email"
                  type="email"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label for="post" class="form-label">Poste</label>
                <input
                  @keyup="compare"
                  v-model="user.role"
                  type="poste"
                  class="form-control"
                />
              </div>
              <div class="d-flex justify-content-between mt-5">
                <button
                  @click.prevent="showConfirm = true"
                  class="btn btn-danger btn-sm"
                  :disabled="showConfirm"
                >
                  Supprimer mon compte
                </button>
                <button :disabled="!updated" class="btn btn-primary btn-sm">
                  Mettre à jour
                </button>
              </div>
              <div v-if="showConfirm" class="mb-3">
                <div class="alert alert-danger d-flex align-items-start">
                  <div>
                    <i class="bi bi-exclamation-triangle-fill fs-1 px-3"></i>
                  </div>
                  <div class="flex-grow-1 ms-5">
                    <p>
                      Vous êtes sur le point de supprimer votre compte, cette
                      opération est irréversible, êtes vous sûr de vouloir
                      continuer ?
                    </p>
                    <div class="text-end">
                      <button
                        @click="showConfirm = false"
                        class="btn btn-success btn-sm"
                      >
                        Annuler
                      </button>
                      <button
                        @click.prevent="deleteAccount"
                        class="btn btn-danger btn-sm ms-2"
                      >
                        Confirmer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        v-if="user.isAdmin"
        class="tab-pane fade bg-white border border-top-0 p-3"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi et
        culpa perferendis minima beatae similique inventore quia porro
        obcaecati, enim laborum, cum qui accusamus sequi reprehenderit suscipit
        dignissimos animi aliquid. Eligendi voluptate sunt a dolores repudiandae
        molestiae minima voluptas? Adipisci.
      </div>
    </div>
  </div>
</template>

<script>
import setHeaders from '@/helpers/setHeaders';

export default {
  name: 'Me',

  inject: ['API_URL'],

  data() {
    return {
      user: {},
      image: '',
      avatarPreview: '',
      updated: false,
      showConfirm: false,
      changeAvatar: false,
    };
  },

  methods: {
    compare() {
      if (
        JSON.stringify(this.user) !== JSON.stringify(this.$store.getters.user)
      ) {
        this.updated = true;
        return;
      }
      this.updated = false;
      console.log(this.updated);
    },

    preloadImage() {
      this.updated = true;
      let input = this.$refs.newAvatar;
      let file = input.files;

      if (file && file[0]) {
        this.image = file[0];

        let reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(file[0]);
      }
    },

    async deleteAccount() {
      const headers = setHeaders();

      const response = await fetch(
        `${this.API_URL}/users/${this.$store.getters.user.uuid}`,
        {
          method: 'DELETE',
          headers,
        }
      );

      console.log(response);

      if (!response.ok) {
        console.log('Impossible de supprimer le compte');
        return;
      }

      await this.$store.dispatch('logout');
      await this.$router.push({
        name: 'Signin',
        query: { accountDeleted: true },
      });
    },

    async updateProfile() {
      const newProfile = new FormData();

      if (this.user.email !== this.$store.getters.user.email) {
        newProfile.append('email', this.user.email);
      }

      if (this.user.role !== this.$store.getters.user.role) {
        newProfile.append('role', this.user.role);
      }

      if (this.image) {
        newProfile.append('image', this.image);
      }

      newProfile.append('uid', this.$store.getters.user.uuid);

      const headers = setHeaders();

      const response = await fetch(
        `${this.API_URL}/users/${this.$store.getters.user.uuid}`,
        {
          method: 'PUT',
          body: newProfile,
          headers,
        }
      );

      if (!response.ok) {
        console.log('Impossible de mettre à jour le profil');
        return;
      }

      const result = await response.json();

      await this.$store.dispatch('updateUser', result.user);

      console.log('Done!');
    },
  },

  mounted() {
    this.user = { ...this.$store.getters.user };
    console.log(this.user);
  },
};
</script>

<style scoped>
.avatar-action {
  background-color: rgba(0, 0, 0, 0.4);
}

.avatar-container {
  width: 180px;
  height: 180px;
  overflow: hidden;
}

#avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
