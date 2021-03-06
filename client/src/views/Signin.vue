<template>
  <div class="m-auto">
    <div v-if="showAccountDeletedMessage" class="container">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        Votre Compte a bien été supprimé
        <button
          @click="dismissAccountDeletedMessage"
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img
            class="img-fluid mt-5 mb-3"
            src="@/assets/logo.png"
            alt="groupomania logo"
          />
          <p class="fs-5 mb-4">
            Connectez vous au plus vite plus pour consulter les dernières
            nouvelles.
          </p>
          <p>
            Nouveau chez Groupomania ?
            <router-link :to="{ name: 'Signup' }" class="ms-2"
              >S'inscrire</router-link
            >
          </p>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm ms-md-5 p-3 p-md-4 mt-4 mt-md-0">
            <div
              v-if="showSuccessMessage"
              class="alert alert-success mb-3 mt-0"
              role="alert"
            >
              Inscription réussie !
            </div>
            <div
              v-if="showErrorMessage"
              class="alert alert-danger mb-3 mt-0"
              role="alert"
            >
              Identifiants incorrects
            </div>

            <form
              @submit.prevent="submitForm"
              class="needs-validation"
              novalidate
            >
              <div class="mb-2">
                <label for="email" class="form-label">Adresse email</label>
                <input
                  @focus="
                    {
                      {
                        delete errors.email;
                        showErrorMessage = false;
                      }
                    }
                  "
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control form-control-lg"
                  :class="errors.email ? 'is-invalid' : ''"
                />
                <span v-if="errors.email" class="invalid-feedback">{{
                  errors.email
                }}</span>
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                  @focus="
                    {
                      {
                        delete errors.password;
                        showErrorMessage = false;
                      }
                    }
                  "
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control form-control-lg"
                  :class="errors.password ? 'is-invalid' : ''"
                />
                <span v-if="errors.password" class="invalid-feedback">{{
                  errors.password
                }}</span>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-success btn-lg">
                  Connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['API_URL'],

  data() {
    return {
      email: '',
      password: '',
      showSuccessMessage: false,
      showErrorMessage: false,
      showAccountDeletedMessage: false,
      errors: {},
    };
  },

  methods: {
    async submitForm() {
      if (!this.validateForm()) return;

      const data = {
        email: this.email,
        password: this.password,
      };

      const connectUser = await fetch(`${this.API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await connectUser.json();

      if (result.error) {
        this.showErrorMessage = true;
        return;
      }

      // Make user connexion persistent
      await this.$store.dispatch('login', result);

      // Redirect to feed page
      this.$router.push({ name: 'Feed' });
    },

    validateForm() {
      this.errors = {};

      if (this.email.length === 0) {
        this.errors.email = 'Une adresse mail est requise';
      }

      if (this.password.length === 0) {
        this.errors.password = 'Un mot de passe est requis';
      }

      return Object.keys(this.errors).length === 0;
    },

    dismissAccountDeletedMessage() {
      this.showAccountDeletedMessage = false;
      this.$router.replace({ query: '' });
    },
  },

  mounted() {
    if (this.$route.query.email) {
      this.email = this.$route.query.email;
      this.showSuccessMessage = true;
    }

    if (this.$route.query.accountDeleted) {
      this.showAccountDeletedMessage = true;
    }
  },
};
</script>

<style>
.overlay {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>