<template>
  <div class="m-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <img
            class="img-fluid mt-5 mb-3"
            src="@/assets/logo.png"
            alt="groupomania logo"
          />
          <p class="fs-5 mb-4">
            N'attendez plus pour vous inscrire et commencez à échanger dès à
            présent avec vos collaborateurs.
          </p>
          <p>
            Déjà inscrit(e)s ?
            <router-link :to="{ name: 'Signin' }" class="ms-2"
              >Se connecter</router-link
            >
          </p>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm ms-md-5 p-3 p-md-4 mt-4 mt-md-0">
            <form @submit.prevent="submitForm" novalidate>
              <div class="mb-2">
                <label for="lastname" class="form-label">Nom</label>
                <input
                  @focus="
                    {
                      {
                        delete errors.lastname;
                      }
                    }
                  "
                  type="text"
                  id="lastname"
                  v-model="lastname"
                  class="form-control form-control-lg"
                  :class="errors.lastname ? 'is-invalid' : ''"
                />
                <span v-if="errors.lastname" class="invalid-feedback">{{
                  errors.lastname
                }}</span>
              </div>
              <div class="mb-2">
                <label for="firstname" class="form-label">Prénom</label>
                <input
                  @focus="
                    {
                      {
                        delete errors.firstname;
                      }
                    }
                  "
                  type="text"
                  id="firstname"
                  v-model="firstname"
                  class="form-control form-control-lg"
                  :class="errors.firstname ? 'is-invalid' : ''"
                />
                <span v-if="errors.firstname" class="invalid-feedback">{{
                  errors.firstname
                }}</span>
              </div>
              <div class="mb-2">
                <label for="email" class="form-label">Adresse mail</label>
                <input
                  @focus="
                    {
                      {
                        delete errors.email;
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
                <label for="password" class="form-label"
                  >Mot de passe (8 caractères minimum)</label
                >
                <input
                  @focus="
                    {
                      {
                        delete errors.password;
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
                  Inscription
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
import validator from 'validator';

export default {
  inject: ['API_URL'],

  data() {
    return {
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      errors: {},
    };
  },

  methods: {
    async submitForm() {
      if (!this.validateForm()) return;

      const data = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
      };

      const registerUser = await fetch(`${this.API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const response = await registerUser.json();

      if (response.error) {
        this.errors.email = response.error.message;
        return;
      }

      // Redirect to signin signin page with email as query parameter
      this.$router.push({ name: 'Signin', query: { email: this.email } });
    },

    validateForm() {
      this.errors = {};

      if (this.lastname.length === 0) {
        this.errors.lastname = 'Un nom est requis';
      }

      if (/\d/g.test(this.lastname)) {
        this.errors.lastname = 'Ne peut contenir que des lettres';
      }

      if (this.firstname.length === 0) {
        this.errors.firstname = 'Un prénom est requis';
      }

      if (/\d/g.test(this.firstname)) {
        this.errors.firstname = 'Ne peut contenir que des lettres';
      }

      if (this.email.length === 0) {
        this.errors.email = 'Une adresse mail est requise';
      }

      if (!validator.isEmail(this.email)) {
        this.errors.email = 'Adresse mail non valide';
      }

      if (this.password.length === 0) {
        this.errors.password = 'Un mot de passe est requis';
      }

      if (this.password.length < 8) {
        this.errors.password = 'Mot de passe trop court';
      }

      return Object.keys(this.errors).length === 0;
    },
  },
};
</script>